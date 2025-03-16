import { Component } from '@angular/core';
import { UserMapComponent } from './user-map/user-map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserMapComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-map-app';
}
