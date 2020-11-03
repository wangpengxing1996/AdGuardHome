import React, { FC, useContext } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';

import { Radio } from 'Common/controls';
import { DEFAULT_IP_ADDRESS } from 'Consts/install';
import Store from 'Store/installStore';
import theme from 'Lib/theme';

import s from './AdminInterface.module.pcss';
import { FormValues } from '../Install';
import StepButtons from './StepButtons';

enum NETWORK_OPTIONS {
    ALL = 'all',
    CUSTOM = 'custom',
}

interface AdminInterfaceProps {
    values: FormValues;
    setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
}

const AdminInterface: FC<AdminInterfaceProps> = observer(({
    values,
    setFieldValue,
}) => {
    const { ui: { intl }, install: { addresses } } = useContext(Store);
    console.log(addresses);

    const radioValue = values.web?.ip === DEFAULT_IP_ADDRESS
        ? NETWORK_OPTIONS.ALL : NETWORK_OPTIONS.CUSTOM;

    const onSelectRadio = (v: string) => {
        const value = v === NETWORK_OPTIONS.ALL
            ? DEFAULT_IP_ADDRESS : v;
        setFieldValue('web.ip', value);
    };
    return (
        <div className={s.content}>
            <div className={theme.typo.title}>
                {intl.getMessage('admin_interface_title')}
            </div>
            <div className={cn(theme.typo.text, theme.typo.text_block)}>
                {intl.getMessage('admin_interface_title_decs')}
            </div>
            <div className={theme.typo.subTitle}>
                {intl.getMessage('admin_interface_where_interface')}
            </div>
            <div className={cn(theme.typo.text, theme.typo.text_base)}>
                {intl.getMessage('admin_interface_where_interface_desc')}
            </div>
            <div>
                <Radio
                    value={radioValue}
                    onSelect={onSelectRadio}
                    options={[
                        {
                            value: NETWORK_OPTIONS.ALL,
                            label: intl.getMessage('install_all_networks'),
                            desc: intl.getMessage('install_all_networks_description'),
                        },
                        {
                            value: NETWORK_OPTIONS.CUSTOM,
                            label: intl.getMessage('install_choose_networks'),
                            desc: intl.getMessage('install_choose_networks_desc'),
                        },
                    ]}
                />
            </div>
            <StepButtons setFieldValue={setFieldValue} currentStep={1} />
        </div>
    );
});

export default AdminInterface;
