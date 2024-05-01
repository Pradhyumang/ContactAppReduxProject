import {} from "react";
import { useNavigate } from "react-router-dom";

const HomeUnAuth = () => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <>
        Hello{}
        <button
          onClick={() => {
            navigate("/sign-in");
          }}
        >
          Sign-In
        </button>
      </>
    </div>
  );
};

export default HomeUnAuth;
