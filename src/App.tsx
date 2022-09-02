import { isEmpty } from "cypress/types/lodash";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Subreddit from "./Subreddit";

function App() {
  const [subreddit, setSubreddit] = useState("");
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubreddit(e.target.value);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (subreddit && e.key === "Enter") {
      goToSubreddit();
    }
  };

  const goToSubreddit = () => {
    navigate(`/${subreddit}`);
  };
  
  return (
    <div className="app">
      <header className="app-header">ImageQuix QA Automation Test</header>
      <div className="content">
        <div>
          Navigate to:
          <input
            className="subreddit-input"
            type="text"
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
          <button onClick={goToSubreddit}>Go</button>
        </div>
        <Routes>
          <Route path="/" element={<Subreddit />}></Route>
          <Route path="/:subreddit" element={<Subreddit />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
