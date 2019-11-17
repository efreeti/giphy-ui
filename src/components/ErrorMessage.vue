<template>
  <div>
    <div>
      <md-icon class="md-size-5x md-accent">error</md-icon>
    </div>
    <div>
      <span class="error-message-text md-body-2">
        <slot />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ErrorMessage extends Vue {
}
</script>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";

.error-message-text {
  color: md-get-palette-color(red, A200);
}
</style>
