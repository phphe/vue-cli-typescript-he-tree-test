<template>
  <TreeView :value="treeData" draggable droppable></TreeView>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TreeView from './components/TreeView';
import { Tree } from "he-tree-vue";

@Component({
  components: {
    TreeView,
  },
})
export default class App extends Vue {
  treeData = [{text: 'node 1'}, {text: 'node 2', children: [{text: 'node 2-1'}]}]
  private created() {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
