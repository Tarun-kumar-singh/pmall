'use strict'

const Offer = use('App/Model/Offer')
const Helpers = use('Helpers')
const Database = use('Database')

class OfferController {

  * index(request, response) {
    const moment = use('moment')

    try {
      const offers = yield Database.select('*').from('offers').where('end_date', '>=', moment().format('YYYY-MM-DD 00:00:00')).orderBy('id', 'desc')
      const date = new Date()
      yield response.sendView('Offer', {
        offers: offers,
        cd: date.getDate(),
        cm: date.getMonth(),
        cy: date.getFullYear()
      })
      return
    } catch (e) {
      console.log(e);
    }

  }

  * create(request, response) {

    try {
      const profilePic = request.file('offerpic', {
        // maxSize: '2mb',
        allowedExtensions: ['jpg', 'png', 'jpeg']
      })

      let fileName = `${(new Date()).getTime()}.${profilePic.extension()}`
      yield profilePic.move(Helpers.storagePath('/offer'), fileName)

      if (!profilePic.moved()) {
        response.badRequest(profilePic.errors())
        return
      }

      fileName = `static/offer/${fileName}`



      const offer = yield Offer.create({
        brand_name: request.input('brandname'),
        start_date: request.input('startdate'),
        end_date: request.input('enddate'),
        offer_description: request.input('offerdescription'),
        image: fileName
      });

      yield request
        .with({
          message: ['Offer uploaded']
        })
        .flash()
      response.redirect('back')

    } catch (e) {
      console.log(e);
    }
  }

}

module.exports = OfferController
