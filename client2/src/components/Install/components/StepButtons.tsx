import React, { FC, useContext } from 'react';
import { Button } from 'antd';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';

import Store from 'Store';
import theme from 'Lib/theme';

import { FormValues } from '../Install';

interface StepButtonsProps {
    setFieldValue: FormikHelpers<FormValues>['setFieldValue'];
    currentStep: number
}

const StepButtons: FC<StepButtonsProps> = observer(({
    setFieldValue,
    currentStep,
}) => {
    const { ui: { intl } } = useContext(Store);
    return (
        <div>
            <Button
                size="large"
                type="ghost"
                className={cn(theme.button.button, theme.button.inGroup)}
                onClick={() => setFieldValue('step', currentStep - 1)}
            >
                {intl.getMessage('back')}
            </Button>
            <Button
                size="large"
                type="primary"
                className={cn(theme.button.button)}
                onClick={() => setFieldValue('step', currentStep + 1)}
            >
                {intl.getMessage('next')}
            </Button>
        </div>
    );
});

export default StepButtons;
