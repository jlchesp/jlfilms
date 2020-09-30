import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from 'src/app/Interfaces/interfaces';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-slideshow-par',
  templateUrl: './slideshow-par.component.html',
  styleUrls: ['./slideshow-par.component.scss'],
})
export class SlideshowParComponent implements OnInit {

  @Input() moviesPoster: Movie[] = [];
  @Output() moreFilms = new EventEmitter();

  slideOpts = {
    slidesPerView: 2.5,
    freeMode: true,
    spaceBetween: -75
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onClick(){
    this.moreFilms.emit();
  }

  async details(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }

}
