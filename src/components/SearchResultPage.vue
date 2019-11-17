<template>
  <div>
    <div v-for="image in pageData.images" v-bind:key="image.id">
      <image-card>
        <giphy-image :image-info="image.images.downsized_large" />
      </image-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { SearchResultPageData } from '@/models/SearchResultPageData';

import GiphyImage from "@/components/GiphyImage.vue";
import ImageCard from "@/components/ImageCard.vue";

@Component({
  components: {
    'giphy-image': GiphyImage,
    'image-card': ImageCard,
  }
})
export default class SearchResultPageView extends Vue {
  @Prop() public pageData!: SearchResultPageData;
}
</script>
