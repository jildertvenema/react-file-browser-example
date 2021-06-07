import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import Title from "../shared/Title";
import IconButton from "../shared/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Grid } from "@material-ui/core";

const StyledHeader = styled(Grid)`    
    width: 100%;
    height: 70px;
    float: left;
    background-color: #3a393e;
    border-top-right-radius: 9px;
`;

const Header = ({ currentDirectory, onPreviousClick, onNextClick, nextEnabled, previousEnabled }) => {
    return <StyledHeader container alignItems="center" direction="row" justify="flex-start" >
        <Grid item xs style={{ marginLeft: 8 }}>
            <IconButton onClick={onPreviousClick} disabled={!previousEnabled}>
                <ArrowBackIosIcon />
            </IconButton>
        </Grid>
        <Grid item xs>
            <IconButton onClick={onNextClick} disabled={!nextEnabled}>
                <ArrowForwardIosIcon />
            </IconButton>
        </Grid>
        <Grid item style={{ textAlign: "left" }} xs={6}>
            <Title>{currentDirectory}</Title>
        </Grid>
        <Grid item xs={5}>

        </Grid>
    </StyledHeader>;
};

Header.propTypes = {
  currentDirectory: PropTypes.string,
  nextEnabled: PropTypes.bool,
  onNextClick: PropTypes.func,
  onPreviousClick: PropTypes.func,
  previousEnabled: PropTypes.bool
};

export default Header;