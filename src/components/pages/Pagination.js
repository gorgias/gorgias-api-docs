import React from 'react'
import {fromJS} from 'immutable'
import {JSONTree} from './../JsonTree'
import {Code} from './../../utils'

export const Pagination = () => (
    <div className="Grid">

        {/*  Left Column  */}
        <div className="Grid-left">
            <div className="Grid-inside">
                {/*  Description  */}
                <h1> Pagination </h1>
                <p>Most of the endpoints of our API which returns a large amount of data are paginated.</p>


                <h3>Data structure</h3>
                <p>
                    When hitting on a paginated endpoint, the returned data structure is a bit different than when
                    fetching a regular list of items, or a single item:
                </p>

                <div className="code light">
                    <JSONTree
                        data={fromJS({
                            data: ['item1', 'item2', 'item3', '...'],
                            uri: '/api/items/?',
                            meta: {
                                nb_pages: 3,
                                per_page: 50,
                                item_count: 130,
                                page: 1,
                                current_page: '/api/items/?page=1',
                                next_page: '/api/items/?page=2'
                            }
                        })}
                    />
                </div>

                <ul>
                    <li><b>data:</b> the list of items of this page</li>
                    <li><b>uri:</b> the URL you hit to get this response</li>
                    <li>
                        <b>meta:</b>
                        <ul>
                            <li>
                                <b>nb_pages:</b> the total number of pages available on this endpoint, considering the
                                current `per_page`
                            </li>
                            <li><b>per_page:</b> the number of items per page (<u>default</u>: 50)</li>
                            <li><b>item_count:</b> the total number of items available on this endpoint</li>
                            <li><b>page:</b> the current page's number (<u>default</u>: 1)</li>
                            <li><b>current_page:</b> the URL to access to the current page</li>
                            <li><b>next_page:</b> the URL to access to the next page</li>
                        </ul>
                    </li>
                </ul>


                <h3>Overriding the default values</h3>
                <p>
                    It's easy to override the default pagination values. When hitting on a paginated endpoint, you just
                    have to add the parameter you wish to override as a URL parameter. The only overridable parameters
                    are `page` and `per_page`. For example:
                </p>
                <Code light>GET /api/tickets/?page=2&per_page=20</Code>
            </div>
        </div>

        {/*  Right Column  */}
        <div className="Grid-right">
            <div className="Grid-inside">
            </div>
        </div>

    </div>
)
