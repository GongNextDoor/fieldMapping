<template>
  <div class="loginOut _custom_max" title="注销">
    <i class="el-icon-d-arrow-left" />
  </div>
</template>

<script>
export default {
  name: 'LoginOut'
}
</script>

<style lang="scss" scoped>
.loginOut {
  text-align: center;
  i {
    font-size: 24px;
    padding: 10px;
    border-radius: 20px;
    box-shadow:  6px 6px 10px $shadowLight, -6px -6px 10px $shadowNight;
    &:active {
      box-shadow: inset 6px 6px 10px $shadowLight, inset -6px -6px 10px $shadowNight;
    }
  }
}
</style>
