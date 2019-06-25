'use strict'

const Shop = use('App/Model/Shop')

class HomeController {

  * index(request, response) {
    const shop = yield Shop.all()
    yield response.sendView('home', {
      shop: shop.toJSON()
    })
    return
  }
}

module.exports = HomeController
