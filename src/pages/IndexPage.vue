<template>
  <q-page class="row items-center justify-evenly">
    <q-avatar class="gt-xs">
      <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
    </q-avatar>

    <q-space />

    <q-input
      dark
      dense
      standout
      v-model="text"
      input-class="text-right"
      class="q-ml-md"
      :debounce="500"
    >
      <template v-slot:append>
        <q-icon v-if="text === ''" name="search" />
        <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
      </template>
    </q-input>

    <CardMovie />
  </q-page>
</template>

<script setup lang="ts">
import { searchMovieByString } from 'src/api/api';
import { ref, watch } from 'vue';

// Components
import CardMovie from 'src/components/CardMovie.vue';

// Data
const text = ref('');

// Watch
watch(text, (newValue) => {
  void searchMovieByString(newValue) //
    .then((res) => {
      console.log(res.Search);
    })
    .catch((warn) => {
      console.warn(warn);
    });
});

// Methods
</script>

<style scoped>
/*  */
</style>
