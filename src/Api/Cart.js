import AXIOS from "../Config/Axios";
import headers from "../helpers/headers";
import Prefix from "../Config/ApiPrefix";

const Cart = {
  getAll() {
    return AXIOS.get(`${Prefix.api}/cart`, { headers: headers() });
  },
  create(data) {
    return AXIOS.post(
      `${Prefix.api}/cart`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  get(id) {
    return AXIOS.get(`${Prefix.api}/cart/${id}`, { headers: headers() });
  },
  update(data) {
    return AXIOS.put(
      `${Prefix.api}/cart/${data.id}`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  remove(id) {
    return AXIOS.delete(`${Prefix.api}/cart/${id}`, { headers: headers() });
  },
  purchase() {
    return AXIOS.put(`${Prefix.api}/purchase`, {}, { headers: headers() });
  }
};

export default Cart;
