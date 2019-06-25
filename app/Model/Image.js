'use strict'

const Lucid = use('Lucid')

class Image extends Lucid {
   static get table(){
   	return 'images'
   } 
}

module.exports = Image
