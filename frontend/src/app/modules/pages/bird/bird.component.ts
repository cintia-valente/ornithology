import { User } from 'src/app/model/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Bird } from 'src/app/model/bird.model';
import { BirdService } from '../../../services/bird.service';

@Component({
  selector: 'app-bird',
  templateUrl: './bird.component.html',
  styleUrls: ['./bird.component.scss'],
})
export class BirdComponent implements OnInit {
  public birds: Bird[] = [];
  error: boolean = false;

  constructor(private birdService: BirdService) {}

  ngOnInit(): void {
    this.listBird();
  }

  listBird() {
    this.error = false;

    this.birdService.getBirds().subscribe({
      next: (data: Bird[]) => console.log((this.birds = data)),

      error: (err: HttpErrorResponse) => {
        this.error = true;
        alert(`Erro ao carregar aves. Tente novamente mais tarde.`);

        return throwError(() => err);
      },
    });
  }
}
