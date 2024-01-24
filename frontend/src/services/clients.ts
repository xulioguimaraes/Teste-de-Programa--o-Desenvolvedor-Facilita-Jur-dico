import { api } from "./api";

interface IForm {
  name: string;
  phone: string;
  email: string;
}
export default {
  list: async () => {
    const response = await api
      .get("/clients")
      .then((res) => ({ ...res }))
      .catch((error) => ({ ...error }));
    return response;
  },
  create: async (data: IForm) => {
    const response = await api
      .post("/clients", data)
      .then((res) => ({ ...res }))
      .catch((error) => ({ ...error }));
    return response;
  },
};
