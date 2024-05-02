// import { setStorageUser } from "../Storage/storage";
import { useState } from "react";
import { Container, TextField, Button, Typography, Grid } from "@mui/material";
import "../Css/SignUp.css";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpR } from "../Storage/Slice/contactListSlice";

// const signUpState = useSelector((state) => state);
const SignUp = () => {
  const dispatch = useDispatch();
  const initialState = {
    email: "",
    password: "",
    cnfPassword: "",
    contactList: [],
  };
  const [newUserData, setNewUserData] = useState(initialState);
  const [isSubmit, setIsSubmit] = useState(true);
  const [errorMessages, setErrorMessages] = useState({});
  // const loginedUser = getLoginUserId();

  const navigate = useNavigate();
  // useEffect(() => {
  //   loginedUser ? navigate("/contact-list") : "";
  // }, [navigate, loginedUser]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewUserData({
      ...newUserData,
      [name]: value,
      userId: Date.now(),
    });
    // setErrorMessages(validate(newUserData));
  };

  const validate = (values) => {
    const errorObj = {};
    const emailRegex = /^\S+@\S+\.\S+$/i;
    if (!values.email) {
      errorObj.email = " Email Required";
    } else if (!emailRegex.test(values.email)) {
      errorObj.email = "Email Invalid";
    }
    if (!values.password) {
      errorObj.password = " Password Required";
    } else if (values.password.length > 20) {
      errorObj.password = "Password Length Must Less than 20";
    }
    if (!values.cnfPassword) {
      errorObj.cnfPassword = "Confirm Password Required";
    } else if (values.cnfPassword.length > 20) {
      errorObj.cnfPassword = "Confirm Password Length Must Less than 20";
    }
    if (values.password !== values.cnfPassword) {
      errorObj.passwordMismatch = "Password Must be Same";
    }

    return errorObj;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setErrorMessages(validate(newUserData));
    setIsSubmit(true);
    if (!Object.keys(errorMessages).length) {
      if (Object.keys(errorMessages).length === 0 && isSubmit) {
        if (newUserData.password && newUserData.cnfPassword) {
          if (newUserData.password === newUserData.cnfPassword) {
            const data = { ...newUserData };
            delete data.cnfPassword;
            if (dispatch(signUpR({ data }))) {
              navigate("/sign-in");
            }
            // console.log('submited data', data);
            setNewUserData(initialState);
          } else {
            alert("Password Must be Same !");
          }
        }
      }
    }
  };

  return (
    <>
      <Container
        maxWidth="xs"
        className="signUp "
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
        }}
      >
        <div>
          <Typography
            component="h1"
            variant="h3"
            align={"center"}
            paddingTop={"10px"}
          >
            Sign Up
          </Typography>
          <form onSubmit={submitHandler}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={newUserData.email}
              onChange={changeHandler}
            />
            {errorMessages.email ? (
              <div style={{ color: "red", display: "flex" }}>
                &nbsp;&nbsp;{errorMessages.email}
              </div>
            ) : null}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={newUserData.password}
              onChange={changeHandler}
            />
            {errorMessages.password ? (
              <div style={{ color: "red", display: "flex" }}>
                &nbsp;&nbsp;{errorMessages.password}
              </div>
            ) : null}
            <TextField
              margin="normal"
              required
              fullWidth
              name="cnfPassword"
              label="Confirm Password"
              type="password"
              id="cnfPassword"
              autoComplete="current-password"
              value={newUserData.cnfPassword}
              onChange={changeHandler}
            />
            {errorMessages.cnfPassword || errorMessages.passwordMismatch ? (
              <div style={{ color: "red", display: "flex" }}>
                &nbsp;&nbsp;
                {errorMessages.cnfPassword || errorMessages.passwordMismatch}
              </div>
            ) : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item marginBottom={"10px"}>
                Already have an account ? &nbsp;
                {/* <Link underline="hover" color="#888e4f"> */}
                <NavLink to={"/sign-in"}>Sign in</NavLink>
                {/* </Link> */}
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
