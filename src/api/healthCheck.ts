import axios from 'axios';
import { sgetBaseUrl } from '../feature/auth/api/auth';

export const getHealthCheck = async () => {
  try {
    const response = await axios.get(`${sgetBaseUrl()}/api/health-check`);
    return response.data;
  } catch (error: any) {}
};
