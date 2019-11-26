
window.mapData = {
    routes: [],
    markers: []
}

window.defaultMapOptions = {
    center: { lat: -26.9128654, lng: -48.6740193 },
    zoom: 13.75
}

window.createMap = function () {

    const hiddenContainer = document.createElement('div')

    hiddenContainer.style.width = '100%'
    hiddenContainer.style.height = '100%'
    hiddenContainer.style.display = 'none'
    hiddenContainer.style.border = '1px solid lightgray'

    window.map = new google.maps.Map(hiddenContainer, window.defaultMapOptions)
}

window.renderMap = function (container) {

    const map = window.map
    const hiddenContainer = map.getDiv()

    container.append(hiddenContainer)
    hiddenContainer.style.display = 'block'

    map.setOptions(window.defaultMapOptions)
    google.maps.event.trigger(map, "resize")

    return window.map
}

window.hideMap = function () {

    const map = window.map
    const container = map.getDiv()
    container.style.display = 'none'
}

window.clearMap = function () {

    const mapData = window.mapData
    const routes = mapData.routes
    const markers = mapData.markers

    for (let i = 0; i < routes.length; i++) {
        routes[i].setMap(null)
    }

    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null)
    }

    routes.length = 0
    markers.length = 0
};

// WARNING: Do not remove the comma above or the code won't work

(function () {

    if (typeof google === 'object' && typeof google.maps === 'object') {
        // Google maps already loaded, just call initMap function
        window.createMap()
        return
    }

    const scriptTag = document.createElement('script')

    scriptTag.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=' + window.mapsApiKey + '&callback=createMap')

    document.getElementsByTagName("head")[0].appendChild(scriptTag)
})()