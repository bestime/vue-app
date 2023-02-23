import axios from 'axios';
import serverURL from './libs/serverURL';

const a = ''
const b = ''
const c = ''

const axiosInstance = axios.create({
  baseURL: '',
});

/**
 * 项目网路请求入口
 * @param options 请求配置
 * @returns 请求结果
 */
export default function request(
  options: RequestHttp.Base & {
    url: string;
  }
) {
  return axiosInstance({
    baseURL: '',
    url: serverURL(options.baseURL, options.url),
  });
}
