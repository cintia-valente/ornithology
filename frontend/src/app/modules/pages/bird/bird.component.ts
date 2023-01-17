import { Component, OnInit } from '@angular/core';
import { Bird } from 'src/app/model/bird.model';
import { BirdService } from 'src/app/services/bird.service';

@Component({
  selector: 'app-bird',
  templateUrl: './bird.component.html',
  styleUrls: ['./bird.component.scss'],
})
export class BirdComponent implements OnInit {
  public list: Array<any> = [];
  public birds: Bird[] = [];
  loading: boolean = true;

  constructor(private birdService: BirdService) {}

  ngOnInit(): void {
    this.getBird;
  }

  public getBird() {
    // this.loading = true;

    this.birdService.getBirds().subscribe((data: any) => {
      //this.loading = false;
      if (data) {
        this.list = data;
        console.log(data);
        console.log(this.list);
      }
    });
  }
}
