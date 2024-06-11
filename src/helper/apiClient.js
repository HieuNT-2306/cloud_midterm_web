import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import log from './logger'

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const customBaseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    return headers;
  }
});

const baseQueryWithLogging = async (args, api, extraOptions) => {
  log.info(`Web: \n - Starting Request: ${args.url || args} \n - Method: ${args.method || 'GET'}`);
  const result = await customBaseQuery(args, api, extraOptions);
  if (result.error) {
    log.error(`Web: \n- Error Response: ${args.url || args} with status ${result.error.status || 'Undefined'}\n- Method: ${args.method || 'Undefined'}\n`, result.error);
  } else {
    log.info(`Web: \n- Response: ${args.url || args} with status ${result.meta.response.status}\n- Method: ${args.method || 'GET'}\n`);
  }
  return result;
};

export default baseQueryWithLogging;