import { Component } from '@angular/core';
import { LoaderService } from './Api/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';

  constructor() {
  }
}
