<template>
  <div :style="`height:${fieldMapHeight}`" class="fieldMapping">
    <svg ref="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" @input="$emit('input', $event)">
      <foreignObject :width="tableWidth+30" class="table">
        <body xmlns="http://www.w3.org/1999/xhtml" @contextmenu.prevent>
          <el-table ref="sourceTable" :data="val.source" border>
            <el-table-column type="index" align="center" width="60" />
            <el-table-column prop="name" label="源头表字段" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.aliasName || scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" show-overflow-tooltip align="center" width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.type }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="port" width="20">
              <template slot-scope="scope">
                <div :style="isSafari ? 'left:10px;cursor:crosshair' : 'cursor:crosshair'" class="port start" draggable="true" @dragstart.stop="dragStart($event, scope.row)" @drag.stop="dragGing($event, scope.row)" @dragend.stop="dragEnd($event, scope.row)" />
              </template>
            </el-table-column>
          </el-table>
        </body>
      </foreignObject>
      <foreignObject :x="tableX" :width="tableWidth" class="table">
        <body xmlns="http://www.w3.org/1999/xhtml">
          <el-table :data="val.target" border>
            <el-table-column prop="port" width="20">
              <template slot-scope="scope">
                <div class="port end" @dragover.prevent="dragOver($event)" @drop.prevent="dragDrop($event, scope.row)" />
              </template>
            </el-table-column>
            <el-table-column type="index" align="center" width="60" />
            <el-table-column prop="name" label="目标表字段" align="center" show-overflow-tooltip />
            <el-table-column prop="type" label="类型" align="center" show-overflow-tooltip width="100" />
          </el-table>
        </body>
      </foreignObject>
      <foreignObject :x="menuX" class="menu" height="100" width="80">
        <body xmlns="http://www.w3.org/1999/xhtml">
          <div @click="mapByName">同名映射</div>
          <div @click="mapByRow">同行映射</div>
          <div @click="unmap">取消映射</div>
          <div @click="autoTypeSet">自动排版</div>
        </body>
      </foreignObject>
      <MyLine v-show="dragingFlag" :coordinate="dragLineData" />
      <MyTriangle v-show="dragingFlag" :coordinate="dragLineData" />

      <g>
        <MyLine v-for="(item, index) in allLineData" :key="'line'+index" :coordinate="item" @contextmenu.native.prevent="rightClickLine($event, item)" />
      </g>

      <MyTriangle v-for="(item, index) in allLineData" :key="'triangle'+index" :coordinate="item" />
    </svg>

    <PopMenu ref="popMenu" :menus="nodeMenus" />
  </div>
</template>

