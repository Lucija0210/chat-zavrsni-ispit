import React from "react";
import "./assets/style/style.scss";
import Chat from "./Components/Chat";

function App() {
  return (
    <div className="main">
      <h1>Aplikacija za čavrljanje</h1>
      
      <Chat />
      
      <div className="info__about">
        <h3 className="info__about--paragraph">
          Lucija Brođanac | 2022 | HZZ/ Algebra - Završni rad
        </h3>
      </div>
    </div>
  );
}

export default App;
