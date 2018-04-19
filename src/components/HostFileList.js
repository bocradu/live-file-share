import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { HostActions } from "../actions";
import "./FileList.css";
class HostFileListClass extends Component {
  renderFiles() {
    return _.map(this.props.files, (file, id) => {
      const { name, path } = file;
      return (
        <li className="collection-item avatar" key={id}>
          <div style={{ ...styles.progressBar }} />
          <i
            className="material-icons circle btn-floating"
            onClick={() => this.props.removeFile(id)}
          >
            clear
          </i>
          <i
            className="material-icons circle btn-floating"
            onClick={() => this.props.openFile(path)}
          >
            insert_drive_file
          </i>
          <i
            className="material-icons circle btn-floating"
            onClick={() => this.props.openFolder(path)}
          >
            folder_open
          </i>
          <div style={styles.fileName}>
            <p>{name}</p>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <ul hidden={!this.props.hasFiles} className="collection video-list">
        {this.renderFiles()}
      </ul>
    );
  }
}

const styles = {
  progressBar: {
    transitionProperty: "right",
    transitionDuration: "0.25s",
    position: "absolute",
    zIndex: 0,
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#03a9f4",
    opacity: 0.25
  },
  secondaryContent: {
    zIndex: 1,
    width: "180px",
    top: "auto",
    botton: "auto"
  },
  fileName: {
    width: "65%"
  }
};

function mapStateToProps(state) {
  const { files, hasFiles } = state.HostState;
  return { files, hasFiles };
}
const HostFileList = connect(mapStateToProps, {
  removeFile: HostActions.removeFile,
  openFile: HostActions.openFile,
  openFolder: HostActions.openFolder
})(HostFileListClass);
export { HostFileList };
