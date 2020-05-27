import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { ImgsService } from './services/imgs.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FiltersComponent } from './filters/filters.component';
import { ImageChartComponent } from './image-chart/image-chart.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { FooterComponent } from './footer/footer.component';
import { BBcodeToHtml } from './pipe/bbcodeToHtml';

@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    ImageChartComponent,
    ImageDetailComponent,
    FooterComponent,
    BBcodeToHtml,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MultiSelectModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    HttpClientModule,
    CardModule,
    ScrollPanelModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
  ],
  providers: [
    ImgsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
