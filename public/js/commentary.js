export const addComment = async (comment, user, product, username) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/commentary",
      data: {
        comment,
        user,
        product
      }
    });

    if (res.data.status === "success") {
      document.getElementById("allCommentary").insertAdjacentHTML(
        "afterbegin",
        `<div class="flex br-top mb-2" > 
            <image src="./img/user.jpg" style="width:40px; height:40px; border-radius:50%;"/> 
            <div class="flex flex-col ml-4"> 
                  <div class="text-xl cl-dark mt-2"> ${username} </div> 
                  <div class="text-md cl-dark-2 "> ${comment} </div> 
                  <div class="text-md cl-grey"> Published today </div> 
            </div>      
        </div>`
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export const display_comment = async (lenght, id) => {
  try {
    if (Number.isInteger(lenght / 3)) {
      const get_com = await axios.get(
        `http://localhost:3000/api/v1/commentary?limit=3&page=${lenght / 3 +
          1}`,
        {
          params: {
            product: id
          }
        }
      );

      const all = get_com.data.data.data;
      console.log(all);
      if (all && all.length > 0) {
        all.forEach(one => {
          const mydate2 = new Date(one.createdAt);
          const mydate3 = new Date();
          const date_com = mydate2.toLocaleString("en-us", {
            day: "numeric",
            month: "long",
            year: "numeric"
          });
          const date_now = mydate3.toLocaleString("en-us", {
            day: "numeric",
            month: "long",
            year: "numeric"
          });

          let date;
          if (date_com === date_now) {
            date = "today";
          } else {
            date = date_com;
          }

          document.getElementById("allCommentary").insertAdjacentHTML(
            "beforeend",
            `<div class="flex br-top mb-2" > 
              <image src="./img/user.jpg" style="width:40px; height:40px; border-radius:50%;"/> 
              <div class="flex flex-col ml-4"> 
                    <div class="text-xl cl-dark mt-2"> ${one.user.username} </div> 
                    <div class="text-md cl-dark-2 "> ${one.comment} </div> 
                    <div class="text-md cl-grey"> Published ${date} </div> 
              </div>      
          </div>`
          );
        });
      } else {
        document.getElementById("showcom").className = "d-none";
      }
    } else {
      document.getElementById("showcom").className = "d-none";
    }
  } catch (err) {
    console.log(err);
  }
};
