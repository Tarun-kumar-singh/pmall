'use strict'

const Lucid = use('Lucid')

class Email extends Lucid {
  static get table () {
    return 'emails'
  }


}

module.exports = Email
