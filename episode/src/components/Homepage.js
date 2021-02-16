import React from 'react';
import User from "./User"
import { Nav, Button, Navbar, Form, FormControl, Card, Container, Row, Col, Carousel } from 'react-bootstrap'

class Homepage extends React.Component {

  render() {
    return (
      <div className="loginForm" style={{ alignItems: "center" }}>
        <br />
        <h3 style={{ textAlign: "center" }}>Episode</h3>
        <h4 style={{ textAlign: "center" }}>Popular Shows:</h4>
        <Carousel style={{margin: "auto", width:"30%"}}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://upload.wikimedia.org/wikipedia/en/6/64/Arrow_Season_3.png"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://upload.wikimedia.org/wikipedia/en/thumb/7/73/The_Flash_season_1.jpg/220px-The_Flash_season_1.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://upload.wikimedia.org/wikipedia/en/thumb/4/46/Prison_Break_season_1_dvd.jpg/220px-Prison_Break_season_1_dvd.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default Homepage;
