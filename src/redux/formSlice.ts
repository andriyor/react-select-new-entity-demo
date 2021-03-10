import { createSlice } from '@reduxjs/toolkit';

import { MainForm } from '../types/MainForm';
import { Ingredient } from '../types/Ingredient';

type FolderFilesState = {
  form: number[] | [];
  mainForm: MainForm;
  nestedForm: Ingredient;
};

const initialState: FolderFilesState = {
  form: [],
  mainForm: {
    ingredients: [],
  } as any,
  nestedForm: {} as Ingredient,
};

export const formSlice = createSlice({
  name: 'savedFormData',
  initialState,
  reducers: {
    setForm: (state, action) => {
      state.form = [...state.form, action.payload.id];
    },
    clearForm: (state) => {
      state.form = [];
    },
    setMainForm: (state, action) => {
      state.mainForm = action.payload;
    },
    setNestedForm: (state, action) => {
      state.nestedForm = action.payload;
    },
    clearNestedForm: (state) => {
      state.nestedForm = {} as Ingredient;
    },
  },
});

export const { setForm, clearForm, setMainForm, setNestedForm, clearNestedForm } = formSlice.actions;

export default formSlice.reducer;
