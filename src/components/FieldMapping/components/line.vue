<template>
  <line :x1="coordinate.x1" :y1="coordinate.y1" :x2="coordinate.x2" :y2="coordinate.y2" class="line" />
</template>

<script>
export default {
  name: 'MyLine',
  props: {
    coordinate: {
      type: Object,
      default: () => {
        return {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 0
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.line {
  stroke: #ccc;
  stroke-width: 2;
  &:hover {
    stroke: #3d4ae4;
    stroke-width: 4;
  }
}
</style>
