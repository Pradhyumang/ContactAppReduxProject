// import React from 'react'
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DeleteButton = ({ contact, setContact, fakePromise, deleteContact }) => {
  const dispatch = useDispatch();
  const allUser = useSelector((state) => state.contactApp);
  const currUser = useSelector((state) => state.signIn.toString());
  const [loader, setLoader] = useState(false);
  return (
    <button
      className="btn btn-danger m-1"
      // value={!loader ? "Delete" : ""}
      onClick={async () => {
        if (confirm("Are you Sure To Delete ?")) {
          setLoader(true);
          await fakePromise(0.5);
          // setLoader(false);
          dispatch(
            deleteContact({
              contactId: contact.contactId,
              allUser: allUser,
              currUser: currUser,
            })
          );
          setLoader(false);
          setContact(contact.contactId);
        }
      }}
    >
      {loader ? (
        <div
          style={{ height: "15px", width: "15px" }}
          className="spinner-border "
          role="status"
        ></div>
      ) : (
        "Delete"
      )}
    </button>
  );
};

export default DeleteButton;
DeleteButton.propTypes = {
  // loader: PropTypes.any,
  // setLoader: PropTypes.any,
  contact: PropTypes.any,
  setContact: PropTypes.any,
  fakePromise: PropTypes.any,
  deleteContact: PropTypes.func,
};
