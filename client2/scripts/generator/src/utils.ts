const toCamel = (s: string) => {
    return s.replace(/([-_][a-z])/ig, ($1) => {
        return $1.toUpperCase()
            .replace('-', '')
            .replace('_', '');
    });
};
const capitalize = (s: string) => {
    return s[0].toUpperCase() + s.slice(1);
};
const TYPES = {
    integer: 'number',
    float: 'number',
    number: 'number',
    string: 'string',
    boolean: 'boolean',
};

/**
 * @param schemaProp: string value - valueof shema.properties[key]
 * @param openApi: openapi object
 * @returns [propType - basicType or import one, isArray, isClass, isImport]
 */
const schemaParamParser = (schemaProp: any, openApi: any): [string, boolean, boolean, boolean] => {
    let type = '';
    let isImport = false;
    let isClass = false;
    let isArray = false;

    if (schemaProp.$ref) {
        const temp = schemaProp.$ref.split('/');

        type = `${temp[temp.length - 1]}`;
        isImport = true;

        const cl = openApi ? openApi.components.schemas[temp[temp.length - 1]] : {};
        if (cl.type === 'object' && !cl.oneOf) {
            isClass = true;
        }
    } else if (schemaProp.type === 'array') {
        const temp: any = schemaParamParser(schemaProp.items, openApi);
        type = `${temp[0]}`;
        isArray = true;
        isClass = isClass || temp[2];
        isImport = isImport || temp[3];
    } else {
        type = (TYPES as Record<any, string>)[schemaProp.type];
    }
    if (!type) {
        // TODO: Fix bug with Error fields.
        type = 'any';
        // throw new Error('Failed to find entity type');
    }

    return [type, isArray, isClass, isImport];
};

export { TYPES, toCamel, capitalize, schemaParamParser };
