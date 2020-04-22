import axios from 'axios';
import { SERVER_FLUIG } from 'react-native-dotenv';

export const apiFluig = axios.create({
  baseURL: SERVER_FLUIG,
});
