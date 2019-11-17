<template>
  <md-field>
    <label><slot name="label"/></label>

    <md-input :value="value" @input="input" @keyup.enter="search"/>

    <md-button class="md-icon-button md-dense" @click="search">
      <md-icon>search</md-icon>
    </md-button>
  </md-field>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

@Component
export default class SearchField extends Vue {
  @Prop() value!: string;

  @Emit() input() {}

  @Emit() search() {}
}
</script>
