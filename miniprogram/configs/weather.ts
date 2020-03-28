interface HeWeather {
    HeWeather6: Weather[]
}

interface Weather {
    daily_forecast: forecast[]
}

interface forecast {
    cond_code_d: string,
    cond_code_n: string,
    cond_txt_d: string,
    cond_txt_n: string,
    date: string,
    hum: string,
    pcpn: string,
    pop: string,
    pres: string,
    sr: string,
    ss: string,
    tmp_max: string,
    tmp_min: string,
    uv_index: string,
    vis: string,
    wind_deg: string,
    wind_dir: string,
    wind_sc: string,
    wind_spd: string
}

export { HeWeather };
