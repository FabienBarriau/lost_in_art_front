import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class FiltersService {
  public selectedAuthor = new BehaviorSubject([]);
  public selectedStyle = new BehaviorSubject([]);
  public IsgetImageDisabled = new BehaviorSubject(false);

  set_selectedAuthor(selectedAuthor: string){
    this.selectedAuthor.next([{name: selectedAuthor, code: selectedAuthor}]);
  }

  set_selectedStyle(selectedStyle: string){
    this.selectedStyle.next([{name: selectedStyle, code: selectedStyle}]);
  }

  set_IsgetImageDisabled(IsgetImageDisabled: boolean){
    this.IsgetImageDisabled.next(IsgetImageDisabled)
  }

}
