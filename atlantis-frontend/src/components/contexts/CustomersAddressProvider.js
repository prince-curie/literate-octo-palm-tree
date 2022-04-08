import React, { createContext, useReducer } from "react";
import { customersReducer } from "../reducers/customersReducers";

export const CustomersContext = createContext();
function CustomersAddressProvider(props) {
  const [excelAddress, dispatchExcel] = useReducer(customersReducer, {
   
  });

  return (
    <CustomersContext.Provider value={{ excelAddress, dispatchExcel }}>
      {props.children}
    </CustomersContext.Provider>
  );
}

export default CustomersAddressProvider;
