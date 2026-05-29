import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const storedUser = (() => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
})();

const initialState = {
  user: storedUser,
  loading: false,
  error: null,
  isAuthenticated: !!storedUser,
};



// LOGIN API
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      console.log("Login Response:", res.data);

      const accessToken = res?.data?.data?.accessToken;
      const userData = res?.data?.data?.user;

      if (!accessToken || !userData) {
        throw new Error("Invalid login response from server");
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(userData));

      return userData;
    } catch (err) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      const message =
        err?.response?.data?.message || "Login Failed";

      return thunkAPI.rejectWithValue(message);
    }
  }
);



const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      state.user = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN PENDING
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // LOGIN SUCCESS
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      // LOGIN FAILED
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;