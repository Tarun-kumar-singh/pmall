'use strict'

const Lucid = use('Lucid')

class EventGuest extends Lucid {

  static get table() {
    return 'event_guests'
  }
}

module.exports = EventGuest
