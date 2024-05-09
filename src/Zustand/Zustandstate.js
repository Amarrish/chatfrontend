import create from 'zustand';

// Define the Zustand store
const useSidebarStore = create((set) => ({
  sideusers: [],
  setSideUsers: (data) => set({ sideusers: data }),


  selectuser: [],
  setselectuser: (value) => set({ selectuser: value }),


  allmessages:[],
  setAllMessages:(data)=> set({allmessages: data})
}));

export default useSidebarStore