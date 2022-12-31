import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import commanServices from '../apiServices/commanServices';
import otherServices from '../apiServices/otherServices';
const initialState = {
  packages: [],
  Tips: [],
  notifications: [],
  user_purchases: [],
  pending: false,
  message: '',
  success: false,
};

export const fetchPackages = createAsyncThunk(
  'package/packages',
  async ({token}, thunkAPI) => {
    console.log(token);
    try {
      return await otherServices.getPackages({token});
    } catch (e) {
      console.log('in catch');
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const userPurchases = createAsyncThunk(
  'userPurchases/userPurchases',
  async ({token}, thunkAPI) => {
    console.log(token);
    try {
      return await otherServices.getPurchases({token});
    } catch (e) {
      console.log('in catch');
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const fetchTips = createAsyncThunk(
  'Tips/Tips',
  async ({token}, thunkAPI) => {
    console.log(token);
    try {
      return await otherServices.getTips({token});
    } catch (e) {
      console.log('in catch');
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const feedback = createAsyncThunk(
  'Feedback/Feedback',
  async ({token, title, description}, thunkAPI) => {
    const user_id = thunkAPI.getState().auth.user_id;
    console.log(description);
    try {
      return await otherServices.feedback({token, title, description, user_id});
    } catch (e) {
      console.log('in catch');
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const notification = createAsyncThunk(
  'notification/notification',
  async ({token}, thunkAPI) => {
    try {
      return await otherServices.getNotification({token});
    } catch (e) {
      console.log('in catch');
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const packageSlice = createSlice({
  name: 'packageSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    //////////////////////////✖✖✖✖✖✖✖✖✖🎁🎁🎁🎁 Packages 🎁🎁🎁🎁✖✖✖✖✖✖✖✖✖✖✖////////////////////
    builder.addCase(fetchPackages.pending, (state, action) => {
      console.log('Pending State');
      state.pending = true;
    });
    builder.addCase(fetchPackages.fulfilled, (state, action) => {
      //   console.log(`Fullfilled =>${action.payload}`);
      state.packages = action.payload;
      state.packages.map((item, index) => {
        console.log(item);
      });
      state.pending = false;
    });
    builder.addCase(fetchPackages.rejected, (state, action) => {
      console.log('rejected State');
      state.pending = false;
    });
    //////////////////////////✖✖✖✖✖✖✖✖✖🎁🎁🎁🎁 Tips 🎁🎁🎁🎁✖✖✖✖✖✖✖✖✖✖✖////////////////////
    builder.addCase(fetchTips.pending, (state, action) => {
      console.log('Pending State');
      state.pending = true;
    });
    builder.addCase(fetchTips.fulfilled, (state, action) => {
      //   console.log(`Fullfilled =>${action.payload}`);
      if (action.payload.message === undefined) {
        state.Tips = action.payload;
        state.success = true;
        // state.Tips.map((item, index) => {
        //   console.log(item.tip);
        // });
      } else {
        state.success = false;
        commanServices.showToast(action.payload.message);
      }
      state.pending = false;
    });
    builder.addCase(fetchTips.rejected, (state, action) => {
      console.log('rejected State');
      state.pending = false;
      state.success = false;
    });
    //////////////////////////✖✖✖✖✖✖✖✖✖🎁🎁🎁🎁 Feedback 🎁🎁🎁🎁✖✖✖✖✖✖✖✖✖✖✖////////////////////
    builder.addCase(feedback.pending, (state, action) => {
      console.log('Pending State');
      state.pending = true;
      state.success = false;
    });
    builder.addCase(feedback.fulfilled, (state, action) => {
      // console.log(`Fullfilled =>${action.payload.data}`);
      state.message = action.payload;
      state.pending = false;
      state.success = true;
      commanServices.showToast(action.payload.data);
    });
    builder.addCase(feedback.rejected, (state, action) => {
      console.log('rejected State=>' + action.payload);
      state.pending = false;
      state.success = false;
    });
    //////////////////////////✖✖✖✖✖✖✖✖✖🎁🎁🎁🎁 FNotifications 🎁🎁🎁🎁✖✖✖✖✖✖✖✖✖✖✖////////////////////
    builder.addCase(notification.pending, (state, action) => {
      console.log('Pending State');
      state.pending = true;
      state.success = false;
    });
    builder.addCase(notification.fulfilled, (state, action) => {
      // console.log(`Notifications =>${action.payload[1].description}`);
      state.notifications = action.payload;
      state.pending = false;
      state.success = true;
    });
    builder.addCase(notification.rejected, (state, action) => {
      console.log('rejected State=>' + action.payload);
      state.pending = false;
      state.success = false;
    });
    //////////////////////////✖✖✖✖✖✖✖✖✖🎁🎁🎁🎁 FNotifications 🎁🎁🎁🎁✖✖✖✖✖✖✖✖✖✖✖////////////////////
    builder.addCase(userPurchases.pending, (state, action) => {
      console.log('Pending State');
      state.pending = true;
      state.success = false;
    });
    builder.addCase(userPurchases.fulfilled, (state, action) => {
      // console.log(`Notifications =>${action.payload[1].description}`);
      state.user_purchases = action.payload;
      state.pending = false;
      state.success = true;
    });
    builder.addCase(userPurchases.rejected, (state, action) => {
      console.log('rejected State=>' + action.payload);
      state.pending = false;
      state.success = false;
    });
  },
});
export default packageSlice.reducer;
