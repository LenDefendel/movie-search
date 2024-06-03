<template>
  <router-link
    class="card"
    :to="{ name: RouterNames.MOVIE_PAGE, params: { imdbID: props.card.imdbID } }"
  >
    <div class="title" :title="props.card.Title">
      <span>{{ props.card.Title }}</span>
    </div>
    <img :src="props.card.Poster" alt="" class="movie-img" />
    <span class="year">{{ props.card.Year }}</span>
  </router-link>
</template>

<script setup lang="ts">
import { RouterNames } from 'src/router/routerNames';
import type { IMovieShortInfo } from 'src/entities/Movie';

const props = defineProps<{
  card: IMovieShortInfo;
}>();
</script>

<style scoped>
.card {
  text-decoration: none;
  color: var(--text-color-base);
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 500px;
  border: 2px solid var(--border);
}

.card:hover {
  border-color: var(--hover-contrast);
}

.title {
  padding: 10px;
  font-size: 16px;
  white-space: nowrap; /* Запрет переноса строк */
  overflow: hidden; /* Скрытие выходящего за границы текста */
  text-overflow: ellipsis; /* Добавление "..." */
  max-width: 100%;
}

.movie-img {
  width: 280px;
  height: 420px;
}

.year {
  font-size: 18px;
  padding: 4px;
}
</style>
