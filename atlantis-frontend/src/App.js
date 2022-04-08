import React, {useContext, useEffect, useState } from 'react'
import "./App.css";
import { CustomersContext } from './components/contexts/CustomersAddressProvider';
import { etherContext } from './components/contexts/EtherProvider';
import DashBoard from "./components/DashBoard";

import Menu from "./components/Menu";

function App() {
  const { excelAddress } = useContext(CustomersContext);
  const { provider, requestAccount } = useContext(etherContext);
  //all the address from the excel file are in excelAddress.address

  
  return (
  
    <div className="container">
     <DashBoard />
     <Menu />
    </div>
   
  );
}

export default App;
