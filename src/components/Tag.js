import React from 'react'
import {Properties} from './Properties'
import {Path} from './Path'

// A Tag groups a list of Paths
export const Tag = ({params}) => {
    const openapi = window.openapi
    const tags = openapi.get('tags')
    const tag = tags.find((tag) => tag.get('name') === params.tag)

    const definitions = openapi.get('definitions')
    const definition = definitions.find((def, name) => name === tag.get('name'))

    // Find all paths that match our tag
    const paths = openapi.get('paths').filter((verbs, uri) => {
        // Ex: {'/api/user': ['get': {tags: ['User']}, 'post': ..]}
        return !!verbs.find((v, name) => v.get('tags').includes(tag.get('name')))
    })

    return (
        <div className="Grid">
            {/*  first block  */}
            <div className="Grid-left">
                <div className="Grid-inside">
                    <h1>{tag.get('name')}</h1>
                    <p>{tag.get('description')}</p>
                    {
                        !!definition && (
                            <p>{definition.get('description')}</p>
                        )
                    }
                    <Properties name={tag.get('name')} definition={definition}/>
                </div>
            </div>
            <div className="Grid-right"></div>
            {
                paths.map((verbs, uri) => (
                    <Path key={uri} verbs={verbs} uri={uri}/>
                )).toList()
            }
        </div>
    )
}