<script>
import MyLine from './components/line'
import MyTriangle from './components/triangle'
import PopMenu from '@/components/PopMenu'
export default {
  name: 'FieldMapping',
  components: {
    MyLine,
    MyTriangle,
    PopMenu
  },
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isSafari: false,
      tableWidth: 300,
      tableX: 0,
      menuX: 1400,
      startXY: {
        x: 0,
        y: 0
      },
      dragStartRow: {},
      dragEndRow: {},
      dragingFlag: false,
      dragLineData: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
      },
      allLineData: [],

      nodeMenus: [],
      clickedLine: {}
    }
  },
  computed: {
    val: function() {
      return this.value
    },
    fieldMapHeight: function() {
      const mapLength = (this.value.source.length + 1) > this.value.target.length ? (this.value.source.length + 1) : this.value.target.length
      return `${mapLength * 36 + 60}px`
    }
  },
  methods: {
    init() {
      this.getRowsCoordinate()
      this.initConnect()
      this.autoTypeSet()
    },
    initLine() {
      this.getRowsCoordinate()
      this.initConnect()
    },
    getRowsCoordinate() {
      const svg = this.$refs.svg.getBoundingClientRect()
      this.val.source.forEach((el, index) => {
        el.coordinate = {
          x: (svg.width - 80) / 3 + 31,
          y: (index + 1) * 36 + 26
        }
      })
      this.val.target.forEach((el, index) => {
        el.coordinate = {
          x: (svg.width - 80) / 3 * 2 - 32,
          y: (index + 1) * 36 + 26
        }
      })
      // safari兼容
      this.tableWidth = (svg.width - 80) / 3 + 40
      this.tableX = (svg.width - 80) / 3 * 2 - 40
      this.menuX = svg.width - 80
      if (navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') < 0) {
        this.isSafari = true
      }
    },
    initConnect() {
      this.allLineData = []
      for (var el of this.val.source) {
        if (el.connectTo !== '') {
          for (var ele of this.val.target) {
            if (el.connectTo === ele.name) {
              this.addLine(el, ele)
              break
            }
          }
        }
      }
    },

    addLine(startRow, endRow) {
      this.allLineData.push({
        id: this.allLineData.length + 1,
        starName: startRow.name,
        endName: endRow.name,
        x1: startRow.coordinate.x,
        y1: startRow.coordinate.y,
        x2: endRow.coordinate.x,
        y2: endRow.coordinate.y
      })
    },
    delLine() {
      if (!this.clickedLine.starName) {
        return
      }
      for (var el of this.val.source) {
        if (el.name === this.clickedLine.starName) {
          el.connectTo = ''
          break
        }
      }
      this.allLineData.splice(this.allLineData.indexOf(this.clickedLine), 1)
    },
    rightClickLine(event, line) {
      this.clickedLine = line
      this.nodeMenus = [{ val: '删除', func: this.delLine, params: [] }]
      this.$refs.popMenu.open({
        x: event.clientX,
        y: event.clientY
      })
    },

    // 拖拽相关
    dragStart(e, row) {
      var img = new Image()
      e.dataTransfer.setDragImage(img, 8, 3)
      e.dataTransfer.setData('port', row)

      this.dragStartRow = row
      this.startXY = {
        x: e.pageX,
        y: e.pageY
      }
      this.dragLineData.x1 = row.coordinate.x
      this.dragLineData.y1 = row.coordinate.y
    },
    dragGing(e, row) {
      this.dragingFlag = true
      this.dragLineData.x2 = this.dragStartRow.coordinate.x + e.pageX - this.startXY.x - 17
      this.dragLineData.y2 = this.dragStartRow.coordinate.y + e.pageY - this.startXY.y
    },
    dragEnd(e, row) {
      this.dragingFlag = false
    },
    dragOver(e) {},
    dragDrop(e, row) {
      var flag = false
      this.val.source.forEach(el => {
        if (el.connectTo === row.name) {
          flag = true
          return false
        }
      })
      if (this.dragStartRow.connectTo !== '' || flag) {
        this.$message.error('字段不能重复连接')
        return
      }

      this.dragEndRow = row
      this.dragStartRow.connectTo = row.name
      this.addLine(this.dragStartRow, this.dragEndRow)
    },

    // 附属功能相关
    mapByName() {
      for (var el of this.val.source) {
        el.connectTo = ''
        for (var ele of this.val.target) {
          if (el.name.toLowerCase() === ele.name.toLowerCase()) {
            el.connectTo = ele.name
            break
          }
        }
      }
      this.initConnect()
    },
    mapByRow() {
      this.val.source.forEach((el, index) => {
        el.connectTo = ''
        if (this.val.target[index]) {
          el.connectTo = this.val.target[index].name
        }
      })
      this.initConnect()
    },
    unmap() {
      this.val.source.forEach(el => {
        el.connectTo = ''
      })
      this.allLineData = []
    },
    autoTypeSet() {
      var copySourceConnet = []
      var copySourceUnConnet = []
      var copyTarget = []
      var namesStr = []
      this.val.source.forEach(el => {
        if (el.connectTo === '') {
          copySourceUnConnet.push(el)
        } else {
          copySourceConnet.push(el)
        }
      })
      copySourceConnet.forEach(el => {
        for (var ele of this.val.target) {
          if (el.connectTo === ele.name) {
            copyTarget.push(ele)
            namesStr.push(ele.name)
            break
          }
        }
      })
      this.val.target.forEach(el => {
        if (namesStr.indexOf(el.name) === -1) {
          copyTarget.push(el)
        }
      })
      copySourceConnet.push(...copySourceUnConnet)
      this.val.source = copySourceConnet
      this.val.target = copyTarget
      this.initLine()
    }

  }
}
</script>

<style lang="scss" scoped>
.fieldMapping {
  width: 100%;
  height: 100%;
  svg {
    width: 100%;
    height: 100%;
    background: transparent;
  }
  body {
    background: transparent;
  }
  .table {
    width: calc((100% - 80px)/3 + 40px);
    height: 100%;
  }
  .menu {
    width: 80px;
    height: 100%;
    text-align: center;
    background: transparent;
    div {
      color: #9d9fa9;
      cursor: pointer;
      &:hover {
        color: #000;
      }
    }
  }
  .port {
    position: relative;
    left: -9px;
    width: 18px;
    height: 18px;
    background: #3d4ae4;
    border-radius: 50%;
    &::after {
      position: absolute;
      top: 5px;
      left: 5px;
      content: '';
      width: 8px;
      height: 8px;
      background: #fff;
      border-radius: 50%;
    }
    &:hover {
      background: #646ee0;
    }
  }

  /deep/ .el-table tr {
    height: 36px;
  }

}
</style>
