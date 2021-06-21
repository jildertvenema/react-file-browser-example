import PropTypes from "prop-types";
import React from "react";

import Button from "../shared/Button";

import { Grid } from "@material-ui/core";
import styled from "styled-components";

const StyledFileWindow = styled(Grid)`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    background-color: #232329;
    border: 1px solid #545353;
`;

const Dialog = styled.div`
    position: fixed;
    width: 400px;
    height: 200px;
    top: 16px;
    left: calc(50% - 200px);
`;

const Overlay = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0.6;
    background: black;
`;

const Text = styled.span`
    padding: 27px;
    color: white;
`;

const FileWindow = ({ onCancel, onExit, onSaveExit }) => <>
    <Overlay>
    </Overlay>
    <Dialog>
        <StyledFileWindow container>
            <Text>This file has unsaved changes, are you sure you want to exit?</Text>
            <Grid container alignItems="flex-end" justify="flex-end" style={{ margin: 8 }}>
                <Button onClick={onCancel} secondary>Cancel</Button>
                <Button onClick={onExit} secondary>Disard and exit</Button>
                <Button onClick={onSaveExit} >Save and exit</Button>
            </Grid>
        </StyledFileWindow>
    </Dialog>;
    </>;

FileWindow.propTypes = {
  onCancel: PropTypes.func,
  onExit: PropTypes.func,
  onSaveExit: PropTypes.func
};

export default FileWindow;