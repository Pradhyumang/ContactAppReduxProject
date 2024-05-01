import { useState } from "react";
import { Container, TextField, Button, Typography, Grid } from "@mui/material";
import "../Css/SignIn.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getOneRecord } from "../Storage/storage";
import { signInR } from "../Storage/Slice/signInSlice";
const SignIn = () => {
  const navigate = useNavigate();
  const allUser = useSelector((state) => state.contactApp);
  const getOneRecord = (email, password) => {
    const userIdIndex = allUser.findIndex(
      (dt) => dt.email == email && dt.password == password
    );
    if (userIdIndex != -1) {
      const record = allUser[userIdIndex];
      // console.log(record);
      return record;
    } else {
      return false;
    }
  };
  // console.log(allUser, "All");

  const dispatch = useDispatch();
  const [userLoginInput, setUserLoginInput] = useState({});
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserLoginInput({
      ...userLoginInput,
      [name]: value,
    });
  };
  // login
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
    return errorObj;
  };

  const signInHandler = (e) => {
    e.preventDefault();
    setError(validate(userLoginInput));
    setIsSubmit(true);

    if (Object.keys(error).length === 0 && isSubmit) {
      const dataFetched = getOneRecord(
        userLoginInput.email,
        userLoginInput.password
      );
      if (dataFetched) {
        dispatch(signInR(dataFetched.userId));
        navigate("/");
      } else {
        alert("User Not Exist !");
      }
    }
  };

  return (
    <Container maxWidth="xs" className="signIn" sx={{ borderRadius: "10px" }}>
      <div>
        <Typography
          component="h1"
          variant="h4"
          align={"center"}
          paddingTop={"10px"}
        >
          Please Sign In
        </Typography>
        <form style={{ width: "100%", mt: 1 }} onSubmit={signInHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={changeHandler}
          />
          {error.email && (
            <div style={{ color: "red", display: "flex" }}>
              &nbsp;&nbsp;{error.email}
            </div>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={changeHandler}
          />
          {error.password && (
            <div style={{ color: "red", display: "flex" }}>
              &nbsp;&nbsp;{error.password}
            </div>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item marginBottom={"10px"}>
              Not have an account ?&nbsp;
              <NavLink to={"/sign-up"}>Sign Up</NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
