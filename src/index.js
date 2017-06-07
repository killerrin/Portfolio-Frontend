// import $ from 'jquery'
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

// Import Pages
import Home from './Home';
import About from './About';
import Contact from './Contact';
import PortfolioItemsList from './PortfolioItemsList';
import PortfolioItem from './PortfolioItem';
import Account from './Account';
import AccountLogin from './AccountLogin';
import AccountRegister from './AccountRegister';
import AccountLogout from './AccountLogout';
import Admin from './Admin';
import App from './App';

// Import General Stylesheets
import './index.css';

var rootDestination = document.getElementById('root');

ReactDOM.render((
  <HashRouter>
      <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/contact' component={Contact}/>  
          <Route exact path='/portfolioitems' component={PortfolioItemsList}/>
          <Route exact path='/portfolioitems/:id' component={PortfolioItem}/>
          <Route exact path='/account' component={Account}/>
          <Route exact path='/account/login' component={AccountLogin}/>
          <Route exact path='/account/register' component={AccountRegister}/>
          <Route exact path='/account/logout' component={AccountLogout}/>
          <Route exact path='/admin' component={Admin}/>
          <Route exact path='/app' component={App}/>
      </Switch>
  </HashRouter>
), rootDestination);

registerServiceWorker();