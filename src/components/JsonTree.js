import React, {Link} from 'react'
import {Map, List} from 'immutable'

export const JSONTree = ({data}) => {
    return (
        <div className="json-tree">
            {switchComponent(data, true)}
        </div>
    )
}

const switchComponent = (data, root = false, last = false) => {
    if (Map.isMap(data)) {
        return <ObjectComponent data={data} root={root} last={last}/>
    } else if (List.isList(data)) {
        return <ArrayComponent data={data} root={root} last={last}/>
    } else if (typeof(data) === 'string') {
        return <span className="string-value">{`"${data}"`}</span>
    } else if (typeof(data) === 'number') {
        return <span className="number-value">{data}</span>
    } else if (typeof(data) === 'boolean') {
        return <span className="boolean-value">{data ? 'true' : 'false'}</span>
    }

    return <span>{data}</span>
}

const ObjectComponent = ({data, root = false, last = false}) => {
    const leftBracket = '{'
    const leftArrayBracket = '['
    const rightBracket = '}'

    let idx = 0

    let isSchema = false
    let ref = null

    data.map((v, k) => {
        if (k === '_schema') {
            isSchema = true
            ref = v
        }
    })

    if (data.size === 1 && isSchema) {
        return <LinkToDefinition schemaRef={ref}/>
    }

    return (
        <div className="object">
            <span>{root && !(data.size === 1 && isSchema) && leftBracket}</span>
            <div className="content">
            {
                data.map((v, k) => {
                    idx++
                    const childNode = switchComponent(v, false, idx >= data.size)
                    const isObject = childNode.type.name && childNode.type.name === 'ObjectComponent'
                    const isArray = childNode.type.name && childNode.type.name === 'ArrayComponent'

                    if (k === '_schema') {
                        return <LinkToDefinition key={`${k}-${idx}`} schemaRef={v} />
                    }

                    let childIsSchema = false

                    if (typeof v === 'object' && v.size === 1 && v.get('_schema')) {
                        childIsSchema = true
                    }

                    return (
                        <div key={`${k}-${idx}`} className="field">
                            <span className="string-key">"{k}": </span>
                            {isObject && !childIsSchema && leftBracket}
                            {isArray && leftArrayBracket}
                            {childNode}
                            {idx < data.size && !isObject && !isArray && ','}
                        </div>
                    )
                }).toList().toJS()
            }
            </div>
            <span>{rightBracket}{!last && !root && ','}</span>
        </div>
    )
}

const ArrayComponent = ({data, root = false, last = false}) => {
    const leftBracket = '['
    const rightBracket = ']'


    return (
        <div className="object">
            <span>{root && leftBracket}</span>
            <div className="content">
            {
                data.map((v, idx) => {
                    idx++
                    const childNode = switchComponent(v, true, idx >= data.size)

                    return (
                        <div key={idx} className="field">
                            {childNode}
                            {idx < data.size && ','}
                        </div>
                    )
                })
            }
            </div>
            <span>{rightBracket}{!last && !root && ','}</span>
        </div>
    )
}

const LinkToDefinition = ({schemaRef}) => {
    const url = schemaRef.substring(1)
    const displayName = schemaRef.split('/')[2]
    return (
        <a href={url} className="link-object">
            {`${displayName}`}
        </a>
    )
}
