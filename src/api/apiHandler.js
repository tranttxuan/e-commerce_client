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

     signin(userInfo) {
          return service
               .post("/auth/login", userInfo)
               .then((res) => res.data)
               .catch(errorHandler);
     },

     logout() {
          return service
               .delete("/auth/logout")
               .catch(errorHandler);
     },

     isLoggedIn() {
          return service
               .get("/auth/isLoggedIn")
               .then((res) => res.data)
               .catch(errorHandler);
     },

     detailsUser(id) {
          return service
               .get(`/auth/${id}`)
               .then((res) => res.data)
               .catch(errorHandler);
     },

     updateUserProfile(userData) {
          return service
               .patch(`/auth/profile`, userData)
               .then((res) => res.data)
               .catch(errorHandler);
     },
     //*******/ 
     // Products
     //*******/ 
     fetchProductsData({ category, name, order, min, max, rating, seller }) {
          return service
               .get(`/products?category=${category}&name=${name}&order=${order}&min=${min}&max=${max}&rating=${rating}&seller=${seller}`)
               .then((res) => res.data)
               .catch(errorHandler);
     },
     categoryList() {
          return service
               .get(`/products/categories`)
               .then((res) => res.data)
               .catch(errorHandler);
     },

     fetchOneProductDetail(idProduct) {
          return service
               .get(`/products/${idProduct}`)
               .then((res) => res.data)
               .catch(errorHandler);
     },

     createProduct(data) {
          return service
               .post(`/products/create`, data)
               .then((res) => res.data)
               .catch(errorHandler);
     },
     
     updateProduct(data, id){
          return service
          .patch(`/products/edit/${id}`, data)
          .then((res) => res.data)
          .catch(errorHandler);
     },

     deleteProduct(id) {
          return service
               .delete(`/products/delete/${id}`)
               .then((res) => res.data)
               .catch(errorHandler);
     },
     //*******/ 
     // ORDERS
     //*******/
     createOrder(data) {
          return service
               .post(`/orders`, data)
               .then((res) => res.data)
               .catch(errorHandler);
     },

     detailsOrder(id) {
          return service
               .get(`/orders/${id}`)
               .then((res) => res.data)
               .catch(errorHandler);
     },

     getListOrders() {
          return service
               .get(`/orders/mine`)
               .then((res) => res.data)
               .catch(errorHandler);
     },

     getListOrdersBySeller(){
          return service
          .get(`/orders/seller`)
          .then((res) => res.data)
          .catch(errorHandler);
     },

     deleteOrder(id){
          return service
          .delete(`/orders/${id}`)
          .then((res) => res.data)
          .catch(errorHandler);
     },
     //*******/ 
     // PAYPAL
     //*******/
     getPayPalScript(data) {
          return service
               .post(`/orders/charge/stripe`, data)
               .then((res) => res.data)
               .catch(errorHandler);
     },

     payOrder(idOrder, paymentResult) {
          return service
               .patch(`/orders/${idOrder}/pay`, paymentResult)
               .then((res) => res.data)
               .catch(errorHandler);
     },
     //*******/ 
     // UploadFile
     //*******/
     uploadFile(formData) {
          return service
               .post(`/upload`, formData)
               .then((res) => res.data)
               .catch(errorHandler);
     },
}