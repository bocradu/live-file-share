import _ from "lodash";
import React, { Component } from "react";
import Dropzone from "react-dropzone";
import uuidv4 from "uuid/v4";
import { connect } from "react-redux";
import { HostActions } from "../actions";
class FileSelectScreenClass extends Component {
  onDrop = files => {
    files = _.map(files, ({ name, path }) => {
      return { name, path, id: uuidv4() };
    });
    if (files.length) {
      this.props.addFiles(files);
    }
  };

  renderChildren({ isDragActive, isDragReject }) {
    if (isDragActive) {
      return (
        <h4 className="drop-message">Omnomnom, let me have those files!</h4>
      );
    } else if (isDragReject) {
      return (
        <h4 className="drop-message">
          Uh oh, I don't know how to deal with that type of file!
        </h4>
      );
    } else {
      return (
        <h4 className="drop-message">
          Drag and drop some files on me, or click to select.
        </h4>
      );
    }
  }

  render() {
    return (
      <div
        className={
          this.props.hasFiles
            ? "video-select-screen-small"
            : "video-select-screen"
        }
      >
        <Dropzone
          onDrop={this.onDrop}
          multiple
          accept="text/*"
          className="dropzone"
          activeClassName="dropzone-active"
          rejectClassName="dropzone-reject"
          disableClick={!this.props.hosting}
          disabled={!this.props.hosting}
        >
          {this.renderChildren}
        </Dropzone>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    hosting: state.HostState.hosting,
    hasFiles: state.HostState.hasFiles
  };
}
const FileSelectScreen = connect(mapStateToProps, {
  addFiles: HostActions.addFiles
})(FileSelectScreenClass);
export { FileSelectScreen };
