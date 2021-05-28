<template>
  <div class="home">
    <mapping ref="fieldMapping" v-model="data" />
  </div>
</template>

<script>
import mapping from '@/components/FieldMapping/index'
export default {
  name: 'Home',
  components: {
    mapping
  },
  data() {
    return {
      data: {
        source: [
          {
            precision: 0,
            name: 'AAA027',
            length: 50,
            type: 'VARCHAR',
            connectTo: 'aaa027'
          },
          {
            precision: 0,
            name: 'AAA028',
            length: 6,
            type: 'VARCHAR',
            connectTo: 'aaa028'
          },
          {
            precision: 0,
            name: 'AAA029',
            length: 6,
            type: 'VARCHAR',
            connectTo: ''
          },
          {
            precision: 0,
            name: 'AAA030',
            length: 6,
            type: 'VARCHAR',
            connectTo: ''
          },
          {
            precision: 0,
            name: 'AAA031',
            length: 6,
            type: 'VARCHAR',
            connectTo: ''
          },
          {
            precision: 0,
            name: 'AAA032',
            length: 6,
            type: 'VARCHAR',
            connectTo: ''
          },
          {
            precision: 0,
            name: 'AAA034',
            length: 6,
            type: 'VARCHAR',
            connectTo: ''
          },
          {
            precision: 0,
            name: 'BBB032',
            length: 6,
            type: 'VARCHAR',
            connectTo: ''
          },
          {
            precision: 0,
            name: 'BBB033',
            length: 6,
            type: 'VARCHAR',
            connectTo: ''
          }
        ],
        target: [
          {
            precision: 0,
            name: 'aaa027',
            length: 17,
            type: 'DECIMAL'
          },
          {
            precision: 0,
            name: 'aaa028',
            length: 20,
            type: 'VARCHAR'
          },
          {
            precision: 0,
            name: 'aaa029',
            length: 20,
            type: 'VARCHAR'
          },
          {
            precision: 0,
            name: 'aaa030',
            length: 20,
            type: 'VARCHAR'
          },
          {
            precision: 0,
            name: 'aaa031',
            length: 20,
            type: 'VARCHAR'
          },
          {
            precision: 0,
            name: 'aaa032',
            length: 20,
            type: 'VARCHAR'
          },
          {
            precision: 0,
            name: 'aaa033',
            length: 20,
            type: 'VARCHAR'
          },
          {
            precision: 0,
            name: 'aaa034',
            length: 20,
            type: 'VARCHAR'
          }
        ]
      }
    }
  },
  mounted() {
    this.$refs.fieldMapping.init()
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 30px;
}
</style>
