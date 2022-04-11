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

// const onNext = (user) => {
//   if (user) {
//     localStorage.setItem("OName", user.user_name);
//     localStorage.setItem("OStatus", user.status + 10);
//     console.log("chaning");
//     // window.location = "/editfood";

//     axios
//       .post("http://localhost:4000/foodstatus/next", user)
//       .then((response) => {
//         console.log("Status updated");
//         window.location = "/foodstatus";
//       });
//   }
// };

const onSubmit = () => {
  console.log("chaning");
  const user = {
    user_name: localStorage.getItem("Name"),
    user_email: localStorage.getItem("Email"),
    foodname: localStorage.getItem("FName"),
    shop: localStorage.getItem("FShop"),
    status: 0,
    quantity: localStorage.getItem("OQuantity"),
  };
  axios
    .post("http://localhost:4000/foodstatus/registerorder", user)
    .then((response) => {
      console.log("Order Registered");
      window.location = "/menu";
    });
  //   window.location = "/editfood";
};

const UsersList = (props) => {
  const [quantity, setQuantity] = useState("");
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");

  const onChangeQuantity = (event) => {
    localStorage.setItem("OQuantity", event.target.value);
    setQuantity(event.target.value);
  };

  useEffect(() => {
    const shop = localStorage.getItem("Shop");
    axios
      .get("http://localhost:4000/foodstatus", { params: { shop: shop } })
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
              <h1>Filters</h1>
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
                <Grid item xs={12}>
                  Salary
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Min"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Max"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem divider>
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
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableBody>
                <TableCell>
                  <TextField
                    label="Quantity"
                    variant="outlined"
                    value={quantity}
                    onChange={onChangeQuantity}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" onClick={(event) => onSubmit()}>
                    Submit
                  </Button>
                </TableCell>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default UsersList;
