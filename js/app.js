if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('Service worker registered', reg))
        .catch((err) => console.log('Service worker not registered', err));
}

if('geolocation' in navigator){
    console.log('geolocation available')
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        document.getElementById('latitude').textContent = lat;
        document.getElementById('longitude').textContent = lon;
    });
} else {
    console.log('geolocation not available');
}