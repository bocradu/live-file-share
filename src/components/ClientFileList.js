import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ClientActions } from "../actions";
import "./FileList.css";
class ClientFileListClass extends Component {
  renderFiles() {
    return _.map(this.props.files, (file, fileId) => {
      const { name, path, downloaded } = file;
      return (
        <li className="collection-item avatar" key={path}>
          <i
            className={`material-icons circle btn-floating ${
              downloaded ? "downloaded" : ""
            }`}
            onClick={() =>
              downloaded
                ? console.log("File allready downloaded")
                : this.props.download(this.props.id, fileId)
            }
          >
            {downloaded ? "done" : "file_download"}
          </i>
          <i
            className="material-icons circle btn-floating"
            onClick={() => this.props.openFile(name)}
          >
            insert_drive_file
          </i>
          <i
            className="material-icons circle btn-floating"
            onClick={() => this.props.openFolder()}
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
    return <ul className="collection video-list video-select-screen">{this.renderFiles()}</ul>;
  }
}

const styles = {
  fileName: {
    width: "65%"
  }
};

function mapStateToProps(state) {
  const { files, id } = state.ClientState.selectedClient;
  return { files, id };
}
const ClientFileList = connect(mapStateToProps, {
  download: ClientActions.download,
  openFile: ClientActions.openFile,
  openFolder: ClientActions.openFolder
})(ClientFileListClass);
export { ClientFileList };
