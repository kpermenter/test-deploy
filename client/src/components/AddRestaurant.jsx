import RestaurantFinder from "../apis/RestaurantFinder";
import React, { useContext, useState } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  const {addRestaurant} = useContext(RestaurantsContext)
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(1);

  const isDisabled = name.trim().length === 0 || location.trim().length === 0

  const handleSubmit = (e) => {
    e.preventDefault();
    RestaurantFinder.post('/', {
      name: name,
      location,
      price_range: price
    })
    .then(function (response) {
      addRestaurant(response.data.data)
      setName("");
      setPrice(0);
      setLocation("");
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} action="">
        <div className="form-row m-3">
          <div className="col">
            <input
              type="text"
              value={name}
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
              type="text"
              value={location}
              className="form-control"
              onChange={(e) => setLocation(e.target.value)}
              placeholder="location"
            />
          </div>
          <div className="col">
            <select
              className="custom-select mr-sm-2"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: 15 }}>
        <button type="submit" disabled={isDisabled} className="col-auto btn btn-sm btn-primary" style={{ borderRadius: '40%' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#ffc107" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
