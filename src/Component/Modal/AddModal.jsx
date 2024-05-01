import PropTypes from "prop-types";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// import { addContact } from "../../Storage/storage";
import { useSelector, useDispatch } from "react-redux";
import { addContact } from "../../Storage/Slice/contactListSlice";

function AddModal({ closeModel, showModel }) {
  const initialState = {};
  const [data, setData] = useState(initialState);
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

    setData({
      ...data,
      [name]: value,
      contactId: Date.now(),
    });
    setError(validate(data));
  };
  // validation
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
  const addHandler = (e) => {
    e.preventDefault();
    setError(validate(data));
    setIsSubmit(true);
    if (isSubmit && Object.keys(error).length === 0) {
      // addContact({ ...data, image: image });
      dispatch(
        addContact({
          newContact: { ...data, image: image },
          currentUserId: userId,
          allUser: allUser,
        })
      );
      closeModel();
    }
    // console.log("add handler", data);
  };

  return (
    <>
      <Modal show={showModel} onHide={closeModel}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Contact</Modal.Title>
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
                  onChange={changeHandler}
                />
                <span style={{ color: "red" }}>{error.name}</span>
              </Form.Group>
            </div>

            <div className="row">
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Label>
                  Email <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  name="email"
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
                <Form.Label>
                  Phone Number <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
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
                {image && (
                  <div>
                    <img src={image} alt="image" height="100px" width="120px" />
                  </div>
                )}
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
          <Button variant="primary" onClick={addHandler}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default AddModal;
AddModal.propTypes = {
  closeModel: PropTypes.any,
  showModel: PropTypes.any,
};
