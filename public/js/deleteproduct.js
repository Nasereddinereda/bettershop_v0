import { showAlert } from './alerts';

export const deleteProduct = async product => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://localhost:3000/api/v1/products/${product}`
    });

    if (res.data.status === "success") {

      window.setTimeout(() => {
        showAlert('success', 'Product deleted');
        location.assign("/product");
      }, 900);


      
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};


export const addimages = async (data , id ) => {
  try{
    const res = await axios({
      method: "PATCH",
      url: `http://localhost:3000/api/v1/products/${id}`,
      data 
    });
    if (res.data.status === "success") {
      console.log("updated successfully");
      showAlert('success', 'images Product added');
      location.assign(`/me/sale`);
 }
  }catch(err){
    showAlert('error', err.response.data.message);
  }
}