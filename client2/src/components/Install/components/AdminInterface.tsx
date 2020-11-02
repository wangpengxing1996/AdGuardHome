import React, { FC, useContext } from 'react';
import { Radio } from 'antd';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';

import Store from 'Store/installStore';
import theme from 'Lib/theme';

import s from './AdminInterface.module.pcss';
import { FormValues } from '../Install';
import StepButtons from './StepButtons';

const { Group } = Radio;

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
                <Group>
                    <Radio>
                    </Radio>
                </Group>

            </div>
            <StepButtons setFieldValue={setFieldValue} currentStep={1} />
        </div>
    );
});

export default AdminInterface;
