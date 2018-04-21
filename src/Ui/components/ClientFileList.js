import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ClientActions } from "../actions";
import "./FileList.css";
class ClientFileListClass extends Component {
  renderFiles() {
    return _.map(this.props.files, (file, fileId) => {
      const { name, downloaded } = file;
      return (
        <li className="collection-item avatar" key={fileId}>
          <i
            className={`material-icons circle ${
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
            style={{ display: downloaded ? "inline" : "none" }}
            className="material-icons circle"
            onClick={() => this.props.openFile(name)}
          >
            insert_drive_file
          </i>
          <i
            style={{ display: downloaded ? "inline" : "none" }}
            className="material-icons circle"
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
    return (
      <ul className="collection video-list video-select-screen">
        {this.renderFiles()}
      </ul>
    );
  }
}

const styles = {
  fileName: {
    width: "65%"
  }
};

function mapStateToProps(state) {
  return state.ClientState.selectedClient;
}
const ClientFileList = connect(mapStateToProps, {
  download: ClientActions.download,
  openFile: ClientActions.openFile,
  openFolder: ClientActions.openFolder
})(ClientFileListClass);
export { ClientFileList };
