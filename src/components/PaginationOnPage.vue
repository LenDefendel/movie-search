<template>
  <div class="pagination">
    <q-btn
      flat
      v-if="totalPage > 1"
      @click="toBackPage"
      :title="currentPage === 1 ? '' : currentPage - 1"
      :disable="currentPage === 1"
    >
      <q-icon name="arrow_back_ios" />
    </q-btn>

    <q-btn flat @click="toLastPage"> {{ totalPage }}</q-btn>

    <q-btn
      flat
      v-if="totalPage > 1"
      @click="toNextPage"
      :title="currentPage === totalPage ? '' : currentPage + 1"
      :disable="currentPage === totalPage"
    >
      <q-icon name="arrow_forward_ios" />
    </q-btn>

    <div>{{ numberOfPagesButtons }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const { totalPage } = defineProps<{ totalPage: number }>();

// Models
const currentPage = defineModel<number>({ required: true });

// Data

// Computed
const numberOfPagesButtons = computed<Array<number>>(() => {
  if (totalPage <= 7) {
    console.log('if 1');

    const result = new Array(totalPage);

    for (let i = 0; i < totalPage; i++) {
      result[i] = i + 1;
    }

    return result;
  }

  // else
  {
    if (currentPage.value <= 5) {
      console.log('if 2');
      const result = new Array(5 + 2);

      for (let i = 0; i < Math.min(totalPage, 5); i++) {
        result[i] = i + 1;
      }

      result[5] = NaN;
      result[6] = totalPage;

      return result;
    }

    if (currentPage.value >= totalPage - 5) {
      console.log('if 3');
      const result = new Array(5 + 2);
      result[0] = 1;
      result[1] = NaN;

      for (let i = 0; i < 5; i++) {
        result[7 - i] = totalPage - i;
      }

      return result;
    }

    // Else
    {
      console.log('if 4');
      const result = new Array(5 + 4);
      result[0] = 1;
      result[1] = NaN;
      result[7] = NaN;
      result[8] = totalPage;

      for (let i = -2; i < 3; i++) {
        result[5 + i] = currentPage.value + i;
      }

      return result;
    }
  }
});

// Methods
function toNextPage() {
  currentPage.value++;
}

function toBackPage() {
  currentPage.value--;
}

function toLastPage() {
  currentPage.value = totalPage;
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: calc(10% + 2vw); /* Минимум 60px + 2% от ширины экрана */
  align-items: start;
  margin-bottom: 40px;
  margin-left: 40px;
  margin-right: 40px;
}
</style>
