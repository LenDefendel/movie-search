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

// export async function searchMovieByString2(
//   str: string,
//   offset: number = 0,
//   quantityElements: number = 10,
// ) {
//   const offsetPage = Math.trunc(offset / 10);
//   const offsetElements = Math.trunc(offset % 10);
//   const quantityPage = Math.ceil(quantityElements / 10);
//   const responses = [];

//   for (let i = offsetPage; i <= quantityPage; i++) {
//     responses.push(await searchMovieByString(str, offsetPage + i));
//     console.log(str);
//   }

//   const result = responses.at(-1);
//   if (result) {
//     const allSearch = responses.map((response) => response.Search).flat();
//     console.log({ offsetElements, quantityElements });
//     result.Search = allSearch.slice(offsetElements);
//     console.log(result);
//     return result;
//   }
// }

// searchMovieByString2('', 22, 25);
