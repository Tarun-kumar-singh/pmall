'use strict'

const Shop = use('App/Model/Shop')
const Helpers = use('Helpers')

class ShopController {

  * index(request, response) {
    const shop = yield Shop.all()
    yield response.sendView('shop', {
      shop: shop.toJSON()
    })
    return
  }

  * detail(request, response) {
    const shopId = request.param('id')
    const shop = yield Shop.query().where('id', shopId).first()
    yield response.sendView('shop_detail', {
      shop: shop.toJSON()
    })
    return
  }

  * create(request, response) {

    try {

      const brandpic = request.file('brandpic', {
        allowedExtensions: ['jpg', 'png', 'jpeg']
      })

      let fileName = `${(new Date()).getTime()}.${brandpic.extension()}`
      yield brandpic.move(Helpers.storagePath('/shop'), fileName)

      if (!brandpic.moved()) {
        response.badRequest(brandpic.errors())
        return
      }

      fileName = `static/shopimage/${fileName}`

      const shoplogo = request.file('shoplogo', {
        allowedExtensions: ['jpg', 'png', 'jpeg']
      })

      let fileName2 = `${(new Date()).getTime()}.${shoplogo.extension()}`
      yield shoplogo.move(Helpers.storagePath('/shop'), fileName2)

      if (!shoplogo.moved()) {
        response.badRequest(shoplogo.errors())
        return
      }

      fileName2 = `static/shoplogo/${fileName2}`

      const shop = yield Shop.create({
        brand_name: request.input('brandname'),
        category: request.input('brandcategory'),
        floor: request.input('floornumber'),
        shop_no: request.input('shopnumber'),
        brand_description: request.input('branddescription'),
        shop_image: fileName,
        shop_logo: fileName2,
        open_time: request.input('opentime'),
        close_time: request.input('closetime')
      });
      yield request
        .with({
          message: ['Shop uploaded']
        })
        .flash()
      response.redirect('back')
    } catch (e) {
      console.log(e);
    }
  }

  * deleteshop(request, response) {

    const shopId = request.param('id')
    const shop = yield Shop.findBy('id', shopId)
    yield shop.delete()
    yield request
      .with({
        message: ['Shop deleted']
      })
      .flash()
    response.redirect('back')
  }

  * displayfoodcourt(request, response) {
    const shop = yield Shop.query().where('category', foodcourt).first()
    yield response.sendView('food-court', {
      shop: shop.toJSON()
    })
    return
  }

}
module.exports = ShopController
