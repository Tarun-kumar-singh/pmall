'use strict'

const Lucid = use('Lucid')

class Gallery extends Lucid {

  static get table(){
   return 'gallery'
  }

  albums () {
    return this.hasMany('App/Model/Album')
 }

}

module.exports = Gallery
