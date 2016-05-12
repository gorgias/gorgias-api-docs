import React from 'react';
import Code from './Code';
import {openapi} from '../objects';
import { Table, Tr, Td, Th, Thead} from 'reactable';

/* *** Parameter Component *** */
export class Parameter extends React.Component {
  	render() {

  		/* create the Parameters Table if needed */
  		const path = this.props.path;
  		const params = path.object.parameters;
  		var Parameters;
		if( params != null){
			
	  		var rows = [];
	  		for( var i in params){
	  			var ref = params[i]["$ref"]
	  			ref = ref.substring(13);
	  			var parameter =  openapi["parameters"][ref];
	  			var list = {}
				list["name"]= parameter["name"]
				list["required"]= parameter["required"]
				list["description"] = parameter["description"] 
				list["type"] = parameter["type"] 
				var key = parseInt(i)+1;
				var row =  <Tr   key={key}  data={list} />
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
}

