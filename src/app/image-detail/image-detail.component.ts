import { Component, OnInit } from '@angular/core';
import { ImgsService } from '../services/imgs.service';
import { RecommandationService } from '../services/recommandation.service';
import { FiltersService } from '../services/filters.service';
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
    private filtersService: FiltersService,
    private router: Router) {
    this.imgsService.details.subscribe(value => {
      this.details = value;
    });
  }

  ngOnInit(): void {
  }

  goToRecommandation(art_id: string){
    this.recommandationService.getRecommandation(art_id)
    this.router.navigateByUrl('/similarity')
  }

  onClickApplyFiltersWithStyle(style: string){
    this.filtersService.set_selectedStyle(style)
    this.imgsService.updateImgsWithAppliedFilters(
      null,
      [style],
      null,
      null,
      'encoding');
  }

  onClickApplyFiltersWithAuthor(author: string){
    this.filtersService.set_selectedAuthor(author)
    this.imgsService.updateImgsWithAppliedFilters(
      null,
      null,
      null,
      [author],
      'encoding');
    }

}
