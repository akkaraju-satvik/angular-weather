export interface WeatherDataRaw {
    coord: Object,
    clouds: Object,
    base: String,
    cod: Number,
    dt: Number,
    id: Number,
    main: {
        temp: Number,
        temp_max: Number,
        temp_min: Number,
        feels_like: Number,
        humidity: Number,
        pressure: Number
    },
    name: String,
    sys: {
        country: String,
        sunrise: Number,
        sunset: Number,
        id: Number,
        type: Number
    },
    timezone: Number,
    visibility: Number,
    weather: {
        description: String,
        icon: String,
    }[],
    wind: Object,
}