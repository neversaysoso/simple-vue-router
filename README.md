# simple-vue-router

简单实现vue-router

完成如下功能：

```vue
<template>
  <div id="app">
    <div @click="$router.back()">返回</div>
    <router-link to="/home">go home</router-link>
    <br />
    <router-link to="/about">go about</router-link>

    <div @click="$router.push('/home')">push-home</div>
    <div @click="$router.push('/about')">push-about</div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>
```