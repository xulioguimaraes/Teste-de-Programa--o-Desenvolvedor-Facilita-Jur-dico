import { api } from "./api";

interface IForm {
  name: string;
  phone: string;
  email: string;
}
interface IParamsConfig {
  search_term: string;
  page: number;
  per_page: number;
}
export default {
  list: async (params: IParamsConfig) => {
    const response = await api
      .get("/clients", {
        params,
      })
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
  find: async (id: number) => {
    const response = await api
      .get(`/clients/${id}`)
      .then((res) => ({ ...res }))
      .catch((error) => ({ ...error }));
    return response;
  },
  delete: async (id: number) => {
    const response = await api
      .delete(`/clients/${id}`)
      .then((res) => ({ ...res }))
      .catch((error) => ({ ...error }));
    return response;
  },
};
