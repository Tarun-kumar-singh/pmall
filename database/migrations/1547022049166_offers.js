'use strict'

const Schema = use('Schema')

class OffersTableSchema extends Schema {

  up () {
    this.create('offers', (table) => {
      table.increments()
      table.timestamps()
      
       
      table.string('brand_name');
      table.datetime('start_date');
      table.datetime('end_date');
      table.string('offer_description')
      table.string('image')    
        
    })
  }

  down () {
    this.drop('offers')
  }

}

module.exports = OffersTableSchema
