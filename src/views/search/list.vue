<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value=search
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div
        class="sort-item"
        v-for="option in sortOptions"
        :key="option"
        :class="{ active: sortType === option }"
        @click="changeSort(option)"
      >
        {{ option }}
      </div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getSearchList } from '@/api/searchList'
export default {
  name: 'SearchIndex',
  components: {
    GoodsItem
  },
  data () {
    return {
      search: this.$route.query.search,
      id: this.$route.query.categoryId,
      page: 1,
      proList: [],
      sortType: 'default', // 默认排序类型
      sortOptions: ['综合', '销量', '价格升序'] // 排序选项
    }
  },
  created () {
    this.getSearchList()
  },
  methods: {
    async getSearchList () {
      const { data } = await getSearchList(this.search, this.page, this.sortType, this.id)
      this.proList = data.list.data
    },
    changeSort (option) {
      if (option === '综合') {
        this.sortType = 'default' // 综合排序
      } else if (option === '销量') {
        this.sortType = 'sales' // 按销量排序
      } else if (option === '价格升序') {
        this.sortType = 'price' // 价格升序
      }
      this.page = 1 // 重新从第一页开始
      this.getSearchList() // 重新获取商品列表
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
      cursor: pointer;
    }
    .active {
      color: #ee0a24; // 高亮颜色
      font-weight: bold;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
