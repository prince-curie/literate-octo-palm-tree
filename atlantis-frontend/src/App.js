import React, {useContext} from 'react'
import "./App.css";
import { etherContext } from './components/contexts/EtherProvider';
import DashBoard from "./components/DashBoard";

import Menu from "./components/Menu";

function App() {
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
