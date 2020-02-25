import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
import {VNode} from 'vue'
// 
import 'he-tree-vue/dist/he-tree-vue.css'
import {Tree, Fold, Check, Draggable} from 'he-tree-vue'
import {prop_draggable_droppable, Node, overrideSlotDefault_arg0, VNodeFunc} from 'he-tree-vue/types/index'
// 
import './index.css'

@Component
export default class App extends Mixins(Tree, Fold, Check, Draggable) {
  @Prop({default: 'drag-trigger'}) 
  triggerClass!: string
  @Prop({default: false, type: [Boolean, Function]})
  draggable!: boolean | prop_draggable_droppable
  @Prop({default: false, type: [Boolean, Function]})
  droppable!: boolean | prop_draggable_droppable
  // data
  treeClass = 'my-tree-view1'
  get total():number {
    let i = 0
    this.walkTreeData(() => {
      i++
    })
    return i
  }
  // methods
  overrideSlotDefault({node, index, path, tree: tree0}:overrideSlotDefault_arg0, original:VNodeFunc) {
    const tree = tree0 as App
    return <div class="node-content">
      <button class="mrs drag-trigger">Drag</button>
      <button class="mrs fold-btn" onClick={() => tree.toggleFold(node, path)}>{node.$folded ? '+' : '-'}</button>
      {original()}
      <button class="mls" onClick={() => this.edit(node)}>edit</button>
      <button class="mls" onClick={() => this.removeNodeByPath(path)}>remove</button>
      <button class="mls" onClick={() => this.hideNode(node)}>hide</button>
    </div>
  }
  blockHeader() {
    return <div class="header">
      <div>
        <button onClick={this.add}>add</button>
        <button onClick={this.showHidden} class="mls">show hidden</button>
      </div>
      <input onInput={(e:any) => this.search(e)} placeholder="Search"  />
    </div>
  }
  blockFooter(){
    return <div class="footer">
      <i>Nodes count:</i> {this.total}
    </div>
  }
  add() {
    this.treeData.push({text: `node ${Math.random()}`})
  }
  edit(node: Node) {
    node.text = window.prompt('Edit node', node.text)
  }
  showHidden() {
    this.walkTreeData((node) => {
      this.$set(node, '$hidden', false)
    })
  }
  hideNode(node: Node) {
    this.$set(node, '$hidden', true)
  }
  search(e: any) {
    const value: string = e.target.value || ''
    this.walkTreeData((node) => {
      this.$set(node, '$hidden', !node.text.includes(value))
    })
  }
}