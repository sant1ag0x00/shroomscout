import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as L from 'leaflet';
import { Subject, filter } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private router = inject(Router);

  private map!: L.Map;
  private coordinatesSubject$ = new Subject<L.LatLng>();

  protected coordinates$ = this.coordinatesSubject$.asObservable();

  ngOnInit() {
    // Initialize map to Berlin
    this.map = L.map('map').setView([52.52, 13.405], 10);

    // Load OSM tiles
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

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

            const tooltipText: string = 'Steinpilz';

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

    this.coordinates$.subscribe((coords) => {
      console.log(coords);
    });
  }
}
