<template>
  <q-header>
    <div class="header">
      <div class="header-title"></div>
      <h5>MovieSearch</h5>
      <ColorSchemeSwitcher class="toggle-theme" />
    </div>
  </q-header>
</template>

<script setup lang="ts">
// Components
import ColorSchemeSwitcher from 'src/components/ColorSchemeSwitcher.vue';
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
