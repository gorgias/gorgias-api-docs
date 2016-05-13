import React from 'react';
import _ from 'underscore';
import Attribute  from './Attribute';
import Code from './Code';
import {examplesList, openapi} from '../objects';

/* ***  Definition Component *** */
export default class Definition extends React.Component {

  render() {

    const example = JSON.stringify(examplesList[this.props.definitionName],null, 2);
    let Example ;
    if( openapi["definitions"][this.props.definitionName] != null ){
      Example = (
        <div>
          <h3 className="text-right">Example</h3> 
          <Code className="code" value= {example} />
        </div>
      )
    }

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
                  {Example}
                </div>
            </div>

        </div>
      </div>
    )

  }
}

