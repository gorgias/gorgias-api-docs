import React from 'react'
import {Link} from 'react-router'
import '../../static/css/main.less'


export const App = ({children}) => {
    const openapi = window.openapi

    const orderedTags = openapi.get('tags').sort((v1, v2) => v1.get('name') > v2.get('name'))
    const orderedDefinitions = openapi.get('definitions').sortBy((v, k) => k)

    return (
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
                        <Link activeClassName="activeLink" to="/pagination">Pagination</Link>
                        <Link activeClassName="activeLink" to="/querying-the-api">Querying the API</Link>
                        <Link activeClassName="activeLink" to="/errors">Errors</Link>
                    </li>
                </ul>

                <p>API</p>
                <ul>
                    {
                        orderedTags.map(tag => (
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
                        orderedDefinitions.map((def, name) => (
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
            <div className="main">
                <div className="left-background"></div>
                <div className="right-background"></div>
                {children}
            </div>
        </div>
    )
}
