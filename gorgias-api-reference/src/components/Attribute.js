import React from 'react';
import _ from 'underscore';
import {openapi} from '../objects';
import { Table, Tr, Td, Th, Thead} from 'reactable';
import { Link } from 'react-router';

/*  Attribute Component  */
export default class Attribute extends React.Component {
  	render() {

  		/*  array 'rows' containing a row component for each property for the current object (tag or definition)  */
  		const rows = [];
  		let Inside;
  		const name  = this.props.name;
  		if( openapi["definitions"][name] != null ){

	  		const object = openapi["definitions"][name];
	  		const properties = object["properties"];
	  		let required =[];
	  		if( object["required"] ){
	  			required = object["required"];
	  		}
			for(const property in properties ) {
				let type = properties[property]["type"] ;
				if( type == null & properties[property]["$ref"]  != null ){
					const objectName = properties[property]["$ref"].replace("#/definitions/", "");
					const path = "/".concat(objectName.toLowerCase());
					type = <Link to={path}>{objectName}</Link>;
				}
				let isRequired = false;
				if( _.contains(required, property)){
					isRequired = true;
				}
				if( type == "array" & properties[property]["items"] != null ){ 
					if(  properties[property]["items"]["$ref"] != null ){ 
						const objectName = properties[property]["items"]["$ref"].replace("#/definitions/", "");
						const path = "/".concat(objectName.toLowerCase());
						const link = <Link to={path}>{objectName}</Link>;
						const type = <span>array of {link} </span>;
					}
					if(  properties[property]["items"]["type"] != null ){ 
						type = "array (of ".concat(properties[property]["items"]["type"], ")");
					}
				} 
				const description = properties[property]["description"] ;
				const list = {} ;
				list["name"]= property ;
				list["type"]= type ;
				list["description"] = description ;
				list["required"] = isRequired ;
				const key = property;
				const row =  <Tr key={key}  data={list} />
				rows.push( row );
			} 

			Inside = (
				<div>
				<h2> {name} Attributes : </h2> 
				<div className="tableCard">
        		{/*  Table for the Attributes of the object  */}
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
		    	</div>
		    );
		}

  		return (
  			<div>
  				{Inside}
		    </div>
        )
  	}
}
