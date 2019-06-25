'use strict'

const Lucid = use('Lucid')

class Shop extends Lucid {

  	static get table () {
  		return 'shop'
  	}
}

module.exports = Shop
