// 获取商品列表数据

import request from '@/utils/request'
export const getSearchList = (goodsName, page, sortType, categoryId) => {
  return request.get('/goods/list', {
    params: {
      sortType,
      sortPrice: 0,
      categoryId,
      goodsName,
      page
    }
  })
}
