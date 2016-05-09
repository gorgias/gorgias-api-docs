import React from 'react';
import { DescriptionBox, PathBox } from './Boxes';
import { tags, tagNames } from '../reformat_json';
import _ from 'underscore';

/* create the component Tag ( corresponding to an object in the Json)  (responsible for the layout of the Center and Right Column) */
export default class Tag extends React.Component {

  render() {

    /* obtain the array tagPaths containing all the Paths (endpoint+verb) for a specific tag (= object) */
    var tagName = this.props.tagName ;
    var tag = _.findWhere(tags, {tagName:tagName});
    var tagPaths = tag["tagPaths"];

   
    /* create the array PathBoxes containing the PathBox Component for each tag*/
    var PathBoxes = [];
    for(var i in tagPaths ) {
        PathBoxes.push( <PathBox path= { tagPaths[i] } /> );
    }

    return (
      <div>
        <DescriptionBox tagName= {tagName} />
        {PathBoxes}
      </div>
    )
  }
}






