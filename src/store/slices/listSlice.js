import { createSlice } from "@reduxjs/toolkit";

const getLocalStoreData = () => {
  let item = localStorage.getItem('reduxList');
  if (item) {
    return JSON.parse(item);
  } else {
    return [];
  }
}

const initialState = {
  list: getLocalStoreData(),
}

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addListItem(state, action) {
      state.list.push(action.payload); 
    },
    removeListItem(state, action) {
      state.list = state.list.filter((curr) => {
        return curr.id != action.payload;
      })
    },
    editListItem(state, action) {
        let index = state.list.findIndex((curr) => curr.id === action.payload.id)
        if (index !== -1) {
          state.list[index].name = action.payload.name;
      }
    },
    removeAll(state, action) {
      state.list = [];
    },
  }
})

export default listSlice.reducer;
export const { addListItem, removeListItem, removeAll, editListItem } = listSlice.actions;