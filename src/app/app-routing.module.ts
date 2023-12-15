import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VoorbeeldenComponent } from './voorbeelden/voorbeelden.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './articles/article/article.component';

const routes: Routes = [
  {
    path: 'voorbeelden',
    component: VoorbeeldenComponent,
    pathMatch: 'full',
  },
  {
    path: 'artikelen',
    component: ArticlesComponent,
    pathMatch: 'full',
  },
  {
    path: 'artikelen/:articleUrl',
    component: ArticleComponent,
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
  imports: [RouterModule.forRoot(routes,
    {anchorScrolling: 'enabled'}
  )],
  exports: [RouterModule],
})
export class AppRoutingModule {}
