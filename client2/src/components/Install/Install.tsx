import React, { FC, useContext, useState } from 'react';
import { Button, Layout } from 'antd';
import { observer } from 'mobx-react-lite';

import Store from 'Store';
import Icon from 'Common/ui/Icon';
import Icons from 'Lib/theme/Icons';

import s from './Install.module.pcss';
import Stepper from './components/Stepper';

const { Content } = Layout;

const Install: FC = observer(() => {
    const { ui: { intl } } = useContext(Store);
    const [step, setStep] = useState(1);
    return (
        <Layout className={s.layout}>
            <Content className={s.container}>
                <div className={s.content}>
                    <Stepper currentStep={step} />
                    <div className={s.iconContainer}>
                        <Icon icon="mainLogo" className={s.icon} />
                    </div>
                    <h2>
                        {intl.getMessage('install_wellcome_title')}
                    </h2>
                    <div>
                        {intl.getMessage('install_wellcome_desc')}
                    </div>
                </div>
            </Content>
            <Icons/>
        </Layout>
    );
});

export default Install;
