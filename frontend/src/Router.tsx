import * as React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';


// / <NavLink exact activeClassName = {styles.routeActive} to="/Thread" >ThreadComponent</NavLink>

import ListView from './containers/ListView';
import DetailView from './containers/DetailView';

const routes = [
    {
        path: '/pokemon/:name',
        component: DetailView
    },
    {
        path: '/',
        component: ListView
    },

];

const AppRouter = () =>(
    <Router>
        <React.Fragment>
            <Switch >
                {routes.map( (route, index) => 
                    <Route key= {index} path={route.path} component = {route.component} />
                )}                        
            
            </Switch>
        </React.Fragment>
    </Router>
)

export default AppRouter;