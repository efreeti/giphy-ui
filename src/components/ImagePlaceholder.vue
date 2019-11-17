<template>
  <div class="image-placeholder">
    <span class="image-placeholder-content">
      <slot />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ImagePlaceholder extends Vue {
}
</script>

<style lang="scss" scoped>
.image-placeholder {
  width: 400px;
  height: 400px;
  line-height: 400px;
}

.image-placeholder-content {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}
</style>
