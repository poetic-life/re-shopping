import request from '@/utils/request'

export const getProductData = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

export const getCommentData = (goodsId, page) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      page
    }
  })
}
