import axios from 'axios';
import cookie from 'js-cookie';
import { User, LoginData } from '@/types/models';

export async function loadMe(): Promise<User> {
  return axios.get(`${process.env.VUE_APP_SERVER_API}/auth/me`, {
    headers: {
      Authorization: cookie.get('access_token'),
      'Content-Type': 'application/json',
    },
  });
}

export async function login(data: LoginData): Promise<void> {
  return axios.post(`${process.env.VUE_APP_SERVER_API}/auth/login`, data);
}

export async function logout(): Promise<void> {
  return axios.post(`${process.env.VUE_APP_SERVER_API}/auth/logout`, {});
}
