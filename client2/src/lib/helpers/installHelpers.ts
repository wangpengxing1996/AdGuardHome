export enum NETWORK_TYPE {
    LOCAL = 'LOCAL',
    ETHERNET = 'ETHERNET',
    OTHER = 'OTHER',
}

export const chechNetworkType = (network: string) => {
    if (network.includes('en')) {
        return NETWORK_TYPE.ETHERNET;
    }
    if (network.includes('lo')) {
        return NETWORK_TYPE.LOCAL;
    }
    return NETWORK_TYPE.OTHER;
};
