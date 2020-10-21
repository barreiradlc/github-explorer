import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Daskboard from '../pages/Daskboard';
import Repository from '../pages/Repository';

import GlobalStyle from "../styles/global"

const Routes: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Daskboard} />
                    <Route path="/repository/:repository+" exact component={Repository} />
                </Switch>
            </BrowserRouter>
            <GlobalStyle />
        </>
    );
}

export default Routes;