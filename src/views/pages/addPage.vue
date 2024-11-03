<template>
  <div>
    <!-- 顶部导航栏 -->
    <van-nav-bar fixed title="新增收货地址" left-arrow @click-left="$router.go(-1)" />

    <!-- 地址表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="address.name"
        label="姓名"
        placeholder="请输入收货人姓名"
        required
      />
      <van-field
        v-model="address.phone"
        label="电话"
        placeholder="请输入收货人手机号"
        type="tel"
        required
      />
      <van-field
        v-model="address.province"
        label="省份"
        placeholder="请选择省份"
        is-link
        readonly
        @click="showProvincePicker = true"
      />
      <van-field
        v-model="address.city"
        label="城市"
        placeholder="请选择城市"
        is-link
        readonly
        @click="showCityPicker = true"
        :disabled="!address.province"
      />
      <van-field
        v-model="address.detail"
        label="详细地址"
        placeholder="街道门牌、楼层等信息"
        required
        type="textarea"
      />
      <div class="save-button">
        <van-button round block type="info" native-type="submit">保存</van-button>
      </div>
    </van-form>

    <!-- 省份选择弹窗 -->
    <van-popup v-model="showProvincePicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="provinceOptions"
        @confirm="onProvinceConfirm"
        @cancel="showProvincePicker = false"
      />
    </van-popup>

    <!-- 城市选择弹窗 -->
    <van-popup v-model="showCityPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="currentCityOptions"
        @confirm="onCityConfirm"
        @cancel="showCityPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { NavBar, Form, Field, Button, Popup, Picker } from 'vant'

export default {
  components: {
    'van-nav-bar': NavBar,
    'van-form': Form,
    'van-field': Field,
    'van-button': Button,
    'van-popup': Popup,
    'van-picker': Picker
  },
  data () {
    return {
      address: {
        name: '',
        phone: '',
        province: '',
        city: '',
        detail: ''
      },
      showProvincePicker: false,
      showCityPicker: false,
      provinceOptions: [
        { text: '省份1', value: '省份1' },
        { text: '省份2', value: '省份2' },
        { text: '省份3', value: '省份3' }
      ],
      cityOptions: {
        省份1: [
          { text: '城市1-1', value: '城市1-1' },
          { text: '城市1-2', value: '城市1-2' },
          { text: '城市1-3', value: '城市1-3' }
        ],
        省份2: [
          { text: '城市2-1', value: '城市2-1' },
          { text: '城市2-2', value: '城市2-2' }
        ],
        省份3: [
          { text: '城市3-1', value: '城市3-1' },
          { text: '城市3-2', value: '城市3-2' },
          { text: '城市3-3', value: '城市3-3' }
        ]
      }
    }
  },
  computed: {
    currentCityOptions () {
      console.log('当前省份:', this.address.province) // 调试输出
      return this.cityOptions[this.address.province] || []
    }
  },
  methods: {
    onSubmit () {
      console.log('提交地址信息:', this.address)
      this.$router.go(-1)
    },
    onProvinceConfirm (value) {
      if (value && value[0]) {
        this.address.province = value[0].text
        this.address.city = '' // 清空城市选择
        console.log('选择省份:', this.address.province) // 调试输出
      }
      this.showProvincePicker = false
    },
    onCityConfirm (value) {
      if (value && value[0]) {
        this.address.city = value[0].text
        console.log('选择城市:', this.address.city) // 调试输出
      }
      this.showCityPicker = false
    }
  }
}
</script>

<style scoped>
.save-button {
  margin: 20px;
}
</style>
