<template>
  <div>
    <div v-for="image in pageData.images" v-bind:key="image.id">
      <image-card>
        <giphy-image :image-info="image.images.downsized_large" />
      </image-card>
    </div>

    <div v-if="!pageData.loaded || pageData.error">
      <div v-for="n in pageMaxSize" v-bind:key="n">
        <image-card>
          <image-placeholder>
            <error-message v-if="pageData.error">
              Something went wrong, try refreshing the page
            </error-message>
          </image-placeholder>
        </image-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { SearchResultPageData } from '@/models/SearchResultPageData';

import GiphyImage from "@/components/GiphyImage.vue";
import ImagePlaceholder from "@/components/ImagePlaceholder.vue";
import ImageCard from "@/components/ImageCard.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";

@Component({
  components: {
    'error-message': ErrorMessage,
    'giphy-image': GiphyImage,
    'image-placeholder': ImagePlaceholder,
    'image-card': ImageCard,
  }
})
export default class SearchResultPageView extends Vue {
  @Prop() public pageData!: SearchResultPageData;

  @Prop() public pageMaxSize!: number;
}
</script>
