import { Bird } from './bird.model';

export interface Annotation {
  idAnnotation?: number;
  bird: Bird;
  date?: Date;
  place: string;
}
