import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// import { getContactById, updateContact } from "../../Storage/storage";
import { useState } from "react";
import emptyImage from "../../../public/emptyImage.jpg";
import { useSelector, useDispatch } from "react-redux";
import { editContact } from "../../Storage/Slice/contactListSlice";
function UpdateModel({ closeModel, showModel, contactDetail }) {
  const initialState = contactDetail; //useSelector((state) => state.contactApp);
  // console.log(initialState);
  const [contact, setContact] = useState(initialState);
  const [image, setImage] = useState(null);
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const userIdArr = useSelector((state) => state.signIn);
  const userId = Number(userIdArr.toString());
  const allUser = useSelector((state) => state.contactApp);

  // convert image to base64
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onabort = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  // image handleing
  const handleImage = (e) => {
    const file = e.target.files[0];
    getBase64(file).then((base64) => {
      setImage(base64);
    });
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
      contactId: contactDetail.contactId,
    });
    setError(validate(contact));
  };
  const validate = (values) => {
    const errorObj = {};
    const emailRegex = /^\S+@\S+\.\S+$/i;
    if (!values.email) {
      errorObj.email = " Email Required";
    } else if (!emailRegex.test(values.email)) {
      errorObj.email = "Email Invalid";
    }
    if (!values.name) {
      errorObj.name = " Name Is Required";
    } else if (values.name.length > 20) {
      errorObj.name = "Name Length Must Less than 20";
    }
    if (!values.phone) {
      errorObj.phoneNo = "Phone Number is Required";
    } else if (values.phone.length > 10 || values.phone.length < 10) {
      errorObj.phoneNo = " Phone Number Length Must Be 10";
    }

    return errorObj;
  };

  const updateHandler = (e) => {
    e.preventDefault();
    setError(validate(contact));
    setIsSubmit(true);
    if (isSubmit && Object.keys(error).length === 0) {
      closeModel();
      if (image) {
        // updateContact({ ...contact, image: image });
        dispatch(
          editContact({
            newContact: { ...contact, image: image },
            currentUserId: userId,
            allUser: allUser,
          })
        );
      } else {
        // updateContact({ ...contact });
        dispatch(
          editContact({
            newContact: { ...contact, image: image },
            currentUserId: userId,
            allUser: allUser,
          })
        );
      }
      // console.log("update value handler", { ...contact, image: image });
    }
  };

  return (
    <>
      <Modal show={showModel} onHide={closeModel}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="p-0">
            <div className="col">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>
                  Name <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={contact.name}
                  onChange={changeHandler}
                />
              </Form.Group>
              <span style={{ color: "red" }}>{error.name}</span>
            </div>

            <div className="row">
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Label>
                  {" "}
                  Email <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  value={contact.email}
                  onChange={changeHandler}
                />
                <span style={{ color: "red" }}>{error.email}</span>
              </Form.Group>
            </div>

            <div className="row">
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput4"
              >
                Phone Number <span style={{ color: "red" }}>*</span>
                <Form.Label></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  value={contact.phone}
                  onChange={changeHandler}
                />
                <span style={{ color: "red" }}>{error.phoneNo}</span>
              </Form.Group>
            </div>

            <div className="row">
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput5"
              >
                <Form.Label>Image</Form.Label>
                <div className="mb-1">
                  {contact.image ? (
                    <img
                      src={
                        image != contact.image
                          ? image || contact.image
                          : contact.image || image
                      }
                      height="100px"
                      width="120px"
                      alt="Image"
                    />
                  ) : (
                    <img
                      src={emptyImage}
                      style={{ color: "black" }}
                      height="100px"
                      width="120px"
                      // alt="Image"
                    />
                  )}
                </div>
                <Form.Control
                  type="file"
                  name="file"
                  accept=".jpg, .png"
                  onChange={handleImage}
                />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModel}>
            Close
          </Button>
          <Button variant="success" onClick={updateHandler}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default UpdateModel;
UpdateModel.propTypes = {
  closeModel: PropTypes.any,
  showModel: PropTypes.any,
  contactDetail: PropTypes.any,
};
