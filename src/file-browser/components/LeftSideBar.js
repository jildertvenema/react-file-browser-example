import React from "react";
import PropTypes from "prop-types";

import Label from "../shared/Label";

import { Grid } from "@material-ui/core";
import styled from "styled-components";
import Location from "./Location";

const StyledLeftSideBar = styled(Grid)`
    border-bottom-left-radius: 9px;
    border-top-left-radius: 9px;
    background-color: #2a2a2f;
    border-right: 1px solid black;
    margin-top: 24px;
    padding: 16px;
`;

const LeftAlignGrid = styled(Grid)`
    text-align: left;
`;

const LocationItems = styled.div`
    margin-top: 8px;
`;

const LeftSideBar = ({ locations, onLocationClick }) => <StyledLeftSideBar item xs={3}>
    <Grid container justify="flex-start">
        <LeftAlignGrid item xs={12}>
            <Label>Locations</Label>
        </LeftAlignGrid>
        <LocationItems>
        {
            locations.map(location => {
                const key = location.drive + locations.label;
                return <LeftAlignGrid item xs={12} key={key}>
                    <Location onClick={() => onLocationClick(location)} location={location} />
                </LeftAlignGrid>;
            })   
        }
        </LocationItems>
    </Grid>
</StyledLeftSideBar>;

LeftSideBar.propTypes = {
    locations: PropTypes.array,
    onLocationClick: PropTypes.func
};

export default LeftSideBar;