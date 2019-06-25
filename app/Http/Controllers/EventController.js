'use strict'

const Event = use('App/Model/Event')
const EventGuest = use('App/Model/EventGuest')
const Helpers = use('Helpers')

class EventController {

  * index(request, response) {
    const events = yield Event.all()
    yield response.sendView('events', {
      events: events.toJSON()
    })
    return
  }

  * create(request, response) {
    try {
      const eventpic = request.file('eventpic', {
        allowedExtensions: ['jpg', 'png', 'jpeg']
      })
      let fileName = `${(new Date()).getTime()}.${eventpic.extension()}`
      yield eventpic.move(Helpers.storagePath('/event'), fileName)

      fileName = `static/eventimage/${fileName}`


      if (!eventpic.moved()) {
        response.badRequest(eventpic.errors())
        return
      }


      const event_name = request.input('eventname')
      const start_date = request.input('startdate')
      const end_date = request.input('enddate')
      const event_description = request.input('eventdescription')
      const has_registration = request.input('registrationtype')
      const form_link = request.input('formlink')
      const ticket_link = request.input('ticketlink')
      const user = yield Event.create({
        event_name: event_name,
        start_date: start_date,
        end_date: end_date,
        event_description: event_description,
        has_registration: has_registration,
        image: fileName,
        form_link: form_link,
        ticket_link: ticket_link
      });
      yield request
        .with({
          message: ['Event Created']
        })
        .flash()
      response.redirect('back')
    } catch (e) {
      console.log(e);
    }
  }

  * eventregistration(request, response) {
    const eventId = request.param('id');
    let events = yield Event.query().where('id', eventId).first()
    yield response.sendView('event_registration', {
      eventid: eventId,
      events: events.toJSON()
    })
    return
  }

  * eventguestdetail(request, response) {
    const eventId = request.param('id')
    const events = yield Event.query().where('id', eventId).with('event_guests').first()
    yield response.sendView('admin.eventguestdetail', {
      events: events.toJSON()
    })
    return
  }

  * registrationcomplete(request, response) {

    const eventid = request.param('id')
    const email = request.input('email')
    const name = request.input('name')
    const phone = request.input('mobile')
    const description = request.input('description')
    const eventguest = yield EventGuest.create({
      email: email,
      phone: phone,
      description: description,
      name: name,
      event_id: eventid
    });
    yield request
      .with({
        message: ['Registration completed']
      })
      .flash()
    response.redirect('/event')

  }

  * eventlist(request, response) {
    const events = yield Event.all()
    yield response.sendView('admin/eventguest', {
      events: events.toJSON()
    })
    return
  }

  * eventreadmore(request, response) {
    const eventid = request.param('id')
    let event = yield Event.query().where('id', eventid).first()
    yield response.sendView('eventreadmore', {
      event: event.toJSON()
    })
    return
  }


}


module.exports = EventController
