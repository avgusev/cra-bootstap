import axios from 'axios';

// const baseUrl = import.meta.env.VITE_TRF_DESKTOP_URL || 'http://localhost:3004';
export const baseUrl = import.meta.env.VITE_TRF_DESKTOP_URL || 'http://trf.dev.skdf';
const apiKey = import.meta.env.VITE_TRF_DESKTOP_APIKEY || 'iomipheafiheeZaiNgu9chahKu5haeza';

export const triaflyUrl = `${baseUrl}/api/3`;

export const triafly = axios.create({
  baseURL: triaflyUrl,
  headers: {
    'Netdb-Api-Key': apiKey,
  },
});
