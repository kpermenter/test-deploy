import React, { createContext, useState } from "react";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const addRestaurant = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };

  const deleteRestaurant = (id) => {
    let data = restaurants.filter((restaurant) => restaurant.id !== id);
    setRestaurants(data);
  };
  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurant,
        deleteRestaurant,
        selectedRestaurant,
        setSelectedRestaurant,
        setHamburgerOpen,
        hamburgerOpen
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};
