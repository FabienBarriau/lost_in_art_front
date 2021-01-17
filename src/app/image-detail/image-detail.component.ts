import { Component, OnInit } from '@angular/core';
import { ImgsService } from '../services/imgs.service';
import { RecommandationService } from '../services/recommandation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {

  details = []

  constructor(
    private imgsService: ImgsService,
    private recommandationService: RecommandationService,
    private router: Router) {
    this.imgsService.details.subscribe(valeur => {
      this.details = valeur;
    });
  }

  ngOnInit(): void {
  }

  goToRecommandation(art_id: string){
    this.recommandationService.getRecommandation(art_id)
    this.router.navigateByUrl('/recommandation')
  }

}
