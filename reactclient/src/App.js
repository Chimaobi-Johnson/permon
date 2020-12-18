import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import socket from './utilities/socketConnection';

import './App.css';
import Widget from './containers/Widget';
// import { useDispatch } from 'react-redux';
// import * as actions from './store/actions';

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
  // let routes;
  // routes = (
  //   <Switch>
  //     <Route path="/admin/add_item" exact component={AddItem} />
  //     {/* <Route path="/profile/purchase-history" component={UserProfile} /> */}
  //     <Route path="/profile" exact component={UserProfile} />
  //     <Route path="/" exact component={Home} />
  //     <Redirect to="/" />
  //   </Switch>
  // )
  console.log(performanceData)
  return (
    <div className="Main" >
      {renderWidgets()}
    </div>
  );
}

export default App;
