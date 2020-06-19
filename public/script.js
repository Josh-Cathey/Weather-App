const searchElement = document.querySelector('[data-city-search]');
const searchBox = new google.maps.places.SearchBox(searchElement);
searchBox.addListener('places_changed', () => {
    // assign the selected place
    const place = searchBox.getPlaces()[0]
    // don't do anything if user hasn't selected a place
    if (place == null) return;
    
    // get longitude and latitude
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();

    // get the location's weather data
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(res => res.json()).then(data => {
        // set the weather data and the selected address
        setWeatherData(data, place.formatted_address);
    }) 
})