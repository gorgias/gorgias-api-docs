import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router'
import {fromJS} from 'immutable'
import axios from 'axios'
import {routes} from './routes'

axios.get(__docUrl)
    .then((json = {}) => json.data)
    .then(resp => {
        window.openapi = fromJS(resp)

        ReactDOM.render(
            <Router history={browserHistory}
                    children={routes}
            />,
            document.getElementById('root')
        )
    })
