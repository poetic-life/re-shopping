import request from '@/utils/request'

export const getAddressList = () => {
  return request.get('/address/list')
}
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 10,
      couponId: 0,
      isUsePoints: 0,
      ...obj
    }
  })
}
