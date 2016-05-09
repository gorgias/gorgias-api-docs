import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Card  from './Card';
import Column from './Column';
import { tagNames } from '../reformat_json';

/* create the Base Component (responsible for the global layout) */
var Layout = React.createClass({

  childContextTypes: {
    viewport: PropTypes.any,
  },

  clicked: function(index){
        this.setState({focused: index});
  },

  getInitialState() {
    return {
      viewport: this._getRetrieveViewport(), 
      focused: -1
    };
  },

  getChildContext() {
    return {
      viewport: this._getRetrieveViewport(),
    };
  },

  componentWillMount() {
    window.addEventListener('resize', this._triggerResizeMixinCallback);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this._triggerResizeMixinCallback);
  },
  
  _getRetrieveViewport() {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
  },

  _triggerResizeMixinCallback() {
    this.setState({
      viewport: this._getRetrieveViewport(),
    });
  },


  render() {

    /* create the component for the top menu*/
    var color = "";
    if(this.state.focused == -1 ){   color ="#0099e5" ; }         
    var introductionLink =  <li> <Link style={{ display: 'block', padding: '3px 0', color: color }} to="/" onClick={this.clicked.bind(this, -1)}>Getting Started</Link> </li>
               
    /* create an array 'objectLinks' containing each Tag Name and their path for the rest of the menu */
    var objectLinks = [];
    for(var i in tagNames ) {
      var tag = tagNames[i] ;
      var path = tag.toLowerCase();
      path = "/".concat(path);
      var color = "";
      if(this.state.focused == i){ color ="#0099e5" };
      var objectLink = <li><Link style={{ display: 'block', padding: '3px 0', color: color }} to={path} onClick={this.clicked.bind(this, i)} >{tag}</Link></li>
      objectLinks.push( objectLink );
    }

    console.log("focused", this.state.focused);

    return (
      <Column >

        {/* Left Column */}
        <Column className="navigation columnLeft">

            <h1 style={{fontSize: '20px' }}> 
              Gorgias  <span style={{ color: '#0099e5', fontSize: '20px' }}> API </span> 
            </h1>

            {/* top menu */}
            <span style={{ color: '#939da3' }}> INTRODUCTION </span>
            <ul style={{ listStyleType: 'none', paddingLeft: 0, marginTop: 0 }}>
              {introductionLink}
            </ul>

            {/* rest of the menu */}
            <span style={{ color: '#939da3' }}> OBJECTS </span>
            <ul style={{ listStyleType: 'none', paddingLeft: 0, marginTop: 0  }}>
              {objectLinks}
            </ul>   

        </Column>

        {/* rest of the Page, Center and Right Column -> render the 'Tag' Component */}
        <div className="tag" >
          { this.props.children }
        </div>

    </Column>  
    );

  }
});

export default Layout;
