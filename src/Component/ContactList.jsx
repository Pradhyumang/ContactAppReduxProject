import { useState } from "react";
import AddModal from "./Modal/AddModal";
import UpdateModel from "./Modal/UpdateModel";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import emptyImage from "../../public/emptyImage.jpg";
import Navbars from "./Navbars";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContact,
  importContact,
} from ".././Storage/Slice/contactListSlice";
// import {importContact} from ".././Storage/Slice/contactListSlice"
const ContactList = () => {
  // const navigate = useNavigate();
  const [showModel, setShowModel] = useState(false);
  const [showModelUpdate, setShowModelUpdate] = useState(false);
  const [contact, setContact] = useState(null);
  const [, setImportState] = useState(false);
  const [exports, setExports] = useState(false);
  const [imports, setImports] = useState(false);
  // const dispatch = useDispatch();
  const contactList = useSelector(
    (state) =>
      state.contactApp[
        state.contactApp.findIndex(
          (user) => user.userId == state.signIn.toString()
        )
      ].contactList
  );
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.signIn.toString());
  const allUser = useSelector((state) => state.contactApp);
  const fakePromise = (secs) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        // console.log("fake Promise");
      }, secs * 1000);
    });
  };

  const closeModel = () => {
    setShowModel(false);
    setShowModelUpdate(false);
  };
  //for import
  const convertArrToObjAndInsert = (data) => {
    data.shift();
    // console.log(data, "Excel DATASSS");
    const arrObj = [];
    for (const contact of data) {
      const obj = {};
      obj["contactId"] = Date.now() * Math.random();
      obj["phone"] = contact[1];
      obj["name"] = contact[2];
      obj["email"] = contact[3];
      obj["image"] = contact[4];
      // addContact(obj, true);
      arrObj.push(obj);
    }
    dispatch(
      importContact({
        excelContactList: arrObj,
        currentUserId: Number(userId),
        allUser: allUser,
      })
    );
  };
  //for Export
  const convertObjTOArr = () => {
    // const userId = getLoginUserId().userId;
    const allContacts = contactList;
    // const allContacts = console.log(allContacts); //getUserContactsById(userId).contactList;
    const header = ["contactId", "phone", "name", "email", "image"];
    const arr = [header];
    for (const echContact of allContacts) {
      const eachRowdata = [
        echContact.contactId,
        echContact.phone,
        echContact.name,
        echContact.email,
        echContact.image,
      ];
      arr.push(eachRowdata);
    }
    // console.log(arr);
    return arr;
  };
  const handleImportExcel = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const importedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      convertArrToObjAndInsert(importedData);
      setImportState(Math.random);
    };
    reader.readAsBinaryString(file);
    setImports(true);
  };

  const handleExportExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Add data to the worksheet
    const data = convertObjTOArr();
    // console.log(data);
    for (const eachContact of data) {
      worksheet.addRow(eachContact);
    }

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.xlsx";
      a.click();
    });
    setExports(true);
  };
  const sty = { textAlign: "left" };
  if (exports) {
    setExports(false);
    alert("Export Successful.");
  }
  if (imports) {
    setImports(false);
    alert("Import Successful.");
  }
  return (
    <>
      <Navbars />
      {showModelUpdate && (
        <UpdateModel
          closeModel={closeModel}
          showModel={showModelUpdate}
          contactDetail={contact}
        />
      )}
      {showModel && <AddModal closeModel={closeModel} showModel={showModel} />}

      <div
        className=""
        style={{
          marginLeft: "25px",
          marginRight: "25px",
        }}
      >
        <h1 style={{ color: "white" }}>Contact list</h1>
        <div
          className="btns"
          style={{ display: "flex", justifyContent: "end" }}
        >
          <input
            type="button"
            value="Add Contact"
            className="btn btn-dark m-3 text-white"
            onClick={() => {
              setShowModel(true);
            }}
          />
          {/* <span> */}
          <label htmlFor="inputImport" className="btn btn-light-g m-3">
            Import Contact
          </label>
          <input
            type="file"
            id="inputImport"
            accept=" .xls, .xlsx, .csv"
            style={{ display: "none" }}
            onChange={handleImportExcel}
          />
          <input
            type="button"
            value="Export"
            className="btn btn-primary  m-3"
            onClick={handleExportExcel}
          />
          {/* </span> */}
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">index</th>
                <th scope="col" style={sty}>
                  Name
                </th>
                <th scope="col" style={sty}>
                  Email
                </th>
                <th scope="col" style={sty}>
                  Phone Number
                </th>
                <th scope="col">Image</th>
                <th scope="col" style={sty}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {contactList?.map((contactt, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td style={sty}>{contactt.name}</td>
                    <td style={sty}>{contactt.email}</td>
                    <td style={sty}>{contactt.phone}</td>
                    <td>
                      {contactt.image ? (
                        <img
                          src={contactt.image || emptyImage}
                          height="40px"
                          width="40px"
                          // alt="Image"
                        />
                      ) : (
                        <img
                          src={emptyImage}
                          style={{ color: "black" }}
                          height="40px"
                          width="40px"
                          // alt="Image"
                        />
                      )}
                    </td>

                    <td style={{ display: "flex" }}>
                      <EditButton
                        contact={contactt}
                        fakePromise={fakePromise}
                        setShowModelUpdate={setShowModelUpdate}
                        setContact={setContact}
                      />
                      <DeleteButton
                        // loader={loader}
                        // setLoader={setLoader}
                        contact={contactt}
                        setContact={setContact}
                        fakePromise={fakePromise}
                        deleteContact={deleteContact}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ContactList;
