import "@babel/polyfill";
import { login, logout, signup, update, updatePSW } from "./login";
import { addproduct } from "./addproduct";
import { deleteProduct, addimages } from "./deleteproduct";
import { addFavory, deleteFavory } from "./favory";
import { addComment, display_comment } from "./commentary";
import { showAlert } from "./alerts";

// DOM ELEMENT
const signinForm = document.getElementById("signin");
const logoutForm = document.getElementById("logout");
const signupForm = document.getElementById("signup");
const updateForm = document.getElementById("update");
const stepOne = document.getElementById("step-1");
const stepTwo = document.getElementById("step-2");
const stepThree = document.getElementById("step-3");
// const stepFour = document.getElementById("step-4");
const addNewComment = document.getElementById("addComment");
const commentary = document.getElementById("commentary");
const showcom = document.getElementById("showcom");
const addfavory = document.getElementById("addfavory");
const deletefavory = document.getElementById("deletefavory");
const deleteproduct = document.getElementById("deleteproduct");
const updatePsw = document.getElementById("updatePsw");
const addimgs = document.getElementById("addimgs");
const search = document.getElementById("search");
const searchtop = document.getElementById("Searchtop");
const icon_st = document.getElementById("icon_st");
const icon_st_1 = document.getElementById("icon_st_1");

let name,
  type,
  state,
  user,
  category,
  color,
  size = [],
  desc,
  price,
  quantity,
  wilaya,
  email,
  phone,
  seller;

if (addimgs) {
  addimgs.addEventListener("submit", e => {
    e.preventDefault();
    const form = new FormData();
    form.append("images", document.getElementById("image").files[0]);
    form.append("images", document.getElementById("image").files[1]);
    form.append("images", document.getElementById("image").files[2]);
    const id = location.href.split("/")[location.href.split("/").length - 1];
    addimages(form, id);
  });
}

if (signinForm) {
  signinForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", e => {
    e.preventDefault();
    // const form = new FormData();
    // form.append("last_name", document.getElementById("last_name").value);
    // form.append("first_name", document.getElementById("first_name").value);
    // form.append("username", document.getElementById("username").value);
    // form.append("email", document.getElementById("email").value);
    // form.append("password", document.getElementById("password").value);
    // form.append(
    //   "passwordconfirm",
    //   document.getElementById("confirm_password").value
    // );

    const form = {};
    (form.last_name = document.getElementById("last_name").value),
      (form.first_name = document.getElementById("first_name").value),
      (form.username = document.getElementById("username").value),
      (form.email = document.getElementById("email").value),
      (form.phone = document.getElementById("phone").value),
      (form.password = document.getElementById("password").value),
      (form.passwordconfirm = document.getElementById(
        "confirm_password"
      ).value);

    form.phone = parseInt(form.phone, 10).toString();
    let zero = "0";
    form.phone = zero.concat("", form.phone);
    if (
      form.phone.length != 10 ||
      form.phone[0] !== "0" ||
      (form.phone[1] !== "5" && form.phone[1] !== "6" && form.phone[1] !== "7")
    ) {
      showAlert("error", "give us a correct number");
    } else if (
      !form.last_name ||
      !form.first_name ||
      !form.username ||
      !form.email ||
      !form.password ||
      !form.passwordconfirm
    ) {
      showAlert("error", "tell us all your information");
    } else {
      signup(form);
    }
  });
}

if (updateForm) {
  updateForm.addEventListener("submit", e => {
    const form = new FormData();
    form.append("last_name", document.getElementById("last_name").value);
    form.append("first_name", document.getElementById("first_name").value);
    form.append("username", document.getElementById("username").value);
    form.append("email", document.getElementById("email").value);
    form.append("phone", document.getElementById("phone").value);

    let phone = document.getElementById("phone").value;
    phone = parseInt(phone, 10).toString();
    let zero = "0";
    phone = zero.concat("", phone);

    if (document.getElementById("image").files[0]) {
      form.append("image", document.getElementById("image").files[0]);
    }

    if (
      phone.length != 10 ||
      phone[0] !== "0" ||
      (phone[1] !== "5" && phone[1] !== "6" && phone[1] !== "7")
    ) {
      showAlert("error", "give us a correct number");
    } else {
      update(form);
    }
  });
}

