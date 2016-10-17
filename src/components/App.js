import React from 'react'
import {Link} from 'react-router'
import {fromJS} from 'immutable'
import '../../static/css/main.less'
import data from '../../data/openapi.json'

const openapi = fromJS(data)

export const App = ({children}) => (
    <div>
        {/*   Navigation SideColumn   */}
        <div className="navigation">
            <Link to="/">
                <div className="logo-wrapper">
                    <h1 className="logo">
                        <img className="gorgias-logo" src="/static/img/gorgias-logo-white-transparent.png"/>
                        <span>API</span>
                    </h1>
                </div>
            </Link>
            <p>INTRODUCTION</p>
            <ul>
                <li>
                    <Link activeClassName="activeLink" to="/getting-started">Getting Started</Link>
                    <Link activeClassName="activeLink" to="/authentication">Authentication</Link>
                    <Link activeClassName="activeLink" to="/billing">Billing</Link>
                </li>
            </ul>

            <p>API</p>
            <ul>
                {
                    openapi.get('tags').sort((v1, v2) => v1.get('name') > v2.get('name')).map(tag => (
                        <li key={tag.get('name')}>
                            <Link
                                activeClassName="activeLink"
                                to={`/api/${tag.get('name')}`}
                            >
                                {tag.get('name')}
                            </Link>
                        </li>
                    )).toList().toJS()
                }
            </ul>

            <p>OBJECTS</p>
            <ul>
                {
                    openapi.get('definitions').sortBy((v, k) => k).map((def, name) => (
                        <li key={name}>
                            <Link
                                activeClassName="activeLink"
                                to={`/definitions/${name}`}
                            >
                                {name}
                            </Link>
                        </li>
                    )).toList().toJS()
                }
            </ul>
        </div>

        {/*   MAIN (everything except the Navigation SideColumn)   */}
        {/*  CONTENT (Tag or Definition)  */}
        {children}
    </div>
)
