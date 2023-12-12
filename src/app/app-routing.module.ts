import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VoorbeeldenComponent } from './voorbeelden/voorbeelden.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { BlogsComponent } from './blogs/blogs.component';

const routes: Routes = [
  {
    path: 'voorbeelden',
    component: VoorbeeldenComponent,
    pathMatch: 'full',
  },
  {
    path: 'blogs',
    component: BlogsComponent,
    pathMatch: 'full',
  },
  {
    path: 'downloads',
    component: DownloadsComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
