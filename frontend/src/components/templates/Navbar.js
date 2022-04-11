import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";

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

const Navbar = () => {
  const navigate = useNavigate();
  const [BV, setBV] = useState("");
  const onChangeBV = (event) => {
    setBV(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Canteen Portal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* <Button color="inherit" onClick={() => navigate("/users")}>
            Users
          </Button> */}
          {/* <Button color="inherit" onClick={() => navigate("/vendors")}>
            Vendors
          </Button> */}
          {localStorage.getItem("userType") === "Buyer" ||
          localStorage.getItem("userType") === "Vendor" ? (
            <Box>
              <Button color="inherit" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <Button color="inherit" onClick={() => navigate("/profile")}>
                Profile
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  localStorage.setItem("userType", null);
                  navigate("/");
                }}
              >
                Signout
              </Button>
            </Box>
          ) : (
            <Box>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              {/* <Button color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button> */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={BV}
                label="Register as"
                onChange={onChangeBV}
              >
                {" "}
                <MenuItem value={"Buyer"} onClick={() => navigate("/register")}>
                  Buyer
                </MenuItem>
                <MenuItem
                  value={"Vendor"}
                  onClick={() => navigate("/registervendor")}
                >
                  Vendor
                </MenuItem>
              </Select>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
