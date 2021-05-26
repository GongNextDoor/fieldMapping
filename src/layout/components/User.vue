<template>
  <div class="User _custom_max">
    <div class="user-icon">
      <i class="el-icon-user-solid" />
    </div>
    <div class="user-name">{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      name: '管理员'
    }
  }
}
</script>

<style lang="scss" scoped>
.User {
  text-align: center;
  .user-icon {
    display: inline-block;
    width: 60px;
    height: 60px;
    font-size: 28px;
    border-radius: 50%;
    box-shadow:  6px 6px 10px $shadowLight, -6px -6px 10px $shadowNight;
    i {
      line-height: 60px;
    }
  }
  .user-name {
    font-size: 12px;
    margin-top: 5px;
  }
}
</style>
