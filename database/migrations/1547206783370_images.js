'use strict'

const Schema = use('Schema')

class ImagesTableSchema extends Schema {

  up () {
    this.create('images', (table) => {
      table.increments()
      table.timestamps()
      table.string('image')
      table.string('title')
    })
  }

  down () {
    this.drop('images')
  }

}

module.exports = ImagesTableSchema
