import axios from "axios";

// Create an Axios instance for baseUrlAuth
const baseUrl = axios.create({
  baseURL: "https://assessment.pakam.ng/api/",
});

export { baseUrl };
