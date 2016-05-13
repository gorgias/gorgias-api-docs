import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Layout  from './components/Layout';
import Introduction from './components/Introduction';
import Tag from './components/Tag';
import Definition from './components/Definition';
import { tagNames, otherDefinitions } from './objects';

/* *** TAGS *** */

/* *** wrapper for the Tag Component in order to pass the tagName *** */
class TagWrapper extends React.Component { 
  render() {
    return (
      <Tag tagName= {this.props.route.tag} />
    );
  }
}
/* *** array containing a Route component for each tag *** */
const tagRoutes = [];
for(const i in tagNames ) {
	const tag = tagNames[i] ;
	const path = "/".concat(tag.toLowerCase());
	const key = parseInt(i)+1;
	const tagRoute = <Route key={key} path={path} tag={tag} component={TagWrapper}  />
	tagRoutes.push( tagRoute );
}

/* *** DEFINITIONS *** */

/* *** wrapper for the Definition Component in order to pass the definitionName *** */
class DefinitionWrapper extends React.Component { 
  render() {
    return (
      <Definition definitionName= {this.props.route.definition}  />
    );
  }
}
/* *** array containing a Route component for each definition *** */
const definitionRoutes = [];
for(const i in otherDefinitions ) {
	const definition = otherDefinitions[i] ;
	const path = "/".concat(definition.toLowerCase());
	const key = tagNames.length+ parseInt(i)+1;
	const definitionRoute = <Route key={key} path={path} definition={definition} component={DefinitionWrapper} />
	definitionRoutes.push( definitionRoute );
}


/* *** Routes for each object (tag and definition) *** */
export const routes = (
  <Route path="/" component={Layout} >
  	  <IndexRoute component={Introduction} /> 
	  <Route  path="/introduction" key={0} component={Introduction} /> 
	  {tagRoutes}
	  {definitionRoutes}
  </Route>
);

