
window.showBusMap = function (bus, container) {

    let busMarker = ''
    let scheduleId = ''

    const map = window.renderMap(container)

    updateMap(map, bus)

    pollUpdate(map, bus)

    function pollUpdate(map, bus) {
        
        const updateInterval = 500
        
        if (map.getDiv().style.display == 'block') {
            console.log('Map is visible, keep polling bus positions')

            $.ajax({
                url: 'https://cors-anywhere.herokuapp.com/https://opksmartbusao.herokuapp.com/api/buses/chassi/' + bus.chassi + '?includeSchedule=true',
                method: 'GET'
            }).done(function (buses) {
                
                updateMap(map, buses[0])
                setTimeout(()=> pollUpdate(map, bus), updateInterval)

            }).fail(function (error) {
                console.log('ERROR: ')
                console.log(error)

                setTimeout(()=> pollUpdate(map, bus), updateInterval)
            })
        }
    }


    function updateMap(map, bus) {

        if (bus.schedule && bus.schedule.scheduleData) {

            const scheduleData = bus.schedule.scheduleData

            if (scheduleData.scheduleId != scheduleId){

                console.log('New route, updating...')

                window.clearMap()
                busMarker = ''

                const waypoints = scheduleData[0].waypoints
                const hotPlaces = scheduleData[0].hotPlaces

                scheduleId = scheduleData.scheduleId
                drawRoute(map, waypoints)                
            }

            drawBus(map, bus)
            showStatus(bus)
        }
        else {
            scheduleId = ''
            window.clearMap()
            $('#bus-status').html('&nbsp;')
        }
    }

    function showStatus(bus) {

        $('#bus-status').html(''
        
        + '<div style="font-size: 16px; margin-bottom: 10px; margin">'        
        + '<strong>Rota: </strong>' + bus.schedule.track
        + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Horário: </strong>' +  bus.schedule.departureTime 
        + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Lotação: </strong>' +  bus.passengersNum + ' passageiro(s)'
        + ''
        + '</div>'
        )
    }

    function drawRoute(map, waypoints) {

        const bounds = new google.maps.LatLngBounds()

        const routePath = []

        waypoints.forEach(waypoint => {

            const location = new google.maps.LatLng(parseFloat(waypoint.latitude), parseFloat(waypoint.longitude))

            routePath.push(location)
            bounds.extend(location)
        })

        const route = new google.maps.Polyline({
            path: routePath,
            geodesic: true,
            strokeColor: '#ff0051e6',
            strokeOpacity: 1.0,
            strokeWeight: 6.291
        })

        route.setMap(map)

        map.fitBounds(bounds)
        map.panToBounds(bounds)

        window.mapData.routes.push(route)
    }

    function drawBus(map, bus) {

        if (busMarker == ''){
            console.log('Creating bus marker')
            const busIcon = {
                url: window.location.origin + '/img/bus.png',
                scaledSize: new google.maps.Size(48, 48),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(32, 32)
            }

            busMarker = new google.maps.Marker({
                icon: busIcon,
                map: map,
                title: 'Ônibus #' + bus.number//,
                // labelContent: 'Ônibus #' + bus.number + ', Passageiros: ' + bus.passengersNum
            })

            // busMarker.setAnimation(google.maps.Animation.BOUNCE)

            window.mapData.markers.push(busMarker)
        }
        
        busMarker.setPosition(new google.maps.LatLng(parseFloat(bus.position.latitude), parseFloat(bus.position.longitude)))
    }

    // Is not working properly
    // function drawHotPlaces(hotPlaces) {

    //     const iconPath = window.location.origin + '/iframe/img/marker.png'

    //     for (var i = 0; i < hotPlaces.length; i++) {

    //         const hotPlace = hotPlaces[i]

    //         const marker = new google.maps.Marker({
    //             position: new google.maps.LatLng(parseFloat(hotPlace.latitude), parseFloat(hotPlace.longitude)),
    //             icon: iconPath,
    //             map: map,
    //             title: hotPlace.title
    //         })
    //     }
    // }
}