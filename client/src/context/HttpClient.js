import axios from "axios";
import { API_SEVER_URL, REQUEST_TIMEOUT } from "./ContextConstants";

export const httpClient = axios.create({
  baseURL: API_SEVER_URL
});
