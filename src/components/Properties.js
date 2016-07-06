import React from 'react'

const Property = ({prop, name, required}) => {
    return (
        <tr>
            <td>
                <code className="properties-table-name">
                    {name}
                </code>

                {required && required.includes(name) ? (
                    <span className="properties-table-required">REQUIRED</span>
                ) : null}
            </td>
            <td>
                <span className="properties-table-type">
                    {prop.get('type')}
                </span>

                { prop.get('description') ? (
                    <p>
                        {prop.get('description')}
                    </p>
                ) : null }
            </td>
        </tr>
    )
}

export const Properties = ({name, definition}) => {
    if (!definition) {
        return null
    }

    return (
        <div className="properties">
            <h2 className="properties-title">
                {name} attributes
            </h2>
            <table className="properties-table">
                <tbody>
                {
                    definition.get('properties').map((prop, name) => (
                        <Property key={name} prop={prop} name={name} required={definition.get('required')}/>
                    )).toList()
                }
                </tbody>
            </table>
        </div>
    )
}
