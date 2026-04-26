import { useState, useEffect } from "react";
import { ticketsApi } from "../services/ticketsApi";

export function useFetchTickets(searchParams = null) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        let response;
        if (searchParams) {
          response = await ticketsApi.search(searchParams);
        } else {
          response = await ticketsApi.getAll();
        }
        setData(response);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [searchParams]);

  return { data, loading, error };
}
