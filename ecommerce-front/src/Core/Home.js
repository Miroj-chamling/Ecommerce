import React from "react";
import Layout from "./Layout.js";

const Home = () => (
  <Layout title="Home Page" description="Ecommerce-App">
    ENV : {process.env.REACT_APP_API_URL}
  </Layout>
);

export default Home;
