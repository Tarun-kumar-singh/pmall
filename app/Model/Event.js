'use strict'

const Lucid = use('Lucid')

class Event extends Lucid {

  static get table() {
    return 'events'
  }

  event_guests() {
    return this.hasMany('App/Model/EventGuest')
  }
}

module.exports = Event
