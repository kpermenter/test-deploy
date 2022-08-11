import React from "react"
import AddRestaurant from "../components/AddRestaurant"
import Header from "../components/Header"
import RestaurantList from "../components/RestaurantList"

const Home = (props) => {
  return (
    <div style={{ backgroundColor: '#ffc107' }}>
      <Header/>
      <AddRestaurant/>
      <RestaurantList />
    </div>
  )
};

export default Home;
