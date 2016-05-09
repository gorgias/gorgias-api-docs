import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Layout from './components/Layout';
import GettingStarted from './components/GettingStarted';
import Tag from './components/Tag';
import { tagNames } from './reformat_json';

/* create a wrapper for the Tag Component in order to pass the tagName */
class TagComponent extends React.Component { 
  render() {
    return (
      <Tag tagName= {this.props.route.tag} />
    );
  }
}

/* create an array containing a Route component for each tagName */
var tagRoutes = [];
for(var i in tagNames ) {
	var tag = tagNames[i] ;
	var path = tag.toLowerCase();
	path = "/".concat(path);
	var tagRoute = <Route path={path} tag={tag} component={TagComponent} />
	tagRoutes.push( tagRoute );
}



/* create all the Routes for each tag (i.e each Object) */
const routes = (
  <Route path="/" component={Layout}>
	  <IndexRoute component={GettingStarted} /> 
	  {tagRoutes}
  </Route>
);

module.exports = routes;



