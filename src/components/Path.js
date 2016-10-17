import React from 'react'
import {Link} from 'react-router'
import {fromJS} from 'immutable'
import {JSONTree} from './JsonTree'

import {examplify, getDefinitionProperties, Code} from './../utils'


/**
 * Handle generating all the doc for a completed endpoint
 * @param uri the URI of the endpoint
 * @param verbs the verbs available on this endpoint (HTTP verbs: GET/PUT/POST/DELETE)
 */
export const Path = ({uri, verbs}) => {
    const parts = uri.split('/')
    const anchor = parts.slice(1, parts.length - 1).join('-')
    return (
        <div className="paths" id={anchor}>
            {verbs.map((verb, method) => (
                <Verb key={method} verb={verb} method={method} uri={uri}/>
            )).toList()}
        </div>
    )
}

/**
 * Handle generating all the doc for one verb
 * @param verb the data
 * @param method the name of the verb itself
 * @param uri the URI of the current endpoint
 */
const Verb = ({verb, method, uri}) => (
    <div className="Grid">
        <div className="Grid-left">
            <div className="Grid-inside">
                {/*  description  */}
                <div>
                    <h1>{verb.get('summary')}</h1>
                    <p>{verb.get('description')}</p>
                </div>
                <Parameters parameters={verb.get('parameters')}/>
            </div>
        </div>
        <div className="Grid-right">
            <div className="Grid-inside">
                <h3 className="text-right">HTTP Request</h3>
                <Code>{method.toUpperCase()} {uri}</Code>

                <Responses responses={verb.get('responses')}  />
            </div>
        </div>
    </div>
)

/**
 * A loop to generate all required responses (displayed in the right part of the doc).
 * @param responses all the responses of the current Verb/Endpoint
 */
export const Responses = ({responses}) => (
    <div>
        {
            responses.entrySeq().map((entry, idx) => {
                if (idx === 0) { // tmp fix to have only the first ex response
                    return (
                        <Response
                            key={idx}
                            status={entry[0]}
                            responseArg={entry[1]}
                        />
                    )
                }
                return null
            }).toJS()
        }
    </div>
)

/**
 * A single Response. `Examplify` the definition of the output of the Verb/Endpoint, and display it in a JSONTree.
 * @param status the HTTP status code of this response (200, 201, 400, 404...)
 * @param responseArg the data
 */
export const Response = ({status, responseArg}) => {
    let response = responseArg

    if (typeof(response) !== 'string' && response.get('schema')) {
        const schema = response.get('schema')
        let ref = null
        let transformInArray = false

        if (schema.get('$ref')) {
            ref = schema.get('$ref')
        } else if (schema.get('type') === 'array') {
            ref = schema.getIn(['items', '$ref'])
            transformInArray = true
        }

        response = examplify(getDefinitionProperties(ref))

        if (transformInArray) {
            response = [response]
        }

        response = <JSONTree data={fromJS(response)}/>
    } else if (typeof(response) !== 'string' && response.get('description')) {
        response = response.get('description')
    }

    return (
        <div className="response">
            <h3 className="text-right">Example response (success code: {status})</h3>
            <Code>
                {response}
            </Code>
        </div>
    )
}


/**
 * Loop over parameters and display them, extract the `body` parameter and display it separately.
 * @param parameters the parameters of the current Verb/Endpoint.
 */
export const Parameters = ({parameters}) => {
    if (!parameters || !parameters.filter(paramRef => paramRef.get('in') !== 'body')) {
        return null
    }

    const filteredParams = parameters.filter(paramRef => paramRef.get('in') !== 'body')
    const bodyParameter = parameters.find(param => param.get('in') === 'body')

    return (
        <div>
            {
                !!filteredParams.size && (
                    <div>
                        <h3>URL parameters</h3>
                        <table className="ui very basic collapsing celled table">

                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Location</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                filteredParams.map((paramRef, i) => (
                                    <Parameter key={i} paramRef={paramRef}/>
                                )).toList()
                            }
                            </tbody>

                        </table>
                    </div>
                )
            }
            {
                bodyParameter && (
                    <div>
                        <h3>Example request body</h3>
                        <Code light>
                            <JSONTree data={examplify(bodyParameter.get('schema'), true)} />
                        </Code>
                    </div>
                )
            }
        </div>
    )
}

/**
 * Display a row in the `Parameters` table, inluding the name, type, location and description of the parameter.
 * @param paramRef the data to display
 */
export const Parameter = ({paramRef}) => {
    const openapi = window.openapi
    let param = null

    if (paramRef.get('$ref')) {
        // implies the format of paramRef is: `{$ref: '#/parameters/ticket_id'}`
        param = openapi.getIn(['parameters', paramRef.get('$ref').replace('#/parameters/', '')])
    } else {
        // implies the parameter's data is directly in the `paramRef`
        param = paramRef
    }

    let displayComp = param.get('type')

    {/* NOT USED FOR NOW
    let displayName = param.get('type')
    let displayComp = displayName

    if (
        !paramRef.get('type') && paramRef.get('schema') && (
            paramRef.getIn(['schema', '$ref']) || paramRef.getIn(['schema', 'items', '$ref'])
        )
    ) {
        // implies the type of the parameter
        let url = null

        if (paramRef.getIn(['schema', 'type']) === 'array') {
            url = paramRef.getIn(['schema', 'items', '$ref']).split('/')
            displayName = `array of ${paramRef.getIn(['schema', 'items', '$ref']).split('/')[2]}`
        } else {
            url = paramRef.getIn(['schema', '$ref']).split('/')
            displayName = paramRef.getIn(['schema', '$ref']).split('/')[2]
        }

        url.shift()
        url = `/${url.join('/')}`

        displayComp = <Link to={url}><b>{displayName}</b></Link>
    }
    */}

    return (
        <tr>
            <td>{param.get('name')}</td>
            <td>{displayComp}</td>
            <td>{param.get('in')}</td>
            <td>{param.get('description')}</td>
        </tr>
    )
}
