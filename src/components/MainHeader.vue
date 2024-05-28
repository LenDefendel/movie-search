<template>
  <q-header>
    <div class="header">
      <div class="header-title"></div>
      <h5>MovieSearch</h5>
      <div class="toggle-theme">
        <q-toggle
          toggle-indeterminate
          size="md"
          color="white"
          v-model="model"
          val="md"
          @update:model-value="$q.dark.set($event)"
        />
        <strong>{{ showScheme }}</strong>
      </div>
    </div>
  </q-header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ref } from 'vue';

// import { useQuasar } from 'quasar';
// const $q = useQuasar();

const model = ref<boolean | null>(null);

const showScheme = computed(() => {
  const map = {
    true: 'dark',
    false: 'light',
    null: 'auto',
  };

  return map[`${model.value}`];
});
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 60px;
  max-height: 680px;
  background-color: var(--panel-background);
  color: var(--text-color);
}

.header-title {
  width: 120px;
}

.toggle-theme {
  width: 120px;
}
</style>
