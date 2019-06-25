'use strict'

const Schema = use('Schema')

class GalleryTableSchema extends Schema {

  up () {
    this.create('gallery', (table) => {
      table.increments()
      table.timestamps()
      table.datetime('start_date')
      table.datetime('end_date')
      table.string('description')
      table.string('cover_Pic')
      table.string('happens')
      table.datetime('last_date_of_happen')
    })
  }

  down () {
    this.drop('gallery')
  }

}

module.exports = GalleryTableSchema
