import { createSlice } from "@reduxjs/toolkit";

export const paramsSlice = createSlice({
  name: "params",
  initialState: {
    directorDay: 0,
    progerDay: 0,
    ozp: 0,
    znm: 0,
    devSpend: [0, 0, 0, 0, 0, 0, 0],
    impSpend: [0, 0, 0, 0, 0, 0],
    explCoff: [22500, 1, 22500, 1, 0.4, 0.6, 0.2, 0.3, 0.01, 0.05, 2.6, 8, 0.2],
    projPrice: 0,
    anlgPrice: 0,
    projDay: 0,
    anlgDay: 0,
    projSeb: 0,
    anlgSeb: 0,
    projDevSpend: 0,
    anlgDevSpend: 0,
    coffTeck: 0,
  },
  reducers: {
    setDirectorDay: (state, action) => {
      state.directorDay = action.payload;
    },
    setProgerDay: (state, action) => {
      state.progerDay = action.payload;
    },
    setOZP: (state, action) => {
      state.ozp = action.payload;
    },
    setZNM: (state, action) => {
      state.znm = action.payload;
    },
    setDevSpend: (state, action) => {
      state.devSpend = action.payload;
    },
    setImpSpend: (state, action) => {
      state.impSpend = action.payload;
    },
    setExplCoff: (state, action) => {
      state.explCoff = action.payload;
    },
    setProjPrice: (state, action) => {
      state.projPrice = action.payload;
    },
    setAnlgPrice: (state, action) => {
      state.anlgPrice = action.payload;
    },
    setProjDay: (state, action) => {
      state.projDay = action.payload;
    },
    setAnlgDay: (state, action) => {
      state.anlgDay = action.payload;
    },
    setProjSeb: (state, action) => {
      state.projSeb = action.payload;
    },
    setAnlgSeb: (state, action) => {
      state.anlgSeb = action.payload;
    },
    setProjDevSpend: (state, action) => {
      state.projDevSpend = action.payload;
    },
    setAnlgDevSpend: (state, action) => {
      state.anlgDevSpend = action.payload;
    },
    setCoffTeck: (state, action) => {
      state.coffTeck = action.payload;
    },
  },
});

export const actions = paramsSlice.actions;
