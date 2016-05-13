import React from 'react';
import Code from './Code';
import {openapi} from '../objects';
import { Table, Tr, Td, Th, Thead} from 'reactable';

/* *** Parameter Component *** */
export default React.createClass({
  	render() {

  		/* create the Parameters Table if needed */
  		const path = this.props.path;
  		const params = path.object.parameters;
  		const rows = [];
		if( params != null){
	  		for( const i in params){
	  			const ref = params[i]["$ref"].substring(13);
	  			const parameter =  openapi["parameters"][ref];
	  			const list = {}
				list["name"]= parameter["name"]
				list["required"]= parameter["required"]
				list["description"] = parameter["description"] 
				list["type"] = parameter["type"] 
				const key = parseInt(i)+1;
				const row =  <Tr   key={key}  data={list} />
				rows.push( row );
	  		}
		}

	    return (
	      	<div>
			<h2 > Parameters </h2>

			<div className="tableCard">
	        	<Table className="table" id="table" style={{ width: '100%', textAlign:'left' }}>
			        <Thead>
			          <Th column="name" style={{ width: '20%' }} >
			            <strong>Name</strong>
			          </Th>
			          <Th column="type" style={{ width: '15%' }}>
			            <em>Type</em>
			          </Th>
			           <Th column="required" style={{ width: '15%' }}>
			            <em>Required</em>
			          </Th>
			          <Th column="description" style={{ width: '50%' }}>
			            <em>Description</em>
			          </Th>
			         
			        </Thead>
			        {rows}
			    </Table>
			</div>
		
		    </div>
	    )
  	}
})

