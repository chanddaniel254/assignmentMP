import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { fakeApi } from "./fakeApi";

export const store = configureStore({
  reducer: {
    [fakeApi.reducerPath]: fakeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fakeApi.middleware),
});

setupListeners(store.dispatch);
