import { Component } from '@angular/core';
import { AppSharedService } from '../services/app-shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  constructor(
    private appService: AppSharedService,
  ) {
  }
}
