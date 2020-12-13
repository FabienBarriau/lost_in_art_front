import { Component, OnInit } from '@angular/core';
import { RecommandationService } from '../services/recommandation.service';


@Component({
  selector: 'app-recommandation',
  templateUrl: './recommandation.component.html',
  styleUrls: ['./recommandation.component.scss']
})
export class RecommandationComponent implements OnInit {

  imgs = []

  constructor(private recommandationService: RecommandationService) {
    this.recommandationService.imgs.subscribe(valeur => {
      this.imgs = valeur;
    });
    this.imgs = [
      {
        "paintingId": "5772752eedc2cb3880cd9f28",
        "title": "The Rokeby Venus",
        "artistName": "Diego Velázquez",
        "image": "https://uploads8.wikiart.org/images/diego-velazquez/the-rokeby-venus-1648.jpg!Large.jpg"
      },
      {
        "paintingId": "57726e37edc2cb3880b6291e",
        "title": "Ecce Homo",
        "artistName": "Caravaggio",
        "image": "https://uploads3.wikiart.org/images/caravaggio/ecce-homo(1).jpg!Large.jpg",
      },
      {
        "paintingId": "57727d9fedc2cb3880e86053",
        "title": "Crucification",
        "artistName": "Ernst Fuchs",
        "image": "https://uploads1.wikiart.org/images/ernst-fuchs/crucification-1950.jpg!Large.jpg",
      },
      {
        "paintingId": "577281a7edc2cb3880f512a8",
        "title": "Charon and Psyche",
        "artistName": "John Roddam Spencer Stanhope",
        "image": "https://uploads3.wikiart.org/images/john-roddam-spencer-stanhope/charon-and-psyche-1883.jpg",
      },
      {
        "paintingId": "5772798eedc2cb3880dbc5c2",
        "title": "Triumph of Chastity",
        "artistName": "Lorenzo Lotto",
        "image": "https://uploads0.wikiart.org/images/lorenzo-lotto/triumph-of-chastity-1530.jpg!Large.jpg"
      }
    ]
    console.log(this.imgs)
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

   _activeIndex: number = 0;

   next() {
        this.activeIndex++;
    }

    prev() {
        this.activeIndex--;
    }

}
