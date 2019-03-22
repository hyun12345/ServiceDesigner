import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './component/home';
import Sidebar from './component/sidebar/sidebar';
import { ElementManager } from './manager/element.manager';
import comData from './resource/components.json';
import initJson from './resource/init.json';
import { DataManager } from './manager/data.manager';

class App extends Component {

    componentWillMount() {
        DataManager.getInstance(DataManager).initialize(initJson);
        ElementManager.getInstance(ElementManager).initialize(comData);
    }   

    render() {
        return (
        <div>
            <Sidebar>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="*" render={() => (<Redirect to="/" />)} />
                </Switch>
            </Sidebar>
        </div>
        );
    }
}

export default App;
