import React from 'react';
import { Link } from 'react-router';
import { tagNames, otherDefinitions } from '../reformat_json';

/* create the Base Component (responsible for the global layout) */
var Layout = React.createClass({

  clicked: function(index){
        this.setState({focused: index});
  },

  getInitialState() {
    return {
      focused: -1
    };
  },

  render() {

    /* create introductionLink :  component for the top menu*/
    var color = "";
    if(this.state.focused == -1 ){   color ="#0099e5" ; }         
    const introductionLink =  <li> <Link style={{ color: color }} to="/" onClick={this.clicked.bind(this, -1)}>Getting Started</Link> </li>
    
    /* *** TAGS *** */

    /* create array 'objectLinks' containing each Tag Name and their path for the rest of the menu */
    const tagLinks = [];
    for(var i in tagNames ) {
      var tag = tagNames[i] ;
      var path = tag.toLowerCase();
      path = "/".concat(path);
      var color = "";
      if(this.state.focused == i){ color ="#0099e5" };
      var tagLink = <li><Link style={{ color: color }} to={path} onClick={this.clicked.bind(this, i)} >{tag}</Link></li>
      tagLinks.push( tagLink );
    }

    /* *** DEFINITIONS *** */

    /* create array 'definitionLinks' containing each Object Definition (which is not already defined as a Tag in the API CALLS menu) */
    const definitionLinks = [];
    for(var i in otherDefinitions ) {
      var definition = otherDefinitions[i] ;
      var path = definition.toLowerCase();
      path = "/".concat(path);
      var color = "";
      if(this.state.focused == i){ color ="#0099e5" };
      var definitionLink = <li><Link style={{ color: color }} to={path} onClick={this.clicked.bind(this, i)} >{definition}</Link></li>
      definitionLinks.push( definitionLink );
    }

    return (
      <div >

        {/*  *** Navigation SideColumn  *** */}
        <div className="navigationWrapper">

            <div className="navigation" >

                <h1>Gorgias  <span style={{ color: '#0099e5'}}> API </span></h1>

                {/* *** TOP *** */}
                <p> INTRODUCTION </p>
                <ul> {introductionLink}</ul>

                {/* *** TAGS *** */}
                <p > API CALLS </p>
                <ul> {tagLinks} </ul>  

                 {/* *** DEFINITIONS *** */}
                <p > DEFINITIONS </p>
                <ul> {definitionLinks} </ul>  

            </div> 

        </div>

        {/*  *** MAIN (everything exept the Navigation SideColumn)  *** */}
        <div className="mainWrapper">

            {/*  *** MAIN BACKGROUND : two columns : white and grey  *** */}
            <div className="main-background">
                <div className="left-background">
                </div>
                <div className="right-background">
                </div>
            </div>

            {/* *** CONTENT *** */}
            { this.props.children }
        </div>

    </div>  
    );

  }
});

export default Layout;
