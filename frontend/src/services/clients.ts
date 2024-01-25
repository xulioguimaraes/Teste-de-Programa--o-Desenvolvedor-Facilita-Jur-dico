import { api } from "./api";

interface IForm {
  name: string;
  phone: string;
  email: string;
  coordinatex: string;
  coordinatey: string;
}
interface IParamsConfig {
  search_term: string;
  page: number;
  per_page: number;
}
export default {
  list: async (params: IParamsConfig) =>
    await api.get("/clients", {
      params,
    }),
  create: async (data: IForm) => await api.post("/clients", data),
  update: async (id: string, data: IForm) =>
    await api.put(`/clients/${id}`, data),
  find: async (id: string) => await api.get(`/clients/${id}`),
  delete: async (id: number) => await api.delete(`/clients/${id}`),
  calculate: async () => await api.get("/clients/calculate"),
};
