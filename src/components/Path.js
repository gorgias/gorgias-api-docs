import React from 'react'
import {fromJS} from 'immutable'
import data from '../../data/openapi.json'
import {Properties} from './Properties'
import {Response} from './Response'

const openapi = fromJS(data)

const Verb = ({verb, method, uri}) => {
    var responses = verb.get('responses')
    return (
        <div className="content-block">
            <div className="content-block-details">
                {/*  description  */}
                <div>
                    <h1>{verb.get('summary')}</h1>
                    <p>{verb.get('description')}</p>
                </div>
                <Parameters parameters={verb.get('parameters')}/>
            </div>
            <div className="content-block-request">
                <h3 className="content-block-request-title">HTTP Request</h3>
                <code className="code">{method.toUpperCase()} {uri}</code>
                {responses.map((response, status) => {
                    return (
                        <div key={status}>
                            <h3 className="content-block-request-title">Example Response (status: {status}) </h3>
                            <Response response={response} />
                        </div>
                    )
                }
                ).toList()}
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
        <div className="paths" id={anchor}>
            {verbs.map((verb, method) => (
                <Verb key={method} verb={verb} method={method} uri={uri}/>
            )).toList()}
        </div>
    )
}
