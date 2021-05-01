import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable()
export class RecommandationService {

  private _paintingRecommendation = environment.apiUrl.concat('paintingRecommendation');
  private _paintingsDetails = environment.apiUrl.concat('paintingsDetail');

  constructor(private _httpclient: HttpClient) { }
  public imgOfIinterest = new BehaviorSubject([]);
  public imgs = new BehaviorSubject([]);
  public nbrRecommandation: number = 5;
  public metric: string = 'encoding';
  public isUserImage: boolean = false;
  public UserImage: File;

  getRecommandation(art_id){
    this.isUserImage = false
    // Update recommanded images
    var paramsObjectRecommandedImgs = {};
    paramsObjectRecommandedImgs["art_id"] = art_id;
    paramsObjectRecommandedImgs["nbr"] = this.nbrRecommandation;
    paramsObjectRecommandedImgs["metric"] = this.metric;
    this._httpclient.get(
      this._paintingRecommendation,
      {params: new HttpParams({ fromObject: paramsObjectRecommandedImgs })}
    ).subscribe(
    paintingRecommendationResponse => {
      this.imgs.next(paintingRecommendationResponse['data']);
    })
    // Update image of interest
    var paramsObjecImgOfInterest = {};
    paramsObjecImgOfInterest["ids"] = [art_id];
    this._httpclient.get(
      this._paintingsDetails,
      {params: new HttpParams({ fromObject: paramsObjecImgOfInterest })}
    ).subscribe(
    paintingsDetailsResponse => {
      this.imgOfIinterest.next(paintingsDetailsResponse['data'])
    })
  }

  getRecommandationForUserImage(file: File){
    this.isUserImage = true
    this.UserImage = file
    // Update recommanded images
    const formData = new FormData();
    formData.append('file', this.UserImage, this.UserImage.name);
    formData.append('nbr', this.nbrRecommandation.toString());
    formData.append('metric', this.metric);
    const headerDict = {
      'accept': 'application/json',
    }
    this._httpclient.post(
      this._paintingRecommendation,
      formData,
      {headers: new HttpHeaders(headerDict), reportProgress: true}
    ).subscribe(
    paintingRecommendationResponse => {
      this.imgs.next(paintingRecommendationResponse['data']);
    })
    // Update image of interest
    var img = [];
    img[0] = {"title": "Your image"}
    this.imgOfIinterest.next(img);
  }

  setNbrRecommandation(nbr: number){
    this.nbrRecommandation = nbr
  }

  setMetric(metric: string){
    this.metric = metric
  }

}
