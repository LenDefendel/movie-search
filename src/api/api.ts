import axios from 'axios';
import type { IMovieShortInfo, IMovieLongInfo } from 'src/entities/Movie';
import type { imdbID } from 'src/entities/types';

const apikey = '771333f5';

export interface IMovieSearchResponse {
  Response: 'True';
  Search: IMovieShortInfo[];
  totalResults: string;
}

export interface IMovieApiError {
  Response: 'False';
  Error: string;
}

export async function getMovie(id: imdbID) {
  return (
    axios
      .get('http://www.omdbapi.com/', {
        params: {
          apikey,
          i: id,
        },
      })
      .then((response) => response.data)
      .then((data: IMovieLongInfo | IMovieApiError) => {
        if (data.Response === 'False') {
          throw new Error(data.Error, { cause: data.Error });
        }

        return data;
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((error) => {
        // console.log(error);
        return Promise.reject();
      })
  );
}

export async function searchMovieByString(str: string, page: number = 1) {
  if (!str || str.length === 0) {
    str = 'spider';
  }

  return axios
    .get('http://www.omdbapi.com/', {
      params: {
        apikey,
        s: str,
        page,
      },
    })
    .then((response) => response.data)
    .then((data: IMovieSearchResponse | IMovieApiError) => {
      if (data.Response === 'False') {
        throw new Error(data.Error, { cause: data.Error });
      }

      return data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
