import axios from 'axios';

const API_URL = 'https://localhost:7297/CelestialObject/';

const handleResponse = (response) => {
    return response.data;
};

const handleError = (error) => {
    console.error("Erreur lors de la requête à l'API:", error.response || error);
    throw error;
};

export const getAllCelestialObjects = async (token) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
        const response = await axios.get(API_URL, { headers });
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};


export const deleteCelestialObject = async (id, token) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
        await axios.delete(`${API_URL}delete/${id}`, { headers });
    } catch (error) {
        handleError(error);
        throw error;
    }
};





export const getCelestialObjectById = async (id, token) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
        const response = await axios.get(API_URL + id, { headers });
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};

export const createCelestialObject = async (celestialObjectData, token) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
        await axios.post(API_URL, celestialObjectData, { headers });
    } catch (error) {
        console.error("Erreur lors de la création d'un objet céleste:", error);
        throw error;
    }
};

export const updateCelestialObject = async (id, celestialObjectData, token) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
        const response = await axios.put(`${API_URL}update/${id}`, celestialObjectData, { headers });
        return handleResponse(response);
    } catch (error) {
        handleError(error);
        throw error;
    }
};





