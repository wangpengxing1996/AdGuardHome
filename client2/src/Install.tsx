import React from 'react';
import ReactDOM from 'react-dom';

import Store, { storeValue } from 'Store';

import Install from './components/Install';

const Container = () => {
    return (
        <Store.Provider value={storeValue}>
            <Install/>
        </Store.Provider>
    );
};

ReactDOM.render(<Container />, document.getElementById('app'));
