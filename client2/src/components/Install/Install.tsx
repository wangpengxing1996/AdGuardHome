import React, { FC } from 'react';
import { Layout } from 'antd';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';

import { IInitialConfiguration } from 'Entities/InitialConfiguration';
import Icons from 'Lib/theme/Icons';

import s from './Install.module.pcss';
import Stepper from './components/Stepper';
import Welcome from './components/Welcome';
import AdminInterface from './components/AdminInterface';

const { Content } = Layout;

export type FormValues = IInitialConfiguration & { step: number };

const InstallForm: FC = observer(() => {
    const initialValues: FormValues = {
        step: 0,
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={() => {}}
        >
            {({ values, handleSubmit, setFieldValue }) => (
                <form noValidate className={s.content} onSubmit={handleSubmit}>
                    <Stepper currentStep={values.step} />
                    {values.step === 0 && (
                        <Welcome onNext={() => setFieldValue('step', 1)}/>
                    )}
                    {values.step === 1 && (
                        <AdminInterface values={values} setFieldValue={setFieldValue} />
                    )}
                </form>
            )}
        </Formik>
    );
});

const Install: FC = () => {
    return (
        <Layout className={s.layout}>
            <Content className={s.container}>
                <InstallForm />
            </Content>
            <Icons/>
        </Layout>
    );
};

export default Install;
