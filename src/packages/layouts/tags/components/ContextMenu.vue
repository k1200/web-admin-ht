<template>
  <ul v-show="contextmenuVisble" class="contextmenu" :style="currentPoint">
    <li @click="refreshCurrent">刷新页面</li>
    <li v-show="closeCurrent" @click="handleContextmenu('fn_a_tag__close')">
      关闭当前
    </li>
    <li @click="handleContextmenu('fn_a_tag__close_others')">关闭其他</li>
    <li @click="handleContextmenu('fn_a_tag__clear')">关闭所有</li>
  </ul>
</template>
<script>
export default {
  name: 'ContextMenu',
  props: {
    contextmenuVisble: Boolean,
    contextmenuPoint: {
      type: Array,
      default() {
        return [0, 0];
      }
    },
    closeCurrent: Boolean
  },
  computed: {
    currentPoint() {
      return {
        left: `${this.contextmenuPoint[0]}px`,
        top: `${this.contextmenuPoint[1]}px`
      };
    }
  },
  methods: {
    handleContextmenu(command) {
      this.$emit('handle-tag', command);
    },
    refreshCurrent() {
      this.$emit('refresh-current');
    }
  }
};
</script>
<style lang="scss" scoped>
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  // position: absolute;
  position: fixed;
  line-height: 25px;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
}
.contextmenu li {
  margin: 0;
  padding: 0 16px;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
}
</style>
