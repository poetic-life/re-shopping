<template>
  <div class="prodetail">
    <van-nav-bar fixed title="商品详情页" left-arrow @click-left="$router.go(-1)" />

    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image.external_url" />
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }} / {{ images.length }}</div>
      </template>
    </van-swipe>

    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{proList.goods_price_min}}</span>
          <span class="oldprice">￥{{proList.goods_price_max}}</span>
        </div>
        <div class="sellcount">已售{{proList.goods_sales}}件</div>
      </div>
      <div class="msg text-ellipsis-2">
        {{proList.goods_name}}
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment" v-if="total>0">
      <div class="comment-title">
        <div class="left">商品评价 ({{total}}条)</div>
        <div class="right" @click="$router.push(`/comment${goodsId}`)">查看更多 <van-icon name="arrow" /> </div>
      </div>
      <commentDetail :CommentList="CommentList"></commentDetail>

    </div>

    <!-- 商品描述 -->
    <div class="tips">商品描述</div>
    <div class="desc" v-html="proList.content"></div>

    <!-- 底部 -->
    <div class="footer">
      <div class="icon-home">
        <van-icon name="wap-home-o" />
        <span @click="$router.push('/')">首页</span>
      </div>
      <div class="icon-cart">
          <span v-if="cartTotal > 0" class="num">{{ cartTotal }}</span>
          <van-icon name="shopping-cart-o" />
          <span @click="$router.push('/cart')">购物车</span>
        </div>
      <div class="btn-add" @click="handleAdd">加入购物车</div>
      <div class="btn-buy" @click="handleBuy">立刻购买</div>

    </div>

    <!-- 弹层 -->
    <van-action-sheet v-model="showPannel" :title="mode==='购物车'?'加入购物车':'立即购买'">
      <div class="product">
    <div class="product-title">
      <div class="left">
        <img :src="proList.goods_image" alt="">
      </div>
      <div class="right">
        <div class="price">
          <span>¥</span>
          <span class="nowprice">{{proList.goods_price_min}}</span>
        </div>
        <div class="count">
          <span>库存</span>
          <span>{{proList.stock_total}}</span>
        </div>
      </div>
    </div>
    <div class="num-box">
      <span>数量</span>
      <numBoxing v-model="value"></numBoxing>
    </div>
    <div class="showbtn" v-if="proList.stock_total>0">
      <div class="btn" @click="AddFn" v-if="mode==='购物车'">加入购物车</div>
      <div class="btn now" @click="BuyFn" v-else>立刻购买</div>
    </div>
    <div class="btn-none" v-else>该商品已抢完</div>
  </div>

    </van-action-sheet>
  </div>
</template>

<script>
import { getProductData, getCommentData } from '@/api/product'
import { postAddCart } from '@/api/addCart'
import numBoxing from '@/components/numBoxing.vue'
import commentDetail from '@/components/commentDetail.vue'
export default {
  name: 'ProDetail',
  components: {
    numBoxing,
    commentDetail
  },
  data () {
    return {
      images: [
      ],
      current: 0,
      goodsId: this.$route.params.id,
      proList: {},
      total: 0,
      CommentList: [],
      showPannel: false,
      mode: '购物车',
      value: 1,
      cartTotal: 1
    }
  },
  async created () {
    const { data: { detail } } = await getProductData(this.goodsId)
    console.log(detail)
    this.proList = detail
    this.images = detail.goods_images

    const { data: { list } } = await getCommentData(this.goodsId, 3)
    this.total = list.length
    this.CommentList = list
  },
  methods: {
    onChange (index) {
      this.current = index
    },
    handleAdd () {
      this.showPannel = true
      this.mode = '购物车'
    },
    handleBuy () {
      this.showPannel = true
      this.mode = ''
    },
    async AddFn () {
      const token = this.$store.getters.token
      if (!token) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '好像还没登陆呢',
          confirmButtonText: '去登陆',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            // on confirm
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {
            // on cancel
          })
        console.log('未登录')
      } else {
        console.log('已登陆，需要额外操作')
        const res = await postAddCart(this.goodsId, this.total, this.proList.skuList[0].goods_sku_id)
        console.log(res)
        this.cartTotal = res.data.cartTotal
        this.$toast(res.message)
      }
    },
    BuyFn () {
    }
  }
}
</script>

<style lang="less" scoped>
.prodetail {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  img {
    display: block;
    width: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }
  .desc {
    width: 100%;
    overflow: scroll;
    ::v-deep img {
      display: block;
      width: 100%!important;
    }
  }
  .info {
    padding: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    .now {
      color: #fa2209;
      font-size: 20px;
    }
    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }
    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }
  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }
  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;
    .left-words {
      span {
        margin-right: 10px;
      }
      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;
  }
  .comment-title {
    display: flex;
    justify-content: space-between;
    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;
    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 20px;
        height: 20px;
      }
      .name {
        margin: 0 10px;
      }
    }
    .time {
      color: #999;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .icon-home, .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      .van-icon {
        font-size: 24px;
      }
    }
    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
    .btn-buy {
      background-color: #fe5630;
    }
  }
}

.tips {
  padding: 10px;
}
.product {
  .product-title {
    display: flex;
    .left {
      img {
        width: 90px;
        height: 90px;
      }
      margin: 10px;
    }
    .right {
      flex: 1;
      padding: 10px;
      .price {
        font-size: 14px;
        color: #fe560a;
        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }

  .btn, .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 148, 2);
  }
  .btn.now {
    background-color: #fe5630;
  }
  .btn-none {
    background-color: #cccccc;
  }
}

.footer .icon-cart {
  position: relative;
  padding: 0 6px;
  .num {
    z-index: 999;
    position: absolute;
    top: -2px;
    right: 0;
    min-width: 16px;
    padding: 0 4px;
    color: #fff;
    text-align: center;
    background-color: #ee0a24;
    border-radius: 50%;
  }
}
</style>
