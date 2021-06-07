import React from "react";
import "./App.css";
import styled from "styled-components";
import FileBrowser from "./file-browser";

const Container = styled.div`
  width: 1280px;
  max-width: 94vw;;
  margin: 0 auto;
  margin-top: 12px;
`;

function App() {
  return (
    <div className="App">
      <Container>
        <FileBrowser />
      </Container>
    </div>
  );
}

export default App;
