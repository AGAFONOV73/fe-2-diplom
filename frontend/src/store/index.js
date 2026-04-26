import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTicketStore = create(
  persist(
    (set, get) => ({
      tickets: [],
      searchParams: null,
      selectedTrain: null,
      selectedSeats: [],
      passengers: [],
      order: null,

      setTickets: (tickets) => set({ tickets }),
      setSearchParams: (params) => set({ searchParams: params }),
      setSelectedTrain: (train) => set({ selectedTrain: train }),
      setSelectedSeats: (seats) => set({ selectedSeats: seats }),
      setPassengers: (passengers) => set({ passengers }),
      setOrder: (order) => set({ order }),

      clearBooking: () =>
        set({
          selectedTrain: null,
          selectedSeats: [],
          passengers: [],
        }),
    }),
    {
      name: "ticket-storage",
    },
  ),
);
