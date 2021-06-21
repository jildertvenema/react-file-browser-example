import React from "react";
import "./App.css";
import styled from "styled-components";
import LocalFileBrowser from "./LocalFileBrowser";

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
        <LocalFileBrowser />
      </Container>
    </div>
  );
}

export default App;
