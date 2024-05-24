import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
};
const userSlice = createSlice({
  name: "User",
  initialState: initialState,
  reducers: {
    signIn(state, action) {
      const { email, _id } = action.payload;
      console.log({ email, _id });
      state.currentUser = { email, _id };
      console.log(state.currentUser);
    },
    signOut(state, action) {
      state.currentUser = null;
    },
    deleteAccount(state, action) {
      state.currentUser = null;
    },
  },
});
export const { signIn, signOut, deleteAccount } = userSlice.actions;
export default userSlice.reducer;
