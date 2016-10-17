import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router'
import {fromJS} from 'immutable'
import axios from 'axios'
import {routes} from './routes'

const PROD_URL = 'https://gorgias.gorgias.io/doc/openapi.json'
const DEV_URL = 'http://acme.gorgias.docker/doc/openapi.json'

axios.get(DEV_URL)
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
