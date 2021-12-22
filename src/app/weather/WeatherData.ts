import { Weather } from "./Weather";

export interface WeatherData {
    currentLocation: Boolean,
    temp: Number | undefined,
    feels_like: Number | undefined,
    name: String | undefined,
    weather: Weather | undefined,
    country: String,
}