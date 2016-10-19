import React from 'react'

export const Authentication = () => (
    <div className="Grid">

        {/*  Left Column  */}
        <div className="Grid-left">
            <div className="Grid-inside">
                {/*  Description  */}
                <h1> Authentication </h1>
                <p>
                    There is several ways to authenticate your requests to the Gorgias API.
                </p>

                <h3>Basic authentication</h3>
                <p>
                    You can authenticate to Gorgias using regular HTTP Basic authentication, by including the
                    <span className="code light inline">Authorization</span> header in your request:
                </p>
                <div className="code light">
                    Authorization: Basic YWRtaW5AZ29yZ2lhcy5pbzphZG1pbg==
                </div>
                <p>
                    with <span className="code light inline">YWRtaW5AZ29yZ2lhcy5pbzphZG1pbg==</span> being the string
                    `username:password` encoded in base64.<br/><br/>

                    Though, this method is not recommended and should never be used, as it's sending your password
                    without encryption at each request.
                </p>

                <h3>API Key authentication</h3>
                <p>
                    The recommended method of authentication for using the API is to use API keys. You can find your
                    account's API keys on your Gorgias helpdesk,
                    in <span className="code light inline">Settings > API Keys</span>.<br/><br/>

                    Using an API Key for authentication is as easy as using Basic authentication: actually, it uses the
                    same process (HTTP Basic authentication), but with your email as username, and the API Key as
                    password.<br/><br/>

                    In <span className="code light inline">Settings > API Keys</span>, you can manage your API Keys,
                    e.g. create new API Keys or delete existing ones. We really encourage you to delete any API Key
                    you think may have been compromised, and to replace them frequently.

                    {/*
                    Moreover, you can assign "rights" to your key: only assign what you need, as it would really mitigate
                    the eventual consequences of a compromised API Key.
                    */}
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
