import React from 'react'

export const Index = () => (
    <div className="Grid">

        {/*  Left Column  */}
        <div className="Grid-left">
            <div className="Grid-inside">
                {/*  Description  */}
                <h1> API Reference </h1>
                <p>
                    The Gorgias API is organized around REST. Our API has predictable, resource-oriented
                    URLs, and uses HTTP response codes to indicate API errors. We use built-in HTTP
                    features, like HTTP authentication and HTTP verbs, which are understood by off-the-shelf
                    HTTP clients. We support cross-origin resource sharing, allowing you to interact
                    securely with our API from a client-side web application (though you should never expose
                    your secret API key in any public website&#39;s client-side code). JSON is returned by all
                    API responses, including errors, although our API libraries convert responses to
                    appropriate language-specific objects.
                </p>
                <p>
                    To make the API as explorable as possible, accounts have test mode and live mode API
                    keys. There is no "switch" for changing between modes, just use the appropriate key to
                    perform a live or test transaction. Requests made with test mode credentials never hit
                    the banking networks and incur no cost.
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
