'use strict'

const Lucid = use('Lucid')

class Album extends Lucid {

  static get table () {
    return 'album'
  }
}

module.exports = Album
