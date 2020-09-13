import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// import './index.scss';
import './styles/slider.scss';
import './styles/layout.scss';
import './styles/home.scss';

import App from './components/App.jsx';

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
