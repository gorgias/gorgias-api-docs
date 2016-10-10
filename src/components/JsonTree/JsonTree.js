import React, {Link} from 'react'
import {Map, List} from 'immutable'

const OBJECT_TYPES = ['ObjectComponent', 'ArrayComponent']

export const JSONTree = ({data}) => {
    return switchComponent(data, true)
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

    return (
        <div className="object">
            <span>{root && leftBracket}</span>
            <div className="content">
            {
                data.map((v, k) => {
                    idx++
                    const childNode = switchComponent(v, false, idx >= data.size)
                    const isObject = childNode.type.name && childNode.type.name === 'ObjectComponent'
                    const isArray = childNode.type.name && childNode.type.name === 'ArrayComponent'

                    if (k === '_schema') {
                        return <LinkToDefinition schemaRef={v} />
                    }

                    return (
                        <div className="field">
                            <span>"{k}": </span>{isObject && leftBracket}{isArray && leftArrayBracket}
                            {childNode}
                            {idx < data.size && !isObject && !isArray && ','}
                        </div>
                    )
                })
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
        <a className="link-comment" href={url}>
            {`// Go to definition of ${displayName}`}
        </a>
    )
}