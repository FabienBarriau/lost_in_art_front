import { Component, OnInit } from '@angular/core';
import { RecommandationService } from '../services/recommandation.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItem } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';

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


    constructor(private recommandationService: RecommandationService) {
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

}
