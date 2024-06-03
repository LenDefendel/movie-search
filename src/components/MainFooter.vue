<template>
  <q-footer class="footer">
    <q-tabs no-caps indicator-color="transparent">
      <a
        class="github"
        href="https://github.com/LenDefendel?tab=overview&from=2025-08-01&to=2025-08-01"
      >
        <q-tab name="your github" label="your github" />
      </a>
    </q-tabs>
  </q-footer>
</template>

<script setup lang="ts">
//
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
  background-color: var(--panel-background);
}

.github {
  text-decoration: none;
  color: var(--text-color-main);
}

.github:hover {
  color: var(--text-hover);
}
</style>
