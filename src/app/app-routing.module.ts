import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { VoorbeeldenComponent } from "./voorbeelden/voorbeelden.component";
import { DownloadsComponent } from "./downloads/downloads.component";
import { TestpageComponent } from "./testpage/testpage.component";

const routes: Routes = [
  { path: 'voorbeelden', title: 'Voorbeelden | Handboek HTML5 en CSS', component: VoorbeeldenComponent },
  { path: 'downloads', title: 'Downloads | Handboek HTML5 en CSS', component: DownloadsComponent },
  { path: '', title: 'Home | Handboek HTML5 en CSS', component: HomeComponent, pathMatch: "full"},
  // { path: '', title: 'Testpagina', component: TestpageComponent, pathMatch: "full"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
