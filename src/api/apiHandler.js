import axios from "axios";

const service = axios.create({
     baseURL: process.env.REACT_APP_BACKEND_URL + '/api',
     withCredentials: true,
});

function errorHandler(error) {
     if (error.response) {
          // console.log(error.response.data.message);
          throw error.response.data;
     }
     throw error;
}


export default {
     service,
     //*******/ 
     // Auth
     //*******/ 
     signup(userInfo) {
          return service
               .post("/auth/signup", userInfo)
               .then((res) => res.data)
               .catch(errorHandler);
     },

     login(userInfo) {
          return service
               .post("/auth/login", userInfo)
               .then((res) => res.data)
               .catch(errorHandler);
     },

     logout() {
          return service.delete("/auth/logout").catch(errorHandler);
     },

     isLoggedIn() {
          return service
               .get("/auth/isLoggedIn")
               .then((res) => res.data)
               .catch(errorHandler);
     },
     //*******/ 
     // Products
     //*******/ 
     fetchProductsData() {
          return service
               .get("/products")
               .then((res) => res.data)
               .catch(errorHandler);
     },

     fetchOneProductDetail(idProduct) {
          return service
               .get(`/products/${idProduct}`)
               .then((res) => res.data)
               .catch(errorHandler);
     },
     //*******/ 
     // ORDERS
     //*******/

}