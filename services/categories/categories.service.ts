import { ProviderCategoryT } from 'types/categories/Category.types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const createCategory = async (data: ProviderCategoryT): Promise<any> => {
  const body: ProviderCategoryT = {
    id: data.id,
    category: {
      id: data.category.id,
      name: data.category.name,
      description: data.category.description,
      defaultImage: data.category.defaultImage
    },
    description: data.description,
    currency: data.currency,
    price: data.price,
    gallery: data.gallery,
    user_id: data.user_id
  }

  const response = await fetch(`${apiUrl}/activity`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify(body)

  });
  return await response.json();
}


export const getCategories = async (): Promise<any> => {
  const response = await fetch(`${apiUrl}/category`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: 'GET'
  });
  return await response.json();
}