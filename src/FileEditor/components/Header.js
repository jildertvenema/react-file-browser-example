import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import Title from "../shared/Title";
import IconButton from "../shared/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import { Grid } from "@material-ui/core";

const StyledHeader = styled(Grid)`    
    width: 100%;
    height: 70px;
    float: left;
    background-color: #3a393e;
    border-top-right-radius: 9px;
`;

const Header = ({ fileName, onExitClick, saveButtonEnabled, onSaveClick }) => {
    return <StyledHeader container alignItems="center" direction="row" justify="flex-start" >
        <Grid item xs={1} style={{ marginLeft: 8 }}>
            <IconButton onClick={onExitClick}>
                <CloseIcon />
            </IconButton>
        </Grid>
        <Grid item xs align='left'>
            <Title>{fileName}</Title>
        </Grid>
        <Grid item xs={1} align='right' style={{ marginRight: 8 }}>
            <IconButton onClick={saveButtonEnabled ? onSaveClick : () => {}} disabled={!saveButtonEnabled}>
                <SaveIcon />
            </IconButton>
        </Grid>
    </StyledHeader>;
};

Header.propTypes = {
    fileName: PropTypes.string,
    onExitClick: PropTypes.func,
    onSaveClick: PropTypes.func,
    saveButtonEnabled: PropTypes.bool
};

export default Header;