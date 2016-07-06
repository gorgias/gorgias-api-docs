import React from 'react'
import {fromJS} from 'immutable'
import data from '../../data/openapi.json'
import {Responses} from './Responses'
import {Properties} from './Properties'

const openapi = fromJS(data)

const Verb = ({verb, method, uri}) => {
    var responses = verb.get('responses')

    return (
        <div className="content-block">
            <div className="content-block-details">
                <h1>{verb.get('summary')}</h1>
                <p>{verb.get('description')}</p>

                <Parameters parameters={verb.get('parameters')}/>
            </div>
            <div className="content-block-request">
                <h3 className="content-block-request-title">HTTP Request</h3>
                <code className="content-block-request-code">
                    <strong>
                        {method.toUpperCase()}
                    </strong> {uri}
                </code>
                <Responses responses={responses} />
            </div>
        </div>
    )
}

export const Parameters = ({parameters}) => {
    if (!parameters) {
        return null
    }

    /* map the parameters to the same structure as the definition object,
     * so we can re-use the properties component.
     */
    var def = {
        properties: {}
    }

    parameters.map((paramRef, i) => {
        let param = openapi.getIn(['parameters', paramRef.get('$ref').replace('#/parameters/', '')])

        def.properties[param.get('name')] = param
    })

    def = fromJS(def)

    return (
        <Properties name="Request" definition={def}/>
    )
}

export const Path = ({uri, verbs}) => {
    const parts = uri.split('/')
    const anchor = parts.slice(1, parts.length - 1).join('-')
    return (
        <div className="path" id={anchor}>
            {verbs.map((verb, method) => (
                <Verb key={method} verb={verb} method={method} uri={uri}/>
            )).toList()}
        </div>
    )
}
