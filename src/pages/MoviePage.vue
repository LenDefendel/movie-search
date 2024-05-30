<template>
  <q-page>
    <div v-if="isLoadLongInfo">
      <q-inner-loading
        class="loading"
        showing
        label="Please wait..."
        label-style="font-size: 2em"
      />
    </div>
    <div v-else-if="longInfo">
      <div>{{ longInfo.Title }}</div>
      <img :src="longInfo.Poster" alt="" />
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
/*  */
</style>
