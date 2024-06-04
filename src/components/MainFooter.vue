<template>
  <q-footer class="footer">
    <q-btn
      class="to-github"
      label="your github"
      href="https://github.com/LenDefendel?tab=overview&from=2025-08-01&to=2025-08-01"
      flat
      unelevated
      square
      :ripple="false"
      no-caps
    />
  </q-footer>
</template>

<script setup lang="ts">
//
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: center;
  background-color: var(--panel-background);
  height: 50px;
}

.to-github {
  &:hover {
    color: var(--text-hover);
  }

  &:deep(.q-focus-helper) {
    display: none;
  }
}
</style>
