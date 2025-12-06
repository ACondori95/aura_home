import axios from "axios";

// Asegúrate de que esta URL base esté disponible en el entorno
const API_URL = import.meta.env.VITE_API_URL + "/products";

// Las llamadas GET no necesitan un token por ahora (es una ruta pública)

const getProducts = () => {
  // Obtiene todos los productos
  return axios.get(API_URL);
};

// Funciones CRUD que usaremos en el Admin Dashboard
const createProduct = (productData) => {
  // El backend espera un objeto FormData para la imagen
  return axios.post(API_URL, productData);
};

const getProductById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

const ProductService = {getProducts, getProductById, createProduct};

export default ProductService;
