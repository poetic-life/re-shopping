// 获取图形验证码
import request from '@/utils/request'
export const getPicCode = () => {
  return request.get('/captcha/image')
}

// 获取短信验证码

export const getMsgCode = (mobile, captchaCode, captchaKey) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 登录
export const login = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      mobile,
      partyData: {},
      smsCode
    }
  })
}
