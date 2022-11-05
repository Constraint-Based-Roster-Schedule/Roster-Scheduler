import { SecurityOutlined } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import DailyRosterConstraints from "../components/dailyRosterConstraints";
import '../CSS/rosterGenerator.css'
function RosterGenerator() {
  const [count,setCount]=useState(0);
  return (
    
    <section>
      <div className="topic">
        <h1>Roser Generator</h1>
        <p>you save click {count} times</p>
        <button onClick={()=>setCount(count+1)}>add by 1</button>
        <button onClick={()=>setCount(count-1)}>subtract by 1</button>
      </div>

    </section>
  );
}

export default RosterGenerator;
