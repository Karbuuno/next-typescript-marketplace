import axios from "axios";
import { API } from "./config";

//all categories
export const allCategories = async () => {
  const { data } = await axios.get(`${API}/admin/category/`);
  return data;
};
