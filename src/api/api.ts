import axios from 'axios';
import type { IMovieShortInfo } from 'src/entities/Movie';
import type { imdbID } from 'src/types';

const apikey = '771333f5';

export interface IMovieSearchResponse {
  Response: 'True';
  Search: IMovieShortInfo[];
  totalResults: string;
}

export interface IMovieSearchError {
  Response: 'False';
  Error: string;
}

export async function getCard(id: imdbID) {
  return (
    axios
      .get('http://www.omdbapi.com/', {
        params: {
          apikey,
          i: id,
        },
      })
      .then((response) => {
        // console.log(response);
        return response;
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((error) => {
        // console.log(error);
        return Promise.reject();
      })
  );
}

export async function searchMovieByString(str: string, page: number = 1) {
  return axios
    .get('http://www.omdbapi.com/', {
      params: {
        apikey,
        s: str,
        page,
      },
    })
    .then((response) => response.data)
    .then((data: IMovieSearchResponse | IMovieSearchError) => {
      if (data.Response === 'False') {
        throw new Error(data.Error);
      }

      return data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
