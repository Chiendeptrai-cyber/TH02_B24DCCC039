import { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherData {
  current_condition: {
    temp_C: string;
    weatherDesc: { value: string }[];
  }[];
}

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');

  const fetchWeather = async (cityName: string) => {
    try {
      const response = await axios.get<WeatherData>(`https://wttr.in/${cityName}?format=j1`);
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('City not found or API error');
      setWeather(null);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inputCity = (e.target as HTMLFormElement).elements.namedItem('city') as HTMLInputElement;
    setCity(inputCity.value);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="city" placeholder="Enter city name" />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <div>
          <h2>Weather in {city}</h2>
          <p>Temperature: {weather.current_condition[0].temp_C}°C</p>
          <p>Condition: {weather.current_condition[0].weatherDesc[0].value}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;