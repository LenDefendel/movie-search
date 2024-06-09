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

    <template v-for="(pageIndex, index) of numberOfPagesButtons" :key="index">
      <q-btn
        v-if="pageIndex > 0"
        flat
        class="pagination-btn"
        :class="{ 'pagination-btn--current': currentPage === pageIndex }"
        @click="toPage(pageIndex)"
      >
        {{ pageIndex }}
      </q-btn>
      <q-btn v-else class="pagination-btn pagination-btn--gap" flat disable>...</q-btn>
    </template>

    <q-btn
      flat
      v-if="totalPage > 1"
      @click="toNextPage"
      :title="currentPage === totalPage ? '' : currentPage + 1"
      :disable="currentPage === totalPage"
    >
      <q-icon name="arrow_forward_ios" />
    </q-btn>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ totalPage: number }>();
// const props = defineProps({ totalPage: { type: Number, required: true } });

// Models
const currentPage = defineModel<number>({ required: true });

// Computed
const numberOfPagesButtons = computed<Array<number>>(() => {
  // [ 1, 2, 3, 4, 5, 6, 7 ]
  if (props.totalPage <= 7) {
    console.log('if 1');

    const result = new Array(props.totalPage);

    for (let i = 0; i < props.totalPage; i++) {
      result[i] = i + 1;
    }

    return result;
  }

  // [ 1, 2, 3, 4, 5, null, 80 ]
  if (currentPage.value <= 5) {
    // console.log('if 2');
    const result = new Array(5 + 2);

    for (let i = 0; i < 5; i++) {
      result[i] = i + 1;
    }

    result[5] = NaN;
    result[6] = props.totalPage;

    return result;
  }

  // [ 1, null, 76, 77, 78, 79, 80 ]
  if (currentPage.value > props.totalPage - 5) {
    // console.log('if 3');
    // console.log(currentPage.value);
    const result = new Array(5 + 2);

    for (let i = 2; i < result.length; i++) {
      result[i] = props.totalPage - result.length + i + 1;
    }

    result[0] = 1;
    result[1] = NaN;

    return result;
  }

  // [ 1, null, 4, 5, 6, 7, 8, null, 80 ]
  {
    // console.log('if 4');
    const result = new Array(5 + 4);
    result[0] = 1;
    result[1] = NaN;
    result[7] = NaN;
    result[8] = props.totalPage;

    for (let i = -3; i < 2; i++) {
      result[5 + i] = currentPage.value + 1 + i;
    }
    // console.log(result[4]);

    return result;
  }
});

// Methods
function toNextPage() {
  currentPage.value++;
}

function toBackPage() {
  currentPage.value--;
}

function toPage(pageIndex: number) {
  currentPage.value = pageIndex;
}

// function toLastPage() {
//   currentPage.value = props.totalPage;
// }
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: start;
  margin-bottom: 40px;
  margin-left: 40px;
  margin-right: 40px;
}

.pagination-btn {
  &.pagination-btn--gap {
    /*  */
  }

  &.pagination-btn--current {
    border: 1px solid var(--border-pagination);
  }
}
</style>
