import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/header/logo/logo.component';
import { TitleComponent } from './components/header/title/title.component';
import { StampComponent } from './components/header/stamp/stamp.component';
import { NavigationComponent } from "./components/navigation/navigation.component";
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { VoorbeeldenComponent } from './voorbeelden/voorbeelden.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { CodeComponent } from './components/code/code.component';
import { HoofdstukComponent } from './components/hoofdstuk/hoofdstuk.component';
import { IntersectionObserverDirective } from './directives/intersection-observer.directive';
import { TestpageComponent } from './testpage/testpage.component';
import { LinksComponent } from './components/links/links.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    TitleComponent,
    StampComponent,
    HomeComponent,
    VoorbeeldenComponent,
    DownloadsComponent,
    NavigationComponent,
    CodeComponent,
    HoofdstukComponent,
    IntersectionObserverDirective,
    TestpageComponent,
    LinksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
