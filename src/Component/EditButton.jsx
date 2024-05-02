import { useState } from "react";
import { PropTypes } from "prop-types";
const EditButton = ({
  contact,
  // fakePromise,
  setShowModelUpdate,
  setContact,
}) => {
  const [loader, setLoader] = useState(false);

  return (
    <>
      <button
        type="button"
        value="Edit"
        className="btn btn-success m-1"
        onClick={async () => {
          setLoader(true);
          // await fakePromise(0.5);
          setShowModelUpdate(true);
          // console.log(contact.contactId);
          setContact(contact);
          setLoader(false);
        }}
      >
        {loader ? (
          <div
            style={{ height: "15px", width: "15px" }}
            className="spinner-border "
            role="status"
          ></div>
        ) : (
          "Edit"
        )}
      </button>

      {/* <div>EditButton</div> */}
    </>
  );
};

export default EditButton;
EditButton.propTypes = {
  //   loader: PropTypes.any,
  //   setLoader: PropTypes.any,
  contact: PropTypes.any,
  setContact: PropTypes.any,
  fakePromise: PropTypes.any,
  setShowModelUpdate: PropTypes.any,
};
