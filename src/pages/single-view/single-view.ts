import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NatureView } from '../../models/NatureView.model';

@Component({
  selector: 'page-single-view',
  templateUrl: 'single-view.html',
})
export class SingleViewPage implements OnInit{
  natureView: NatureView;

  constructor(public navParams: NavParams) {
  }

ngOnInit(){
  this.natureView = this.navParams.get('natureView');
}


}
