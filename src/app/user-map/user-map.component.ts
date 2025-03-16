import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-user-map',
  templateUrl: './user-map.component.html',
  styleUrls: ['./user-map.component.css']
})
export class UserMapComponent implements OnInit, AfterViewInit {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private map: any;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // Detectar si es navegador o servidor
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then(L => {
        this.initMap(L);
        this.loadUsers(L);
      }).catch(error => console.error('Error cargando Leaflet:', error));
    }
  }

  private initMap(L: any): void {
    this.map = L.map('map').setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private loadUsers(L: any): void {
    this.http.get<any[]>(this.apiUrl).subscribe(users => {
      users.forEach(user => {
        const lat = parseFloat(user.address.geo.lat);
        const lng = parseFloat(user.address.geo.lng);

        if (!isNaN(lat) && !isNaN(lng)) {
          L.marker([lat, lng])
            .addTo(this.map)
            .bindPopup(`<b>${user.name}</b><br>${user.address.city}`);
        }
      });
    }, error => {
      console.error('Error al cargar los usuarios:', error);
    });
  }
}

