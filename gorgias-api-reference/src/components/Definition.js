import React from 'react';
import _ from 'underscore';
import Attribute  from './Attribute';
import Code from './Code';
import {examplesList} from '../objects';

/* ***  Definition Component *** */
export default React.createClass({

  render() {

    const example = JSON.stringify(examplesList[this.props.definitionName],null, 2);

    return (
      <div className="main ">
        <div className="Grid">

            {/* *** first block *** */}
            <div className="Grid-left ">
              	<div className="Grid-inside">     	
	                <h1> {this.props.definitionName} </h1>
	                <p> We define in plain english the object ... (define precisely what is the object)</p>
	              </div>
            </div>
            <div className="Grid-right">
            </div>

            {/* *** second block *** */}
            <div className="Grid-left ">
                <div className="Grid-inside">    
                  <Attribute name = {this.props.definitionName} />
                </div>
            </div>
            <div className="Grid-right">
                <div className="Grid-inside">  
                  <h3 className="text-right">Example</h3> 
                  <Code className="code" value={ example } />
                </div>
            </div>

        </div>
      </div>
    )

  }
})

