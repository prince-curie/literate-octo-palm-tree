import React, { useCallback, useContext } from "react";

import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { CustomersContext } from "./contexts/CustomersAddressProvider";
import Loading from "./Helper/Loading";
import SendToken from "./SendToken";

function DragAndDropSection() {
  const { excelAddress,  dispatchExcel } = useContext(CustomersContext);
  
  const onDrop = useCallback((acceptedFiles) => {
    
    dispatchExcel({ type: "EXCEL_LIST_REQUEST"});
    console.log(acceptedFiles[0].type);

    const fileType = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const file = acceptedFiles[0];
    console.log(excelAddress)
    //checking to see if the file is an excel file
    const promise = new Promise((resolve, reject) => {

      if (file && fileType.includes(file.type)) {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        fileReader.onload = (e) => {
          const bufferArray = e.target.result;
          //wookBook(wb)
          const wookBook = XLSX.read(bufferArray, { type: "buffer" });
          //getting the name of the excel sheet
          const wookSheetName = wookBook.SheetNames[0];

          const wookSheet = wookBook.Sheets[wookSheetName];

          const data = XLSX.utils.sheet_to_json(wookSheet);
          resolve(data);
        };
      } else {
        reject("Please select only excel file types");
      }
    });
    promise
      .then((res) => {
        
        const cusAddress = [res].map(val => {
          let addr = []
          let amt = []
          for(let i = 0; i < val.length; i++){
           addr.push(val[i].address)
           amt.push(val[i].amount)
         }
         
          return {"address": addr, "amount": amt}
        })
        console.log(cusAddress)
        
        dispatchExcel({ type: "EXCEL_LIST_SUCCESS", payload: cusAddress });
      })
      .catch((error) => {
        dispatchExcel({ type: "EXCEL_LIST_FAIL", payload: error });
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="drop-container">
      <p>FILE UPLOAD</p>
      <div className="drop" {...getRootProps()}>
      
        <input {...getInputProps()} />
        {excelAddress.loading === true && <Loading /> }
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div>
            <p>Drag 'n' drop some files here, or click to select files</p>
            <span role="img" aria-label="emoji" className="area__icon">
              &#128526;
            </span>
          </div>
        )}
      </div>
      
      {excelAddress.error ? (<p style={{ "color": "red", "marginTop":"0", "textAlign":"center"}}>{excelAddress.error}</p>)
       : (excelAddress.data && 
       <div className="send-section"><p style={{ "color": "green", "marginTop":"0", "textAlign":"center"}}>Upload successfull</p>
         <SendToken />
      </div>)}
    </div>
  );
}

export default DragAndDropSection;
