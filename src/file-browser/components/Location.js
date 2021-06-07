import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import StorageIcon from "@material-ui/icons/Storage";

import Value from "../shared/Value";

const StyledStorageIcon = styled(StorageIcon)`
    color: gray;
    vertical-align: bottom;
    font-size: 19px!important;
    margin-right: 4px;
`;

const Button = styled.div`
    color: #f1f1f1;
    cursor: pointer;
    border-radius: 4px;
    padding: 3px;

    display: table-cell;
    vertical-align: middle;
    text-align: center;

    &:hover {
        background-color: #68686f;
    }
`;

const Location = ({ location, onClick }) => {
    return <Button onClick={onClick}>
        <StyledStorageIcon />
        {
            location.label == location.drive || !location.drive ? <Value>{location.label}</Value> : <Value>{`${location.label} (${location.drive})`}</Value>
        }
    </Button>;
};

Location.propTypes = {
  location: PropTypes.shape({
    drive: PropTypes.any,
    label: PropTypes.any
  }),
  onClick: PropTypes.func
};

export default Location;