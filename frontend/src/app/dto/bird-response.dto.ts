import { Bird } from '../model/bird.model';

export interface BirdDto {
  id: string;
  imageId?: string;
  namePtbr: string;
  nameEnglish: string;
  nameLatin: string;
  size: string;
  genre: string;
  color: string;
  family: string;
  habitat: string;
}
