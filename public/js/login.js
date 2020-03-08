import axios from "axios";
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/users/login",
      data: {
        email,
        password
      }
    });

    if (res.data.status === "success") {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign("/product");
      }, 900);
     
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:3000/api/v1/users/logout"
    });
    if (res.data.status === "success") {
      showAlert('success', 'Log Out in successfully!');
      window.setTimeout(() => {
        location.reload(true);
      }, 900);

    }
  } catch (err) {
    showAlert("error", "Error logging out! Try again.");
  }
};

export const signup = async data => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/users/signup",
      data
    });

    if (res.data.status === "success") {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign("/product");
      }, 900);

    }

  } catch (err) {
    const error = err.response.data.message ; 
    if (error.indexOf("E11000 duplicate key")=== 0){
      showAlert('error', "Your email or username or phone is already used");
    }
    else if (error.indexOf("Users validation failed: passwordconfirm:")=== 0){
      showAlert('error', "Passwords are not the same");
    }
    
    else{
      console.log(err.response.data.message)
      showAlert('error', err.response.data.message);
    }
  }
};

export const update = async data => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://localhost:3000/api/v1/users/updateMe",
      data
    });
    if (res.data.status === "success") {
      console.log("updated successfully");
      window.setTimeout(() => {
        showAlert('success', 'updated successfully!');
        location.assign("/me/sale");
      }, 100);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updatePSW = async (
  Currentpassword,
  Newpassword,
  ConfirmeNewpassword
) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://localhost:3000/api/v1/users/updatePassword",
      data: {
        Currentpassword,
        Newpassword,
        ConfirmeNewpassword
      }
    });
    if (res.data.status === "success") {

      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        showAlert('success', 'Password updated successfully!');
        location.assign("/me/sale");
      }, 900);

      
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
