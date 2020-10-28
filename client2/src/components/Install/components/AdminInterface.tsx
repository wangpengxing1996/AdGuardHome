import React, { FC, useContext } from 'react';
import { Button } from 'antd';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';

import Store from 'Store';
import theme from 'Lib/theme';

import s from './AdminInterface.module.pcss';
import { FormValues } from '../Install';

interface AdminInterfaceProps {
    values: FormValues;
    setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
}

const AdminInterface: FC<AdminInterfaceProps> = observer(({
    values,
    setFieldValue,
}) => {
    const { ui: { intl } } = useContext(Store);
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
                <Button
                    size="large"
                    type="ghost"
                    className={s.button}
                    onClick={() => setFieldValue('step', 0)}
                >
                    {intl.getMessage('back')}
                </Button>
                <Button
                    size="large"
                    type="primary"
                    className={s.button}
                    onClick={() => setFieldValue('step', 2)}
                >
                    {intl.getMessage('next')}
                </Button>
            </div>
        </div>
    );
});

export default AdminInterface;
