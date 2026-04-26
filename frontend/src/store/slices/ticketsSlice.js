// Для Redux Toolkit (альтернатива Zustand)
export const ticketsSlice = {
  name: "tickets",
  initialState: {
    items: [],
    loading: false,
    error: null,
    searchResults: [],
  },
  reducers: {
    setTickets: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
};
