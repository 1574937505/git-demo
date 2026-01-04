<template>
  <div class="login-container">
    <!-- 动态粒子背景 -->
    <div class="particles-container">
      <div v-for="i in 50" :key="i" class="particle" :style="getParticleStyle(i)"></div>
    </div>

    <!-- 扫描线效果 -->
    <div class="scan-line"></div>

    <!-- 网格背景 -->
    <div class="grid-bg"></div>

    <!-- 科技线条装饰 -->
    <div class="tech-lines">
      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
      <div class="line line-4"></div>
    </div>

    <!-- 左侧宣传语 -->
    <div class="slogan-section">
      <transition name="fade" mode="out-in">
        <div :key="currentSlogan" class="slogan-content">
          <h1 class="slogan-title">{{ sloganList[currentSlogan].title }}</h1>
          <p class="slogan-subtitle">{{ sloganList[currentSlogan].subtitle }}</p>
          <p class="slogan-desc">
            <span v-for="(line, idx) in sloganList[currentSlogan].desc.split('\n')" :key="idx">
              {{ line }}<br v-if="idx < sloganList[currentSlogan].desc.split('\n').length - 1" />
            </span>
          </p>
        </div>
      </transition>
      <!-- 装饰点 -->
      <div class="slogan-dots">
        <span
          v-for="(item, index) in sloganList"
          :key="index"
          class="dot"
          :class="{ active: currentSlogan === index }"
          @click="setSlogan(index)"
        ></span>
      </div>
    </div>

    <!-- 登录卡片 -->
    <div class="login-box">
      <!-- 角落装饰 -->
      <div class="corner corner-tl"></div>
      <div class="corner corner-tr"></div>
      <div class="corner corner-bl"></div>
      <div class="corner corner-br"></div>

      <!-- 发光边框 -->
      <div class="glow-border"></div>

      <div class="login-header">
        <div class="logo-container">
          <div class="logo-ring"></div>
          <div class="logo-ring ring-2"></div>
          <div class="logo-core">
            <span class="logo-icon">👁</span>
          </div>
        </div>
        <h1 class="glitch-text" data-text="灵魂交友管理后台">灵魂交友管理后台</h1>
        <p class="typewriter">
          <span class="typing-text">{{ typedText }}</span>
          <span class="cursor">|</span>
        </p>
        <div class="status-bar">
          <span class="status-dot"></span>
          <span class="status-text">SYSTEM ONLINE</span>
        </div>
      </div>

      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        @keyup.enter="handleLogin"
      >
        <el-form-item prop="username">
          <div class="input-wrapper">
            <div class="input-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <el-input
              v-model="loginForm.username"
              placeholder="USER ID"
              size="large"
              clearable
              class="cyber-input"
            />
            <div class="input-line"></div>
          </div>
        </el-form-item>

        <el-form-item prop="password">
          <div class="input-wrapper">
            <div class="input-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="ACCESS CODE"
              size="large"
              show-password
              clearable
              class="cyber-input"
            />
            <div class="input-line"></div>
          </div>
        </el-form-item>

        <el-form-item>
          <button
            type="button"
            class="cyber-button"
            :class="{ loading: loading }"
            @click="handleLogin"
            :disabled="loading"
          >
            <span class="button-glitch"></span>
            <span class="button-text">
              <template v-if="loading">
                <span class="loading-dots">
                  <span>.</span><span>.</span><span>.</span>
                </span>
                CONNECTING
              </template>
              <template v-else>
                <span class="btn-icon">⟩</span> INITIALIZE
              </template>
            </span>
            <span class="button-shine"></span>
          </button>
        </el-form-item>
      </el-form>

      <div class="login-footer">
        <div class="divider">
          <span class="divider-line"></span>
          <span class="divider-text">DEFAULT ACCESS</span>
          <span class="divider-line"></span>
        </div>
        <p class="access-info">
          <span class="label">ID:</span> admin
          <span class="separator">|</span>
          <span class="label">CODE:</span> admin123
        </p>
        <div class="footer-decoration">
          <span class="hex-code">#SOUL_CONNECT_v2.0</span>
        </div>
      </div>
    </div>

    <!-- 浮动装饰元素 -->
    <div class="floating-elements">
      <div class="float-hex hex-1">⬡</div>
      <div class="float-hex hex-2">⬢</div>
      <div class="float-hex hex-3">⬡</div>
      <div class="float-circle circle-1"></div>
      <div class="float-circle circle-2"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

