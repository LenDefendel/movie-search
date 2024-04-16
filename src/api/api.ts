import axios from 'axios';

const apikey = '771333f5';

export async function getCard(id: `tt${string}`) {
  return await axios
    .get('http://www.omdbapi.com/', {
      params: {
        apikey,
        i: id,
      },
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject();
    });
}

export async function search(str: string, page: number = 1) {
  return await axios
    .get('http://www.omdbapi.com/', {
      params: {
        apikey,
        s: str,
        page,
      },
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject();
    });
}
