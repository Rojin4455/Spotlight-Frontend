
import axios from 'axios';
import { store } from '../store';
import { clearUser, updateAccessToken } from '../slices/userSlice';
import Cookies from 'js-cookie';
import { toast } from 'sonner';


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  axiosInstance.interceptors.request.use(
    (config) => {
      const state = store.getState();
      const accessToken = state.user.accessToken;
      
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      
      const csrfToken = Cookies.get('csrftoken');
      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
      }
      
      return config;
    },
    (error) => Promise.reject(error)
  );
  



  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (!error.response) {
            return Promise.reject(error);
        }
  
        if (originalRequest.url?.includes('/auth/token/refresh/')) {
            store.dispatch(clearUser());
            toast.warning('Your session has expired');
            return Promise.reject(error);
        }
  
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const state = store.getState();
                const refreshToken = state.user.refreshToken;
                const { data } = await axiosInstance.post('/auth/token/refresh/',{
                  refresh:refreshToken,
                });
                
                store.dispatch(updateAccessToken(data.access));
                originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
                
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                
                store.dispatch(clearUser());
                toast.warning('Your session has expired. Please login again.');
                return Promise.reject(refreshError);
            }
        }
  
        return Promise.reject(error);
    }
  );
  
  export default axiosInstance;