// 表单引用
const loginFormRef = ref<FormInstance>()

// 登录表单
const loginForm = reactive({
  username: 'admin',
  password: 'admin123'
})

// 表单验证规则
const loginRules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少6位', trigger: 'blur' }
  ]
}

// 加载状态
const loading = ref(false)

// 轮播内容
const sloganList = [
  {
    title: '连接',
    subtitle: '让灵魂相遇',
    desc: '跨越距离的心灵桥梁\n让有趣的灵魂终会相遇\n让交流回归本质'
  },
  {
    title: '心选',
    subtitle: '不被定义的关系',
    desc: '只遵循内心的感受\n在这里，每一次聊天\n都可能是一场共鸣'
  },
  {
    title: '同频',
    subtitle: '真实的相遇',
    desc: '不止于表面标签\n在这里，用灵魂找到\n与你同频的人'
  },
  {
    title: '共鸣',
    subtitle: '为懂你的人而来',
    desc: '跨越距离与背景\n在灵魂相遇的地方\n遇见彼此的世界'
  }
]

const currentSlogan = ref(0)
let sloganInterval: ReturnType<typeof setInterval> | null = null

const setSlogan = (index: number) => {
  currentSlogan.value = index
  // 重置自动轮播计时器
  if (sloganInterval) {
    clearInterval(sloganInterval)
    startSloganAutoPlay()
  }
}

const startSloganAutoPlay = () => {
  sloganInterval = setInterval(() => {
    currentSlogan.value = (currentSlogan.value + 1) % sloganList.length
  }, 5000)
}

// 打字机效果
const typedText = ref('')
const fullText = 'Soul App Admin System'
let typeIndex = 0
let typeInterval: ReturnType<typeof setInterval> | null = null

const startTyping = () => {
  typeInterval = setInterval(() => {
    if (typeIndex < fullText.length) {
      typedText.value += fullText[typeIndex]
      typeIndex++
    } else {
      if (typeInterval) clearInterval(typeInterval)
    }
  }, 100)
}

