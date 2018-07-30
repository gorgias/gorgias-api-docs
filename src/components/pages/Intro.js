import React from 'react'
import {Code} from "../../utils";

export const Intro = () => (
    <div id="intro" className="section">
        <div className="wrap">
            {/*  Left Column  */}
            <div className="column left">
                {/*  Description  */}
                <h1>API Reference</h1>
                <p>
                    <a href="https://gorgias.io/">Gorgias</a> API is structured with <a
                    href="http://en.wikipedia.org/wiki/Representational_State_Transfer">REST</a> in mind.
                    REST means that our API is resource-oriented (unique URLs per resource), we use standard
                    HTTP response codes to indicate API errors and standard HTTP verbs (GET, POST, PUT and DELETE)
                    to perform operations on those resources.
                </p>
                <p>
                    On this page you'll find the complete REST API reference, examples, definitions of objects and
                    tutorials. FYI: We're using the same REST API as described here to power our own helpdesk interface.
                </p>
                <p>
                    Also, in the <Code light inline>Settings > REST API</Code> page of your helpdesk, you will find
                    a button to subscribe to our Developer newsletter. Please do so if you start using our API, as it
                    contains important updates about <b>upcoming changes and breaking changes to the API</b>.
                </p>
            </div>

            {/*  Right Column  */}
            <div className="column right">

            </div>
        </div>
    </div>
)
