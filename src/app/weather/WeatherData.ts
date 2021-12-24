export interface WeatherData {
    currentLocation: Boolean,
    temp: Number | undefined,
    feels_like: Number | undefined,
    name: String | undefined,
    weather: {
        description: String,
        icon: String,
    } | undefined,
    country: String,
}