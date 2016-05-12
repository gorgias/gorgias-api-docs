import React from 'react';
import Code from './Code';
import openapi from '../openapi_json';
import { Parameter } from './Parameter';
import { Table, Tr, Td, Th, Thead} from 'reactable';

/* *** Path Component *** */
export class Path extends React.Component {
  	render() {

  		const path = this.props.path ;
  		const summary = path.object.summary;
        const description = path.object.description;
  		const verb = path.verb ;
  		const status = path.responseStatus;
  		const responseExample  = path.responseExample;
        const request = verb.concat('  ', path.endpoint );
        const response = path.object.responses[status];

        var Parameters ;
  		const params = path.object.parameters;
		if( params != null){
			Parameters = <Parameter path= {this.props.path} />
		}

	    return (
	      	<div className="Grid">
	      	{/* *** Left Column *** */}
            <div className="Grid-left">
            	<div className="Grid-inside"> 

	            	{/* description of the path */}
	            	<div>
		                <h1>{summary}</h1>
		                <p>{description}</p>
	                </div>

	                {/* description of the request */}
	                <div>
		                <h2>HTTP Request</h2>
		                <Code className="code request" value={request} />
	                </div>

	                {/* ***  Parameters if needed *** */}
	                {Parameters}

	            </div> 
	        </div>

	        {/* *** Right Column *** */}
            <div className="Grid-right">
            	<div className="Grid-inside">

            		<h3 className="text-right"> Example Response ( status :  {status} )  </h3> 
		            <Code className="code" value={responseExample} />
	        	
	        	</div>
	       </div>

	       </div>
	    )
  	}
}

