
$("#track").click(()=>trackLocation())
let trackingId = undefined
const trackLocation = () => {
    if(navigator.geolocation && !trackingId) {
        trackingId = navigator.geolocation.watchPosition(handleLocation,handleLocationError,{timeout: 120000})
        $("#track").text("Stop tracking")
    }else {
        navigator.geolocation.clearWatch(trackingId)
        $("#track").text("Track location")
        trackingId = undefined
    }
}

const handleLocation = (position) => {
    const {latitude,longitude} = position.coords
    $("table tbody").append(`<tr><td>${latitude}</td><td>${longitude}</td><td><button onclick='copyLocation("${latitude} ${longitude}")' class='btn btn-primary'>Copy</button></td></tr>`)
    
}

const handleLocationError = (err) => {
    if(err.code == 1) {
       alert("Error: Access is denied!");
    } else if( err.code == 2) {
       alert("Error: Position is unavailable!");
    }
}

const copyLocation = (location) => {
    console.log(location)
    navigator.clipboard.writeText(location);
}