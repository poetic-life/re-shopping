<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="imgCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="base64"  :src='base64' alt="" @click="getPicCode">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getMsgCode">{{second === totalSecond ?'获取验证码':second +'秒后重新发送'}}</button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMsgCode, login } from '@/api/login'
export default {
  name: 'LoginPage',
  data () {
    return {
      imgCode: '',
      msgCode: '',
      mobile: '',
      totalSecond: 5,
      smsCode: '',
      timer: null,
      second: 5,
      base64: '',
      key: ''
    }
  },
  created () {
    this.getPicCode()
  },
  methods: {
    checkFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.imgCode)) {
        this.$toast('请输入正确的图像验证码')
        return false
      }
      return true
    },
    async getPicCode () {
      const res = await getPicCode()
      this.base64 = res.data.base64
      this.key = res.data.key
    },
    async getMsgCode () {
      if (!this.timer && this.second === this.totalSecond) {
        if (!this.checkFn()) {
          return
        }
        const res = await getMsgCode(this.msgCode, this.key, this.mobile)
        console.log(res)

        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    async login () {
      if (!this.checkFn()) return
      if (!/^\w{6}$/.test(this.msgCode)) {
        this.$toast('短信验证码输入有误')
        return
      }
      const res = await login(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登录成功')
      const url = this.$route.query.backUrl
      if (url) { this.$router.replace(url) } else this.$router.replace('/')
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
