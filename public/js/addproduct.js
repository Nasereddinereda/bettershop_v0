import axios from "axios";

export const addproduct = async (
  name,
  type,
  state,
  user,
  category,
  color,
  size,
  description,
  price,
  quantity,
  wilaya,
  phone,
  email,
  seller
) => {
  try {
    let neWproduct = {};
    let img = ["empty.png", "empty.png", "empty.png"]
    
      if (type === "Dress") {
      let dress_type = category;
      neWproduct = {
        name,
        type,
        state,
        user,
        dress_type,
        color,
        size,
        description,
        price,
        quantity,
        wilaya,
        phone,
        email,
        seller
      };
    } else if (type === "MakeUp") {
      let makeup_type = category;
      neWproduct = {
        name,
        type,
        state,
        user,
        makeup_type,
        color,
        size,
        description,
        price,
        quantity,
        wilaya,
        phone,
        email,
        seller
      };
    } else if ((type = "Clothes")) {
      let clothes_type = category;
      neWproduct = {
        name,
        type,
        state,
        user,
        clothes_type,
        color,
        size,
        description,
        price,
        quantity,
        wilaya,
        phone,
        email,
        seller
      };
    } else {
      let others_type = category;
      neWproduct = {
        name,
        type,
        state,
        user,
        others_type,
        color,
        size,
        description,
        price,
        quantity,
        wilaya,
        phone,
        email,
        seller
      };
    }

    // const stepThree = document.getElementById("step-3");
    // const stepFour = document.getElementById("step-4");
    neWproduct.images = img;
    console.log(neWproduct);
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/products",
      data: neWproduct
    });

    if (res.data.status === "success") {
      // stepThree.classList = "d-none";
      // stepFour.classList = "flex justify-center mt-12";
      window.setTimeout(() => {
        location.assign(`/addimages/${res.data.data.Modal._id}`);
      }, 100);
    }
  } catch (err) {
    console.log(err.response.data);
  }
};
