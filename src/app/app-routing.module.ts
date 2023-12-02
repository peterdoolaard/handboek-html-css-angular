import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VoorbeeldenComponent } from './voorbeelden/voorbeelden.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: 'voorbeelden',
    component: VoorbeeldenComponent,
  },
  {
    path: 'downloads',
    component: DownloadsComponent,
  },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: '',
    title: 'Home | Handboek HTML5 en CSS',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
