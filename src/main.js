import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router'
import {routes} from './routes'

ReactDOM.render(
    <Router history={browserHistory} children={routes} />,
    document.getElementById('root')
)
