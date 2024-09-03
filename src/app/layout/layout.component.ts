import { Component } from '@angular/core';
import { LoaderService } from '../Api/services/loader.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
constructor(public loaderService:LoaderService) {}

}
