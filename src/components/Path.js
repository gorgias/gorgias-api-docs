import React from 'react'
import {Link} from 'react-router'
import {fromJS} from 'immutable'
import {JSONTree} from './JsonTree'

import {examplify, getDefinitionProperties, Code} from './../utils'

import data from '../../data/openapi.json'
const openapi = fromJS(data)


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

export const Responses = ({responses}) => {
    return (
        <div>
            {
                responses.entrySeq().map((entry, idx) => {
                    if (idx === 0) { // tmp fix to have only the first ex response
                        return (
                            <Response
                                key={idx}
                                status={entry[0]}
                                responseRef={entry[1]}
                            />
                        )
                    }
                    return null
                }).toJS()
            }
        </div>
    )
}

export const Response = ({status, responseRef}) => {
    let response = responseRef

    if (typeof(responseRef) !== 'string' && responseRef.get('schema')) {
        const schema = responseRef.get('schema')
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
    } else if (typeof(responseRef) !== 'string' && responseRef.get('description')) {
        response = responseRef.get('description')
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

export const Parameter = ({paramRef}) => {
    let param = null

    if (paramRef.get('$ref')) {
        param = openapi.getIn(['parameters', paramRef.get('$ref').replace('#/parameters/', '')])
    } else {
        param = paramRef
    }

    let displayName = param.get('type')
    let displayComp = displayName

    if (
        !paramRef.get('type') && paramRef.get('schema') && (
            paramRef.getIn(['schema', '$ref']) || paramRef.getIn(['schema', 'items', '$ref'])
        )
    ) {
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

    return (
        <tr>
            <td>{param.get('name')}</td>
            <td>{displayComp}</td>
            <td>{param.get('in')}</td>
            <td>{param.get('description')}</td>
        </tr>
    )
}
