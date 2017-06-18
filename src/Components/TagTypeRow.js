import React, { Component } from 'react';
import { Link, Redirect  } from 'react-router-dom';
import AccountManager from './../Managers/AccountManager';
import TagTypeService from './../Services/TagTypeService';

class TagTypeRow extends Component {
  constructor(props) {
    super(props);
    this.editButtonClicked = this.editButtonClicked.bind(this);
    this.deleteButtonClicked = this.deleteButtonClicked.bind(this);
    this.apiCallCompleted = this.apiCallCompleted.bind(this);
    this.apiCallFailed = this.apiCallFailed.bind(this);
    this.accountManager = new AccountManager();
    this.tagTypeService = new TagTypeService(this.apiCallCompleted, this.apiCallFailed);

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

    var rawInput = window.prompt("Tag Type Name:", this.props.tagType.name);
    if (rawInput == null || rawInput == "") { window.alert("Update Cancelled"); return; } 
    
    this.props.tagType.name = rawInput;
    this.setState({editClicked: true});
    this.tagTypeService.PreformUpdateTagType(this.props.tagType.id, this.props.tagType.name, this.state.authUser.authToken);
  }
  deleteButtonClicked(event) {
    event.preventDefault();
    
    if (window.confirm("Are you sure you want to delete this Tag?... This action is PERMANENT")) {
      this.setState({deleteClicked: true});
      this.tagTypeService.PreformDeleteTagType(this.props.tagType.id, this.state.authUser.authToken);
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
        <td>{this.props.tagType.id}</td>
        <td>{this.props.tagType.name}</td>
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

export default TagTypeRow;
