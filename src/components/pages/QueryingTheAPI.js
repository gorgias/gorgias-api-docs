import React from 'react'
import {Code} from './../../utils'

export const QueryingTheAPI = () => (
    <div className="Grid">

        {/*  Left Column  */}
        <div className="Grid-left">
            <div className="Grid-inside">
                {/*  Description  */}
                <h1> Querying the API </h1>

                <h3>Sending data in the body</h3>
                <p>
                    When sending data in the body, you must send it as <Code light inline>JSON</Code>
                    (with the header <Code light inline>Content-type</Code> set at
                    <Code light inline>application/json</Code>).<br/><br/>

                    For now (and it probably won't change), we don't accept
                    <Code light inline>text/xml</Code> nor <Code light inline>multipart/form-data</Code> content types.
                </p>

                <h3>Partial updates</h3>
                <p>
                    When doing updates on objects (i.e. <Code light inline>PUT /api/tickets/{'{ticket_id}'}/</Code>),
                    you don't have to send all the data; actually, it's actually better if you don't. Just send the
                    fields you want to modify: it will avoid conflicts if other fields of the object has been modified
                    since you last fetched it, in addition of reducing the size of the request, therefore improving the
                    performances of the API.
                </p>

                <h3>Nested objects</h3>
                <p>
                    When creating or updating an object, if your payload includes nested objects, you must be
                    careful.<br/><br/>

                    If you just want to reference an object, only include its <Code light inline>id</Code>. If you
                    include any other field, it will <b>update the object</b>. You can do it; however, don't do it by
                    mistakes: it may erase previous modifications made by other users, other scripts, or the rules of
                    your account.<br/><br/>

                    When including a nested <Code light inline>User</Code> in an object, if you want to reference it but
                    don't have it's <Code light inline>id</Code>, you can instead include it's email address. If the
                    user is not found, a new user will be created with this email address, and it's
                    <Code light inline>id</Code> will be returned with the response to your request.
                </p>
            </div>
        </div>

        {/*  Right Column  */}
        <div className="Grid-right">
            <div className="Grid-inside">
            </div>
        </div>

    </div>
)
