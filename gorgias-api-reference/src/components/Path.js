import React from 'react';
import Code from './Code';
import {openapi} from '../objects';
import Parameter from './Parameter';
import { Table, Tr, Td, Th, Thead} from 'reactable';

/* *** Path Component *** */
export default class Path extends React.Component {

  	render() {

  		const path = this.props.path ;
  		const summary = path.object.summary;
        const description = path.object.description;
  		const verb = path.verb ;
  		const status = path.responseStatus;
  		const responseExample  = path.responseExample;
        const response = path.object.responses[status];
        let Parameters ;
  		const params = path.object.parameters;
		if( params != null){
			Parameters = <Parameter path= {this.props.path} />
		}

	    return (
	      	<div className="Grid">
	      	{/* *** Left Column *** */}
            <div className="Grid-left">
            	<div className="Grid-inside"> 

	            	{/* *** description *** */}
	            	<div>
		                <h1>{summary}</h1>
		                <p>{description}</p>
	                </div>

	                {/* *** request *** */}
	                <div>
		            <h2>HTTP Request</h2>
		            <div className="code request">  {verb} &nbsp; {path.endpoint} </div>
	                </div>

	                {/* ***  Parameters (if needed) *** */}
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