if (updatePsw) {
  updatePsw.addEventListener("submit", e => {
    e.preventDefault();
    const cupsw = document.getElementById("upCurPassword").value;
    const npsw = document.getElementById("upPassword").value;
    const cpsw = document.getElementById("upConfirm_password").value;
    updatePSW(cupsw, npsw, cpsw);
  });
}

if (logoutForm) {
  logoutForm.addEventListener("click", logout);
}

if (stepOne) {
  stepOne.addEventListener("submit", e => {
    e.preventDefault();
    name = document.getElementById("name").value;
    user = document.getElementById("name").getAttribute("data-user");
    seller = document.getElementById("name").getAttribute("data-user-role");
    type = document.getElementById("type").value;
    state = document.getElementById("state").value;

    if (name && user && type && state) {
      stepOne.classList = "d-none";
      stepTwo.classList = "flex flex-col addProduct";

      let cates = [];

      if (type === "Dress") {
        document.getElementById("size").classList = "flex flex-col";
        cates = document
          .getElementById("category")
          .getAttribute("data-dress")
          .split(",");
      } else if (type === "MakeUp") {
        cates = document
          .getElementById("category")
          .getAttribute("makeup-type")
          .split(",");
      } else if (type === "Clothes") {
        cates = document
          .getElementById("category")
          .getAttribute("clothes-type")
          .split(",");
      } else {
        cates = document
          .getElementById("category")
          .getAttribute("others-type")
          .split(",");
      }

      document.getElementById(
        "category"
      ).innerHTML += `<option value="" > --Please choose category-- </option>`;
      cates.forEach(cat => {
        document.getElementById(
          "category"
        ).innerHTML += `<option value="${cat}" > ${cat} </option>`;
      });
    } else {
      showAlert("error", "tell us all product information");
    }
  });
}

if (stepTwo) {
  stepTwo.addEventListener("submit", e => {
    e.preventDefault();

    category = document.getElementById("category").value;
    color = document.getElementById("color").value;
    desc = document.getElementById("desc").value;
    price = document.getElementById("price").value;
    quantity = document.getElementById("quantity").value;

    if (category && color && desc && price) {
      stepTwo.classList = "d-none";
      stepThree.classList = "flex flex-col addProduct";

      if (document.getElementById("S").checked) {
        size.push("S");
      }
      if (document.getElementById("M").checked) {
        size.push("M");
      }
      if (document.getElementById("L").checked) {
        size.push("L");
      }
      if (document.getElementById("XL").checked) {
        size.push("XL");
      }
      if (document.getElementById("XXL").checked) {
        size.push("XXL");
      }
      if (document.getElementById("3XL").checked) {
        size.push("3XL");
      }
    } else {
      showAlert("error", "tell us all product information");
    }
  });
}

if (stepThree) {
  stepThree.addEventListener("submit", e => {
    e.preventDefault();

    wilaya = document.getElementById("wilaya").value;
    phone = document.getElementById("phone").value;
    email = document.getElementById("email").value;
    if (wilaya && phone && email) {
      addproduct(
        name,
        type,
        state,
        user,
        category,
        color,
        size,
        desc,
        price,
        quantity,
        wilaya,
        phone,
        email,
        seller
      );
    } else {
      showAlert("error", "tell us all product information");
    }
  });
}
// npm  i parcel-bundler
// npm i axios
// npm i @babel/polyfill

// Get One Product

const img = document.getElementById("img");
const img_1 = document.getElementById("img-1");
const img_2 = document.getElementById("img-2");
const img_3 = document.getElementById("img-3");

if (img) {
  const product = JSON.parse(
    document.getElementById("img-1").getAttribute("data-product")
  );
  img_1.addEventListener("click", () => {
    img.innerHTML = `<image src="./img/products/${product.images[0]}"  > </image>`;
  });
  img_2.addEventListener("click", e => {
    e.preventDefault();
    img.innerHTML = `<image src="./img/products/${product.images[1]}"> </image>`;
  });
  img_3.addEventListener("click", () => {
    img.innerHTML = `<image src="./img/products/${product.images[2]}"> </image>`;
  });
}

