import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Register = (props) => {
  const [name, setName] = useState("");
  const [shop, setShop] = useState("");
  const [vegnveg, setVegnveg] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [date, setDate] = useState(null);

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeShop = (event) => {
    setShop(event.target.value);
  };

  const onChangeVeg = (event) => {
    setVegnveg(event.target.value);
  };

  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const onChangeRating = (event) => {
    setRating(event.target.value);
  };


  const resetInputs = () => {
    setName("");
    setShop("");
    setVegnveg("");
    setPrice("");
    setRating("");
    setDate(null);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      shop: shop,
      vegnveg: vegnveg,
      price: price,
      rating: rating,
      date: Date.now(),
    };

//   const onAddFood = () => {
//     axios
//       .post("http://localhost:4000/foodlist/registerfood", details) 
//       .then((response) => {
//         setDetails(response.data);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//       changeBool();
//   }
    axios
      .post("http://localhost:4000/foodlist/registerfood", newUser)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });

    resetInputs();
    window.location = "/foodlist";
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={onChangeUsername}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Shop"
          variant="outlined"
          value={shop}
          onChange={onChangeShop}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Veg / Non-veg"
          variant="outlined"
          value={vegnveg}
          onChange={onChangeVeg}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Price"
          variant="outlined"
          value={price}
          onChange={onChangePrice}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Initial Rating"
          variant="outlined"
          value= {0}
          onChange={onChangeRating}
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default Register;
