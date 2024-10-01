import axios from 'axios';

/**
 * baseUrlの決定
 */
export const sgetBaseUrl = (): string => {
  return import.meta.env.VITE_BACKEND_URL || '';
};

export const baseURL = sgetBaseUrl();

const apiCli = axios.create({ baseURL });
const mockApiCli = axios.create({
  baseURL: 'http://localhost:5173'
});

/**
 * Bearerの設定を付与する
 */
export const setConfig = (): {} => {
  const token = localStorage.getItem('token');
  if (token === '') {
    // eslint-disable-next-line no-console
    console.error('tokenが空です');
  }
  return {
    headers: {
      Authorization: `Bearer ${token}` // トークンをBearerスキームで設定
    }
  };
};

apiCli.interceptors.response.use();
mockApiCli.interceptors.response.use();
export { apiCli, mockApiCli };
