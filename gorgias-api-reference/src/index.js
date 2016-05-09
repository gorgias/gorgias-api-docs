import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory} from 'react-router';
import routes from './routes';

const root = <Router history={ browserHistory } children={ routes } />;
ReactDOM.render(root, document.getElementById('root'));
