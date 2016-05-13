import React from 'react';
import { Link } from 'react-router';
import { tagNames, otherDefinitions } from '../objects';

/* *** Layout Component *** */
export default class Layout extends React.Component {

  render() {
     
    const introductionLink =  <li key={0}> <Link key={0} activeClassName="activeLink"  to="/introduction" >Getting Started</Link> </li>

    /* *** array 'objectLinks' containing each Tag Name and their path for the rest of the menu *** */
    const tagLinks = [];
    for(const i in tagNames ) {
      const tag = tagNames[i] ;
      const path = "/".concat(tag.toLowerCase());
      const index = parseInt(i)+1;
      const tagLink = <li  key={index} ><Link activeClassName="activeLink" key={index}  to={path}  >{tag}</Link></li>
      tagLinks.push( tagLink );
    }

    /* *** array 'definitionLinks' containing each Object Definition (which is not already defined as a Tag in the API CALLS menu) *** */
    const definitionLinks = [];
    for(const i in otherDefinitions ) {
      const definition = otherDefinitions[i] ;
      const path = "/".concat(definition.toLowerCase());
      const index = tagNames.length+ parseInt(i)+1;
      const definitionLink = <li  key={index} ><Link activeClassName="activeLink" key={index} to={path} >{definition}</Link></li>
      definitionLinks.push( definitionLink );
    }

    return (
      <div >

        {/*  *** Navigation SideColumn  *** */}
        <div className="navigationWrapper">

            <div className="navigation" >

                <h1>Gorgias  <span style={{ color: '#0099e5'}}> API </span></h1>

                <p> INTRODUCTION </p>
                <ul> {introductionLink}</ul>

                <p > API CALLS </p>
                <ul> {tagLinks} </ul>  

                <p > DEFINITIONS </p>
                <ul> {definitionLinks} </ul>  

            </div> 

        </div>

        {/*  *** MAIN (everything except the Navigation SideColumn)  *** */}
        <div className="mainWrapper">

            {/*  *** MAIN BACKGROUND : two columns : white and grey in background  *** */}
            <div className="main-background">
                <div className="left-background">
                </div>
                <div className="right-background">
                </div>
            </div>

            {/* *** CONTENT (Tag or Definition) *** */}
            { this.props.children }

        </div>

    </div>  
    );

  }
}

