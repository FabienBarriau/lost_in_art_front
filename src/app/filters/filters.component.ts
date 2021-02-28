import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { ImgsService } from '../services/imgs.service';
import { environment } from 'src/environments/environment';
import {SidebarModule} from 'primeng/sidebar';

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
  selectedMedia: nameCode[];
  selectedStyle: nameCode[];
  selectedAuthor: nameCode[];
  selectedGenre: nameCode[];
  selectedMetric: nameCode;
  display: Boolean=false;

  constructor(private _httpClient: HttpClient, private imgsService: ImgsService) {
  }

  ngOnInit() {
    this.media = [];
    this.style = [];
    this.genre = [];
    this.author = [];
    this.metrics = [
        {name: 'Content', code: 'encoding'},
        {name: 'Color', code: 'color-encoding'},
    ];
    this.selectedMedia = [];
    this.selectedStyle = [];
    this.selectedGenre = [];
    this.selectedAuthor = [];
    this.selectedMetric = {name: 'Content', code: 'encoding'}
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

  updateImgsGraph() {
    let genres = null;
    if(this.selectedGenre.length != 0) genres = this.selectedGenre.map(item => item.code);
    let styles = null;
    if(this.selectedStyle.length != 0) styles = this.selectedStyle.map(item => item.code);
    let media = null;
    if(this.selectedMedia.length != 0) media = this.selectedMedia.map(item => item.code);
    let author = null;
    if(this.selectedAuthor.length != 0) author = this.selectedAuthor.map(item => item.code);
    let metric = this.selectedMetric["code"]
    this.imgsService.updateImgs(genres, styles, media, author, metric);
  }

  onClickSubmitValidate() {
    this.updateImgsGraph()
  }

  onClickSubmitRandom() {
    this.selectedMedia = [];
    this.selectedStyle = [];
    this.selectedGenre = [];
    this.selectedAuthor = [];

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    let dropDownList = [this.media, this.genre, this.style, this.author]
    let selectedDropDownList = [this.selectedMedia, this.selectedGenre, this.selectedStyle, this.selectedAuthor]
    let whichFilter = getRandomInt(4)
    for(let i=0;i<=getRandomInt(4);i++){
      selectedDropDownList[whichFilter].push(dropDownList[whichFilter][getRandomInt(dropDownList[whichFilter].length)])
    }
    this.selectedMetric = this.metrics[getRandomInt(2)]

    this.updateImgsGraph()
  }

}
