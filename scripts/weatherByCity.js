function getWeatherByCity(lang, fnOK, fnError, cityName) {
    $.getJSON(
        'http://api.openweathermap.org/data/2.5/forecast/daily?q=' 
        + cityName + '&cnt=16&units=metric' + '&lang=' + lang + '&callback=?&APPID=85dd9ac97b8b9d0cbc5f814a5b96ffa6',
        function (data) {
            fnOK.call(this, data);
        }
    );
}

