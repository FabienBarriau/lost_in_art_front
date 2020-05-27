import { Component, OnInit } from '@angular/core';
import { ImgsService } from '../services/imgs.service';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {

  details = []

  constructor(private imgsService: ImgsService) {
    this.imgsService.details.subscribe(valeur => {
      this.details = valeur;
    });
  }

  ngOnInit(): void {
  }

}
