import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Vendorlist from "./components/users/Vendorlist";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import Dashboard from "./components/users/Dashboard";
import FoodList from "./components/users/FoodList";
import RegisterFood from "./components/users/RegisterFood";
import EditFood from "./components/users/EditFood";
import FoodStatus from "./components/users/FoodStatus";
import Menu from "./components/users/menu";
import Orders from "./components/users/orders";
import PlaceOrder from "./components/users/PlaceOrder";
import Wallet from "./components/users/Wallet";
import RegisterVendor from "./components/common/RegisterVendor";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="vendors" element={<Vendorlist />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="foodlist" element={<FoodList />} />
          <Route path="registerfood" element={<RegisterFood />} />
          <Route path="editfood" element={<EditFood />} />
          <Route path="foodstatus" element={<FoodStatus />} />
          <Route path="menu" element={<Menu />} />
          <Route path="orders" element={<Orders />} />
          <Route path="placeorder" element={<PlaceOrder />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="registervendor" element={<RegisterVendor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
