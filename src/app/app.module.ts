import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { TitleStrategy } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { IntersectionObserverDirective } from './directives/intersection-observer.directive';
import { HighlightService } from "./services/highlight.service";
import { EscapeMarkupPipe } from './pipes/escape-markup.pipe';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/header/logo/logo.component';
import { TitleComponent } from './components/header/title/title.component';
import { StampComponent } from './components/header/stamp/stamp.component';
import { NavigationComponent } from "./components/navigation/navigation.component";
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { VoorbeeldenComponent } from './voorbeelden/voorbeelden.component';
import { HoofdstukComponent } from './components/hoofdstuk/hoofdstuk.component';
import { CodeComponent } from './components/code/code.component';
import { CodeExampleViewComponent } from './components/code/code-example-view/code-example-view.component';
import { LinksComponent } from './components/links/links.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { DynamicTitleStrategy } from './services/dynamic-title-strategy.service';
import { TestComponent } from './test/test.component';

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
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HighlightService, {provide: TitleStrategy, useClass: DynamicTitleStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {}
