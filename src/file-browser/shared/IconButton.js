import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";


const StyledIconButton = styled.div`
    color: #f1f1f1;
    cursor: pointer;
    border-radius: 4px;
    width: 32px;
    height: 32px;

    display: table-cell;
    vertical-align: middle;
    text-align: center;

    &:hover {
        background-color: #68686f;
    }


    ${({ disabled }) => disabled && `
        cursor: default;
        color: gray;
        &:hover {
            background-color: initial;
        }
    `}

`;

const IconButton = ({ children, disabled, onClick }) => {
    return <StyledIconButton onClick={onClick} disabled={disabled}>
        {children}
    </StyledIconButton>;
};

IconButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default IconButton;