<template>
  <q-header>
    <div class="header">
      <div class="header-title"></div>
      <h5>MovieSearch</h5>
      <div class="toggle-theme">
        <q-toggle
          size="md"
          color="white"
          :model-value="$q.dark.isActive"
          val="md"
          label="theme"
          @update:model-value="$q.dark.set($event)"
        />
      </div>
    </div>
  </q-header>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
const $q = useQuasar();
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
