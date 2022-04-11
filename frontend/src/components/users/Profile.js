import axios from "axios";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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
    setDetails({
      ...details,
      name:event.target.value
    })
  };

  const onChangeContactnumber = (event) => {
    // setContactnumber(event.target.value);
    setDetails({
      ...details,
      contactnumber:event.target.value
    })
  };


  const onChangeAge = (event) => {
        setDetails({
      ...details,
      age:event.target.value
    })
  };

  const onChangeBatchname = (event) => {
        setDetails({
      ...details,
      batchname:event.target.value
    })
  };

  const resetInputs = () => {
    setName({name});
    setContactnumber({contactnumber});
    setAge({age});
    setBatchname({batchname});
  };



  const user = {
    email: localStorage.getItem("Email")
  };

  const [bool, setBool] = useState(true);
  const changeBool = () => {
    setBool(!bool); 
    console.log(bool);
  };

  const onSubmitUser = () => {
    axios
      .post("http://localhost:4000/profile/edituser", details) 
      .then((response) => {
        setDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
      changeBool();
  }

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
  }

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

    if(localStorage.getItem("userType") === "Buyer")
    {
      axios
        .post("http://localhost:4000/profile/user", user) 
        .then((response) => {
          // alert("Profile of: \t" + response.data.name);
          setDetails(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else
    {
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
      
        {
          localStorage.getItem("userType") === "Buyer" ?
            <Box>
              <Grid container align={"centre"}>
                  <Grid item xs={12}>
                    <TextField label="Email" variant="outlined" value={details.email} disabled/>
                    <TextField  label="Name" variant="outlined" value={details.name} onChange={onChangeName} disabled={bool}/>
                    <TextField label="Contact number" variant="outlined" value={details.contactnumber} onChange={onChangeContactnumber} disabled={bool}/>
                    <TextField label="Age" variant="outlined" value={details.age} onChange={onChangeAge} disabled={bool}/>
                    <TextField label="Batch name" variant="outlined" value={details.batchname} onChange={onChangeBatchname} disabled={bool}/>
                  </Grid>
                  <Button variant="contained" onClick={changeBool}>
                        Edit
                  </Button>
                  <Button variant="contained" onClick={onSubmitUser}>
                    Submit
                  </Button>
              </Grid>
            </Box>
            :
            // <Box>
            //   <Grid container align={"centre"}>
            //   <Grid item xs={12}>
            //     <TextField label="Email" id="outlined-read-only-input" value={details.email} InputProps={{
            //         readOnly: true,
            //       }} />
            //     <TextField label="Name" id="outlined-read-only-input" value={details.name} InputProps={{
            //         readOnly: true,
            //       }}/>
            //     <TextField label="Shop name" id="outlined-read-only-input" value={details.shopname} InputProps={{
            //         readOnly: true,
            //       }}/>
            //     <TextField label="Contact number" id="outlined-read-only-input" value={details.contactnumber} InputProps={{
            //         readOnly: true,
            //       }}/>
            //   </Grid>
            //       <Button variant="contained" onClick={changeBool}>
            //         Edit
            //       </Button>
            //       <Button variant="contained" onClick={onSubmitVendor}>
            //         Submit
            //       </Button>
            //       </Grid>
            // </Box>
            <Box>
              <Grid container align={"centre"}>
                  <Grid item xs={12}>
                    <TextField label="Email" variant="outlined" value={details.email} disabled/>
                    <TextField  label="Name" variant="outlined" value={details.name} onChange={onChangeName} disabled={bool}/>
                    <TextField label="Contact number" variant="outlined" value={details.contactnumber} onChange={onChangeContactnumber} disabled={bool}/>
                    <TextField label="Shop name" variant="outlined" value={details.shopname} disabled/>
                  </Grid>
                  <Button variant="contained" onClick={changeBool}>
                        Edit
                  </Button>
                  <Button variant="contained" onClick={onSubmitVendor}>
                    Submit
                  </Button>
              </Grid>
            </Box>
        }
        
    </Box>
  
  );
};

export default Profile;


















// import { useState } from "react";
// import axios from "axios";
// import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';


// const Register = (props) => {


//   const [details, setDetails] = useState([]);
  
//   const onChangeUsername = (event) => {
//     // setName(event.target.value);
//     setDets({
//       ...dets,
//       name: event.target.value,
//     })
//   };

//   // const onChangeEmail = (event) => {
//   //   setEmail(event.target.value);
//   // };

//   const onChangeContactNumber = (event) => {
    
//     setDets({
//       ...dets,
//       contactnumber: event.target.value,
//     })
//   };

//   const onChangeAge = (event) => {
//     setDets({
//       ...dets,
//       age: event.target.value,
//     })
//   };

//   const onChangeBatchName = (event) => {
//     setDets({
//       ...dets,
//       batchName: event.target.value,
//     })
//   };

//   const onChangePassword = (event) => {
//     setDets({
//       ...dets,
//       password: event.target.value,
//     })
//   };

//   const onSubmit = (event) => {
//     event.preventDefault();

//     const newUser = {
//       name: details.name,
//       email: details.email,
//       contactnumber: details.contactnumber,
//       age: details.age,
//       batchName: details.batchName,
//       password: details.password,
//       type: 1

//     };

    

//     console.log(newUser);

//     const user = {
//       email: localStorage.getItem("Email")
//     };



//     axios
//         .post("http://localhost:4000/profile/user", user) 
//         .then((response) => {
//           // alert("Profile of: \t" + response.data.name);
//           setDetails(response.data);
//         })
//         .catch(function (error) {
//           console.log(error);
//         });

//     axios
//       .put("http://localhost:4000/profile/edit", newUser)
//       .then((response) => {
//         alert("Created\t" + response.data.name);
//         localStorage.setItem("name", response.data.name);
//         localStorage.setItem("contactnumber", response.data.contactnumber);
//         localStorage.setItem("age", response.data.age);
//         localStorage.setItem("batchName", response.data.batchName);
//         localStorage.setItem("password", response.data.password);
//         setBool(!bool); 


//         console.log(response.data);
//       });
//   };

//   const [bool, setBool] = useState(true);
//   const changeBool = () => {
//     setBool(!bool); 
//     console.log(bool);
//   };
//     const [dets , setDets] = useState({
//     name: details.name,
//     email: details.email,
//     contactnumber: details.contactnumber,
//     age: details.age,
//     batchName: details.batchname,
//     password: details.password
//   });


//   return (

//     <Grid container align={"center"} spacing={2}>
//       <Grid item xs={12}>
//         <TextField label="Name"
//           variant="outlined"
//           value={details.name}
//           onChange={onChangeUsername}
//           disabled={bool}
//         >

//         </TextField>
//       </Grid>
//       <Grid item xs={12}>
//         <TextField label="Email"
//           variant="outlined"
//           value={localStorage.getItem("Email")}
//           disabled
//         >
//         </TextField>

//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           label="Contact Number"
//           variant="outlined"
//           value={details.contactnumber}
//           onChange={onChangeContactNumber}
//           disabled={bool}
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           label="Age"
//           variant="outlined"
//           value={details.age}
//           onChange={onChangeAge}
//           disabled={bool}
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <FormControl sx={{ m: 1, minWidth: 235 }}>
//           <InputLabel id="demo-simple-select-label">Batch Name</InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             value={details.batchName}
//             label="Batch Name"
//             onChange={onChangeBatchName}
//             disabled={bool}
//           >
//             <MenuItem value={10}>UG-1</MenuItem>
//             <MenuItem value={20}>UG-2</MenuItem>
//             <MenuItem value={30}>UG-3</MenuItem>
//             <MenuItem value={40}>UG-4</MenuItem>
//             <MenuItem value={50}>PG-1</MenuItem>
//             <MenuItem value={60}>PG-2</MenuItem>
//             <MenuItem value={70}>PhD</MenuItem>
//           </Select>
//         </FormControl>
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           label="password"
//           variant="outlined"
//           onChange={onChangePassword}
//           disabled={bool}
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <Button variant="contained" onClick={onSubmit}>
//           Submit
//         </Button>
//         <Button onClick={changeBool}>
//           Edit
//         </Button>
//       </Grid>
//     </Grid>
//   );
// };

// export default Register;