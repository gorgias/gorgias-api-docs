import React from 'react';
import Card  from './Card';
import Code from './Code';
import Column from './Column';
import openapi from '../openapi_json';
import { examples } from '../reformat_json';
import _ from 'underscore';
import { Table, Tr, Td, Th, Thead} from 'reactable';


/* define Center Box  */
class CenterColumnBox extends React.Component {
    render() {
        return (
            <Column className="columnCenter">

                <Card style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px' }}>
                    {this.props.children}
                </Card>

            </Column>
        )
    }
}

/* define Right Box  */
class RightColumnBox extends React.Component {
    render() {
        return (
            <Column className="columnRight" > 

                <Card style={{ background: 'transparent', marginTop: 10, boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px' }} >
                  {this.props.children}              
                </Card>

            </Column>
        )
     }
}

/* define Description Box : at the top of the Tag Component */
export class DescriptionBox extends React.Component {
  	render() {

  		var tagName = this.props.tagName ;
  		var properties = openapi["definitions"][tagName]["properties"];

  		/* create an array containing a Row component for each property for the current tag (=object) */
		var rows = [];
		for(var i in properties ) {
			var name = i;
			var type = properties[i]["type"] ;
			var description = properties[i]["description"] ;
			var list = {}
			list["name"]= name
			list["type"]= type
			list["description"] = description
			var row =  <Tr  data={list} />
			rows.push( row );
		}

	    return (
	      <div>

	        <CenterColumnBox> 
	            <div style={{  marginBottom: 30 }}> 
	                <h1 style={{  fontSize: '24px', marginTop: 0, marginBottom: 5 }}> {this.props.tagName} </h1>
	                  <p>
	                     We define in plain english the object ... (define precisely what is the object)
	                  </p>
	            </div>
	        </CenterColumnBox>

	        <RightColumnBox> 

	        	<p style={{ marginTop: 0,  color: '#d0d4d7' }}> Specifications :  </p> 

	        	<Card style={{ background: '#fafcfc', marginBottom: 10,padding: '5px 10px', fontSize: '13px'}} >

	        		{/* create a Table for the specifications of the object */}
		        	<Table className="table" id="table" style={{ width: '100%', textAlign:'left' }}>
				        <Thead>
				          <Th column="name" style={{ width: '25%' }} >
				            <strong>Name</strong>
				          </Th>
				          <Th column="type" style={{ width: '15%' }}>
				            <em>Type</em>
				          </Th>
				          <Th column="description" style={{ width: '60%' }}>
				            <em>Description</em>
				          </Th>
				        </Thead>
				        {rows}
				    </Table>

			    </Card>

	        </RightColumnBox>

	      </div>
	    )
  	}
}

/* define Path Box : for a specific path of a specific tag (= object) */
export class PathBox extends React.Component {
  	render() {

  		/* create the Paramteres Table if needed */
  		var params = this.props.path.object.parameters;
  		var Parameters;
		if( params != null){
			console.log( "params" )
			console.log( params )
			
	  		var rows = [];
	  		for( var i in params){
	  			var ref = params[i]["$ref"]
	  			ref = ref.substring(13);
	  			var parameter =  openapi["parameters"][ref];
	  			console.log( "parameter" )
	  			console.log( parameter )
	  			var list = {}
				list["name"]= parameter["name"]
				list["required"]= parameter["required"]
				list["description"] = parameter["description"] 
				list["type"] = parameter["type"] 
				var row =  <Tr  data={list} />
				rows.push( row );
	  		}
			

			Parameters = <div>
						<h2 style={{ fontSize: '17px'}} >
		                	Parameters
		                </h2>
		                <Card style={{ background: '#fafcfc', marginBottom: 10,padding: '5px 10px', fontSize: '13px'}} >
			        		{/* create a Table for the specifications of the parameters */}
				        	<Table className="table" id="table" style={{ width: '100%', textAlign:'left' }}>
						        <Thead>
						          <Th column="name" style={{ width: '20%' }} >
						            <strong>Parameter</strong>
						          </Th>
						          <Th column="type" style={{ width: '15%' }}>
						            <em>Type</em>
						          </Th>
						          <Th column="description" style={{ width: '50%' }}>
						            <em>Description</em>
						          </Th>
						          <Th column="required" style={{ width: '15%' }}>
						            <em>Required</em>
						          </Th>
						        </Thead>
						        {rows}
						    </Table>
					    </Card>
					    </div>
		}


  		/* create the responseExample for the Path*/
  		var path = this.props.path ;
  		var summary = path.object.summary;
        var description = path.object.description;
  		var verb = path.verb ;
  		var status;
  		switch(verb){
  			case "get":
  				status = "200";
  				break;
  			case "post":
  				status = "201";
  				break;
  			case "put":
  				status = "202";
  				break;
  			case "delete":
  				status = "204";
  				break;
  		}
  		verb = verb.toUpperCase();
        var request = verb.concat('  ', path.endpoint );
        var response = path["object"]["responses"][status];
        var schema = response["schema"];
        var responseExample ;
        if( schema != null ){
        	if( schema["type"] == "array"){
        		var insideString = schema["items"]["$ref"];
        		insideString = insideString.substring(14);
        		console.log("insideString");
        		console.log(insideString);
        		insideString = _.findWhere(examples, {objectName:insideString}); /*  TO FINISH !! */
        		insideString = insideString["example"];
        		var responseString = JSON.stringify(insideString,null, 3);
        		responseExample =  "[".concat(responseString, ",\n...\n]");
        	}
        	else{
        		var responseString = schema["$ref"];
        		responseString = responseString.substring(14); 
        		responseString = _.findWhere(examples, {objectName:responseString});  /*  TO FINISH !! */
        		responseString = responseString["example"];
        		responseExample = JSON.stringify(responseString,null, 3);
        	}
        	
        }
        else{
        	responseExample = JSON.stringify(response["description"] ,null, 3);
        }

	    return (
	      <div >

	      	{/* define Center Box */}
	        <CenterColumnBox> 
	            <div> 
	            	{/* description of the path */}
	            	<div style={{  marginBottom: 30 }} >
		                <h1 style={{ fontSize: '24px'}} >
		                	{summary}
		                </h1>
		                <p>
		                 	{description}
		                </p>
	                </div>

	                {/* description of the request */}
	                <div >
		                <h2 style={{ fontSize: '17px'}} >
		                	HTTP Request
		                </h2>
		                <p>
		                	<Card style={{ background: '#fafcfc', padding: '1px 40px', fontSize: '13px'}} >
			                  <Code style={{ background: '#fafcfc', color: 'black' }} value={request} />
			              	</Card>
		                </p>
	                </div>

	                {/* description of the parameters if needed */}
	                {Parameters}

	                {/* description of the body if needed 

						... to complete ...

	                */}

	            </div>
	        </CenterColumnBox>

	        <RightColumnBox> 
		        	{/* description of call (curl, or other scripting language)

							...
							(to do later)

		            */}
		            <p style={{ marginTop: 10,  color: '#d0d4d7' }}> Response Example ( status :  {status} )  </p> 
		            <Card style={{ background: '#282b2c', marginBottom: 250,padding: '1px 40px', fontSize: '13px'}} >
		                <Code style={{ background: '#282b2c' }} value={responseExample} />
		            </Card>
	        	
	        </RightColumnBox>

	      </div>
	    )
  	}
}

