import React from 'react'
import {fromJS} from 'immutable'
import {Properties} from './Properties'
import {JSONTree} from './JsonTree'
import {examplify} from './../utils'

import data from '../../data/openapi.json'
const openapi = fromJS(data)

// Definition
export const Definition = ({params}) => {
    const definitions = openapi.get('definitions')
    const definition = definitions.find((def, name) => name === params.definition)

    return (
        <div className="Grid">
            {/*  first block  */}
            <div className="Grid-left ">
                <div className="Grid-inside">
                    <h1>{params.definition}</h1>
                    <p>{definition.get('description')}</p>
                    <Properties name={params.definition} definition={definition}/>
                </div>
            </div>
            <div className="Grid-right">
                <div className="Grid-inside">
                    <h3 className="text-right">Example object:</h3>
                    <Code>
                        <JSONTree data={examplify(definition)}/>
                    </Code>
                </div>
            </div>
        </div>
    )
}
