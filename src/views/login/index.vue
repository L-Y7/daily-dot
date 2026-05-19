<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const neirong = ref('')
const username = ref('')
function login() {
  localStorage.setItem('neirong', neirong.value)
  username.value = neirong.value
  router.push({ path: '/todolist', query: { id: 10086 } })
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
    <div class="left">
      <div class="boxone">
        <div class="picture">
          🌱
        </div>
      </div>
      <div class="boxtwo">
        <span class="text1">DAilyDot</span>
        <div class="text2">
          每天一点 长期一片
        </div>
        <ul class="daohang">
          <li class="suoyin">
            <div>极简登录</div>
          </li>
          <li class="suoyin">
            <div>自动持久化</div>
          </li>
          <li class="suoyin">
            <div>路由守卫</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <div class="box1">
        <div class="title">
          <h2 class="login-title">
            欢迎回来 👋
          </h2>
          <p class="login-subtitle">
            输入用户名开始打卡之旅
          </p>
        </div>
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
  background-color: #fffbeb;
  display: flex;
}
.right {
  flex: 1;
  display: flex;
  align-items: center;
}
.box1 {
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(245, 158, 11, 0.25);
  border: 1px solid #b45309;
  background-color: #ffffff;
  padding: 40px;
  width: 420px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.box1 .title .login-title {
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
  font-size: 34px;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}
.box1 .title .login-subtitle {
  color: #a8a29e;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 20px;
}
.box1 .title {
  display: flex;
  text-align: center;
  flex-direction: column;
}
.box2 {
  margin-top: 20px;
}
.box2 .write {
  width: 100%;
  height: 40px;
  border-radius: 15px;
  margin-top: 10px;
  border: 2px solid orange;
  padding: 5px;
}
.box2 .btn {
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  margin-top: 20px;
  background-color: orange;
}
.box2 .btn:disabled {
  background-color: #a8a29e;
  cursor: not-allowed;
}
.box2 .log {
  color: #e5e5e5;
  font-size: 25px;
}
.login .left {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
  border: 3px solid orange;
}
.left .boxone {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
}
.left .boxone .picture {
  font-size: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 3s ease-in-out infinite;
  background: rgba(255, 255, 255, 0.22);
  height: 220px;
  width: 220px;
  border-radius: 50%;
  border: 1px solid gainsboro;
}
.login .left .boxtwo {
  flex: 1;
  margin-top: -100px;
  text-align: center;
}
.left .boxtwo .text1 {
  font-weight: 500;
  color: #f6efef;
  font-family: 'Fredoka', sans-serif;
  font-size: 60px;
}
.left .boxtwo .text2 {
  font-weight: 500;
  font-size: 20px;
  color: #f6efef;
  font-family: 'Fredoka', sans-serif;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 35px;
}
.daohang {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.left .boxtwo .suoyin {
  border: 1px solid rgba(180, 83, 9, 0.25);
  list-style: none;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.22);
  color: #fffbeb;
  width: 150px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  transition: all 0.2s;
  display: inline-block;
}
.left .boxtwo .suoyin:hover {
  transform: translateY(-5px) rotate(5deg);
}
@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
