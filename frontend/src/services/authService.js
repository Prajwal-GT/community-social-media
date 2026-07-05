import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const register = async (username, email, password) => {
  try {
    const res = await axios.post(`${API}/users`, {
      username,
      email,
      password,
    });

    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || "Registration failed. Please try again.";
    throw new Error(message);
  }
};

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API}/login`, {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || "Invalid email or password";
    throw new Error(message);
  }
};