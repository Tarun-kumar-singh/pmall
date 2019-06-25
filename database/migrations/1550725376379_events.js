'use strict'

const Schema = use('Schema')

class EventsTableSchema extends Schema {

  up () {
    this.create('events', (table) => {
      table.increments()
      table.timestamps()
      table.string('event_name');
      table.datetime('start_date');
      table.datetime('end_date');
      table.string('event_description');
      table.string('image')
      table.boolean('has_registration')
      table.string('form_link')
      table.string('ticket_link')
     })
  }

  down () {
    this.drop('events')
  }

}

module.exports = EventsTableSchema
