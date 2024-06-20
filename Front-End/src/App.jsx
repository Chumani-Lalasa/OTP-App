import React, { Component } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import app from "./firebase";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      otp: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  configureCaptcha = () => {
    const auth = getAuth(app);
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
          console.log("Recaptcha verified");
        },
        defaultCountry: "IN",
      },
      auth
    );
  };

  onSignInSubmit = (e) => {
    e.preventDefault();
    this.configureCaptcha();
    // const phoneNumber = getPhoneNumberFromUserInput();
    const phoneNumber = "+91" + this.state.mobile;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;

    const auth = getAuth(app);
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("SMS not sent");
      });
  };

  onSubmitOtp = (e) => {
    e.preventDefault();
    const code = this.state.otp;
    console.log(code);
    confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        alert('User is verified');
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };

  render() {
    return (
      <>
        <h2>Login form</h2>
        <form onSubmit={this.onSignInSubmit}>
          <div id="sign-in-button"></div>
          <input
            type="text"
            name="mobile"
            placeholder="Mobile number"
            value={this.state.mobile}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>

        <h2>Enter OTP</h2>
        <form action="" onSubmit={this.onSubmitOtp}>
          <input
            type="text"
            name="otp"
            placeholder="OTP Number"
            value={this.state.otp}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>

        {/* Render SendOtp and VerifyOtp components */}
        {/* <SendOtp />
        <VerifyOtp /> */}
      </>
    );
  }
}

export default App;
