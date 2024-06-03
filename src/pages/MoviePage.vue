<template>
  <q-page class="movie-page">
    <div v-if="isLoadLongInfo">
      <q-inner-loading
        class="loading"
        showing
        label="Please wait..."
        label-style="font-size: 2em"
      />
    </div>
    <div class="long-info" v-else-if="longInfo">
      <h4 class="title-movie">{{ longInfo.Title }}</h4>
      <img class="img-movie" :src="longInfo.Poster" alt="" />
      <p>Released: {{ longInfo.Released }}</p>
      <p>Country: {{ longInfo.Country }}</p>
      <p>Genre: {{ longInfo.Genre }}</p>
      <div>
        <h6>Plot</h6>
        {{ longInfo.Plot }}
      </div>
      <div class="ratings">
        <h6>Ratings</h6>
        <div>
          imdbRating:
          {{ longInfo.imdbRating }}
        </div>
        <div v-for="item in longInfo.Ratings" :key="item.Source">
          {{ item.Source }}:
          {{ item.Value }}
        </div>
      </div>
      <p>Runtime: {{ longInfo.Runtime }}</p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import * as api from 'src/api/api';

import type { IMovieLongInfo } from 'src/entities/Movie';
import type { imdbID } from 'src/entities/types';

// Data
const longInfo = ref<IMovieLongInfo | null>(null);
const isLoadLongInfo = ref(false);

// Hooks
onMounted(() => {
  const route = useRoute();
  console.log(route.params);
  const imdbID = route.params.imdbID as imdbID;
  if (typeof imdbID === 'string') {
    void getMovie(imdbID);
  }
});

// Methods
async function getMovie(imdbID: imdbID) {
  isLoadLongInfo.value = true;
  return await api
    .getMovie(imdbID)
    .then((result) => {
      longInfo.value = result;
    })
    .catch((error) => {
      longInfo.value = null;
      console.warn(error);
      //
    })
    .finally(() => {
      isLoadLongInfo.value = false;
    });
}
</script>

<style scoped>
.movie-page {
  margin-left: calc(40px + 1.5vw); /* Минимум 30px + 1.2% от ширины экрана */
  margin-right: calc(40px + 1.5vw); /* Минимум 30px + 1.2% от ширины экрана */
  padding-bottom: 40px;
}

.long-info {
  display: grid;
  gap: 12px;
  line-height: 32px;
}

.title-movie {
  margin-bottom: 12px;
}

.img-movie {
  margin-bottom: 12px;
  width: 300px;
  height: 450px;
}

.ratings {
  padding-bottom: 15px;
  gap: 50px;
}
</style>
