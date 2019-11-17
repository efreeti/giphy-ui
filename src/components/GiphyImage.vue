<template>
  <span>
    <img v-if="visible" class="md-image" :src="imageInfo.url" :width="imageInfo.width" :height="imageInfo.height"/>
    <div v-else role="placeholder" :style="{ width: `${imageInfo.width}px`, height: `${imageInfo.height}px` }"
         v-observe-visibility="{ callback: handleVisibility, once: true }">
    </div>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { GiphyImageInfo } from '@/models/GiphyImageInfo';

@Component
export default class GiphyImage extends Vue {
  @Prop() imageInfo!: GiphyImageInfo;

  private visible: boolean = false;

  handleVisibility(isVisible: boolean) {
    this.visible = this.visible || isVisible;
  }
}
</script>
