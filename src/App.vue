<template>
  <md-app md-mode="fixed">
    <md-app-toolbar class="md-layout md-alignment-center-center">
      <div class="md-layout-item md-xlarge-size-30 md-large-size-40 md-medium-size-50 md-small-size-80 md-xsmall-size-100">
        <search-field :value="searchText" @input="updateSearchText" @search="updateSearchResults">
          <template slot="label">Search keyword(s)</template>
        </search-field>
      </div>
    </md-app-toolbar>
    <md-app-content class="md-layout md-alignment-center-center">
    </md-app-content>
  </md-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import { SearchResultPageData } from '@/models/SearchResultPageData';

import SearchField from "@/components/SearchField.vue";

const app = namespace('app');

@Component({
  components: {
    'search-field': SearchField,
  },
})
export default class App extends Vue {
  @app.State private searchText!: string;

  @app.State private searchResultPages!: Array<SearchResultPageData>;

  @app.State private searchResultPageSize!: number;

  @app.Mutation private updateSearchText!: (searchText: string) => void;

  @app.Action private updateSearchResults!: () => void;

  @app.Action private showOneMorePage!: () => void;

  @app.Getter private hasMoreSearchResultPages!: () => boolean;

  created() {
    this.updateSearchResults();
  }
}
</script>

<style>
.md-app {
  max-height: 100%;
}
</style>
