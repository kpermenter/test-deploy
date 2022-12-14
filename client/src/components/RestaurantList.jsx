import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import "bootstrap/dist/css/bootstrap.min.css";
import StarRating from "./StarRating";

const RestaurantList = (props) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const { restaurants, setRestaurants, deleteRestaurant } = useContext(
    RestaurantsContext
  );

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };

  const renderRating = (rating, count) => {
    if (!count) {
      return <span className="text-warning">0 review</span>;
    } else {
      return (
        <>
          <StarRating rating={rating} />
          <span className="text-warning ml-1">({count})</span>
        </>
      );
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    RestaurantFinder.delete(`/${id}`)
      .then(function (response) {
        deleteRestaurant(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    RestaurantFinder.get("/")
      .then((response) => {
        setRestaurants(response.data.data);
      })
      .then(() => {
        setIsLoading((prevState) => !prevState);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setRestaurants]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center" style={{ color: '#ff3547' }}>
        <i class="fas fa-hamburger fa-spin fa-5x"></i>
      </div>
    );
  }

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <div className="table-responsive pt-2 pl-2 pr-2">
            <table className="table table-striped table-hover table-dark">
              <thead>
                <tr className="bg-primary">
                  <th scope="col">Restaurant</th>
                  <th scope="col">Location</th>
                  <th scope="col">Price Range</th>
                  <th scope="col">Ratings</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map(
                  ({ id, name, location, price_range, count, average_rating }) => (
                    <tr onClick={() => handleRestaurantSelect(id)} key={id}>
                      <th scope="row">{name}</th>
                      <td>{location}</td>
                      <td>{"$".repeat(price_range)}</td>
                      <td>{renderRating(average_rating, count)}</td>
                      <td>
                        <button
                          onClick={(e) => handleUpdate(e, id)}
                          className="btn btn-sm btn-warning"
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={(e) => handleDelete(e, id)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RestaurantList;
