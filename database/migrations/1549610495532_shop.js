'use strict'

const Schema = use('Schema')

class ShopTableSchema extends Schema {

  up () {
    this.create('shop', (table) => {
      table.increments()
      table.timestamps()
      table.string('brand_name')
      table.string('category')
      table.integer('floor')
      table.integer('shop_no')
      table.string('brand_description')
      table.string('shop_image')
      table.string('shop_logo')
      table.time('open_time')
      table.time('close_time')
    })
  }

  down () {
    this.drop('shop')
  }

}

module.exports = ShopTableSchema
