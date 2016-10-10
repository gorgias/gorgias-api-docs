import React from 'react'
import {Properties} from './Properties'
import {JSONTree} from './JsonTree'
import {examplify, Code} from './../utils'


// Definition
export const Definition = ({params}) => {
    const openapi = window.openapi
    const definitions = openapi.get('definitions')
    const definition = definitions.find((def, name) => {
        return name === params.definition
    })

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
