import axios from 'axios';
import Toast from 'react-native-toast-message';

const authAxios = axios.create({
  baseURL: 'http://btsignals.in/api',
  headers: {
    'Content-Type': 'application/json',
    'Acess-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});
const getSlider = async ({token}) => {
  const imgArray = [];
  authAxios
    .get(`/slider`, {
      headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
    .then(res => {
      res.data.map((object, index) => {
        imgArray[index] = {
          image: `http://btsignals.in/storage/app/files/${object.image}`,
        };
      });
      // console.log(imgArray);
    })
    .catch(e => {
      console.log(e);
    });
  return imgArray;
};
const getExchangeImgs = async ({token}) => {
  const imgArray = [];
  authAxios
    .get(`/exchange`, {
      headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
    .then(res => {
      res.data.map((object, index) => {
        // console.log('in map' + object.image);
        imgArray[index] = {
          image: `http://btsignals.in/storage/app/files/${object.image}`,
        };
      });
      // console.log(imgArray);
    })
    .catch(e => {
      console.log(e);
    });

  return imgArray;
};
const showToast = Message => {
  Toast.show({
    type: 'success',
    text1: Message,
    visibilityTime: 5000,
  });
};
const commanServices = {
  getSlider,
  showToast,
  getExchangeImgs,
};
export default commanServices;
