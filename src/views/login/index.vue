<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../../api/login'
import { UserNameKey } from '../../utils/const'

const router = useRouter()

const userName = ref('')

function handleLogin() {
  if (!userName.value.trim())
    return
  login(userName.value.trim(), '123456').then((res) => {
   
    if (res.data.code === 0) {
      localStorage.setItem(UserNameKey, userName.value.trim())
      router.push('/daka')
    }
  })
}
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
        <span class="text1">DailyDot</span>
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
          <form class="box2" @submit.prevent="handleLogin">
            <label class="form-label" for="username">用户名</label>
            <input
              id="username"
              v-model="userName"
              type="text"
              required
              class="write"
              autocomplete="username"
              placeholder="直接输入用户名（无需注册）"
            >
            <button type="submit" class="btn" :disabled="!userName.trim()">
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
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: #1c1917;
  background-color: #fffbeb;
}

.right {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 48px 56px;
}

.box1 {
  width: 420px;
  padding: 42px 40px;

  display: flex;
  flex-direction: column;

  border: 2px solid rgba(180, 83, 9, 0.28);
  border-radius: 18px;

  background: #ffffff;

  box-shadow:
    0 16px 32px rgba(245, 158, 11, 0.22),
    0 4px 0 rgba(180, 83, 9, 0.16);
}

.box1 .title .login-title {
  margin: 0 0 10px;

  font-family: 'Fredoka', sans-serif;
  font-size: 34px;
  font-weight: 600;
  line-height: 1.15;

  color: #292524;
}

.box1 .title .login-subtitle {
  margin: 0 0 26px;

  font-size: 15px;
  font-weight: 500;
  line-height: 1.7;

  color: #78716c;
}

.box1 .title {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.box2 {
  margin-top: 4px;
}

.form-label {
  display: block;
  margin-bottom: 10px;

  font-size: 14px;
  font-weight: 700;
  color: #44403c;
}

.box2 .write {
  width: 100%;
  height: 48px;
  padding: 0 16px;

  border: 2px solid #f59e0b;
  border-radius: 15px;
  outline: none;

  font-size: 15px;
  font-weight: 500;
  color: #292524;

  background: #fffbeb;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.box2 .write::placeholder {
  color: #a8a29e;
  font-weight: 500;
}

.box2 .write:focus {
  border-color: #d97706;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.18);
}

.box2 .btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 52px;
  margin-top: 20px;

  border: none;
  border-radius: 12px;

  cursor: pointer;
  background: #f59e0b;

  box-shadow:
    0 4px 0 #b45309,
    0 10px 20px rgba(245, 158, 11, 0.28);

  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;
}

.box2 .btn:not(:disabled):hover {
  transform: translateY(-2px);
  background: #d97706;
  box-shadow:
    0 6px 0 #92400e,
    0 14px 24px rgba(245, 158, 11, 0.32);
}

.box2 .btn:not(:disabled):active {
  transform: translateY(2px);
  box-shadow:
    0 2px 0 #92400e,
    0 6px 12px rgba(245, 158, 11, 0.24);
}

.box2 .btn:disabled {
  background: #a8a29e;
  box-shadow: none;
  cursor: not-allowed;
}

.box2 .log {
  color: #ffffff;
  font-size: 22px;
  font-weight: 800;
}

.login .left {
  display: flex;
  flex-direction: column;
  flex: 1;

  border: 3px solid orange;

  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);

  box-shadow: 12px 0 32px rgba(180, 83, 9, 0.18);
}

.left .boxone {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.left .boxone .picture {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 220px;
  height: 220px;

  border: 1px solid rgba(255, 255, 255, 0.42);
  border-radius: 50%;

  font-size: 100px;

  background: rgba(255, 255, 255, 0.24);
  box-shadow:
    0 16px 32px rgba(120, 53, 15, 0.18),
    0 1px 0 rgba(255, 255, 255, 0.65) inset;

  animation: float 3s ease-in-out infinite;
}

.login .left .boxtwo {
  flex: 1;
  margin-top: -100px;
  text-align: center;
}

.left .boxtwo .text1 {
  font-family: 'Fredoka', sans-serif;
  font-size: 60px;
  font-weight: 600;
  line-height: 1;

  color: #f6efef;
  text-shadow: 0 6px 18px rgba(120, 53, 15, 0.18);
}

.left .boxtwo .text2 {
  margin-top: 10px;
  margin-bottom: 35px;

  font-family: 'Fredoka', sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: #f6efef;
}

.daohang {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 0;
  margin: 0;
}

.left .boxtwo .suoyin {
  list-style: none;
  width: 150px;
  height: 50px;

  border: 1px solid rgba(180, 83, 9, 0.25);
  border-radius: 20px;

  color: #fffbeb;
  text-align: center;
  line-height: 50px;

  background-color: rgba(255, 255, 255, 0.22);

  transition:
    transform 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;

  display: inline-block;
}

.left .boxtwo .suoyin:hover {
  transform: translateY(-5px) rotate(3deg);
  border-color: rgba(255, 255, 255, 0.42);
  background-color: rgba(255, 255, 255, 0.28);
}

@media (max-width: 900px) {
  .login {
    flex-direction: column;
    overflow: auto;
  }

  .login .left {
    flex: none;
    padding: 42px 24px;
  }

  .left .boxone .picture {
    width: 132px;
    height: 132px;
    font-size: 62px;
  }

  .left .boxtwo .text1 {
    font-size: 44px;
  }

  .daohang {
    flex-wrap: wrap;
  }

  .right {
    padding: 28px 20px 40px;
  }

  .box1 {
    width: min(100%, 420px);
    padding: 30px 24px;
  }
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
