import { createSlice } from "@reduxjs/toolkit";

import type { UserRoleState } from "../../types/user";

const initialState: UserRoleState = {
  userCurrentRole: "buyer",
};

// Managing the user role state like buyer or seller by implementing te toggle
const userRoleSlice = createSlice({
  name: "userRole",
  initialState,
  reducers: {
    toggleUserRole: (state) => {
      state.userCurrentRole =
        state.userCurrentRole === "buyer" ? "seller" : "buyer";
    },
  },
});

export const { toggleUserRole } = userRoleSlice.actions;
export default userRoleSlice.reducer;
