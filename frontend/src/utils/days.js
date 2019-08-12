import axios from 'axios'
import { url } from './http';

const getAll = async () => {
  return await axios.get(url + '/days');
};

const add = async data => {
  console.log('sas')
  return await axios.put(url + '/days', data);
};

export {
  getAll,
  add
}