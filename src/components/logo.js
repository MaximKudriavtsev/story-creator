import React from "react";
import { Link } from "gatsby";
import logo from '../images/logo.svg';

export default () => (
  <Link to="/">
    <img src={logo} width="30px" height="30px" style={{ marginBottom: 0 }} />
    <h3 style={{ color: 'rgb(24, 25, 26)', fontWeight: 'bold', display: 'inline-block', margin: 0 }}>
      urly.
    </h3>
    <h3 style={{ color: 'rgb(0, 69, 190)', fontWeight: 'bold', display: 'inline-block', margin: 0 }}>
      Story
    </h3>
  </Link>
);