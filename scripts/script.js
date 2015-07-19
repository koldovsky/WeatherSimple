$(function(){
    getWeatherData('ua', dataReceived, showError);

    function dataReceived(data) {
        // Get the offset from UTC (turn the offset minutes into ms)
        var offset = (new Date()).getTimezoneOffset()*60*1000;
        var city = data.city.name;
        var country = data.city.country;

        $.each(data.list, function(){
            // "this" holds a forecast object
            // Get the local time of this forecast (the api returns it in utc)
            var localTime = new Date(this.dt*1000 - offset);
            addWeather(
                this.weather[0].icon,
                moment(localTime).calendar(),	// We are using the moment.js library to format the date
                this.weather[0].description,
                Math.round(this.temp.day) + '&deg;C'
            );
        });
        // Add the location to the page
        $('#location').html(city + ', <b>' + country + '</b>');
    }

    function addWeather(icon, day, condition, temp){
        var markup = '<tr>'+
                '<td>' + day + '</td>' +
                '<td>' + '<img src="images/icons/'+ icon +'.png" />' + '</td>' +
                '<td>' + temp + '</td>' +
                '<td>' + condition + '</td>'
            + '</tr>';
        weatherTable.insertRow(-1).innerHTML = markup;
    }

    /* Error handling functions */
    function showError(msg){
        weatherDiv.addClass('error').html(msg);
    }
});
