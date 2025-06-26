import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserState } from "../../types/user";

const initialState: UserState = {
  user: null,
  address: null,
};

// Managing the user data and addresses data's
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setAddress: (state, action: PayloadAction<any>) => {
      state.address = action.payload;
    },
  },
});

export const { setUser, setAddress } = userSlice.actions;
export default userSlice.reducer;
