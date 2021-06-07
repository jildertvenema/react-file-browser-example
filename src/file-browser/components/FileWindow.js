import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";
import styled from "styled-components";

const StyledFileWindow = styled(Grid)`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    background-color: #232329;
    min-height: 700px;
    border: 1px solid #545353;
`;

const FileWindow = ({ children }) => <StyledFileWindow container>
    {children}
</StyledFileWindow>;

FileWindow.propTypes = {
    children: PropTypes.node
};

export default FileWindow;