import React from 'react'
import {fromJS, List, OrderedMap} from 'immutable'


const EXAMPLE_DATE = '2016-10-07T07:38:36'
const EXAMPLE_URL = 'https://gorgias.io/'

const EXAMPLE_STRING = 'https://gorgias.io/'
const EXAMPLE_BOOLEAN = false
const EXAMPLE_INT = 1


/**
 * Take an OpenAPI definition and turn it in an example with fake values.
 *
 * @param schema: the definition to transform
 * @param onlyRequired (optional): whether we want all the fields or only the required ones
 * @returns {*} the example with fake values
 */
export const examplify = (schema, onlyRequired = false) => {
    if (typeof(schema) === 'string' || !schema) {
        return schema
    }

    if (schema.get('example', undefined) !== undefined) {
        return schema.get('example')
    }

    if (schema.get('$ref')) {
        return examplify(
            getDefinitionProperties(
                schema.get('$ref'),
                schema.getIn(['meta', 'only']),
                schema.getIn(['meta', 'exclude']),
                onlyRequired
            )
        )
    }

    // type.type is schemas with a real `type` field (like `actions` for ex.)
    if (schema.get('type') && !schema.getIn(['type', 'type'])) {
        if (schema.get('default')) {
            return schema.get('default')
        } else if (schema.getIn(['meta', 'enum'])) {
            return schema.getIn(['meta', 'enum', 0])
        } else {
            switch (schema.get('type')) {
                case 'string': {
                    if (schema.get('format') === 'date-time') {
                        return EXAMPLE_DATE
                    } else if (schema.get('format') === 'url') {
                        return EXAMPLE_URL
                    } else {
                        return EXAMPLE_STRING
                    }
                }

                case 'boolean': {
                    return EXAMPLE_BOOLEAN
                }

                case 'integer': {
                    return EXAMPLE_INT
                }

                case 'array': {
                    if (schema.getIn(['items', '$ref'])) {
                        if (schema.getIn(['meta', 'only'])) {
                            return fromJS([examplify(
                                getDefinitionProperties(
                                    schema.getIn(['items', '$ref']),
                                    schema.getIn(['meta', 'only']),
                                    schema.getIn(['meta', 'exclude'])
                                )
                            )])
                        }

                        return fromJS([{_schema: schema.getIn(['items', '$ref'])}])
                    } else if (schema.getIn(['items', 'type'])) {
                        return List([examplify(schema.getIn(['items', 'type']))])
                    } else {
                        console.error('openapi: an array field is wrongly formatted: ', schema.toJS())
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
                    schema.getIn(['meta', 'only']),
                    schema.getIn(['meta', 'exclude']),
                    onlyRequired
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
 * @param exclude (optional): the list of fields to exclude
 * @param onlyRequired (optional): whether we want all the fields or only the required ones
 * @returns {*}: the definition, total or partial
 */
export const getDefinitionProperties = (ref, only = null, exclude = null, onlyRequired = false) => {
    const openapi = window.openapi

    if (!ref) {
        return ref
    }

    let response = openapi
    let path = ref.split('/')
    path.shift()  // remove the first `#`

    for (var key of path) {
        response = response.get(key)
    }

    const required = response.get('required')
    response = response.get('properties')

    if (only) {
        response = response.filter((value, key) => only.includes(key))
    }

    if (exclude) {
        response = response.filter((value, key) => !exclude.includes(key))
    }

    if (onlyRequired) {
        response = response.filter((value, key) => required.includes(key))
    }

    let res = OrderedMap({_schema: ref})
    res = res.merge(response)

    return res
}

export const Code = ({light, inline, children}) => {
    if (inline) {
        return <span className={`inline code ${light ? 'light' : ''}`}>{children}</span>
    }

    return <div className={`code ${light ? 'light' : ''}`}>{children}</div>
}