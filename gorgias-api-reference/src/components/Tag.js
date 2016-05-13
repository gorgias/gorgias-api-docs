import React from 'react';
import Path from './Path';
import { tags, examplesList, openapi } from '../objects';
import Attribute  from './Attribute';
import Code from './Code';
import _ from 'underscore';

/* ***  Tag  Component *** */
export default React.createClass({

  render() {

    const example = JSON.stringify(examplesList[this.props.tagName],null, 2);
    let Example ;
    if( openapi["definitions"][this.props.tagName] != null ){
      Example = (
        <div>
          <h3 className="text-right">Example</h3> 
          <Code className="code" value= {example} />
        </div>
      )
    }

    /* obtain the array tagPaths containing all the Paths (endpoint+verb) for a specific tag  */
    const tagName = this.props.tagName ;
    const tag = _.findWhere(tags, {tagName:tagName});
    const tagPaths = tag["tagPaths"];
   
    /* create the array PathBoxes containing the PathBox Component for each tag */
    const Paths = [];
    for(const i in tagPaths ) {
        const key = parseInt(i)+1;
        Paths.push( <Path key={key} path= { tagPaths[i] } />);
    }


    return (
      <div className="main">

          <div className="Grid">
          {/* *** first block *** */}
            <div className="Grid-left ">
                <div className="Grid-inside">       
                  <h1> {this.props.tagName} </h1>
                  <p> We define in plain english the object ... (define precisely what is the object)</p>
                </div>
            </div>
            <div className="Grid-right">
            </div>

            {/* *** second block *** */}
            <div className="Grid-left ">
                <div className="Grid-inside">    
                  <Attribute name = {this.props.tagName} />
                </div>
            </div>
            <div className="Grid-right">
                <div className="Grid-inside">  
                  {Example}
                </div>
            </div>
            </div>

          {/* *** PATHS *** */}
          {Paths}

      </div>
    )
  }
})

