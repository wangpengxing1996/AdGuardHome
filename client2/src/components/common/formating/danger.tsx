import React from 'react';
import theme from 'Lib/theme';

const danger = (e: string) => {
    return (
        <span className={theme.typo.danger}>
            {e}
        </span>
    );
};

export default danger;
