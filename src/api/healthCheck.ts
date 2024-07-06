import axios from 'axios';

export const getHealthCheck = async () => {
  try {
    const response = await axios.get('http://localhost:4001/api/health-check');
    return response.data;
  } catch (error: any) {
    console.error('Error during health check:', error.message);
  }
};
