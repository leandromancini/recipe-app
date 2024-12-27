import axios from 'axios';

export const getCategory = async (id: string) => {
  return await axios
    .get(`${process.env.ENTRESANO_API_BASE_URL}/categories/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};

export const searchCategories = async () => {
  const filter = `is_root_category=true`;
  return await axios
    .get(`${process.env.ENTRESANO_API_BASE_URL}/categories?${filter}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};
