import React, { FC, useContext } from 'react';
import cn from 'classnames';
import { FormikHelpers } from 'formik';

import Store from 'Store/installStore';
import theme from 'Lib/theme';

import { FormValues } from '../../Install';
import StepButtons from '../StepButtons';
import s from './ConfigureDevices.module.pcss';

interface ConfigureDevicesProps {
    values: FormValues;
    setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
}

const ConfigureDevices: FC<ConfigureDevicesProps> = ({
    values, setFieldValue,
}) => {
    const { ui: { intl } } = useContext(Store);

    return (
        <div>
            <div className={theme.typo.title}>
                {intl.getMessage('install_dns_server_title')}
            </div>
            <div className={cn(theme.typo.text, theme.typo.text_block)}>
                {intl.getMessage('install_dns_server_desc')}
            </div>
            <div className={theme.typo.subTitle}>
                {intl.getMessage('install_dns_server_network_interfaces')}
            </div>
            <div className={cn(theme.typo.text, theme.typo.text_base)}>
                {intl.getMessage('install_dns_server_network_interfaces_desc')}
            </div>

            <div className={theme.typo.subTitle}>
                {intl.getMessage('install_dns_server_port')}
            </div>
            <div className={cn(theme.typo.text, theme.typo.text_base)}>
                {intl.getMessage('install_dns_server_port_desc')}
            </div>
            <StepButtons setFieldValue={setFieldValue} currentStep={4} />
        </div>
    );
};

export default ConfigureDevices;
