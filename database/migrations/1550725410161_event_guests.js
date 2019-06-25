'use strict'

const Schema = use('Schema')

class EventGuestsTableSchema extends Schema {

  up () {
    this.create('event_guests', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.string('email')
      table.string('phone')
      table.string('description')
      table.integer('event_id', 10).unsigned().references('id').inTable('events').onDelete('CASCADE').onUpdate('CASCADE').nullable()

    })
  }

  down () {
    this.drop('event_guests')
  }

}

module.exports = EventGuestsTableSchema
