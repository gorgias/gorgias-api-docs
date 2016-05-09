import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Card  from './Card';
import Column from './Column';
import { tagNames } from '../reformat_json';


/* create the Base Component (responsible for the global layout) */
var Layout = React.createClass({


  propTypes: {
    // route: PropTypes.any.isRequired,
    // children: PropTypes.any.isRequired,
    // location: PropTypes.object,
  },

  childContextTypes: {
    viewport: PropTypes.any,
  },


  getInitialState() {
    return {
      viewport: this._getRetrieveViewport(), 
      menu: "Getting Started"
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

    /* create an array containing each Tag Name and their path */
    var objectLinks = [];
    for(var i in tagNames ) {
      var tag = tagNames[i] ;
      var path = tag.toLowerCase();
      path = "/".concat(path);
      var objectLink = <li><Link style={{ display: 'block', padding: '3px 0' }} to={path} >{tag}</Link></li>
      objectLinks.push( objectLink );
    }

    console.log("menu :");
    console.log(this.state.menu);

    return (
      <Column >

       {/* Left Column */}
        <Column className="navigation columnLeft">

            <h1 style={{fontSize: '20px' }}> 
            Gorgias <span style={{ color: '#0099e5', fontSize: '20px' }}> API </span> 
            </h1>

            <span style={{ color: '#939da3' }}> INTRODUCTION </span>
            <ul style={{ listStyleType: 'none', paddingLeft: 0, marginTop: 0 }}>
              <li>
                <Link style={{ display: 'block', padding: '3px 0' }} to="/">Getting Started</Link>
              </li>
            </ul>

            <span style={{ color: '#939da3' }}> OBJECTS </span>
            <ul style={{ listStyleType: 'none', paddingLeft: 0, marginTop: 0  }}>
              {objectLinks}
            </ul>



        </Column>

      {/* rest of the Page, Center and Right Column -> will render the Tag Component */}
        <div className="tag" >
          { this.props.children }
        </div>

    </Column>  
    );

  }
});

export default Layout;
