import axios from 'axios';

const API_URL = 'https://localhost:7297/';

export const login = async (username, password) => {
  try {
      const response = await axios.post(API_URL + 'login', { username, password });
      const jwtToken = response.data; 

      // Récupérer les détails complets de l'utilisateur après la connexion
      const userDetails = await getUserDetails(username, jwtToken);

      // Combiner les détails de l'utilisateur avec le token JWT
      const userData = { ...userDetails, token: jwtToken };

      return userData;
  } catch (error) {
      console.error("Erreur de connexion:", error.response || error);
      throw error;
  }
};


export const register = async (username, email, password) => {
  try {
    const response = await axios.post(API_URL + 'api/User/register', {
      username,
      email,
      password,
      observations: [],
      role: ''
    });
    return {
      token: response.data.token,
      user: { username, email /* autres détails de l'utilisateur */ }
    };
  } catch (error) {
    console.error("Erreur d'inscription:", error.response);
    throw error;
  }
};

export const getUserDetails = async (username, token) => {
  try {
      const response = await axios.get(API_URL + `api/User/${username}`, {
          headers: { Authorization: `Bearer ${token}` }
      });
      return response.data; // Retourner les détails de l'utilisateur
  } catch (error) {
      console.error("Erreur lors de la récupération des informations de l'utilisateur:", error.response || error);
      throw error;
  }
};