// 粒子样式
const getParticleStyle = (index: number) => {
  const size = Math.random() * 4 + 1
  const x = Math.random() * 100
  const y = Math.random() * 100
  const duration = Math.random() * 20 + 10
  const delay = Math.random() * 5

  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${x}%`,
    top: `${y}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`
  }
}

onMounted(() => {
  startTyping()
  startSloganAutoPlay()
})

onUnmounted(() => {
  if (typeInterval) clearInterval(typeInterval)
  if (sloganInterval) clearInterval(sloganInterval)
})

// 处理登录
const handleLogin = async () => {
  if (!loginFormRef.value) return

  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const success = await userStore.login(loginForm)
        if (success) {
          router.push('/')
        }
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped>
/* 颜色变量 */
.login-container {
  --primary-cyan: #4dd9e5;
  --primary-magenta: #36d1c4;
  --primary-purple: #2ec4b6;
  --dark-bg: #1a1a2e;
  --darker-bg: #0f0f1a;
}

.login-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10%;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  overflow: hidden;
}

.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  pointer-events: none;
}

/* 左侧宣传语 */
.slogan-section {
  position: absolute;
  left: 16.67%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  color: #fff;
  text-align: center;
}

.slogan-title {
  font-size: 72px;
  font-weight: 700;
  margin: 0 0 10px 0;
  letter-spacing: 8px;
  color: #fff;
}

.slogan-subtitle {
  font-size: 24px;
  font-weight: 400;
  margin: 0 0 20px 0;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 2px;
}

.slogan-desc {
  font-size: 32px;
  font-weight: 500;
  margin: 0;
  line-height: 1.6;
  color: var(--primary-cyan);
  letter-spacing: 1px;
}

.slogan-dots {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 50px;
}

.slogan-dots .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(77, 217, 229, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
}

.slogan-dots .dot:hover {
  background: rgba(77, 217, 229, 0.6);
  transform: scale(1.2);
}

.slogan-dots .dot.active {
  background: var(--primary-cyan);
  box-shadow: 0 0 10px var(--primary-cyan), 0 0 20px rgba(77, 217, 229, 0.5);
}

/* 切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 粒子背景 */
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  background: var(--primary-cyan);
  border-radius: 50%;
  opacity: 0.6;
  animation: float-particle linear infinite;
}

.particle:nth-child(odd) {
  background: var(--primary-magenta);
}

.particle:nth-child(3n) {
  background: var(--primary-purple);
}

@keyframes float-particle {
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  50% {
    transform: translateY(-100px) translateX(50px);
  }
}

/* 扫描线 */
.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary-cyan), transparent);
  opacity: 0.5;
  animation: scan 4s linear infinite;
  z-index: 2;
}

@keyframes scan {
  0% { top: 0; }
  100% { top: 100%; }
}

/* 网格背景 */
.grid-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 1;
}

/* 科技线条 */
.tech-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 2;
}

.tech-lines .line {
  position: absolute;
  background: linear-gradient(90deg, transparent, var(--primary-cyan), transparent);
  opacity: 0.3;
  height: 1px;
}

.line-1 {
  top: 20%;
  left: 0;
  width: 30%;
  animation: line-extend 3s ease-in-out infinite;
}

.line-2 {
  top: 40%;
  right: 0;
  width: 25%;
  animation: line-extend 3s ease-in-out infinite 0.5s;
}

.line-3 {
  bottom: 30%;
  left: 0;
  width: 20%;
  animation: line-extend 3s ease-in-out infinite 1s;
}

.line-4 {
  bottom: 15%;
  right: 0;
  width: 35%;
  animation: line-extend 3s ease-in-out infinite 1.5s;
}

@keyframes line-extend {
  0%, 100% {
    opacity: 0.1;
    transform: scaleX(0.5);
  }
  50% {
    opacity: 0.5;
    transform: scaleX(1);
  }
}

/* 登录卡片 */
.login-box {
  position: relative;
  width: 420px;
  padding: 50px 40px;
  background: rgba(10, 10, 30, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 20px;
  z-index: 10;
}

.login-box::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(135deg, var(--primary-cyan), transparent 50%, var(--primary-magenta));
  border-radius: 20px;
  z-index: -1;
  opacity: 0.5;
}

/* 角落装饰 */
.corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border-color: var(--primary-cyan);
  border-style: solid;
  border-width: 0;
}

.corner-tl {
  top: 10px;
  left: 10px;
  border-top-width: 2px;
  border-left-width: 2px;
}

.corner-tr {
  top: 10px;
  right: 10px;
  border-top-width: 2px;
  border-right-width: 2px;
}

.corner-bl {
  bottom: 10px;
  left: 10px;
  border-bottom-width: 2px;
  border-left-width: 2px;
}

.corner-br {
  bottom: 10px;
  right: 10px;
  border-bottom-width: 2px;
  border-right-width: 2px;
}

/* 发光边框动画 */
.glow-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  pointer-events: none;
}

.glow-border::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, var(--primary-cyan), var(--primary-magenta), var(--primary-purple), var(--primary-cyan));
  background-size: 400% 400%;
  border-radius: 22px;
  z-index: -2;
  animation: gradient-rotate 5s ease infinite;
  filter: blur(10px);
  opacity: 0.5;
}

@keyframes gradient-rotate {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 头部 */
.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.logo-container {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
}

.logo-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(0, 240, 255, 0.5);
  border-radius: 50%;
  animation: ring-rotate 10s linear infinite;
}

.logo-ring::before {
  content: '';
  position: absolute;
  top: -4px;
  left: 50%;
  width: 8px;
  height: 8px;
  background: var(--primary-cyan);
  border-radius: 50%;
  box-shadow: 0 0 5px var(--primary-cyan), 0 0 10px rgba(0, 240, 255, 0.5), 0 0 15px rgba(0, 240, 255, 0.3);
}

.ring-2 {
  animation-direction: reverse;
  animation-duration: 8s;
  border-color: rgba(255, 0, 255, 0.5);
}

.ring-2::before {
  background: var(--primary-magenta);
  box-shadow: 0 0 5px var(--primary-magenta), 0 0 10px rgba(255, 0, 255, 0.5), 0 0 15px rgba(255, 0, 255, 0.3);
}

.logo-core {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(255, 0, 255, 0.2));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 240, 255, 0.3);
}

.logo-icon {
  font-size: 24px;
  filter: drop-shadow(0 0 10px var(--primary-cyan));
}

@keyframes ring-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.login-header h1 {
  font-size: 26px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
  letter-spacing: 2px;
  text-shadow: 0 0 10px var(--primary-cyan), 0 0 20px var(--primary-cyan), 0 0 40px rgba(0, 240, 255, 0.5);
}

/* 故障效果 */
.glitch-text {
  position: relative;
  animation: glitch-skew 2s infinite linear alternate-reverse;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text::before {
  color: var(--primary-magenta);
  animation: glitch-effect 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
  clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
  transform: translateX(-2px);
  opacity: 0.8;
}

.glitch-text::after {
  color: var(--primary-cyan);
  animation: glitch-effect 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
  clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
  transform: translateX(2px);
  opacity: 0.8;
}

@keyframes glitch-effect {
  0% { transform: translateX(0); }
  20% { transform: translateX(-2px); }
  40% { transform: translateX(2px); }
  60% { transform: translateX(-1px); }
  80% { transform: translateX(1px); }
  100% { transform: translateX(0); }
}

@keyframes glitch-skew {
  0%, 100% { transform: skew(0deg); }
  20% { transform: skew(-0.5deg); }
  40% { transform: skew(0.5deg); }
  60% { transform: skew(-0.3deg); }
  80% { transform: skew(0.3deg); }
}

.typewriter {
  font-size: 14px;
  color: rgba(0, 240, 255, 0.8);
  font-family: 'Courier New', monospace;
  height: 20px;
}

.cursor {
  animation: blink 1s step-end infinite;
  color: var(--primary-cyan);
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.status-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 15px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #00ff00;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
  box-shadow: 0 0 5px #00ff00, 0 0 10px rgba(0, 255, 0, 0.5), 0 0 15px rgba(0, 255, 0, 0.3);
}

.status-text {
  font-size: 11px;
  color: #00ff00;
  letter-spacing: 2px;
  font-family: 'Courier New', monospace;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 表单样式 */
.login-form :deep(.el-form-item) {
  margin-bottom: 25px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.input-icon {
  position: absolute;
  left: 15px;
  width: 20px;
  height: 20px;
  color: var(--primary-cyan);
  z-index: 10;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.input-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-cyan), var(--primary-magenta));
  transition: width 0.3s ease;
}

.input-wrapper:focus-within .input-line {
  width: 100%;
}

.input-wrapper:focus-within .input-icon {
  color: var(--primary-magenta);
  opacity: 1;
}

.login-form :deep(.cyber-input .el-input__wrapper) {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: 10px;
  padding: 5px 15px 5px 45px;
  box-shadow: none;
  transition: all 0.3s ease;
}

.login-form :deep(.cyber-input .el-input__wrapper:hover) {
  border-color: rgba(0, 240, 255, 0.5);
}

.login-form :deep(.cyber-input .el-input__wrapper.is-focus) {
  border-color: var(--primary-cyan);
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.3), 0 0 20px rgba(0, 240, 255, 0.15), 0 0 30px rgba(0, 240, 255, 0.1);
}

.login-form :deep(.cyber-input .el-input__inner) {
  color: #fff;
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
}

.login-form :deep(.cyber-input .el-input__inner::placeholder) {
  color: rgba(0, 240, 255, 0.5);
  letter-spacing: 2px;
}

.login-form :deep(.cyber-input .el-input__prefix),
.login-form :deep(.cyber-input .el-input__suffix) {
  color: var(--primary-cyan);
}

/* 按钮样式 */
.cyber-button {
  position: relative;
  width: 100%;
  height: 50px;
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(255, 0, 255, 0.2));
  border: 1px solid rgba(0, 240, 255, 0.5);
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 3px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
}

.cyber-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.cyber-button:hover {
  border-color: var(--primary-cyan);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.25), 0 0 45px rgba(0, 240, 255, 0.15);
  transform: translateY(-2px);
}

.cyber-button:hover::before {
  left: 100%;
}

.cyber-button:active {
  transform: translateY(0);
}

.cyber-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.button-text {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-icon {
  font-size: 20px;
  animation: arrow-pulse 1s ease-in-out infinite;
}

.loading-dots span {
  animation: dot-bounce 1.4s ease-in-out infinite;
  display: inline-block;
}

.loading-dots span:nth-child(1) { animation-delay: 0s; }
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }

.button-shine {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%);
  background-size: 200% 100%;
  animation: shine 3s linear infinite;
}

.cyber-button.loading .button-shine {
  animation: shine 1s linear infinite;
}

@keyframes arrow-pulse {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
}

@keyframes dot-bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-5px); }
}

@keyframes shine {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* 底部 */
.login-footer {
  margin-top: 30px;
}

.divider {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.3), transparent);
}

.divider-text {
  font-size: 10px;
  color: rgba(0, 240, 255, 0.6);
  letter-spacing: 2px;
}

.access-info {
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Courier New', monospace;
  margin: 0;
}

.access-info .label {
  color: var(--primary-cyan);
}

.access-info .separator {
  margin: 0 10px;
  color: rgba(0, 240, 255, 0.5);
}

.footer-decoration {
  text-align: center;
  margin-top: 15px;
}

.hex-code {
  font-size: 10px;
  color: rgba(255, 0, 255, 0.5);
  letter-spacing: 1px;
  font-family: 'Courier New', monospace;
}

/* 浮动元素 */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 5;
}

.float-hex {
  position: absolute;
  font-size: 40px;
  opacity: 0.1;
  animation: float 10s ease-in-out infinite;
}

.hex-1 {
  top: 15%;
  left: 10%;
  color: var(--primary-cyan);
  animation-delay: 0s;
}

.hex-2 {
  top: 60%;
  right: 15%;
  color: var(--primary-magenta);
  animation-delay: 2s;
}

.hex-3 {
  bottom: 20%;
  left: 20%;
  color: var(--primary-purple);
  animation-delay: 4s;
}

.float-circle {
  position: absolute;
  border: 1px solid;
  border-radius: 50%;
  opacity: 0.2;
  animation: pulse-scale 5s ease-in-out infinite;
}

.circle-1 {
  top: 25%;
  right: 10%;
  width: 100px;
  height: 100px;
  border-color: var(--primary-cyan);
}

.circle-2 {
  bottom: 30%;
  left: 5%;
  width: 60px;
  height: 60px;
  border-color: var(--primary-magenta);
  animation-delay: 2s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
}

@keyframes pulse-scale {
  0%, 100% {
    transform: scale(1);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.4;
  }
}

/* 响应式 */
@media (max-width: 480px) {
  .login-box {
    width: 90%;
    padding: 30px 20px;
  }

  .login-header h1 {
    font-size: 20px;
  }
}
</style>
