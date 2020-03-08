function myFunction() {
  
    if (document.getElementById("type").value === "Dress"){
        document.getElementById("cate").innerHTML ="<option> --Please choose an option-- </option> <option value='White Dresses' > White Dresses </option> <option value='Caftans' > Caftans </option> <option value='Evening Dresses' > Evening Dresses </option> <option value='Engagement Dresses' > Engagement Dresses </option> <option value='Other Dresses' > Other Dresses </option>";
        document.getElementById("size").innerHTML = "<option> --Please choose an option-- </option> <option value='S'> S </option> <option value='M'> M </option> <option value='L'> L</option><option value='XL'>XL </option><option value='XL'> XL</option><option value='XXL'>XXL </option> <option value='3XL'>3XL </option>";
    } else if (document.getElementById("type").value === "MakeUp"){
        document.getElementById("cate").innerHTML = "<option> --Please choose an option-- </option> <option value='Dyed'> Dyed </option> <option value='Eyes'> Eyes </option> <option value='Lips'> Lips </option> <option value='Nails'> Nails </option> <option value='Hair'> Hair </option> <option value='Eyebrows'> Eyebrows </option> <option value='Tools'> Tools </option> <option value='Body'> Body </option> <option value='Other MakeUp'> Other MakeUp </option>"
        document.getElementById("size").innerHTML = "<option> --he doesn't have this option-- </option>";
    } else if (document.getElementById("type").value === "Clothes"){
        document.getElementById("cate").innerHTML = "<option> --Please choose an option-- </option> <option value='Shoes'> Shoes </option> <option value='SPShoes'> SPShoes </option><option value='Pyjamas'> Pyjamas </option><option value='Nice Clothes'> Nice Clothes </option> <option value='Underwear'> Underwear </option><option value='Other Clothes'> Other Clothes </option>"
        document.getElementById("size").innerHTML = "<option> --he doesn't have this option-- </option>";
    } else if (document.getElementById("type").value === "Others"){
        document.getElementById("cate").innerHTML = "<option> --Please choose an option-- </option><option value='Carpet'> Carpet </option><option value='Sheet'> Sheet </option><option value='GuestRoom'> GuestRoom </option><option value='Ketchen'> Ketchen </option> <option value='BadRoom'> BadRoom </option> <option value='BethRoom'> BethRoom </option> <option value='Others'> Others </option>"
        document.getElementById("size").innerHTML = "<option> --he doesn't have this option-- </option>";
    }
}

