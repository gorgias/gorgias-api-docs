import React from 'react'
import {Link} from 'react-router'

const Property = ({prop, name, required}) => {
    const displayName = prop.get('type') || prop.get('$ref').split('/')[2]
    let displayComp = displayName


    if (!prop.get('type') && prop.get('$ref')) {
        const url = prop.get('$ref').split('/')
        url.shift()

        displayComp = <Link to={`/${url.join('/')}`}><b>{displayName}</b></Link>
    }

    return (
        <tr>
            <td>{name} {required && required.includes(name) ? <span className="required">required</span> : ''}</td>
            <td>{displayComp}</td>
            <td>{prop.get('description')}</td>
        </tr>
    )
}

export const Properties = ({name, definition}) => {
    if (!definition) {
        return null
    }

    return (
        <div className="attributes">
            <h2>{name} object properties:</h2>
            <div className="tableCard">
                {/*  Table for the Attributes of the object  */}
                <table className="ui celled striped table" id="table">
                    <thead>
                        <tr>
                            <th>
                                <strong>Name</strong>
                            </th>
                            <th>
                                <strong>Type</strong>
                            </th>
                            <th>
                                <strong>Description</strong>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        definition.get('properties').map((prop, name) => (
                            <Property key={name} prop={prop} name={name} required={definition.get('required')}/>
                        )).toList()
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
