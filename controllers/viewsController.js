const Product = require("../models/productModel");
const User = require("../models/userModel");
const axios = require("axios");

exports.getShowcase = (req, res) => {
  res.status(200).render("index", {
    title: "Showcase"
  });
};

exports.getallproduct = async (req, res) => {
  let products;
  let type_products = Product.schema.path("type").enumValues;
  let cat_products;
  let url;
  let get;
  let cate,
    market = "";
  let search;

  if (req.params[0] === "-market") {
    market = "-market";
    if (req.params.prod && req.params.cat) {
      get = await axios.get(
        `http://localhost:3000/api/v1/products?type=${
          req.params.prod
        }&${req.params.prod.toLowerCase()}_type=${req.params.cat}&seller=User`
      );
      cat_products = Product.schema.path(
        `${req.params.prod.toLowerCase()}_type`
      ).enumValues;
      url = req.params.prod;
      cate = req.params.cat;
    } else if (req.params.prod) {
      get = await axios.get(
        `http://localhost:3000/api/v1/products?type=${req.params.prod}&seller=User`
      );
      cat_products = Product.schema.path(
        `${req.params.prod.toLowerCase()}_type`
      ).enumValues;
      url = req.params.prod;
    } else {
      get = await axios.get(
        `http://localhost:3000/api/v1/products?seller=User`
      );
    }
  } else {
    if (req.params.prod && req.params.cat) {
      get = await axios.get(
        `http://localhost:3000/api/v1/products?type=${
          req.params.prod
        }&${req.params.prod.toLowerCase()}_type=${req.params.cat}&seller=Admin`
      );
      cat_products = Product.schema.path(
        `${req.params.prod.toLowerCase()}_type`
      ).enumValues;
      url = req.params.prod;
      cate = req.params.cat;
    } else if (req.params.prod) {
      get = await axios.get(
        `http://localhost:3000/api/v1/products?type=${req.params.prod}&seller=Admin`
      );
      cat_products = Product.schema.path(
        `${req.params.prod.toLowerCase()}_type`
      ).enumValues;
      url = req.params.prod;
    } else {
      if (req.params[1] === "-search") {
        let link = "?";

        if (req.query.type) {
          if (link !== "?") {
            link += "&";
          }
          link += `type=${req.query.type}`;
        }
        if (req.query.cate) {
          if (link !== "?") {
            link += "&";
          }

          link += `${req.query.type.toLowerCase()}_type=${req.query.cate}`;
        }

        if (req.query.state) {
          if (link !== "?") {
            link += "&";
          }
          link += `state=${req.query.state}`;
        }
        if (req.query.size) {
          if (link !== "?") {
            link += "&";
          }
          link += `size=${req.query.size}`;
        }
        if (req.query.color) {
          if (link !== "?") {
            link += "&";
          }
          link += `color=${req.query.color}`;
        }
        search = true;
        get = await axios.get(`http://localhost:3000/api/v1/products${link}`);
      } else if (req.params[2] === "-fastsearch"){
        get = await axios.get(`http://localhost:3000/api/v1/products`);
        const array =get.data.data.data;
        const search =req.query.search;
        const newarray=[] ; 
        array.forEach(elm =>{
          if (elm.name.includes(search.toLowerCase()) || elm.description.includes(search.toLowerCase())){
          newarray.push(elm)
          }
        });
        get.data.data.data = newarray ;
      } 
      else {
        get = await axios.get(
          `http://localhost:3000/api/v1/products?seller=Admin`
        );
      }
    }
  }

  products = get.data.data;

  res.status(200).render("overview", {
    products,
    type_products,
    cat_products,
    url,
    cate,
    market,
    search
  });
};

exports.signUp = (req, res) => {
  res.status(200).render("signup", {
    title: "signUp"
  });
};

exports.upDateMe = async (req, res) => {
  res.status(200).render("signup", {
    title: "signUp"
  });
};

exports.upDate = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      last_name: req.body.last_name,
      first_name: req.body.first_name,
      username: req.body.username,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );
  res.status(200).render("signup", {
    title: "signUp",
    user: updatedUser
  });
};
exports.signIn = (req, res) => {
  res.status(200).render("signin", {
    title: "signIn"
  });
};

exports.addProduct = (req, res) => {
  let type_products = Product.schema.path("type").enumValues;
  let state_products = Product.schema.path("state").enumValues;
  let dress_type = Product.schema.path("dress_type").enumValues;
  let makeup_type = Product.schema.path("makeup_type").enumValues;
  let clothes_type = Product.schema.path("clothes_type").enumValues;
  let others_type = Product.schema.path("others_type").enumValues;

  res.status(200).render("addProduct", {
    title: "addProduct",
    type_products,
    state_products,
    dress_type,
    makeup_type,
    clothes_type,
    others_type
  });
};

exports.addImages = (req, res) => {
  res.status(200).render("addImages", {
    title: "addImages"
  });
};

exports.getMe = async (req, res) => {
  let products,
    get_1,
    get_2,
    stateprod,
    statefav,
    statesell = "Not Yet";

  const page = req.params.page;
  get_1 = await axios.get(`http://localhost:3000/api/v1/products`, {
    params: {
      user: `${res.locals.user._id}`
    }
  });
  stateprod = get_1.data.data.data.length;
  get_2 = await axios.get(`http://localhost:3000/api/v1/favory`, {
    params: {
      user: `${res.locals.user._id}`
    }
  });

  statefav = get_2.data.data.data.length;

  if (page === "sale") {
    products = get_1.data.data.data;
  } else if (page === "favorite") {
    const favorites = get_2.data.data.data;

    if (favorites) {
      products = [];
      favorites.forEach(fav => {
        products.push(fav.product);
      });
    }
  }

  res.status(200).render("getMe", {
    title: "Profil",
    page,
    products,
    stateprod,
    statefav,
    statesell
  });
};

exports.getProduct = async (req, res) => {
  let type_products = Product.schema.path("type").enumValues;
  let cat_products,
    market = "";

  // Commentary
  const get_com = await axios.get(
    `http://localhost:3000/api/v1/commentary?limit=3`,
    {
      params: {
        product: req.params.id
      }
    }
  );
  const get_prod = await axios.get(`http://localhost:3000/api/v1/products`, {
    params: {
      _id: req.params.id
    }
  });

  const Comments = get_com.data.data.data.reverse();
  const product = get_prod.data.data.data[0];

  cat_products = Product.schema.path(`${req.params.prod.toLowerCase()}_type`)
    .enumValues;

  const user_product = product.user;

  let date;
  if (product.date) {
    date = new Date(product.date);
    date = date.toLocaleDateString("en-us", { month: "long", year: "numeric" });
  }

  //Favorite
  let get;

  if (res.locals.user) {
    get = await axios.get(`http://localhost:3000/api/v1/favory`, {
      params: {
        user: `${res.locals.user._id}`
      }
    });
  }

  let favorites;
  if (get) {
    favorites = get.data.data.data;
  }

  let favory;

  if (favorites) {
    favorites.forEach(fav => {
      if (fav.product._id === product._id) {
        favory = fav._id;
      }
    });
  }

  if (product.seller !== "Admin") {
    market = "-market";
  }

  const cate = req.params.cat;
  res.status(200).render("getProduct", {
    title: "Profil",
    product,
    type_products,
    cat_products,
    date,
    user_product,
    Comments,
    favory,
    market,
    cate
  });
};
