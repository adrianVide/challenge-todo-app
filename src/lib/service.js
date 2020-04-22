import axios from "axios";

class apiService {
  constructor() {
    this.auth = axios.create({
      baseURL: "http://localhost:4000/api/v1",
      withCredentials: true,
    });
  }

  get_todos() {
    return this.auth.get("/todos");
  }
  
  new_todo() {
    return this.auth.post("/todos");
  }

  delete_todo(id) {
    return this.auth.delete(`/todos/${id}`);
  }

//   addToWishlist(id) {
//     return this.auth.post(`/products/addtowishlist/${id}`);
//   }

//   get_wishlist(props) {
//     return this.auth.get(`/user/wishlistid/${props.user._id}`);
//   }

//   get_wishlist_pop(props) {
//     return this.auth.get(`/user/wishlist/${props.user._id}`);
//   }

//   get_cartlist(props) {
//     return this.auth.get(`user/cart/${props.user._id}`);
//   }

//   add_to_cart(id) {
//     return this.auth.post(`products/addtocart/${id}`);
//   }

//   delete_from_cart(id) {
//     return this.auth.delete(`products/deletefromcart/${id}`);
//   }

//   removeFromWishlist(id) {
//     return this.auth.post(`/products/removefromwishlist/${id}`);
//   }

//   addToWishlist(id) {
//     return this.auth.post(`/products/addtowishlist/${id}`);
//   }

//   get_product_id(id) {
//     return this.auth.get(`/products/${id}`);
//   }

//   edit_profile(id, email, password, shippingAddress) {
//     return this.auth.post(`/auth/user/${id}/edit-profile`, {
//       email,
//       password,
//       shippingAddress,
//     });
//   }

//   updateQuantity(id, quantity) {
//     return this.auth.post(`/products/addtocart/${id}`, { quantity });
//   }
}

const ApiService = new apiService();
export default ApiService;
