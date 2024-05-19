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
  },
});
export const { signIn } = userSlice.actions;
export default userSlice.reducer;
