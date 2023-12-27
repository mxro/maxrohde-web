import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Head from 'next/head';

import RoseBushes from '../img/looking_at_the_rose_bushes.jpg';

const HomePage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Max Rohde</title>
        <meta
          name="description"
          content="Personal website of Max Rohde. Links to projects and social accounts."
        />
        <meta name="keywords" content="Max Rohde, Portfolio, Website" />
        <meta name="author" content="Max Rohde" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Container>
        <Row>
          <Col xs={7} className="">
            <img src={RoseBushes as any}></img>
          </Col>
          <Col
            xs={4}
            className="pt-5 pl-5"
            style={{ backgroundColor: 'white' }}
          >
            <h1>Max Rohde</h1>
            <p>Welcome to my homepage 👋</p>
            <p>Just a few links here ❤️</p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <a href="https://maxrohde.com">Code of Joy</a> - Personal Blog
              </li>
              <li className="list-group-item">
                <a href="https://goldstack.party">Goldstack</a> - Visual
                JavaScript project builder
              </li>
              <li className="list-group-item">
                <a href="https://www.linkedin.com/in/maxrohde/">
                  LinkedIn Profile
                </a>
              </li>
              <li className="list-group-item">
                <a href="https://github.com/mxro">GitHub Profile</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
