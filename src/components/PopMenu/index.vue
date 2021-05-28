<template>
  <div v-show="popMenuFlag" class="popMenu" @click="close" @contextmenu.prevent="close">
    <div :style="'top:'+popMenuTop+'px;left:'+popMenueLeft+'px;'" class="pop-menu">
      <section v-for="(item, index) in menus" :key="index">
        <div v-if="! item.slotName" class="pop-menu-item" @click="item.func(...item.params)">
          <a>{{ item.val }}</a>
        </div>
        <slot v-else :name="item.slotName" />
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopMenu',
  props: {
    menus: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      popMenuFlag: false,
      popMenuTop: 0,
      popMenueLeft: 0
    }
  },
  methods: {
    open(coordinate) {
      var maxWidth = window.innerWidth
      var maxHeight = window.innerHeight
      if ((maxHeight - coordinate.y) < this.menus.length * 35) {
        this.popMenuTop = coordinate.y - this.menus.length * 31
      } else {
        this.popMenuTop = coordinate.y + 5
      }
      if ((maxWidth - coordinate.x) < 160) {
        this.popMenueLeft = coordinate.x - 165
      } else {
        this.popMenueLeft = coordinate.x + 5
      }
      this.popMenuFlag = true
    },
    close() {
      this.popMenuFlag = false
    }
  }
}
</script>

<style lang="scss">
.popMenu {
  width: 100vw;
  height: 100vh;
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  .pop-menu {
    width: 160px;
    border-radius: 4px;
    box-shadow: 2px 2px 0 0 #d0d1d196;
    background: #ececec;
    position: fixed;
    margin: auto;
    .pop-menu-item {
      padding: 5px 10px;
      font-size: 14px;
      z-index: 100;
      position: relative;
      &:hover {
        background: #e2e2e2;
      }
      a {
        color: #7d7d7d;
        .menu-icon {
          position: absolute;
          top: 8px;
          right: 7px;
        }
      }
    }
  }
}
</style>
