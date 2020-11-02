import InstallApi from 'Apis/install';
import AddressesInfo, { IAddressesInfo } from 'Entities/AddressesInfo';
import { errorChecker } from 'Lib/helpers/ApiHelpers';
import { flow, makeAutoObservable } from 'mobx';

import { Store } from 'Store';

export default class Install {
    rootStore: Store;

    addresses: AddressesInfo;

    constructor(rootStore: Store) {
        this.rootStore = rootStore;
        makeAutoObservable(this, {
            rootStore: false,
            getAddresses: flow,
        });
        this.getAddresses();
    }

    * getAddresses() {
        const response = yield InstallApi.installGetAddresses();
        const { result } = errorChecker<IAddressesInfo>(response);
        if (result) {
            this.addresses = new AddressesInfo(result);
        }
    }
}
