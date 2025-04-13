import axios from 'axios';

/**
 * Axios client instance configured for the Aladhan Prayer Times API
 * Base URL: https://api.aladhan.com/v1
 */
export const prayerTimesClient = axios.create({
  baseURL: 'https://api.aladhan.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
