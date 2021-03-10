import axios from 'axios';

export const fetchIngredients = () => {
  return axios.get('http://localhost:4200/ingredients').then(({ data }) => data);
};

export const fetchIngredient = (id: number) => {
  return axios.get(`http://localhost:4200/ingredients/${id}`).then(({ data }) => data);
};

export const saveIngredient = (data: any) => {
  return axios.post('http://localhost:4200/ingredients', data).then(({ data }) => data);
};
