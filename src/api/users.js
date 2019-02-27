import axios from "axios";

export const getUsers = () => {
  return axios.get("/users", {
    params: {
      limit: 1000,
    },
  });
};

export const createUser = (firstName, lastName) =>
  axios.post("/users", {
    firstName,
    lastName,
  });