const img_mob = document.getElementById("img-mob");
const img_1_mob = document.getElementById("img-1-mob");
const img_2_mob = document.getElementById("img-2-mob");
const img_3_mob = document.getElementById("img-3-mob");

if (img_mob) {
  const product = JSON.parse(
    document.getElementById("img-1-mob").getAttribute("data-product")
  );
  img_1_mob.addEventListener("touchend", () => {
    img_mob.innerHTML = `<image src="./img/products/${product.images[0]}"  > </image>`;
  });
  img_2_mob.addEventListener("touchend", e => {
    e.preventDefault();
    img_mob.innerHTML = `<image src="./img/products/${product.images[1]}"> </image>`;
  });
  img_3_mob.addEventListener("touchend", () => {
    img_mob.innerHTML = `<image src="./img/products/${product.images[2]}"> </image>`;
  });
}

if (addNewComment) {
  addNewComment.addEventListener("click", e => {
    e.preventDefault();
    const text = commentary.value;
    const user = addNewComment.getAttribute("data-user");
    const username = addNewComment.getAttribute("data-username");
    const product = addNewComment.getAttribute("data-product");
    commentary.value = "";
    addComment(text, user, product, username);
  });
}
// Commentary

if (showcom) {
  showcom.addEventListener("click", e => {
    e.preventDefault();

    const product = addNewComment.getAttribute("data-product");
    const nbr = document.getElementById("allCommentary").childElementCount;
    display_comment(nbr, product);
  });
}

// Favory

if (addfavory) {
  addfavory.addEventListener("click", e => {
    const user = JSON.parse(
      document.getElementById("addfavory").getAttribute("data-user")
    );
    const product = JSON.parse(
      document.getElementById("addfavory").getAttribute("data-product")
    );

    addFavory(product._id, user._id);
  });
}

if (deletefavory) {
  deletefavory.addEventListener("click", () => {
    const favory = document
      .getElementById("deletefavory")
      .getAttribute("data-favory");
    deleteFavory(favory);
  });
}

if (deleteproduct) {
  deleteproduct.addEventListener("click", () => {
    const product = document
      .getElementById("deleteproduct")
      .getAttribute("data-product");
    deleteProduct(product);
  });
}

// Search
if (search) {
  search.addEventListener("submit", e => {
    e.preventDefault();
    let form = {};
    let link = "?";
    const type = document.getElementById("type").value;
    const cate = document.getElementById("cate").value;
    const state = document.getElementById("state").value;
    const size = document.getElementById("size").value;
    const color = document.getElementById("color").value;
    if (type != "--Please choose an option--") {
      form.type = type;

      if (link !== "?") {
        link += "&";
      }

      link += `type=${type}`;
    }
    if (cate != "--Please choose an option--") {
      form.cate = cate;
      if (link !== "?") {
        link += "&";
      }
      link += `cate=${cate}`;
    }
    if (state != "--Please choose an option--") {
      form.state = state;
      if (link !== "?") {
        link += "&";
      }
      link += `state=${state}`;
    }
    if (
      size != "--Please choose an option--" &&
      size != "--he doesn't have this option--"
    ) {
      form.size = size;
      if (link !== "?") {
        link += "&";
      }
      link += `size=${size}`;
    }
    if (color != "SEVERAL COLORS") {
      form.color = color;
      if (link !== "?") {
        link += "&";
      }
      link += `color=${color}`;
    }

    const tab = window.location.href.split("product");
    link = tab[0] + "product-search" + link;
    location.assign(link);
  });
}

if (icon_st){
  icon_st.addEventListener("click", () =>{
    if (searchtop.value){
      const tab = window.location.href.split("product");
      let link = tab[0] + "product-fastsearch" + `?search=${searchtop.value}`;
      location.assign(link);
    }
  });
}
if (icon_st_1){
  icon_st_1.addEventListener("click", () =>{
    if (searchtop.value){
      const tab = window.location.href.split("product");
      let link = tab[0] + "product-fastsearch" + `?search=${searchtop.value}`;
      location.assign(link);
    }
  });
}