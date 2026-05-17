<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const neirong = ref('')
const username = ref('')
function login() {
  localStorage.setItem('neirong', neirong.value)
  username.value = neirong.value
  router.push('/todolist')
}

onMounted(
  () => {
    const savename = localStorage.getItem('neirong')
    if (savename) {
      username.value = savename
    }
  },
)
</script>

<template>
  <div class="login">
    <div class="box1">
      <div class="centerwrap">
        <h2 class="login-title">
          欢迎回来 👋
        </h2>
        <p class="login-subtitle">
          输入用户名开始打卡之旅
        </p>
        <div>
          <form class="box2">
            <div>用户名</div>
            <input
              v-model="neirong" type="text" required class="write"
              placeholder="直接输入用户名（无需注册）"
            >
            <button class="btn" :disabled="!neirong.trim()" @click="login">
              <span class="log">登录</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
* {
  box-sizing: border-box;
}
.login {
  width: 100vw;
  height: 100vh;
  background-color: #e5e5e5;
  position: relative;
  padding-top: 100px;
}
.centerwrap {
  width: 450px;
  margin: 0 auto;
  padding-top: 50px;
}
.login-title {
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
  font-size: 34px;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}
.login-subtitle {
  color: #a8a29e;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: var(--space-8);
}
.box1 {
  margin: 0 auto;
  border-radius: 10px;
  background-color: #ffffff;
  height: 500px;
  width: 500px;
}
.box2 {
  margin-top: 20px;
}
.write {
  width: 400px;
  height: 40px;
  border-radius: 15px;
  margin-top: 10px;
  border: 2px solid orange;
  padding: 5px;
}
.btn {
  display: block;
  width: 400px;
  height: 50px;
  border-radius: 10px;
  margin-top: 20px;
  background-color: orange;
}
.btn:disabled {
  background-color: #a8a29e;
  cursor: not-allowed;
}
.log {
  color: #e5e5e5;
  font-size: 25px;
}
</style>
