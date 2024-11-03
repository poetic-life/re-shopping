import { DelProduct, getCartList, updateCart } from '@/api/addCart'
export default {
  namespaced: true,
  state () {
    return {
      cartList: [],
      cartTotal: 0
    }
  },
  mutations: {
    setCartList (state, obj) {
      state.cartList = obj.list
      state.cartTotal = obj.cartTotal
    },
    toggleCheck (state, goodsId) {
      const good = state.cartList.find(item => item.goods_id === goodsId)
      good.isChecked = !good.isChecked
    },
    ToggleChecked (state, flag) {
      state.cartList.forEach(item => { item.isChecked = flag })
    },
    ChangeCount1 (state, obj) {
      const { goodsId, goodsNum } = obj
      const good = state.cartList.find(item => item.goods_id === goodsId)
      good.goods_num = goodsNum
    }
    // Del (state) {
    //   // state.getCartList()
    // }
  },
  actions: {
    async ChangeCount (context, obj) {
      const { goodsId, goodsNum, goodsSkuId } = obj
      context.commit('ChangeCount1', { goodsId, goodsNum })
      await updateCart(goodsId, goodsNum, goodsSkuId)
    },
    async getCartList (context) {
      const { data } = await getCartList()
      data.list.forEach(item => { item.isChecked = true })
      // console.log(data)
      context.commit('setCartList', data)
    },
    async Del (context) {
      const sel = context.getters.selProduct
      const cartIds = sel.map(item => item.id)
      await DelProduct(cartIds)
      // console.log(res)
      context.dispatch('getCartList')
    }
  },
  getters: {
    getCartTotal (state) {
      return state.cartTotal
    },
    getCartList (state) {
      return state.cartList
    },
    selProduct (state) {
      return state.cartList.filter(item => item.isChecked === true)
    },
    selCount (state, getters) {
      return getters.selProduct.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    selPrice (state, getters) {
      return getters.selProduct.reduce((sum, item, index) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
