<template>
  <div class="image-card">
    <span class="image-background">
      <slot />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ImageCard extends Vue {
}
</script>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";

.image-card {
  padding: 10px;

  text-align: center;
}

.image-background {
  display: inline-block;

  background-color: md-get-palette-color(grey, 200);
}
</style>
