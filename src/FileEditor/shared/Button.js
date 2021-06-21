import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledButton = styled.span`
    color: #f1f1f1;
    cursor: pointer;
    border-radius: 4px;
    height: fit-content;
    padding: 4px;
    margin: 4px;

    &:hover {
        background-color: #68686f;
    }

    ${({ secondary }) => secondary && `
        color: #8e96c1;
    `}

    ${({ disabled }) => disabled && `
        cursor: default;
        color: gray;
        &:hover {
            background-color: initial;
        }
    `}
`;

const IconButton = ({ children, disabled, onClick, secondary }) => {
    return <StyledButton onClick={onClick} disabled={disabled} secondary={secondary}>
        {children}
    </StyledButton>;
};

IconButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  secondary: PropTypes.bool,
  onClick: PropTypes.func
};

export default IconButton;