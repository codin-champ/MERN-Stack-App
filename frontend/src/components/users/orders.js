import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// const onAddFood = () => {
//   // axios
//   //   .post("http://localhost:4000/foodlist/registerfood", users)
//   //   .then((response) => {
//   //     setDetails(response.data);
//   //   })
//   //   .catch(function (error) {
//   //     console.log(error);
//   //   });
//   window.location = "/registerfood";
// };

const onPick = (user) => {
  if (user) {
    console.log("chaning");
    // window.location = "/editfood";

    axios
      .post("http://localhost:4000/foodstatus/pickup", user)
      .then((response) => {
        console.log("Status updated");
        // console.log(response.status);
        // if (response.status != 40) {
        //   alert("Order is not ready to be picked up");
        // }
        window.location = "/orders";
      });
  }
};

// const [bool, setBool] = useState(true);
// const changeBool = () => {
//   setBool(!bool);
//   console.log(bool);
// };

// const onReject = (user) => {
//   if (user) {
//     localStorage.setItem("FName", user.name);
//     console.log("chaning");
//     axios
//       .post("http://localhost:4000/foodstatus/reject", user)
//       .then((response) => {
//         console.log("Food rejected");
//         window.location = "/foodstatus";
//       });
//     //   window.location = "/editfood";
//   }
// };

const UsersList = (props) => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const shop = localStorage.getItem("Name");
    axios
      .get("http://localhost:4000/foodstatus/myorders", {
        params: { name: shop },
      })
      .then((response) => {
        setUsers(response.data);
        setSortedUsers(response.data);
        setSearchText("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sortChange = () => {
    let usersTemp = users;
    const flag = sortName;
    usersTemp.sort((a, b) => {
      if (a.date != undefined && b.date != undefined) {
        return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
      } else {
        return 1;
      }
    });
    setUsers(usersTemp);
    setSortName(!sortName);
  };

  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };

  return (
    <div>
      <Box>
        {/* <Grid item xs={12}>
          <Button variant="contained" onClick={onAddFood}>
            Add Food
          </Button>
        </Grid> */}
      </Box>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              <h1>Status Key</h1>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              id="standard-basic"
              label="Search"
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              // onChange={customFunction}
            />
          </List>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <Grid container spacing={2}>
                {/* <Grid item xs={12}>
                  Salary
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    id="standard-basic"
                    label="Status 0 - Order Placed"
                    fullWidth={true}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-basic"
                    label="Status 10 - Order Accepted"
                    fullWidth={true}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-basic"
                    label="Status 20 - Order Cooking"
                    fullWidth={true}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-basic"
                    label="Status 30 - Order Ready for Pickup"
                    fullWidth={true}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-basic"
                    label="Status 40 - Order Completed"
                    fullWidth={true}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-basic"
                    label="Status 100 - Order Rejected"
                    fullWidth={true}
                    disabled
                  />
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            {/* <ListItem divider>
              <Autocomplete
                id="combo-box-demo"
                options={users}
                getOptionLabel={(option) => option.name}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Names"
                    variant="outlined"
                  />
                )}
              />
            </ListItem> */}
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  <TableCell>
                    {" "}
                    {/* <Button onClick={sortChange}>
                      {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button> */}
                    Shop
                  </TableCell>
                  <TableCell>Food Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>User Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind + 1}</TableCell>
                    <TableCell>{user.shop}</TableCell>
                    <TableCell>{user.foodname}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>{user.user_name}</TableCell>
                    {/* <TableCell>
                      <Button
                        variant="contained"
                        // disabled={bool}
                        onClick={(event) => onPick(user)}
                      >
                        Picked Up
                      </Button>
                    </TableCell> */}
                    {/* <TableCell>
                      <Button
                        variant="contained"
                        onClick={(event) => onReject(user)}
                      >
                        Reject
                      </Button>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default UsersList;
