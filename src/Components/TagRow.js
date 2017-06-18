import React, { Component } from 'react';
import { Link, Redirect  } from 'react-router-dom';
import AccountManager from './../Managers/AccountManager';
import TagService from './../Services/TagService';

class TagRow extends Component {
  constructor(props) {
    super(props);
    this.editButtonClicked = this.editButtonClicked.bind(this);
    this.deleteButtonClicked = this.deleteButtonClicked.bind(this);
    this.apiCallCompleted = this.apiCallCompleted.bind(this);
    this.apiCallFailed = this.apiCallFailed.bind(this);
    this.accountManager = new AccountManager();
    this.tagService = new TagService(this.apiCallCompleted, this.apiCallFailed);

    this.state = {
      authUser : this.accountManager.GetLoggedInUser(),
      editClicked : false,
      deleteClicked : false,
      deleted : false,
      error: ""
    }
  } 

  editButtonClicked(event) {
    event.preventDefault();

    var rawNameInput = window.prompt("Tag Name:", this.props.tag.name);
    if (rawNameInput == null || rawNameInput == "") { window.alert("Update Cancelled"); return; } 

    var rawTagTypeIDInput = window.prompt("Tag Type ID:", this.props.tag.tagTypeID);
    if (rawTagTypeIDInput == null || rawTagTypeIDInput == "") { window.alert("Update Cancelled"); return; } 
    
    this.props.tag.name = rawNameInput;
    this.props.tag.tagTypeID = rawTagTypeIDInput;
    this.setState({editClicked: true});
    this.tagService.PreformUpdateTag(this.props.tag.id, this.props.tag.name, this.props.tag.tagTypeID, this.state.authUser.authToken);
  }
  deleteButtonClicked(event) {
    event.preventDefault();

    if (window.confirm("Are you sure you want to delete this Tag?... This action is PERMANENT")) {
      this.setState({deleteClicked: true});
      this.tagService.PreformDeleteTag(this.props.tag.id, this.state.authUser.authToken);
    }
  }

  apiCallCompleted(response) {
    if (this.state.deleteClicked) {
      this.setState({deleteClicked: false});
      this.setState({deleted: true});
      this.forceUpdate();
    }
    else if (this.state.editClicked) {
      this.setState({editClicked: false});
    }
  }
  apiCallFailed(response) {
    this.setState({error: response});

    if (this.state.deleteClicked) {
      this.setState({deleteClicked: false});
    }
  }

  render() {
    if (this.state.deleted) return;

    return(
      <tr>
        <td>{this.props.tag.id}</td>
        <td>{this.props.tag.tagTypeID}</td>
        <td>{this.props.tag.name}</td>
        <td>
          <div className="btn-group" role="group">
            <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Actions
            </button>
            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <a className="dropdown-item text-warning" href="#" onClick={this.editButtonClicked}>Edit</a>
              <a className="dropdown-item text-danger" href="#" onClick={this.deleteButtonClicked}>Delete</a>
            </div>
          </div>
        </td>
      </tr>
    );     
  }
}

export default TagRow;
