<template>
  <div>
    <slot />

    <div v-if="trackScrollEnd">
      <div class="scroll-end-tracker" role="scroll-end-tracker" v-observe-visibility="handleVisibilityChange"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

@Component
export default class ScrollTrackingContainer extends Vue {
  @Prop() public trackScrollEnd!: boolean;

  @Emit() scrollEnd() {}

  handleVisibilityChange(isVisible: boolean) {
    if (isVisible) {
      this.scrollEnd();
    }
  }
}
</script>

<style>
.scroll-end-tracker {
  height: 20px;
}
</style>
