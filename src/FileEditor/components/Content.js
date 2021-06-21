import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const TextBox = styled.textarea`
    border: none;
    overflow: auto;
    outline: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    resize: none; /*remove the resize handle on the bottom right*/
    background: initial;

    color: white;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    font-size: 16px;
    height: 600px;
    overflow: auto;
`;

const ContentContainer = styled.div`
    max-height: 80vh;
    padding: 32px;
    padding-top: 8px;
`;

const EditableContent = ({ content, onChange }) => {
    return <ContentContainer>
        <TextBox onChange={e => onChange(e.target.value)} value={content} />
    </ContentContainer>;
};

EditableContent.propTypes = {
    content: PropTypes.string,
    onChange: PropTypes.func
};

export default EditableContent;