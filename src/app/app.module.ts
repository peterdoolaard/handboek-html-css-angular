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
import { LinksComponent } from './components/links/links.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightService } from "./services/highlight.service";
import { EscapeMarkupPipe } from './pipes/escape-markup.pipe';
import { CodeExampleViewComponent } from './components/code/code-example-view/code-example-view.component';

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
    LinksComponent,
    EscapeMarkupPipe,
    CodeExampleViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HighlightService],
  bootstrap: [AppComponent]
})
export class AppModule {}
