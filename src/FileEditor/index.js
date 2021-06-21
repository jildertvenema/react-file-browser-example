import React, { useState } from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";

import FileWindow from "./components/FileWindow";
import Header from "./components/Header";
import Content from "./components/Content";
import ExitDialog from "./components/ExitDialog";

const FileEditor = ({ fileName, content, onExit, onSave }) => {
    const [pendingChanges, setPendingChanges] = useState(false);
    const [showExitDialog, setShowExitDialog] = useState();

    const onExitClick = () => {
        if (!pendingChanges) {
            onExit();
        } else {
            setShowExitDialog(true);
        }
    };

    const discardChanges = () => {
        setPendingChanges(false);
        setShowExitDialog(false);
        onExit();
    };

    const onSaveExit = () => {
        onSave();
        onExit();
    };

    const onSaveClick = () => {
        onSave(pendingChanges);
        setPendingChanges(false);
    };

    return <FileWindow>
        <Grid item xs={12}>
            <Header onExitClick={onExitClick} fileName={fileName} onSaveClick={onSaveClick} saveButtonEnabled={pendingChanges !== false}/>
        </Grid>
        <Grid item xs={12} align='left'>
            <Content onChange={(changes) => setPendingChanges(changes)} content={pendingChanges === false ? content : pendingChanges}/>
        </Grid>
        {
            showExitDialog && <ExitDialog onCancel={() => setShowExitDialog(false)} onExit={discardChanges} onSaveExit={onSaveExit} />
        }
    </FileWindow>;
};

FileEditor.propTypes = {
  content: PropTypes.string,
  fileName: PropTypes.string,
  onExit: PropTypes.func,
  onSave: PropTypes.func
};

export default FileEditor;