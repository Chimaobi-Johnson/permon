import React, { useEffect, useState } from 'react';

import socket from './utilities/socketConnection';
import Widget from './containers/Widget';

import './App.css';


function App() {
  const [performanceData, setPerformanceData] = useState(null);
  useEffect(() => {
    socket.on("data", (data) => {
      let currentState;
      currentState = { ...performanceData };
      // use machines mac address as property for 
      currentState[data.macAddress] = data;
      setPerformanceData(currentState)
    })
  }, [])

  const renderWidgets = () => {
    let widgets = [];
    const data = performanceData;
    if(data) {
      Object.entries(data).forEach(([key, value]) => {
      widgets.push(<Widget key={key} data={value} />)
    })
    } else {
      return <h3>Loading widgets...</h3>
    }
    return widgets;
  }

  return (
    <div className="Main" >
      {renderWidgets()}
    </div>
  );
}

export default App;
