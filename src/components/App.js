import React from 'react'
import {Link, IndexLink} from 'react-router'
import {fromJS} from 'immutable'
import '../../static/css/main.less'
import data from '../../data/openapi.json'

const openapi = fromJS(data)

import logo from '../../static/img/gorgias-logo-white-transparent.png'

export const App = ({children}) => (
    <div>
        {/*   Navigation SideColumn   */}
        <div className="navigation">
            <IndexLink href="/" className="logo" to="/">
                <img src={logo} alt="Gorgias"/>
                <span>
                  API
                </span>
            </IndexLink>

            <h2>INTRODUCTION</h2>
            <ul>
                <li>
                    <IndexLink activeClassName="nav-item-active" to="/" className="nav-item">Getting Started</IndexLink>
                </li>
            </ul>

            <h2>API</h2>
            <ul>
                {openapi.get('tags').map(tag => (
                    <li key={tag.get('name')}>
                        <Link className="nav-item" activeClassName="nav-item-active"
                              to={`/api/${tag.get('name')}`}>{tag.get('name')}</Link>
                    </li>
                )).toList().toJS()}
            </ul>

            <h2>DEFINITIONS</h2>
            <ul>
                {openapi.get('definitions').map((def, name) => (
                    <li key={name}>
                        <Link className="nav-item" activeClassName="nav-item-active"
                              to={`/definitions/${name}`}>{name}</Link>
                    </li>
                )).toList().toJS()}
            </ul>
        </div>

        {/*   MAIN (everything except the Navigation SideColumn)   */}
        {/*  CONTENT (Tag or Definition)  */}
        {children}
    </div>
)
