'use strict'

const Lucid = use('Lucid')

class Offer extends Lucid {

	static get table () {
		return 'offers'
	}

}

module.exports = Offer
