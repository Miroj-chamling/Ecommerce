import React from "react";
import Layout from "../Core/Layout";

const Signin = () => (
  <Layout title="Sign in" description="Signin to Ecommerce-App">
    ENV : {process.env.REACT_APP_API_URL}
  </Layout>
);

export default Signin;
