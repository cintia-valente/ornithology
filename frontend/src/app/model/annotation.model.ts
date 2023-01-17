import { Bird } from './bird.model';

export interface Annotation {
  idAnnotation?: string;
  idBird: string;
  date: Date;
  place: string;
}
