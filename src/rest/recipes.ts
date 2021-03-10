import axios from 'axios';

export const createRecipe = (data: any) => {
  return axios.post('http://localhost:4200/recipes', data).then(({ data }) => data);
};
