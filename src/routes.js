import React from 'react'
import {IndexRoute, Route} from 'react-router'
import {App} from './components/App'
import {Index} from './components/Index'

import {Tag} from './components/Tag'
import {Definition} from './components/Definition'

import {GettingStarted} from './components/pages/GettingStarted'
import {Authentication} from './components/pages/Authentication'
import {QueryingTheAPI} from './components/pages/QueryingTheAPI'
import {Errors} from './components/pages/errors'
import {Pagination} from './components/pages/Pagination'

export const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Index}/>
        <Route path="/getting-started" component={GettingStarted}/>
        <Route path="/authentication" component={Authentication}/>
        <Route path="/querying-the-api" component={QueryingTheAPI}/>
        <Route path="/errors" component={Errors}/>
        <Route path="/pagination" component={Pagination}/>
        <Route path="/api/:tag" component={Tag}/>
        <Route path="/definitions/:definition" component={Definition}/>
    </Route>
)

