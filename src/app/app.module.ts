import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TabMenuModule } from 'primeng/tabmenu';
import { GalleriaModule } from 'primeng/galleria';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { SidebarModule } from 'primeng/sidebar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';

import { ImgsService } from './services/imgs.service';
import { RecommandationService } from './services/recommandation.service';
import { FiltersService } from './services/filters.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FiltersComponent } from './filters/filters.component';
import { ImageChartComponent } from './image-chart/image-chart.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { FooterComponent } from './footer/footer.component';
import { BBcodeToHtml } from './pipe/bbcodeToHtml';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RecommandationComponent } from './recommandation/recommandation.component';
import { RecommandationGalleryComponent } from './recommandation-gallery/recommandation-gallery.component';
import { RecommandationManagementComponent } from './recommandation-management/recommandation-management.component';
import { BigWallComponent } from './big-wall/big-wall.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'big-wall', component: BigWallComponent },
  { path: 'similarity', component: RecommandationComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    ImageChartComponent,
    ImageDetailComponent,
    FooterComponent,
    BBcodeToHtml,
    HeaderComponent,
    HomeComponent,
    RecommandationComponent,
    RecommandationGalleryComponent,
    RecommandationManagementComponent,
    BigWallComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MultiSelectModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    FileUploadModule,
    FormsModule,
    HttpClientModule,
    CardModule,
    ScrollPanelModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    TabMenuModule,
    GalleriaModule,
    SidebarModule,
    InputSwitchModule,
    DialogModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    ImgsService,
    RecommandationService,
    FiltersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
