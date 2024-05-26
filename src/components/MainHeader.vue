<template>
  <q-header>
    <div class="header">
      <q-toolbar>
        <q-toolbar-title>
          <h5>MovieSearch</h5>
          <q-toggle
            size="md"
            :model-value="$q.dark.isActive"
            val="md"
            label="theme"
            @update:model-value="$q.dark.set($event)"
          />
        </q-toolbar-title>
      </q-toolbar>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  background-color: var(--panel-background);
  color: var(--text-color);
}
/*  */
</style>
