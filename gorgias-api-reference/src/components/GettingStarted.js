import React, { Component } from 'react';
import Card  from './Card';
import Code from './Code';
import Column from './Column';

const codeExample = `https://yourcompanyname.gorgias.com/api/`;

/*
export default class Home extends Component {
  render() {
    return (
      <div style={{ marginTop: -20 }}>
        <p>
          This is the documentation of the Gorgias API.
        </p>
        <p>
          All of the <b>objects</b> are listed on the left.
          Click on on object to show all the endpoints about a specific object.
        </p>
      </div>
    );
  }
}
*/

export default class GettingStarted extends Component {
  render() {
    return (
      <div>
        <Column
            smallScreenStyle={{ width: '96%', margin: '0 auto' }}
            mediumScreenStyle={{  }}
            className="columnCenter"
          >
            <Card style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px' }}>

                <div style={{  marginBottom: 100 }}>
                <h1 style={{  fontSize: '24px', marginTop: 0, marginBottom: 10 }}>API Reference</h1>
                <p>
					The Gorgias API is organized around REST. Our API has predictable, resource-oriented URLs, and uses HTTP response codes to indicate API errors. We use built-in HTTP features, like HTTP authentication and HTTP verbs, which are understood by off-the-shelf HTTP clients. We support cross-origin resource sharing, allowing you to interact securely with our API from a client-side web application (though you should never expose your secret API key in any public website's client-side code). JSON is returned by all API responses, including errors, although our API libraries convert responses to appropriate language-specific objects.
				</p>
				<p>	
					To make the API as explorable as possible, accounts have test mode and live mode API keys. There is no "switch" for changing between modes, just use the appropriate key to perform a live or test transaction. Requests made with test mode credentials never hit the banking networks and incur no cost.
                </p>
                </div>

            </Card>

        </Column>
        <Column
            smallScreenStyle={{ width: '96%', margin: '0 auto' }}
            mediumScreenStyle={{  }}
            className="columnRight"
        > 
          
           	<Card style={{ background: 'transparent', marginTop: 10, boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px' }} >
                
              <p style={{ marginTop: 0, marginBottom: 8, color: '#d0d4d7' }}>API Endpoint</p> 
              <Card style={{ background: '#282b2c', padding: '1px 40px', fontSize: '13px'}} >
                  <Code style={{ background: '#282b2c' }} value={ codeExample } />
              </Card >
            
            </Card >

        </Column>
      </div>
    );
  }
}
