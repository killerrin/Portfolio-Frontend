import React, { Component } from 'react';
import { Link, Redirect  } from 'react-router-dom';
import AccountManager from './Managers/AccountManager';
import TagRow from './Components/TagRow';
import TagTypeRow from './Components/TagTypeRow';
import TagService from './Services/TagService';
import TagTypeService from './Services/TagTypeService';

import './Admin.css';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.apiCallTagTypeCompleted = this.apiCallTagTypeCompleted.bind(this);
    this.apiCallTagCompleted = this.apiCallTagCompleted.bind(this);
    this.apiCallFailed = this.apiCallFailed.bind(this);
    this.accountManager = new AccountManager();
    this.tagService = new TagService(this.apiCallTagCompleted, this.apiCallFailed);
    this.tagTypeService = new TagTypeService(this.apiCallTagTypeCompleted, this.apiCallFailed);

    this.state = {
      authUser : this.accountManager.GetLoggedInUser(),
      tags : [],
      tagTypes : [],

      tagsLoaded: false,
      tagTypesLoaded: false,
      error: ""
    }
  } 

  componentDidMount() {
    // alert("Component Mounted");
    if (!this.accountManager.IsUserLoggedIn()) return;
    this.tagService.PreformGetAllTags();
    this.tagTypeService.PreformGetAllTagTypes();
  }

  apiCallTagCompleted(response) {
    this.setState({tags: response});
    this.setState({tagsLoaded: true});
    if (this.state.tagTypesLoaded && this.state.tagsLoaded) {
      this.forceUpdate();
    }
  }
  apiCallTagTypeCompleted(response) {
    this.setState({tagTypes: response});
    this.setState({tagTypesLoaded: true});
    if (this.state.tagTypesLoaded && this.state.tagsLoaded) {
      this.forceUpdate();
    }
  }
  apiCallFailed(response) {
    this.setState({error: response});
  }

  render() {
    if (!this.accountManager.IsUserLoggedIn())
      return(<Redirect to="/account/login"/>);

    var tagTypeRows = [];
    this.state.tagTypes.forEach(function(tagType) {
      tagTypeRows.push(<TagTypeRow tagType={tagType} />);
    });

    var tagRows = [];
    this.state.tags.forEach(function(tag) {
      tagRows.push(<TagRow tag={tag} />);
    });

    return (
      <div className="container-fluid">
        <div className="row">
          <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
            <ul className="nav nav-pills flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">Tags <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Portfolio Items</a>
              </li>
            </ul>
          </nav>
          <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
            <h1>Dashboard</h1>
            <h2>Tag Types</h2>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tagTypeRows}
                </tbody>
              </table>
            </div>
            <h2>Tags</h2>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tag Type ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tagRows}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Admin;
