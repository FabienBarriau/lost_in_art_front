import { Component, OnInit } from '@angular/core';
import { RecommandationService } from '../services/recommandation.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItem } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { FiltersService } from '../services/filters.service';
import { Router } from '@angular/router';
import { ImgsService } from '../services/imgs.service';


interface nameCode {
    name: string,
    code: string
}

@Component({
  selector: 'app-recommandation-management',
  templateUrl: './recommandation-management.component.html',
  styleUrls: ['./recommandation-management.component.scss']
})
export class RecommandationManagementComponent implements OnInit {

    imgOfIinterest: Array<any> = []
    nbrRecommandation: number;
    metrics: nameCode[];
    selectedMetric: nameCode;
    displayRecommandationSettings: boolean=false;
    displayImportUserImageSettings: boolean=false;


    constructor(
      private imgsService: ImgsService,
      private recommandationService: RecommandationService,
      private filtersService: FiltersService,
      private router: Router
    ) {
      this.metrics = [
          {name: 'Content', code: 'encoding'},
          {name: 'Color', code: 'color-encoding'},
      ];
      this.recommandationService.imgOfIinterest.subscribe(valeur => {
        this.imgOfIinterest = valeur;
      });
      if(this.recommandationService.metric == 'encoding'){
        this.selectedMetric = {name: 'Content', code: 'encoding'}
      } else if(this.recommandationService.metric == 'color-encoding'){
        this.selectedMetric = {name: 'Color', code: 'color-encoding'}
      }
      this.nbrRecommandation = this.recommandationService.nbrRecommandation
  }

  ngOnInit(): void {
  }

  onClickSubmitNewRecommandation(): void {
    this.recommandationService.setNbrRecommandation(this.nbrRecommandation)
    this.recommandationService.setMetric(this.selectedMetric.code)
    if(this.recommandationService.isUserImage){
      this.recommandationService.getRecommandationForUserImage(this.recommandationService.UserImage)
    } else{
      this.recommandationService.getRecommandation(this.imgOfIinterest[0].paintingId)
    }
  }

  myUploader(event): void {
    this.recommandationService.getRecommandationForUserImage(event.files[0])
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
