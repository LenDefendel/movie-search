<template>
  <q-toggle
    v-model="colorScheme"
    :label="colorScheme"
    toggle-indeterminate
    true-value="dark"
    false-value="light"
    indeterminate-value="auto"
    size="md"
    color="white"
  />
</template>

<script setup lang="ts">
type ColorSchemeOptions = 'dark' | 'light' | 'auto';

// Data
const colorScheme = ref<ColorSchemeOptions>('auto');

const darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)');
const lightStyles: NodeListOf<HTMLStyleElement> = document.querySelectorAll(
  'style[media*=prefers-color-scheme][media*=light]',
);
const darkStyles: NodeListOf<HTMLStyleElement> = document.querySelectorAll(
  'style[media*=prefers-color-scheme][media*=dark]',
);

// Watch
watch(
  () => colorScheme.value,
  (newValue) => {
    setScheme(newValue);
    saveScheme(newValue);
  },
);

// Hooks
(function onCreated() {
  setupScheme();
})();

// Methods
function setupScheme() {
  const savedScheme = getSavedScheme();
  const systemScheme = getSystemScheme();

  if (savedScheme === 'auto') {
    return;
  }

  if (savedScheme !== systemScheme) {
    setScheme(savedScheme);
    colorScheme.value = savedScheme;
  }
}

function setScheme(scheme: ColorSchemeOptions) {
  switchMedia(scheme);

  if (scheme === 'auto') {
    clearScheme();
  } else {
    saveScheme(scheme);
  }
}

function switchMedia(scheme: ColorSchemeOptions) {
  let lightMedia;
  let darkMedia;

  if (scheme === 'auto') {
    lightMedia = '(prefers-color-scheme: light)';
    darkMedia = '(prefers-color-scheme: dark)';
  } else {
    lightMedia = scheme === 'light' ? 'all' : 'not all';
    darkMedia = scheme === 'dark' ? 'all' : 'not all';
  }

  [...lightStyles].forEach((link) => {
    link.media = lightMedia;
  });

  [...darkStyles].forEach((link) => {
    link.media = darkMedia;
  });
}

function getSystemScheme() {
  const darkScheme = darkSchemeMedia.matches;

  return darkScheme ? 'dark' : 'light';
}

function getSavedScheme(): ColorSchemeOptions {
  const result = localStorage.getItem('color-scheme');

  if (result === 'dark' || result === 'light') {
    return result;
  }

  return 'auto';
}

function saveScheme(scheme: ColorSchemeOptions) {
  localStorage.setItem('color-scheme', scheme);
}

function clearScheme() {
  localStorage.removeItem('color-scheme');
}
</script>
