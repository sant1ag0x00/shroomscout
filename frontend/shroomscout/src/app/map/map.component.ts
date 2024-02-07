import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as L from 'leaflet';
import { filter } from 'rxjs';
import { MarkerService } from '../marker.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private router = inject(Router);
  private markerService = inject(MarkerService);

  private map!: L.Map;

  ngOnInit() {
    this.initializeMap();
    this.handleMapClicks();
  }

  /**
   * Initializes the leaflet map to Berlin's coordinates
   * and loads the actual map tiles from OSM.
   */
  private initializeMap(): void {
    this.map = L.map('map').setView([52.52, 13.405], 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
    this.markerService.initializeMap(this.map);
  }

  /**
   * If the register form is open, listenes for click events on the map.
   * Using the MarkerService, a marker is palced on the lastly clicked
   * location and removed if the register form is closed.
   */
  private handleMapClicks(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        if (event.url.endsWith('/register')) {
          this.map.on('click', (event: L.LeafletMouseEvent) => {
            this.markerService.setTemporaryMarker(event.latlng);
          });
        } else {
          this.map.off('click');
          this.markerService.removeTemporaryMarker();
        }
      });
  }
}
