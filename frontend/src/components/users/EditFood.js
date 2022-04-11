import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";

const Profile = (props) => {
  const [details, setDetails] = useState([]);
  const [name, setName] = useState("");
  const [shop, setShop] = useState("");
  const [vegnveg, setVegnveg] = useState("");
  const [price, setPrice] = useState("");

  const onChangeName = (event) => {
    // setName(event.target.value);
    setDetails({
      ...details,
      name: event.target.value,
    });
  };

  const onChangeShop = (event) => {
    // setShop(event.target.value);
    setDetails({
      ...details,
      shop: event.target.value,
    });
  };

  const onChangeVegnveg = (event) => {
    setDetails({
      ...details,
      vegnveg: event.target.value,
    });
  };

  const onChangePrice = (event) => {
    setDetails({
      ...details,
      price: event.target.value,
    });
  };

  const resetInputs = () => {
    setName({ name });
    setShop({ shop });
    setVegnveg({ vegnveg });
    setPrice({ price });
  };

  const user = {
    shop: localStorage.getItem("Shop"),
    name: localStorage.getItem("FName"),
  };

  const [bool, setBool] = useState(true);
  const changeBool = () => {
    setBool(!bool);
    console.log(bool);
  };

  const onSubmitUser = () => {
    axios
      .post("http://localhost:4000/foodlist/editfood", details)
      .then((response) => {
        setDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    changeBool();
    window.location = "/foodlist";
  };

  // if(localStorage.getItem("userType") === "Buyer")
  // {
  //   user = {
  //     email: email
  //   };
  // }
  // else {
  //   user = {
  //     email: email
  //   };
  // }

  useEffect(() => {
    axios
      .get("http://localhost:4000/foodlist/edit", {
        params: { shop: user.shop, name: user.name },
      })
      .then((response) => {
        // alert("Profile of: \t" + response.data.name);
        //   console.log(response.data);
        setDetails(response.data);
        console.log(details);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <Box>
      {
        <Box>
          <Grid container align={"centre"}>
            <Grid item xs={12}>
              {/* <TextField label="Email" variant="outlined" value={details.email} disabled/> */}
              <TextField
                label="Name"
                variant="outlined"
                value={details.name}
                onChange={onChangeName}
                disabled
              />
              <TextField
                label="Shop name"
                variant="outlined"
                value={details.shop}
                onChange={onChangeShop}
                disabled
              />
              <TextField
                label="Vegnveg"
                variant="outlined"
                value={details.vegnveg}
                onChange={onChangeVegnveg}
                disabled={bool}
              />
              <TextField
                label="Price"
                variant="outlined"
                value={details.price}
                onChange={onChangePrice}
                disabled={bool}
              />
            </Grid>
            <Button variant="contained" onClick={changeBool}>
              Edit
            </Button>
            <Button variant="contained" onClick={onSubmitUser}>
              Submit
            </Button>
          </Grid>
        </Box>
      }
    </Box>
  );
};

export default Profile;
