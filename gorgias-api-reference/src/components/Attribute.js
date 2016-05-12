import React from 'react';
import openapi from '../openapi_json';
import _ from 'underscore';
import { Table, Tr, Td, Th, Thead} from 'reactable';


/* *** Attribute Component *** */
export class Attribute extends React.Component {
  	render() {

  		/* create an array 'rows' containing a row component for each property for the current object (tag or definition) */
  		var rows = [];
  		var name  = this.props.name;
  		var object = openapi["definitions"][name];
  		var properties = object["properties"];
  		var required = [];
  		if( object["required"] ){
  			required = object["required"];
  		}
		for(var property in properties ) {
			var type = properties[property]["type"] ;
			if( type == null & properties[property]["$ref"]  != null ){
				type = properties[property]["$ref"].substring(14);
			}
			var isRequired = false;
			if( _.contains(required, property)){
				isRequired = true;
			}
			if( type == "array" & properties[property]["items"] != null ){ 
				if(  properties[property]["items"]["$ref"] != null ){ 
					type = "array (of ".concat(properties[property]["items"]["$ref"].substring(14), ")");
				}
				if(  properties[property]["items"]["type"] != null ){ 
					type = "array (of ".concat(properties[property]["items"]["type"].substring(14), ")");
				}
			} 
			var description = properties[property]["description"] ;
			var list = {} ;
			list["name"]= property ;
			list["type"]= type ;
			list["description"] = description ;
			list["required"] = isRequired ;
			var row =  <Tr  data={list} />
			rows.push( row );
		} 
		
  		return (

            <div className="tableCard">
        		{/* create a Table for the specifications of the object */}
	        	<Table className="table" id="table" style={{ width: '100%', textAlign:'left' }}>
			        <Thead>
			          <Th column="name" style={{ width: '25%' }} >
			            <strong>Name</strong>
			          </Th>
			          <Th column="type" style={{ width: '25%' }}>
			            <em>Type</em>
			          </Th>
			          <Th column="required" style={{ width: '15%' }}>
			            <em>Required</em>
			          </Th>
			          <Th column="description" style={{ width: '35%' }}>
			            <em>Description</em>
			          </Th>
			        </Thead>
			        {rows}
			    </Table>
		    </div>
        )
  	}
}
