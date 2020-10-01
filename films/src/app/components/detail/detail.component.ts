import { DataLocalService } from './../../services/data-local.service';
import { ModalController } from '@ionic/angular';
import { Cast, MovieDetail } from './../../Interfaces/interfaces';
import { MoviesService } from './../../services/movies.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  @Input() id;
  movie: MovieDetail = {};
  cast: Cast[] = [];
  hidden = 150;
  slideOptCast = {
    slidesPerView: 3.3,
    freeMode: true
  };
  star = 'star-outline';

  constructor(private moviesService: MoviesService, private modalCtrl: ModalController, private dataLocal: DataLocalService) { }

  ngOnInit() {

    this.dataLocal.movieExist(this.id)
      .then(exists => this.star = (exists) ? 'star' : 'star-outline');

    this.moviesService.getDetail(this.id)
      .subscribe(res => {
        this.movie = res;
      });

    this.moviesService.getCast(this.id)
      .subscribe(res => {
        this.cast = res.cast;
      });
  }

  back() {
    this.modalCtrl.dismiss();
  }

  fav(){
    const exists = this.dataLocal.saveMovie(this.movie);
    this.star = (exists) ? 'star' : 'star-outline';
  }

}
