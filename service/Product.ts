import axios from 'axios';

export const getProduct = async (id: string) => {
  return await axios
    .get(`${process.env.ENTRESANO_API_BASE_URL}/products/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};

export const searchProducts = async (categoryId: string) => {
  const filter = `category_ids=${categoryId}`;
  return await axios
    .get(`${process.env.ENTRESANO_API_BASE_URL}/products?${filter}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};
