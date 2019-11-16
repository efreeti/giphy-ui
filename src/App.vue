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

@Component({
  components: {
  },
})
export default class App extends Vue {}
</script>

<style>
.md-app {
  max-height: 100%;
}
</style>
