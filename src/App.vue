<template>
  <md-app md-mode="fixed">
    <md-app-toolbar class="md-layout md-alignment-center-center">
    </md-app-toolbar>
    <md-app-content class="md-layout md-alignment-center-center">
    </md-app-content>
  </md-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import { SearchResultPageData } from '@/models/SearchResultPageData';

const app = namespace('app');

@Component({
  components: {
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
}
</script>

<style>
.md-app {
  max-height: 100%;
}
</style>
