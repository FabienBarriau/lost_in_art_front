import { Component, OnInit } from '@angular/core';
import { RecommandationService } from '../services/recommandation.service';


@Component({
  selector: 'app-recommandation-gallery',
  templateUrl: './recommandation-gallery.component.html',
  styleUrls: ['./recommandation-gallery.component.scss']
})
export class RecommandationGalleryComponent implements OnInit {

  imgs = [];
  _activeIndex: number = 0;

  constructor(private recommandationService: RecommandationService) {
    this.recommandationService.imgs.subscribe(valeur => {
      this.imgs = valeur;
      this._activeIndex = 0
    });
  }

  ngOnInit(): void {

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

}
