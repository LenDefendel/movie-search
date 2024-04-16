export interface IGlobalSearch {
  Search: ISearch[];
  totalResults: string;
  Response: string;
}

interface ISearch {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: link;
}

type link = `tt${string}`;
