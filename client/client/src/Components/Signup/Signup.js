import "./Signup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  let [state, setState] = useState(false);
  let [signupSuccess, setSignupSuccess] = useState(false);


  async function onSignUpFormSubmit(userObj) {
    try {
      const endpoint = userObj.userType === "author" ? 'author-api/user' : 'user-api/user';
      const res = await axios.post(`http://localhost:4000/${endpoint}`, userObj);

      if (res.data.message === "User created") {
        // Navigate to login
          setState(true);
          setSignupSuccess(true);
          setErr("");
    
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      console.error("There was an error creating the account:", error);
      setErr("There was an error creating the account. Please try again.");
    }
  }

  return (
    <div className="body">

      {err && <p className="text-danger fw-bold text-center  fs-3">{err}</p>}
      <form className="signupform" onSubmit={handleSubmit(onSignUpFormSubmit)}>
         {signupSuccess === true ? (
                <div>
                  <p className="regsuccess fs-3 text-center display-4">
                    Signup successful
                  </p>
                  <p className="text-center fs-6 text-light">
                    Proceed to <Link to="/signin" className="dis">Login</Link>
                  </p>
                  <p className="text-center fs-6 text-light">
                    Back to <Link to="/" className="dis">Home</Link>
                  </p>
                </div>
              ) : (
                <h2 className="p-1">Signup</h2>
              )}
        <div>
          <label>
            Register as
          </label>
          <div className="form-check form-check-inline m-1">
            <input
              type="radio"
              className="form-check-input radio-input"
              id="author"
              value="author"
              {...register("userType", { required: true },{ disabled: state })}
            />
            <label htmlFor="author">Author</label>
          </div>
          <div className="form-check form-check-inline m-2">
            <input
              type="radio"
              className="form-check-input radio-input"
              id="user"
              value="user"
              {...register("userType", { required: true },{ disabled: state })}
            />
            <label htmlFor="user">User</label>
          </div>
          {errors.userType && <p className="form-error">User type is required</p>}
        </div>
        <div className="container gap-5">
          <div className="input">
            <div className="mb-3">
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="form-control"
                {...register("username", {
                  required: true,
                  minLength: 6,
                  maxLength: 25,
                },{ disabled: state })}
              />
              {errors.username?.type === "required" && <p className="form-error">Username is mandatory</p>}
              {errors.username?.type === "minLength" && <p className="form-error">Username should be at least 6 characters</p>}
              {errors.username?.type === "maxLength" && <p className="form-error">Username should be at most 25 characters</p>}
            </div>

            <div className="mb-3">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="form-control"
                {...register("password", { required: true },{ disabled: state })}
              />
              {errors.password?.type === "required" && <p className="form-error">Password is mandatory</p>}
            </div>

            <div className="mb-3">
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="form-control"
                {...register("email", { required: true },{ disabled: state })}
              />
              {errors.email?.type === "required" && <p className="form-error">Email is mandatory</p>}
            </div>
          </div>
          <div className="flex">
            <input className="checkbox" type="checkbox" id="terms" {...register("terms", { required: true },{ disabled: state })} />
            <p className="text">I accept the terms of Use & Privacy Policy</p>
            {errors.terms && <p className="form-error">Accepting terms and conditions is mandatory</p>}
          </div>
          <button className="btn submit" type="submit">Sign up</button>
          <p className="text">Already have an account? <Link to="/signin">Sign in</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
