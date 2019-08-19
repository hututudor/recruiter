import axios from 'axios';

const getAll = async () => {
  return axios.get(process.env.REACT_APP_API + '/days')
};

const add = async data => {
  return axios.put(process.env.REACT_APP_API + '/days', data);
};

export default {
  getAll,
  add
}