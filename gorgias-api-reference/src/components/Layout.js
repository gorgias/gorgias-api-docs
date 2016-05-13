import React from 'react';
import { Link } from 'react-router';
import { tagNames, otherDefinitions } from '../objects';

export default React.createClass({

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
    let color = "";
    if(this.state.focused == -1 ){   color ="#0099e5" ; }         
    const introductionLink =  <li key={0}> <Link key={0} style={{ color: color }} to="/" onClick={this.clicked.bind(this, -1)}>Getting Started</Link> </li>
    
    /* *** TAGS *** */

    /* create array 'objectLinks' containing each Tag Name and their path for the rest of the menu */
    const tagLinks = [];
    for(const i in tagNames ) {
      const tag = tagNames[i] ;
      const path = "/".concat(tag.toLowerCase());
      const key = parseInt(i)+1;
      let color = "";
      if(this.state.focused == i){ color ="#0099e5" };
      const tagLink = <li  key={key} ><Link  key={key} style={{ color: color }} to={path} onClick={this.clicked.bind(this, i)} >{tag}</Link></li>
      tagLinks.push( tagLink );
    }

    /* *** DEFINITIONS *** */

    /* create array 'definitionLinks' containing each Object Definition (which is not already defined as a Tag in the API CALLS menu) */
    const definitionLinks = [];
    for(const i in otherDefinitions ) {
      const definition = otherDefinitions[i] ;
      const path = "/".concat(definition.toLowerCase());
      const key = tagNames.length+ parseInt(i)+1;
      let color = "";
      if(this.state.focused == i){ color ="#0099e5" };
      const definitionLink = <li  key={key} ><Link key={key} style={{ color: color }} to={path} onClick={this.clicked.bind(this, i)} >{definition}</Link></li>
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
})

