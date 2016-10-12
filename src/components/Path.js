import React from 'react'
import {fromJS, List, OrderedMap} from 'immutable'
import {JSONTree} from './JsonTree/JsonTree'
import data from '../../data/openapi.json'
const openapi = fromJS(data)

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
                <code className="code">{method.toUpperCase()} {uri}</code>

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

/**
 * Take an OpenAPI definition and turn it in an example with fake values.
 *
 * @param schema: the definition to transform
 * @returns {*} the example with fake values
 */
const examplify = (schema) => {
    if (typeof(schema) === 'string') {
        return schema
    }

    if (schema.get('type') && !schema.getIn(['type', 'type'])) {  // type.type is schemas with a real `type` field (like `actions` for ex.)
        if (schema.get('default')) {
            return schema.get('default')
        } else if (schema.getIn(['meta', 'enum'])) {
            return schema.getIn(['meta', 'enum', 0])
        } else {
            switch (schema.get('type')) {
                case 'string': {
                    if (schema.get('format') === 'date-time') {
                        return '2016-10-07T07:38:36'
                    } else if (schema.get('format') === 'url') {
                        return 'https://gorgias.io/'
                    } else {
                        return 'string'
                    }
                }

                case 'boolean': {
                    return false
                }

                case 'integer': {
                    return 1
                }

                case 'array': {
                    if (schema.getIn(['items', '$ref'])) {
                        if (schema.getIn(['meta', 'only'])) {
                            return fromJS([examplify(
                                getDefinitionProperties(
                                    schema.getIn(['items', '$ref']),
                                    schema.getIn(['meta', 'only'])
                                )
                            )])
                        }

                        return fromJS([{_schema: schema.getIn(['items', '$ref'])}])
                    } else if (schema.getIn(['items', 'type'])) {
                        return List([examplify(schema.getIn(['items', 'type']))])
                    } else {
                        console.log('SOMETHING WENT WRONG', schema.toJS())
                        break
                    }
                }

                case 'object': {
                    return examplify(schema.get('properties'))
                }

                default:
                    return schema
            }
        }
    } else if (schema.get('$ref')) {
        if (schema.getIn(['meta', 'only'])) {
            return examplify(
                getDefinitionProperties(
                    schema.get('$ref'),
                    schema.getIn(['meta', 'only'])
                )
            )
        }

        return fromJS({_schema: schema.get('$ref')})
    }

    return schema.map(value => examplify(value))
}

/**
 * Take a ref to a definition and return its properties.
 *
 * @param ref: the ref to the definition
 * @param only (optional): the list of fields to return
 * @returns {*}: the definition, total or partial
 */
const getDefinitionProperties = (ref, only = null) => {
    if (!ref) {
        return ref
    }

    let response = openapi
    let path = ref.split('/')
    path.shift()  // remove the first `#`

    for (var key of path) {
        response = response.get(key)
    }

    response = response.get('properties')

    if (only) {
        response = response.filter((value, key) => only.includes(key))
    }

    let res = OrderedMap({_schema: ref})
    res = res.merge(response)

    return res
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
    }

    return (
        <div>
            <h3 className="text-right">Example response</h3>
            <div className="code">
                <JSONTree data={fromJS(response)} />
            </div>
        </div>
    )
}

export const Parameters = ({parameters}) => {
    if (!parameters) {
        return null
    }

    return (
        <table className="ui very basic collapsing celled table">

            <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {parameters.map((paramRef, i) => (
                <Parameter key={i} paramRef={paramRef}/>
            )).toList()}
            </tbody>

        </table>
    )
}

export const Parameter = ({paramRef}) => {
    if (!paramRef.get('$ref')) {
        console.error('Invalid parameter reference', paramRef)
        return null
    }
    const param = openapi.getIn(['parameters', paramRef.get('$ref').replace('#/parameters/', '')])

    return (
        <tr>
            <td>{param.get('name')}</td>
            <td>{param.get('type')}</td>
            <td>{param.get('description')}</td>
        </tr >
    )
}

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
