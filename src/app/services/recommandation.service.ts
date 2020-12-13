import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable()
export class RecommandationService {

  private paintingRecommendation = environment.apiUrl.concat('paintingRecommendation');

  constructor(private _httpclient: HttpClient) { }

  public imgs = new BehaviorSubject([]);

  getRecommandation(art_id, nbr, metric){
    console.log("salut")
    var paramsObject = {}
    paramsObject["art_id"] = art_id
    paramsObject["nbr"] = nbr
    paramsObject["metric"] = metric
    let params = new HttpParams({ fromObject: paramsObject });
    console.log(paramsObject)
    this._httpclient.get(this.paintingRecommendation, {params: params}).subscribe(
    paintingRecommendationResponse => {
      const imgs = paintingRecommendationResponse['data']
      console.log(imgs)
      this.imgs.next(imgs);
    })
  }

}
