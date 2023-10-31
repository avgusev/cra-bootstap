import axios from 'axios';

const baseUrl = import.meta.env.VITE_TRF_URL || 'http://trf.dev.skdf';
const apiKey = import.meta.env.VITE_TRF_APIKEY || 'na5pae0quie8aethu6aebah1gaiK0ofi';

export const triaflyUrl = `${baseUrl}/api/3`; // http://10.0.30.81/api/3
export const triafly = axios.create({
  baseURL: triaflyUrl,
  headers: {
    'Netdb-Api-Key': apiKey,
  },
});
