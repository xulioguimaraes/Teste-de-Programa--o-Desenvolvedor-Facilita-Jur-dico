export interface IDataPage {
  name: string;
  id: number;
  phone: string;
  email: string;
  coordinatex: string;
  coordinatey: string;
}
export interface IParamsConfig {
  search_term: string;
  page: number;
  per_page: number;
}
