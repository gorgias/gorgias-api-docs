import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Layout from './components/Layout';
import Introduction from './components/Introduction';
import Tag from './components/Tag';
import Definition from './components/Definition';
import { tagNames, otherDefinitions } from './reformat_json';

/* *** TAGS *** */

/* create a wrapper for the Tag Component in order to pass the tagName */
class TagWrapper extends React.Component { 
  render() {
    return (
      <Tag tagName= {this.props.route.tag} />
    );
  }
}
/* create an array containing a Route component for each tagName */
const tagRoutes = [];
for(var i in tagNames ) {
	var tag = tagNames[i] ;
	var path = tag.toLowerCase();
	path = "/".concat(path);
	var tagRoute = <Route  path={path} tag={tag} component={TagWrapper}  />
	tagRoutes.push( tagRoute );
}


/* *** DEFINITIONS *** */

/* create a wrapper for the Definition Component in order to pass the definitionName */
class DefinitionWrapper extends React.Component { 
  render() {
    return (
      <Definition definitionName= {this.props.route.definition}  />
    );
  }
}

/* create an array containing a Route component for each definition */
const definitionRoutes = [];
for(var i in otherDefinitions ) {
	var definition = otherDefinitions[i] ;
	var path = definition.toLowerCase();
	path = "/".concat(path);
	var definitionRoute = <Route path={path} definition={definition} component={DefinitionWrapper} />
	definitionRoutes.push( definitionRoute );
}


/* create all the Routes for each tag (i.e each Object) */
const routes = (
  <Route path="/" component={Layout} >
	  <IndexRoute component={Introduction} /> 
	  {tagRoutes}
	  {definitionRoutes}
  </Route>
);

module.exports = routes;



