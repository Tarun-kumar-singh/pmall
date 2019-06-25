'use strict'

const Email = use('App/Model/Email')

class EmailController {

  * signupforupdate(request, response) {

    try {
      const check = yield Email.findBy('email', request.input('email'))

      if (check !== undefined && check !== null && !isNaN(check.id)) {
        yield request
          .with({
            errors: ['Already subscribed!']
          })
          .flash()
        response.redirect('back')
        return
      }

      const email = yield Email.create({
        email: request.input('email')
      });
      yield request
        .with({
          success: ['Thank you for subscribing!']
        })
        .flash()
      response.redirect('back')
      return
    } catch (e) {
      console.log(e);
    }


  }

}

module.exports = EmailController
