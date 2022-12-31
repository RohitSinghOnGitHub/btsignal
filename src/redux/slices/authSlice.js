import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import authService from '../apiServices/authService';
import commanServices from '../apiServices/commanServices';
const initialState = {
  pending: false,
  error: false,
  name: '',
  mobile: '',
  token: null,
  user_id: '',
  email: '',
  isLoading: false,
  messasge: null,
};
export const chkLogin = createAsyncThunk('auth/chkLogin', async thunkAPI => {
  try {
    console.log('I m in chkLogin');
    const user = await AsyncStorage.getItem('user_info');
    return user;
  } catch (e) {
    const message =
      (e.response && e.response.data && e.response.data.message) ||
      e.message ||
      e.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const fetchLogin = createAsyncThunk(
  'auth/login',
  async ({mobile, password}, thunkAPI) => {
    try {
      return await authService.login({mobile, password});
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
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({email}, thunkAPI) => {
    try {
      return await authService.forgotPassword({email});
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({token, password}, thunkAPI) => {
    const user = await AsyncStorage.getItem('user_info');
    const id = JSON.parse(user).user.user_id;
    console.log(id);
    try {
      return await authService.resetPassword({
        token: token,
        password: password,
        id: id,
      });
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const logout = createAsyncThunk(
  'auth/logout',
  async ({token}, thunkAPI) => {
    console.log('Logout Token=>' + token);
    try {
      return await authService.logout({token});
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
export const register = createAsyncThunk(
  'auth/register',
  async ({name, email, mobile, password}, thunkAPI) => {
    try {
      return await authService.register({name, email, mobile, password});
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

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    ////////////////////////////===========Login==========/////////////////////////////
    builder.addCase(fetchLogin.pending, (state, action) => {
      // console.log('Pending State');
      state.pending = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      // console.log(action.payload.user.paid);

      if (action.payload.errors === undefined) {
        authService.commanTask(state, action);
        authService.createChannel();
      } else {
        commanServices.showToast(action.payload.errors);
      }
      state.pending = false;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
      state.token = null;
    });
    ///////////////////////////////////////////////////////////
    builder.addCase(chkLogin.pending, (state, action) => {
      state.pending = true;
      state.isLoading = true;
      // console.log(`Token Loaded Successfully=>${action.payload}`);
    });
    builder.addCase(chkLogin.fulfilled, (state, action) => {
      console.log('i m in chkLigin');
      const user = JSON.parse(action.payload);
      // console.log(`user => ${user.user.name}`);
      if (user != null) {
        state.token = user.token;
        state.email = user.user.email;
        state.name = user.user.name;
        state.mobile = user.user.mobile;
        state.user_id = user.user.user_id;
      }
      state.isLoading = false;
      state.pending = false;
      console.log(`Token Loaded Successfully=>${action.payload}`);
    });
    builder.addCase(chkLogin.rejected, (state, action) => {
      // state.token = action.payload.token;

      console.log('Failed to Load token');
    });
    //////////////////////✖✖✖✖✖✖✖✖✖ 🚥 Register 🚥 ✖✖✖✖✖✖✖✖✖✖✖/////////////////////
    builder.addCase(register.pending, (state, action) => {
      // console.log('Pending State');
      state.pending = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      if (action.payload.errors === undefined) {
        console.log(action.payload);
        authService.commanTask(state, action);
        authService.createChannel();
      } else {
        commanServices.showToast(action.payload.errors);
      }
      state.pending = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
      state.token = null;
    });
    //////////////////////✖✖✖✖✖✖✖✖✖ 🚥 Logout 🚥 ✖✖✖✖✖✖✖✖✖✖✖/////////////////////
    builder.addCase(logout.pending, (state, action) => {
      // console.log('Pending State');
      state.pending = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      console.log(action.payload);
      // authService.commanTask(state, action);
      authService.deleteChannel();
      authService.unsubScribeTopaid();
      authService.unsubScribeTounpaid();
      state.token = null;
      state.email = '';
      state.name = '';
      state.mobile = '';
      state.user_id = '';
      state.pending = false;
      state.error = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
      state.token = null;
      console.log('Message=>' + action.payload);
    });
    //////////////////////✖✖✖✖✖✖✖✖✖ 🚥 Forgot Password 🚥 ✖✖✖✖✖✖✖✖✖✖✖/////////////////////
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.pending = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      console.log(action.payload);
      commanServices.showToast(action.payload.message);
      state.pending = false;
      state.error = false;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
    });
    //////////////////////✖✖✖✖✖✖✖✖✖ 🚥 Reset Password 🚥 ✖✖✖✖✖✖✖✖✖✖✖/////////////////////
    builder.addCase(resetPassword.pending, (state, action) => {
      state.pending = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      console.log(action.payload.Message);
      commanServices.showToast(action.payload.Message);
      state.pending = false;
      state.error = false;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
    });
  },
});

// export const {isLogin} = authSlice.actions;
export default authSlice.reducer;
