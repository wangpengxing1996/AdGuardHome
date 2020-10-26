import { observer } from 'mobx-react-lite';
import React, { FC, useContext } from 'react';
import Store from 'Store';

const App: FC = observer(() => {
    const store = useContext(Store);
    return (
        <div>
            {store.ui.currentLang}
        </div>
    );
});

export default App;
