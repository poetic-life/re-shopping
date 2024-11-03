<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar fixed title="收货地址" left-arrow @click-left="$router.go(-1)" />

    <!-- 地址列表 -->
    <div class="address-list">
      <!-- 地址项 -->
      <div class="address-item" v-for="item in addressList" :key="item.address_id">
        <div class="address-header">
          <span class="name">{{item.name}}</span>
          <span class="phone">{{item.phone}}</span>
        </div>
        <div class="address-detail">{{item.region.province + item.region.city + item.region.region + item.detail}}</div>
        <div class="address-bottom" @click="handleCheck(item.address_id)">
          <div class="address-default">
            <van-icon :name="item.isDefault ? 'success' : 'circle'" :color="item.isDefault ? 'red' : '#888'" />
            {{ item.isDefault ? '默认' : '选择' }}
          </div>
          <div class="address-actions">
            <van-button icon="edit" type="default" size="small" class="action-button">编辑</van-button>
            <van-button icon="delete" type="default" size="small" class="action-button">删除</van-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加新地址按钮 -->
    <van-button type="danger" block class="add-address-button">添加新地址</van-button>
  </div>
</template>

<script>
import { getAddressList } from '@/api/order'
export default {
  name: 'AddressPage',
  data () {
    return {
      addressList: []
    }
  },
  async created () {
    const { data: { list } } = await getAddressList()
    this.addressList = list.map(item => ({
      ...item,
      isDefault: false // 初始状态非默认
    }))
  },
  methods: {
    handleCheck (id) {
      this.addressList.forEach(item => {
        item.isDefault = item.address_id === id
      })
    }
  }
}
</script>

<style scoped>
.address-list {
  padding: 16px;
  margin-top: 50px;
  padding-bottom: 80px; /* 给底部按钮留出空间 */
}

.address-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.address-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 16px;
}

.address-detail {
  color: #888;
  margin-top: 4px;
}

.address-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.address-default {
  display: flex;
  align-items: center;
  color: red;
}

.address-default .van-icon {
  margin-right: 4px;
}

.address-actions {
  display: flex;
  gap: 12px;
}

.action-button {
  border: none; /* 移除按钮边框 */
  padding: 0; /* 去除内边距，使按钮更加简洁 */
}

.add-address-button {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 0;
}
</style>
