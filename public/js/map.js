
    
    mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });

       const marker1 = new mapboxgl.Marker({ color: 'red'})
        .setLngLat(listing.geometry.coordinates) //Listing.geometry .coordinates // boilerplate m include hua h kyuki ye publlc file h isme coordinates ya tokens nhi show krenge
        .setPopup(
            new mapboxgl.Popup({offset:25 }).setHTML(
            `<div <h4>${listing.title}</h4><p> Exact Location provided after booking</p>`
        )
    )
        .addTo(map);



        
