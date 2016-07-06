import React from 'react'
import {fromJS} from 'immutable'
import data from '../../data/openapi.json'
const openapi = fromJS(data)

export const Responses = ({responses}) => {
  return (
    <div>

    {
      responses.map((response, status) => (
          <Response key={status} response={response} status={status} />
      )).toList()
    }

    </div>
  )
}

const Response = ({response, status}) => {
    var schema = response.get('schema')
    var props = null

    if (!schema) {
      return null
    }

    if (schema.get('$ref')) {
      props = openapi.getIn(['definitions', schema.get('$ref').replace('#/definitions/', ''), 'properties'])
    }

    return (
        <div>
          <h3 className="content-block-request-title">
            Response (status: {status})
          </h3>

          {props ? <ResponseTable properties={props} /> : null}

        </div>
    )
}

const ResponseTable = ({properties}) => {
    return (
        <table>
            <tbody>
              {
                properties.map((a, b) => (
                  <ResponseTableRow a={a} b={b} key={b}  />
                )).toList()
              }
            </tbody>
        </table>
    )
}

const ResponseTableRow = ({a,b}) => {
    return (
        <tr>
            <td>{b}</td>
            <td>{a.get('type')}</td>
        </tr>
    )
}
