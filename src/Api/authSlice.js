import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//-----------------For Signup------------------------------//

const headers = {
  headers: { "Content-Type": "application/json" 
}};

export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {

    try {

      const response = await axios.post(
        `http://localhost:5000/auth/adduser`,
        data,
        headers
      );

      return response.data;
    } catch (error) {
      // console.log(error.response.data.message)
      return rejectWithValue(error.response.data.message);
    }
  }
);

//----------------For Login------------------------------//

export const userLogin = createAsyncThunk(
  "userLogin",
  async (data, { rejectWithValue }) => {
    

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        data,
        headers 
      );

      localStorage.setItem("userToken", response.data.token);
      localStorage.setItem("UserInfo", JSON.stringify(response.data.user));

      return response.data.user;
    } catch (error) {
    

      return rejectWithValue(error.response.data.message);
    }
  }
);

//----------------For Forgot Password------------------------------//

export const forgotPass = createAsyncThunk(
  "forgotPass",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/auth/forgetpassword`,
        data,
        headers
      );

      // console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//----------------For Reset Password------------------------------//

export const resetPass = createAsyncThunk(
  "resetPass",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/auth/resetpassword`,
        data,
        headers
      );

      // console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const getUserByToken = createAsyncThunk(
  "getUserByToken",
  async (data, { rejectWithValue }) => {
    try {
      const token =  localStorage.getItem("userToken") || ""
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_PATH}/userinfo/getuserbytoken/${token}`,
        {headers}
      );

      return response.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error);
    }
  }
);

export const authSliceDetails = createSlice({
  name: "authSliceDetails",
  initialState: {
    auth: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.auth = action.payload;
        state.error = null


      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For userLogin

      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null

      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.auth = action.payload;
        state.loading = false;
        state.error = null

      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For forgotPass
      .addCase(forgotPass.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPass.fulfilled, (state, action) => {
        state.loading = false;
        state.auth.push(action.payload.message);
      })
      .addCase(forgotPass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For resetPass
      .addCase(resetPass.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPass.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(resetPass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For getUserByToken
      .addCase(getUserByToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserByToken.fulfilled, (state, action) => {
        state.auth = action.payload.data;
        state.loading = false;
      })
      .addCase(getUserByToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSliceDetails.reducer;