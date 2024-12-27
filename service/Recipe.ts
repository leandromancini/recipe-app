import axios from 'axios';

export const searchRecipes = async (options) => {
  const filter = buildFilter(options);
  return await axios
    .get(`${process.env.ENTRESANO_API_BASE_URL}/recipes?${filter}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};

const buildFilter = (options) => {
  const filterOptions = [];
  const { categoryId, productId } = options;
  if (categoryId && categoryId !== '')
    filterOptions.push(`categories.id:in:${categoryId}`);
  if (productId && productId !== '')
    filterOptions.push(`products.id:in:${productId}`);

  return `filter=${filterOptions.join(',')}`;
};
