import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector, useDispatch } from "react-redux";
import { history } from "~/index";
import { isEmpty } from "lodash";

// First we need to import axios.js
import axios from "axios";
// Next we make an 'instance' of it
const instance = axios.create({
  // .. where we make our configurations
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-type": "application/json",
};

// Also add/ configure interceptors && all the other cool stuff

const MySwal = withReactContent(Swal);

instance.interceptors.request.use(
  (request) => {
    // Edit request config
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // Edit response config
    return response;
  },
  (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      if (error.response.data.status === 403) {
        history.push("/login");
        window.location.reload();
      } else {
        MySwal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
