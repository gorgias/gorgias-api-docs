import React from 'react'
import {Link} from 'react-router'
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
        if (!!data.size) {
            return <ObjectComponent data={data} root={root} last={last}/>
        }

        return <span className="empty-object">{'{}'}</span>
    } else if (List.isList(data)) {
        if (data.size) {
            return <ArrayComponent data={data} root={root} last={last}/>
        }

        return <span className="empty-array">{'[]'}</span>
    } else if (typeof(data) === 'string') {
        return <span className="string-value">{`"${data}"`}</span>
    } else if (typeof(data) === 'number') {
        return <span className="number-value">{data}</span>
    } else if (typeof(data) === 'boolean') {
        return <span className="boolean-value">{data ? 'true' : 'false'}</span>
    } else if (!data) {
        return <span className="null-value">null</span>
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
        if (k == '_schema') {
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

                    if (k == '_schema') {
                        return <LinkToDefinition key={`${k}-${idx}`} schemaRef={v} />
                    }

                    let childIsSchema = false

                    if (v && typeof v === 'object' && v.size === 1 && v.get('_schema')) {
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
        <Link to={url} className="link-object">
            {`${displayName}`}
        </Link>
    )
}
