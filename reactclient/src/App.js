import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import socket from './utilities/socketConnection';

import './App.css';
// import { useDispatch } from 'react-redux';
// import * as actions from './store/actions';

function App() {
  const [performanceData, setPerformanceData] = useState(null);
  useEffect(() => {
    socket.on("data", (data) => {
      console.log(data);
    })
  }, [])
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
  return (
    <div className="Main" >
      <h4>Home</h4>
    </div>
  );
}

export default App;
