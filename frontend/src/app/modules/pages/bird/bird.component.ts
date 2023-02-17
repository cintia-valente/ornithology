import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { Bird } from 'src/app/model/bird.model';
import { BirdService } from '../../../services/bird.service';
import { Buffer } from 'buffer';
import { BirdDto } from 'src/app/dto/bird-response.dto';

@Component({
  selector: 'app-bird',
  templateUrl: './bird.component.html',
  styleUrls: ['./bird.component.scss'],
})
export class BirdComponent implements OnInit {
  birds: Bird[] = [];
  birdsDisplayed: Bird[] = [];
  error: boolean = false;
  imageUrl!: SafeResourceUrl;

  constructor(
    private birdService: BirdService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.listBirds();
  }

  listBirds() {
    this.error = false;

    this.birdService.getBirds().subscribe({
      next: (data: BirdDto[]) => {
        this.birds = data;
        this.birdsDisplayed = data;

        this.birds.forEach((bird) => {
          if (bird.imageUrl) {
            this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              'data:image/jpeg;base64,' +
                Buffer.from(bird.imageUrl, 'base64').toString('base64')
            );
          }
        });
      },

      error: (err: HttpErrorResponse) => {
        this.toastr.error(
          'Erro ao carregar aves. Por favor, tente novamente mais tarde.'
        );

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
