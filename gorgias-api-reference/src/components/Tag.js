import React from 'react';
import Path from './Path';
import { tags } from '../objects';
import Attribute  from './Attribute';
import _ from 'underscore';

/* ***  Tag  Component *** */
export default React.createClass({

  render() {

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

          {/* *** DESCRIPTION *** */}
          <div className="Grid">

            {/* *** Left Column *** */}
            <div className="Grid-left">
              <div className="Grid-inside"> 
                
                  {/* *** Description *** */}
                  <h1> {this.props.tagName} </h1>
                  <p>We define in plain english the object ... (define precisely what is the object)</p>

                  {/* *** Attributes *** */}
                  <h2> {this.props.tagName} Attributes : </h2> 
                  <Attribute name = {this.props.tagName} />
                  
              </div> 
            </div>

            {/* *** Right Column *** */}
            <div className="Grid-right">
            </div>

          </div>

          {/* *** PATHS *** */}
          {Paths}

      </div>
    )
  }
})

