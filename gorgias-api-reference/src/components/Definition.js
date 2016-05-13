import React from 'react';
import _ from 'underscore';
import Attribute  from './Attribute';

/* ***  Definition Component *** */
export default React.createClass({

  render() {

    return (
      <div className="main ">

        <div className="Grid">

          	{/* *** Left Column *** */}
            <div className="Grid-left ">
              	<div className="Grid-inside">     	
	            	
	            	  {/* *** Description *** */}
	                <h1> {this.props.definitionName} </h1>
	                <p> We define in plain english the object ... (define precisely what is the object)</p>
	               
	                {/* *** Attributes *** */}
	                <h2> {this.props.definitionName} Attributes : </h2> 
	                <Attribute name = {this.props.definitionName} />

	              </div>
            </div>

       		  {/* *** Right Column *** */}
            <div className="Grid-right">
            </div>

        </div>


      </div>
    )

  }
})

