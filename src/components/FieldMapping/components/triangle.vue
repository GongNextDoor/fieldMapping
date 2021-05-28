<template>
  <path :d="d" class="triangle" />
</template>

<script>
export default {
  name: 'MyTriangle',
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
  },
  data() {
    return {
      d: ''
    }
  },
  watch: {
    coordinate: {
      handler(val) {
        this.computeD()
      },
      deep: true
    }
  },
  mounted() {
    this.computeD()
  },
  methods: {
    computeD() {
      this.d = `M${this.coordinate.x2 - 5} ${this.coordinate.y2 - 5} L${this.coordinate.x2 + 3} ${this.coordinate.y2} L${this.coordinate.x2 - 5} ${this.coordinate.y2 + 5}  Z`
    }
  }
}
</script>

<style lang="scss" scoped>
.triangle {
  fill: #ccc;
}
</style>
