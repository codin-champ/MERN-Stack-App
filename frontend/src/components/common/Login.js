import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import * as React from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [BV, setBV] = useState("");
  const [date, setDate] = useState(null);

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeBV = (event) => {
    setBV(event.target.value);
  };

  const resetInputs = () => {
    setEmail("");
    setPassword("");
    setBV("");
    setDate(null);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      email: email,
      password: password,
      date: Date.now(),
    };

    localStorage.setItem("userType", BV);

    if (localStorage.getItem("userType") === "Buyer") {
      axios
        .post("http://localhost:4000/user/login", newUser)
        .then((response) => {
          alert("Logged in as \t" + response.data.name);
          localStorage.setItem("Email", response.data.email);
          localStorage.setItem("Name", response.data.name);
          console.log(response.data);
          window.location = "/profile";
        });

      resetInputs();
    } else {
      axios
        .post("http://localhost:4000/vendor/login", newUser)
        .then((response) => {
          alert("Logged in as \t" + response.data.name);
          localStorage.setItem("Email", response.data.email);
          localStorage.setItem("Shop", response.data.shopname);
          localStorage.setItem("Name", response.data.name);
          console.log(response.data);
          window.location = "/profile";
        });

      resetInputs();
    }
  };

  return (
    <Grid container align={"center"} spacing={2}>
      {/* <div>hello</div> */}
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="password"
          variant="outlined"
          value={password}
          onChange={onChangePassword}
        />
      </Grid>

      {/* <Grid item xs={12}>
        <TextField
          label="Buyer/Vendor"
          variant="outlined"
          value={BV}
          onChange={onChangeBV}
        />
      </Grid> */}

      <Grid item xs={12}>
        <FormControl spacing={5}>
          <InputLabel id="demo-simple-select-label">Buyer/Vendor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={BV}
            label="BV"
            onChange={onChangeBV}
          >
            <MenuItem value={"Buyer"}>Buyer</MenuItem>
            <MenuItem value={"Vendor"}>Vendor</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};
export default Login;
