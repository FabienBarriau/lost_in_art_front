import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { ImgsService } from '../services/imgs.service';
import { FiltersService } from '../services/filters.service';
import { environment } from 'src/environments/environment';
import { SidebarModule } from 'primeng/sidebar';

interface nameCode {
    name: string,
    code: string
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit{

  private _categoriesList = environment.apiUrl.concat('categories');

  media: nameCode[];
  style: nameCode[];
  author: nameCode[];
  genre: nameCode[];
  metrics: nameCode[];
  display: Boolean=false;
  isAppliedFilters: Boolean=false;
  IsgetImageDisabled: Boolean;
  nbrMaxImages: Number=20;
  selectedMedia: nameCode[];
  selectedStyle: nameCode[];
  selectedAuthor: nameCode[];
  selectedGenre: nameCode[];
  selectedMetric: nameCode={name: 'Content', code: 'encoding'}

  constructor(
    private _httpClient: HttpClient,
    private imgsService: ImgsService,
    private filtersService: FiltersService
  ) {}

  ngOnInit() {
    this.media = [];
    this.style = [];
    this.genre = [];
    this.author = [];
    this.metrics = [
        {name: 'Content', code: 'encoding'},
        {name: 'Color', code: 'color-encoding'},
    ];
    this.filtersService.selectedStyle.subscribe(value => {
      this.isAppliedFilters = true;
      this.selectedMedia = [];
      this.selectedStyle = value;
      this.selectedAuthor = [];
      this.selectedGenre = [];
    });
    this.filtersService.selectedAuthor.subscribe(value => {
      this.isAppliedFilters = true;
      this.selectedMedia = [];
      this.selectedStyle = [];
      this.selectedAuthor = value;
      this.selectedGenre = [];
    });
    this.filtersService.IsgetImageDisabled.subscribe(value => {
      this.IsgetImageDisabled = value
    })
    this.isAppliedFilters = false;
  }

  ngAfterViewInit() {
      this._httpClient.get(this._categoriesList).subscribe(
      categoriesListResponse => {
        this.media = categoriesListResponse['media'].map(item => new Object({name: item, code: item}))
        this.style = categoriesListResponse['styles'].map(item => new Object({name: item, code: item}))
        this.genre = categoriesListResponse['genres'].map(item => new Object({name: item, code: item}))
        this.author = categoriesListResponse['artistName'].map(item => new Object({name: item, code: item}))
      }
    );
  }

  getImagesWithAppliedFilters() {
    let genres = null;
    if(this.selectedGenre.length != 0) genres = this.selectedGenre.map(item => item.code);
    let styles = null;
    if(this.selectedStyle.length != 0) styles = this.selectedStyle.map(item => item.code);
    let media = null;
    if(this.selectedMedia.length != 0) media = this.selectedMedia.map(item => item.code);
    let author = null;
    if(this.selectedAuthor.length != 0) author = this.selectedAuthor.map(item => item.code);
    let metric = this.selectedMetric["code"]
    this.imgsService.updateImgsWithAppliedFilters(genres, styles, media, author, metric);
  }

  getImagesWithRandomSample(){
    this.imgsService.updateImgsWithRandomSample(
      this.selectedMetric["code"],
      this.nbrMaxImages
    );
  }

  onClickGetImages(event: any){
    if(this.isAppliedFilters){
      this.getImagesWithAppliedFilters()
    } else{
      this.getImagesWithRandomSample()
    }
    this.filtersService.set_IsgetImageDisabled(true)
  }

}
