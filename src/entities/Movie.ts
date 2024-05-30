import type { httpLink, imdbID } from 'src/entities/types';

export interface IMovieLongInfo {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: httpLink;
  Ratings: IRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: imdbID;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface IMovieShortInfo {
  Title: string;
  Year: string;
  imdbID: imdbID;
  Type: string;
  Poster: httpLink;
}

export interface IRating {
  Source: string;
  Value: string;
}
