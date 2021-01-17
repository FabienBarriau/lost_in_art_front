import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable()
export class ImgsService {

  private _paintingsPosition = environment.apiUrl.concat('paintingsPosition');
  private _paintingsDetails = environment.apiUrl.concat('paintingsDetail');

  constructor(private _httpclient: HttpClient) {
  }

  public imgs = new BehaviorSubject([]);
  public details = new BehaviorSubject([]);
  public boundingBox = new Object();
  public initialDensity: number;

  updateImgs(genres, styles, media, author, metric){
    var paramsObject = {}
    paramsObject["metric"] = metric
    if(genres !== null) paramsObject["genres"] = genres
    if(styles !== null) paramsObject["styles"] = styles
    if(media !== null) paramsObject["media"] = media
    if(author !== null) paramsObject["artistName"] = author
    let params = new HttpParams({ fromObject: paramsObject });
    this._httpclient.get(this._paintingsPosition, {params: params}).subscribe(
    paintingsPositionResponse => {
      const boundingBox = paintingsPositionResponse['bounding_box']
      const imgs = paintingsPositionResponse['data']
      const l = (boundingBox['x_max'] - boundingBox['x_min'])
      const h = (boundingBox['y_max'] - boundingBox['y_min'])
      if(imgs.length > 1){
        this.initialDensity = imgs.length/(l*h)
      } else {
        this.initialDensity = 0.002
      }
      this.imgs.next(imgs);
      this.details.next([]);
    })
  }

  updateSelectPaintings(selectedPaintings){
    let params = {}
    params["ids"] = Array.from(selectedPaintings).reverse()
    if(params["ids"].length != 0){
      this._httpclient.get(this._paintingsDetails, {params: params}).subscribe(
      paintingsDetailsResponse => {
        this.details.next(paintingsDetailsResponse['data'])
      })
    } else {
      this.details.next([])
    }
  }

}
