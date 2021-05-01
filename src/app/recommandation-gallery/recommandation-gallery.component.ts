import { Component, OnInit } from '@angular/core';
import { ImgsService } from '../services/imgs.service';
import { RecommandationService } from '../services/recommandation.service';
import { FiltersService } from '../services/filters.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommandation-gallery',
  templateUrl: './recommandation-gallery.component.html',
  styleUrls: ['./recommandation-gallery.component.scss']
})
export class RecommandationGalleryComponent implements OnInit {

  imgs = [];
  _activeIndex: number = 0;
  responsiveOptions:any[] = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '960px',
          numVisible: 4
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];

  constructor(
    private imgsService: ImgsService,
    private recommandationService: RecommandationService,
    private filtersService: FiltersService,
    private router: Router
  ) {
    this.recommandationService.imgs.subscribe(valeur => {
      this.imgs = valeur;
      this._activeIndex = 0
    });
  }

  ngOnInit(): void {
    this.recommandationService.getRecommandation("57727993edc2cb3880dbce26")
  }

  get activeIndex(): number {
       return this._activeIndex;
   }

   set activeIndex(newValue) {
       if (this.imgs && 0 <= newValue && newValue <= (this.imgs.length - 1)) {
           this._activeIndex = newValue;
       }
   }

   next() {
        this.activeIndex++;
    }

    prev() {
        this.activeIndex--;
    }

    updateRecommandation(){
      this.recommandationService.getRecommandation(this.imgs[this._activeIndex].paintingId)
    }

    onClickApplyFiltersWithStyle(style: string){
      this.filtersService.set_selectedStyle(style)
      this.imgsService.updateImgsWithAppliedFilters(
        null,
        [style],
        null,
        null,
        'encoding');
        this.router.navigateByUrl('/home')
    }

    onClickApplyFiltersWithAuthor(author: string){
      this.filtersService.set_selectedAuthor(author)
      this.imgsService.updateImgsWithAppliedFilters(
        null,
        null,
        null,
        [author],
        'encoding');
        this.router.navigateByUrl('/home')
      }

}
