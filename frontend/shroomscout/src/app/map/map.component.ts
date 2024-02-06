import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as L from 'leaflet';
import { Subject, filter } from 'rxjs';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private router = inject(Router);
  private messageService = inject(MessageService);

  private map!: L.Map;
  private coordinatesSubject$ = new Subject<L.LatLng>();

  protected coordinates$ = this.coordinatesSubject$.asObservable();

  ngOnInit() {
    this.initializeMap();
    this.handleMapClick('');

    this.coordinates$.subscribe((coords) => {
      console.log(coords);
    });
  }

  /**
   * Initializes the leaflet map to Berlin's coordinates and loads the actual map from OSM.
   */
  private initializeMap(): void {
    // Initialize map to Berlin
    this.map = L.map('map').setView([52.52, 13.405], 10);

    // Load OSM tiles
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
  }

  /**
   * Listenes for click events on the map and places a marker on the lastly clicked location,
   * if the register form is open. Also displayes a text above the marker.
   *
   * @param tooltipText The text displayed above the current marker.
   */
  private handleMapClick(tooltipText: string): void {
    // Handle placing location marker on click
    let marker: L.Marker | null = null;
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        // If register view is open, add event listener for clicks
        if (event.url.endsWith('/register')) {
          this.map.on('click', (event: L.LeafletMouseEvent) => {
            const coords: L.LatLng = event.latlng;

            // Only allow one marker at a time
            if (marker) {
              marker.setLatLng(coords);
              marker
                .bindTooltip(tooltipText, {
                  permanent: false,
                  direction: 'top',
                  offset: L.point(-15, -15),
                })
                .openTooltip();
            } else {
              marker = L.marker(coords).addTo(this.map);
              marker
                .bindTooltip(tooltipText, {
                  permanent: false,
                  direction: 'top',
                  offset: L.point(-15, -15),
                })
                .openTooltip();
            }

            this.coordinatesSubject$.next(coords);
          });
        }
        // Remove event listener for clicks, if register view is closed
        else {
          this.map.off('click');
        }
      });
  }
}
