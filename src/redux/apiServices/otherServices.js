import axios from 'axios';

const otherAxios = axios.create({
  baseURL: 'http://btsignals.in/api',
  headers: {
    'Content-Type': 'application/json',
    'Acess-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});
const getPackages = async ({token}) => {
  const response = await otherAxios.get(`/packages`, {
    headers: {
      'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data;
};
const getPurchases = async ({token}) => {
  const response = await otherAxios.get(`/user_purchase`, {
    headers: {
      'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data;
};
const getTips = async ({token}) => {
  const response = await otherAxios.get(`/tips`, {
    headers: {
      'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data;
};
const getNotification = async ({token}) => {
  const response = await otherAxios.get(`/notifications`, {
    headers: {
      'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data;
};
const cmsPage = async ({token, pageId}) => {
  const response = await otherAxios.get(`/cmspage/${pageId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data[0].description;
};
const feedback = async ({token, title, description, user_id}) => {
  console.log(token);
  const response = await otherAxios.post(
    `/feedback`,
    {
      title: title,
      discription: description,
      user_id: user_id,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  );

  return response.data;
};
const otherServices = {
  getPackages,
  getTips,
  feedback,
  cmsPage,
  getNotification,
  getPurchases,
};
export default otherServices;
