import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "../../components/ui/Container";
import { BookingHeader } from "../../components/common/BookingHeader/BookingHeader";

import { TrainCard } from "../../components/common/TrainCard";
import { TrainFilters } from "../../components/common/TrainFilters/TrainFilters";
import { Loader } from "../../components/ui/Loader";
import { saveBookingDraft, getBookingDraft } from "../../utils/bookingDraft";
import { ContactsSubscribe } from "../../components/common/ContactsSubscribe/ContactsSubscribe";
import "./SearchPage.css";

export function SearchPage() {
  const location = useLocation();
  const initialSearchData =
    location.state?.searchData || getBookingDraft()?.searchData;

  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [currentSearchData, setCurrentSearchData] = useState(initialSearchData);

  const mockTrains = [
    {
      id: 1,
      number: "001А",
      from: "Москва",
      to: "Санкт-Петербург",
      departureTime: "08:00",
      arrivalTime: "12:30",
      duration: "4ч 30м",
      price: 3500,
      freeSeats: 45,
    },
    {
      id: 2,
      number: "005Б",
      from: "Москва",
      to: "Санкт-Петербург",
      departureTime: "10:30",
      arrivalTime: "15:00",
      duration: "4ч 30м",
      price: 3200,
      freeSeats: 12,
    },
    {
      id: 3,
      number: "042А",
      from: "Москва",
      to: "Адлер",
      departureTime: "21:00",
      arrivalTime: "12:30",
      duration: "15ч 30м",
      price: 5200,
      freeSeats: 28,
    },
    {
      id: 4,
      number: "087М",
      from: "Санкт-Петербург",
      to: "Казань",
      departureTime: "23:10",
      arrivalTime: "10:20",
      duration: "11ч 10м",
      price: 3850,
      freeSeats: 19,
    },
  ];

  const handleSearch = (searchData) => {
    setCurrentSearchData(searchData);
    saveBookingDraft({ searchData });
    setLoading(true);
    setSearchPerformed(true);

    setTimeout(() => {
      let filteredTrains = [...mockTrains];

      if (searchData?.from && searchData?.to) {
        const fromNorm = searchData.from.toLowerCase().trim();
        const toNorm = searchData.to.toLowerCase().trim();

        filteredTrains = filteredTrains.filter(
          (train) =>
            train.from.toLowerCase() === fromNorm &&
            train.to.toLowerCase() === toNorm,
        );
      }

      setTrains(filteredTrains);
      setLoading(false);
    }, 1500);
  }; // ✅ Теперь функция закрыта правильно

  return (
    <div className="search-page">
      <BookingHeader
        activeStep={1}
        onSearch={handleSearch}
        initialData={currentSearchData}
        isSearching={loading}
      />

      <Container>
        <div className="search-layout">
          <aside className="search-sidebar">
            <TrainFilters />
          </aside>

          <main className="search-content">
            {!searchPerformed ? (
              <div className="search-placeholder">
                Введите параметры и нажмите "Найти билеты"
              </div>
            ) : loading ? (
              <div className="search-loading">
                <h3>ИДЕТ ПОИСК</h3>
                <Loader />
              </div>
            ) : (
              <>
                <div className="results-count">
                  Найдено {trains.length} поезд{trains.length !== 1 ? "ов" : ""}
                </div>

                {trains.length > 0 ? (
                  trains.map((train) => (
                    <TrainCard key={train.id} train={train} />
                  ))
                ) : (
                  <div className="no-results">
                    Поездов не найдено. Попробуйте изменить параметры поиска.
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </Container>
      <ContactsSubscribe />
    </div>
  );
}
