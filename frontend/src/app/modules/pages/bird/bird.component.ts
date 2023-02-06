import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { Bird } from 'src/app/model/bird.model';
import { BirdService } from '../../../services/bird.service';

@Component({
  selector: 'app-bird',
  templateUrl: './bird.component.html',
  styleUrls: ['./bird.component.scss'],
})
export class BirdComponent implements OnInit {
  birds: Bird[] = [];
  birdsDisplayed: Bird[] = [];
  error: boolean = false;

  constructor(private birdService: BirdService) {}

  ngOnInit(): void {
    this.listBirds();
  }

  listBirds() {
    this.error = false;

    this.birdService.getBirds().subscribe({
      next: (data: Bird[]) => {
        this.birds = data;
        this.birdsDisplayed = data;
      },

      error: (err: HttpErrorResponse) => {
        this.error = true;
        alert(`Erro ao carregar aves. Tente novamente mais tarde.`);

        return throwError(() => err);
      },
    });
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.birds = this.birdsDisplayed.filter((bird) =>
      bird.namePtbr.toLowerCase().includes(value)
    );
  }
}
