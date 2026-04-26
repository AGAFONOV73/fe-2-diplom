import { useState } from "react";
import { Container } from "../../components/ui/Container";
import { SearchForm } from "../../components/common/SearchForm";
import { SearchFilters } from "../../components/common/SearchFilters";
import { TrainCard } from "../../components/common/TrainCard";
import { Loader } from "../../components/ui/Loader";
import "./SearchPage.css";

export function SearchPage() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Моковые данные для демонстрации
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
      number: "012В",
      from: "Москва",
      to: "Санкт-Петербург",
      departureTime: "14:15",
      arrivalTime: "19:45",
      duration: "5ч 30м",
      price: 2800,
      freeSeats: 89,
    },
  ];

  const handleSearch = (searchData) => {
    setLoading(true);
    setSearchPerformed(true);
    // Имитация API запроса
    setTimeout(() => {
      setTrains(mockTrains);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="search-page">
      <div className="search-page__hero">
        <Container>
          <h1 className="search-page__title">Поиск билетов</h1>
          <SearchForm onSearch={handleSearch} />
        </Container>
      </div>

      <Container>
        <div className="search-page__content">
          {searchPerformed && (
            <div className="search-page__results">
              <div className="search-page__filters">
                <SearchFilters />
              </div>
              <div className="search-page__trains">
                {loading ? (
                  <Loader />
                ) : trains.length > 0 ? (
                  <>
                    <div className="results-count">
                      Найдено {trains.length} поездов
                    </div>
                    {trains.map((train) => (
                      <TrainCard key={train.id} train={train} />
                    ))}
                  </>
                ) : (
                  <div className="no-results">
                    <p>
                      Поездов не найдено. Попробуйте изменить параметры поиска.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
