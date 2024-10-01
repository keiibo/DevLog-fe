import axios from 'axios';
import { sgetBaseUrl } from '../lib/api';

export const getHealthCheck = async () => {
  try {
    const response = await axios.get(`${sgetBaseUrl()}/api/health-check`);
    return response.data;
  } catch (error: any) {}
};
