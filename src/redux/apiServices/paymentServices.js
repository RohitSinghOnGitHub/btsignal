import axios from 'axios';
const paymentAxios = axios.create({
  baseURL: 'http://btsignals.in/api',
  headers: {
    'Content-Type': 'application/json',
    'Acess-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});
const generateOrderId = async ({token, packageId}) => {
  const response = await paymentAxios.post(
    `/create-order`,
    {
      package_id: packageId,
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
const paymentServices = {
  generateOrderId,
};
export default paymentServices;
