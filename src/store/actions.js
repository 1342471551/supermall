import {
  ADD_TO_CART,
  ADD_COUNTER
} from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = null
      for (let item of context.state.cartList) {
        if (item.iid === payload.iid) {
          oldProduct = item
        }
      }
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else {
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }

      // 另一种方法
      // let product1 = state.cartList.find(item => item.iid === payload.iid)
    })
  }
}
