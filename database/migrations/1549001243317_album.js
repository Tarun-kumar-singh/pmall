'use strict'

const Schema = use('Schema')

class AlbumTableSchema extends Schema {

  up() {
    this.create('album', (table) => {
      table.increments()
      table.timestamps()
      table.integer('gallery_id', 10).unsigned().references('id').inTable('gallery').onDelete('CASCADE').onUpdate('CASCADE').nullable()
      table.string('album_pic')
    })
  }

  down() {
    this.drop('album')
  }

}

module.exports = AlbumTableSchema
