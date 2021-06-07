import PropTypes from "prop-types";
import React from "react";

import { Grid } from "@material-ui/core";
import FileWindow from "./components/FileWindow";
import FileList from "./components/FileList";
import LeftSideBar from "./components/LeftSideBar";
import Header from "./components/Header";

const FileBrowser = ({ locations, currentDirectory, onLocationClick, previousEnabled, nextEnabled, onPreviousClick, onNextClick, currentFiles, onFileClick }) => {
    return <FileWindow>
        <LeftSideBar locations={locations} onLocationClick={onLocationClick}/>
        <Grid item xs={9}>
            <Header
                currentDirectory={currentDirectory}
                previousEnabled={previousEnabled}
                nextEnabled={nextEnabled}
                onPreviousClick={onPreviousClick}
                onNextClick={onNextClick}
            />
            <FileList files={currentFiles} onFileClick={onFileClick} />
        </Grid>
    </FileWindow>;
};

FileBrowser.propTypes = {
  currentDirectory: PropTypes.string,
  currentFiles: PropTypes.array,
  locations: PropTypes.array,
  nextEnabled: PropTypes.bool,
  onFileClick: PropTypes.func,
  onLocationClick: PropTypes.func,
  onNextClick: PropTypes.func,
  onPreviousClick: PropTypes.func,
  previousEnabled: PropTypes.bool
};


export default FileBrowser;