import { showAlert } from './alerts';

export const addFavory = async (product, user) => {
  try {
    const res = await axios({
      method: "POST",
      url: `http://localhost:3000/api/v1/favory`,
      data: {
        user,
        product
      }
    });

    if (res.data.status === "success") {
      showAlert('success', 'Product successfully added');
      document.getElementById("addfavory").classList = "d-none";
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteFavory = async favory => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://localhost:3000/api/v1/favory/${favory}`
    });

    if (res.data.status === "success") {
      showAlert('success', 'Product successfully deleted');
      document.getElementById("deletefavory").classList = "d-none";
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
