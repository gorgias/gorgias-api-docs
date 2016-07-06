import React from 'react'
import {fromJS} from 'immutable'
import data from '../../data/openapi.json'
const openapi = fromJS(data)

export const Responses = ({responses}) => {
    return (
        <div className="responses">
            {
                responses.map((response, status) => (
                    <Response key={status} response={response} status={status} />
                )).toList()
            }
        </div>
    )
}

const Response = ({response, status}) => {
    var schema = response.get('schema')
    var props = null

    if (!schema) {
        return null
    }

    if (schema.get('$ref')) {
        props = openapi.getIn(['definitions', schema.get('$ref').replace('#/definitions/', ''), 'properties'])
    }

    return (
        <div className="response-item">
            <h3 className="content-block-request-title">
                Response object <strong>({status})</strong>
            </h3>

            {props ? <ResponseTable properties={props} /> : null}
        </div>
    )
}

const ResponseTable = ({properties}) => {
    return (
        <table className="response-table">
            <tbody>
                {
                    properties.map((property, name) => (
                        <ResponseTableRow property={property} name={name} key={name}  />
                    )).toList()
                }
            </tbody>
        </table>
    )
}

const ResponseTableRow = ({property, name}) => {
    return (
        <tr>
            <td>
                <code className="response-table-name">
                    {name}
                </code>
            </td>
            <td>
                <span className="response-table-type">
                    {property.get('type')}
                </span>
                { property.get('description') ? (
                    <p>
                        {property.get('description')}
                    </p>
                ) : null }
            </td>
        </tr>
    )
}
