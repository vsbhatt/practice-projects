import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ComicStore } from '../../../../models/people.model';

declare var google: any;
var map;
var infowindow;

@Component({
  selector: 'app-comic-stores-list',
  templateUrl: './comic-stores-list.component.html',
  styleUrls: ['./comic-stores-list.component.css']
})
export class ComicStoresListComponent implements OnInit {

  @ViewChild('map', { read: true }) mapElement: ElementRef;
  isAllowedCurrentLocation: boolean;
  stores: Array<ComicStore> = [];
  isLoading = false;

  constructor(  ) { }

  ngOnInit() {
    this.isAllowedCurrentLocation = false;
    this.loadMap();
  }

  // call load map to initialize the map to load data
  loadMap() {
    // check if we are getting geolocation
    if (navigator.geolocation) {
      this.isAllowedCurrentLocation = true;
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.initMap(position.coords.latitude, position.coords.longitude)
        map.setCenter(pos);
      }, (error) => {
        if (error.code === 1) {
          this.isAllowedCurrentLocation = false;
        }
      });
    } else {
      this.isAllowedCurrentLocation = false;    
    }
  }

  // initialize map and set lat long into that
  initMap(latitude: number, longitude: number) {
    let latlng = new google.maps.LatLng(latitude, longitude);
    map = new google.maps.Map(document.getElementById('map'), {
      center: latlng,
      zoom: 15
    });

    const currentLocationMarker = new google.maps.Marker({
      map: map,
      position: latlng,
      animation: google.maps.Animation.DROP
    });

    currentLocationMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');

    infowindow = new google.maps.InfoWindow();
    this.isLoading = true;
    let service = new google.maps.places.PlacesService(map);
    // search with text to find comic stores
    service.textSearch({
      location: latlng,
      radius: '1000',
      query: 'comic stores near me'
    }, (result, status) => this.callback(result, status));
  }

  callback(results, status) {
    try {
      this.stores = [];
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < results.length; i++) {
          let marker = new google.maps.Marker({
            map: map,
            position: results[i].geometry.location
          });

          google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(results[i].name);
            infowindow.open(map, this);
          });
          bounds.extend(results[i].geometry.location);
          // add stores in listing
          this.stores.push({
            address: results[i].formatted_address,
            name: results[i].name
          });
        }
        map.fitBounds(bounds);
      }
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
    }
  }
}
