import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";

const Profile = (props) => {
  const [details, setDetails] = useState({});
  const [name, setName] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [age, setAge] = useState("");
  const [batchname, setBatchname] = useState("");

  const onChangeName = (event) => {
    // setName(event.target.value);
    console.log(details.money);
    console.log(event.target.value);
    var x = parseInt(details.money) + parseInt(event.target.value);
    console.log(x);
    // setDetails({
    //   ...details,
    //   money: parseInt(details.money) + parseInt(event.target.value),
    // });
    setDetails({
      ...details,
      money: x,
    });
  };

  const onChangeContactnumber = (event) => {
    // setContactnumber(event.target.value);
    setDetails({
      ...details,
      contactnumber: event.target.value,
    });
  };

  //   const onChangeAge = (event) => {
  //     setDetails({
  //       ...details,
  //       age: event.target.value,
  //     });
  //   };

  //   const onChangeBatchname = (event) => {
  //     setDetails({
  //       ...details,
  //       batchname: event.target.value,
  //     });
  //   };

  //   const resetInputs = () => {
  //     setName({ name });
  //     setContactnumber({ contactnumber });
  //     setAge({ age });
  //     setBatchname({ batchname });
  //   };

  const user = {
    email: localStorage.getItem("Email"),
  };

  const [bool, setBool] = useState(true);
  const changeBool = () => {
    setBool(!bool);
    console.log(bool);
  };

  const onSubmitUser = () => {
    axios
      .post("http://localhost:4000/profile/addmoney", details)
      .then((response) => {
        setDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    changeBool();
  };

  const onSubmitVendor = () => {
    axios
      .post("http://localhost:4000/profile/editvendor", details)
      .then((response) => {
        setDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    changeBool();
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
    if (localStorage.getItem("userType") === "Buyer") {
      axios
        .post("http://localhost:4000/profile/user", user)
        .then((response) => {
          // alert("Profile of: \t" + response.data.name);
          setDetails(response.data);
          localStorage.setItem("Money", response.data.money);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .post("http://localhost:4000/profile/vendor", user)
        .then((response) => {
          // alert("Profile of: \t" + response.data.name);
          setDetails(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);
  return (
    <Box>
      {localStorage.getItem("userType") === "Buyer" ? (
        <Box>
          <Grid container align={"centre"}>
            <Grid item xs={12}>
              <TextField
                label="Current Balance"
                variant="outlined"
                value={details.money}
                disabled={bool}
              />
              <TextField
                label="Add Money"
                variant="outlined"
                value={details.money}
                onChange={onChangeName}
                disabled={bool}
              />
            </Grid>
            <Button variant="contained" onClick={changeBool}>
              Add Money
            </Button>
            <Button variant="contained" onClick={(event) => onSubmitUser()}>
              Submit
            </Button>
          </Grid>
        </Box>
      ) : (
        <Box>
          <Grid container align={"centre"}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                value={details.email}
                disabled
              />
              <TextField
                label="Name"
                variant="outlined"
                value={details.name}
                onChange={onChangeName}
                disabled={bool}
              />
              <TextField
                label="Contact number"
                variant="outlined"
                value={details.contactnumber}
                onChange={onChangeContactnumber}
                disabled={bool}
              />
              <TextField
                label="Shop name"
                variant="outlined"
                value={details.shopname}
                disabled
              />
            </Grid>
            <Button variant="contained" onClick={changeBool}>
              Edit
            </Button>
            <Button variant="contained" onClick={onSubmitVendor}>
              Submit
            </Button>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
