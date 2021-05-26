<template>
  <div class="layout">
    <div class="lo-system">
      <div class="st-sidebar">
        <div class="sb-icon">
          <User />
        </div>
        <div class="sb-menu">
          <el-scrollbar>
            <Menu />
          </el-scrollbar>
        </div>
        <div class="sb-handler">
          <LoginOut />
        </div>
      </div>
      <div class="st-main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import LoginOut from './components/LoginOut'
import Menu from './components/Menu'
import User from './components/User'
export default {
  name: 'Layout',
  components: {
    User,
    Menu,
    LoginOut
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  width: 100%;
  padding: 10px;
  .lo-system {
    background: $menuBg;
    height: 100%;
    display: flex;
    padding: 10px 10px 10px 0;
    border-radius: 20px;
    color: #fff;
    .st-sidebar {
      width: 150px;
      padding: 20px 0;
      .sb-icon {
        height: 100px;
      }
      .sb-menu {
        height: calc(100% - 150px);
      }
      .sb-handler {
        height: 50px;
        padding-top: 5px;
      }
    }
    .st-main {
      background: #fff;
      color: #515a6e;
      padding: 10px;
      width: calc(100% - 150px);
      border-radius: 20px;
    }
  }
}
</style>
