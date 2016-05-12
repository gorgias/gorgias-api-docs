import React from 'react';
import {openapi} from '../objects';
import _ from 'underscore';
import { Table, Tr, Td, Th, Thead} from 'reactable';
import { Link } from 'react-router';

/* *** Attribute Component *** */
export class Attribute extends React.Component {
  	render() {

  		/* *** array 'rows' containing a row component for each property for the current object (tag or definition) *** */
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
				var objectName = properties[property]["$ref"].substring(14);
				var path = objectName.toLowerCase();
				path = "/".concat(path);
				type = <Link to={path}>{objectName}</Link>;
			}
			var isRequired = false;
			if( _.contains(required, property)){
				isRequired = true;
			}
			if( type == "array" & properties[property]["items"] != null ){ 
				if(  properties[property]["items"]["$ref"] != null ){ 
					var objectName = properties[property]["items"]["$ref"].substring(14);
					var path = objectName.toLowerCase();
					path = "/".concat(path);
					var link = <Link to={path}>{objectName}</Link>;
					var type = <span>array of {link} </span>;
				}
				if(  properties[property]["items"]["type"] != null ){ 
					type = "array (of ".concat(properties[property]["items"]["type"], ")");
				}
			} 
			var description = properties[property]["description"] ;
			var list = {} ;
			list["name"]= property ;
			list["type"]= type ;
			list["description"] = description ;
			list["required"] = isRequired ;
			var key = property;
			var row =  <Tr key={key}  data={list} />
			rows.push( row );
		} 
		
  		return (

            <div className="tableCard">
        		{/* *** Table for the Attributes of the object *** */}
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
