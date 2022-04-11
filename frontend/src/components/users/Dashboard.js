import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
// import Autocomplete from '@mui/material/Autocomplete';
// import CircularProgress from '@mui/material/CircularProgress';

// function sleep(delay = 0) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// }

const changeFoodList = () => {
  window.location = "/foodlist";
};

const changeFoodStatus = () => {
  window.location = "/foodstatus";
};

const changeMenu = () => {
  window.location = "/menu";
};

const changeOrder = () => {
  window.location = "/orders";
};

const changeWallet = () => {
  window.location = "/wallet";
};

const Dashboard = (props) => {
  const [details, setDetails] = useState([]);

  const user = {
    email: localStorage.getItem("Email"),
  };

  useEffect(() => {
    if (localStorage.getItem("userType") === "Buyer") {
      axios
        .post("http://localhost:4000/dashboard/user", user)
        .then((response) => {
          // alert("Profile of: \t" + response.data.name);
          setDetails(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .post("http://localhost:4000/dashboard/vendor", user)
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
          <Grid item xs={12}>
            {/* <TextField label="Email" variant="outlined" value={details.email} /> */}
            {/* <TextField
                  id="outlined-read-only-input"
                  label="Email"
                  defaultValue= {details.email}
                  InputProps={{
                    readOnly: true,
                  }}
                /> */}
            {/* <TextField label="Name" variant="outlined" value={details.name} />
            <TextField
              label="Contact number"
              variant="outlined"
              value={details.contactnumber}
            />
            <TextField label="Age" variant="outlined" value={details.age} />
            <TextField
              label="Batch name"
              variant="outlined"
              value={details.batchname}
            /> */}
            <Box>
              <Grid item xs={12}>
                <Button variant="contained" onClick={changeMenu}>
                  Menu
                </Button>
                <Button variant="contained" onClick={changeOrder}>
                  Orders
                </Button>
                <Button variant="contained" onClick={changeWallet}>
                  Wallet
                </Button>
              </Grid>
            </Box>
            {/* <TextField
                  id="outlined-read-only-input"
                  label="Name"
                  defaultValue= {details.name}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  id="outlined-read-only-input"
                  label="Contact number"
                  defaultValue= {details.contactnumber}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  id="outlined-read-only-input"
                  label="age"
                  defaultValue= {details.age}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  id="outlined-read-only-input"
                  label="Batch number"
                  defaultValue= {details.batchname}
                  InputProps={{
                    readOnly: true,
                  }}
                />                 */}
          </Grid>
        </Box>
      ) : (
        <Box>
          <Grid item xs={12}>
            <Button variant="contained" onClick={changeFoodList}>
              Food List
            </Button>
            <Button variant="contained" onClick={changeFoodStatus}>
              Status
            </Button>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
