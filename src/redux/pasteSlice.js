import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pastes: (() => {
    const pastesFromStorage = localStorage.getItem("pastes");
    try {
      return pastesFromStorage ? JSON.parse(pastesFromStorage) : [];
    } catch (error) {
      console.error("Error parsing pastes from localStorage:", error);
      return [];
    }
  })(),
};

export const pasteSlice = createSlice({
  name: "pastes",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      try {
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
      } catch (error) {
        console.error("Error saving pastes to localStorage:", error);
      }
      console.log("Pastes after add:", state.pastes);
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      state.pastes = state.pastes.filter((paste) => paste._id !== pasteId); 
      try {
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
      } catch (error) {
        console.error("Error saving pastes to localStorage:", error);
      }
      console.log("Pastes after remove:", state.pastes);
    },
    updateToPastes: (state, action) => {
      const updatedPaste = action.payload;
      state.pastes = state.pastes.map((paste) =>
        paste._id === updatedPaste._id ? updatedPaste : paste
      );
      try {
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
      } catch (error) {
        console.error("Error saving pastes to localStorage:", error);
      }
      console.log("Pastes after update:", state.pastes);
    },
    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      console.log("All pastes reset");
    },
  },
});

export const { addToPastes, removeFromPastes, updateToPastes, resetAllPastes } = pasteSlice.actions;

export default pasteSlice.reducer;
