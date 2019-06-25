'use strict'

const User = use('App/Model/User')
const Gallery = use('App/Model/Gallery')
const Album = use('App/Model/Album')
const Mail = use('Mail')
const Helpers = use('Helpers')
const Shop = use('App/Model/Shop')
const Email = use('App/model/Email')

class UserController {

  * login(request, response) {
    console.log(request.all());
    try {
      const email = request.input('email')
      const password = request.input('password')
      const login = yield request.auth.attempt(email, password)

      if (login) {
        console.log(' Successfully logged in');
        response.redirect('/admin/event_feed')
      }
    } catch (e) {
      console.log(e);
      response.status(200).json({
        error: e
      })
    }
  }

  * logout(request, response) {
    yield request.auth.logout()
    response.redirect('/adminlogin')
  }

  * sendemail(request, response) {
    try {
      yield Mail.raw('Your security code is 301030', message => {
        message.to('tarun150198@gmail.com')
        message.from('tarun150198@gmail.com')
        message.subject('Welcome to the Kitten\'s World')
      })
      response.ok('sent')
    } catch (e) {
      console.log(e)
    }

  }

  * generalenquiry(request, response) {


    const name = request.input('txtGname')
    const mail = request.input('txtGemail')
    const message = request.input('txtGmsg')
    const phone = request.input('phoneno')
    const category = 'GENERAL'
    try {
      yield Mail.send('emails.enquiry', {
        name: name,
        mail: mail,
        message: message,
        category: category,
        phone: phone
      }, message => {
        message.to('tarun150198@gmail.com')
        message.from('tarun150198@gmail.com')
        message.subject("GENERAL ENQUIRY")
      })
      console.log('Email sent');
      yield request
        .with({
          message: [' General enquiry message is sent ']
        })
        .flash()
      response.redirect('back')

    } catch (e) {
      console.log(e)
    }

  }

  * businessenquiry(request, response) {
    try {

      const name1 = request.input('ddSalutation')
      const name = request.input('txtName')
      const phone = request.input('txtPhone')
      const mail = request.input('txtEmail')
      const city = request.input('txtCity')
      const querytype = request.input('DDLQueryType')
      const message = request.input('txtComment')
      const category = 'BUSINESS'

      yield Mail.send('emails.enquiry', {
        name1: name1,
        name: name,
        phone: phone,
        mail: mail,
        city: city,
        querytype: querytype,
        message: message,
        category: category
      }, message => {
        message.to('tarun150198@gmail.com')
        message.from('tarun150198@gmail.com')
        message.subject("BUSINESS ENQUIRY")
      })
      yield request
        .with({
          businessmessage: [' Business enquiry message is sent ']
        })
        .flash()
      response.redirect('back')
    } catch (e) {
      console.log(e);
    }
  }

  * careers(request, response) {
    try {

      const furesume = request.file('furesume', {
        allowedExtensions: ['pdf'],
        maxSize: '2mb',

      })
      const fileName = `${(new Date()).getTime()}.${furesume.extension()}`
      yield furesume.move(Helpers.storagePath('/cv'), fileName)

      if (!furesume.moved()) {
        response.badRequest(furesume.errors())
        return
      }

      const name1 = request.input('ddlgender')
      const name = request.input('txtname')
      const phone = request.input('txtphone')
      const email = request.input('txtemail')
      const city = request.input('txtcity')

      yield Mail.send('emails.career', {
        name1: name1,
        name: name,
        phone: phone,
        email: email,
        city: city
      }, message => {
        message.to('tarun150198@gmail.com')
        message.from('tarun150198@gmail.com')
        message.subject("CAREER")
        message.attach(Helpers.storagePath(`/cv/${fileName}`))
      })
      yield furesume.delete()
      console.log("CAREER email is sent!");
      yield request
        .with({
          careermessage: [' Career message is sent ']
        })
        .flash()
      response.redirect('back')
    } catch (e) {
      console.log(e);
    }

  }

  * displaygallery(request, response) {
    const gallery = yield Gallery.all()
    yield response.sendView('admin/gallery', {
      gallery: gallery.toJSON()
    })
    return
  }

  * happensonce(request, response) {
    try {

      const coverpic = request.file('coverpic', {
        allowedExtensions: ['jpg', 'png', 'jpeg']
      })

      let fileName = `${(new Date()).getTime()}.${coverpic.extension()}`
      yield coverpic.move(Helpers.storagePath('/gallery'), fileName)

      if (!coverpic.moved()) {
        response.badRequest(coverpic.errors())
        return
      }

      fileName = `static/gallery/${fileName}`

      const gallery = yield Gallery.create({
        start_date: request.input('startdate'),
        end_date: request.input('enddate'),
        description: request.input('description'),
        cover_Pic: fileName
      });
      yield request
        .with({
          message: ['Gallery created']
        })
        .flash()
      response.redirect('back')

    } catch (e) {
      console.log(e);
    }
  }

  * recurring(request, response) {

    try {

      const coverpic = request.file('coverpic', {
        allowedExtensions: ['jpg', 'png', 'jpeg']
      })

      let fileName = `${(new Date()).getTime()}.${coverpic.extension()}`
      yield coverpic.move(Helpers.storagePath('/gallery'), fileName)

      if (!coverpic.moved()) {
        response.badRequest(coverpic.errors())
        return
      }

      fileName = `static/gallery/${fileName}`

      const gallery = yield Gallery.create({
        happens: request.input('happening'),
        last_date_of_happen: request.input('lasthappen'),
        description: request.input('description'),
        cover_Pic: fileName
      });
      yield request
        .with({
          message: ['Gallery for recurring is created']
        })
        .flash()
      response.redirect('back')

    } catch (e) {
      console.log(e);
    }

  }

  * displayalbum(request, response) {
    const galleryid = request.param('id');
    let gallery = yield Gallery.query().where('id', galleryid).with('albums').first()
    gallery = gallery.toJSON()
    yield response.sendView('admin.album', {
      gallery: gallery,
      gallery_id: galleryid
    })
    return
  }

  * createalbum(request, response) {

    try {

      const galleryId = request.param('id')
      const albumpic = request.file('albumpic', {
        allowedExtensions: ['jpg', 'png', 'jpeg']
      })

      let fileName = `${(new Date()).getTime()}.${albumpic.extension()}`
      yield albumpic.move(Helpers.storagePath('/gallery'), fileName)

      if (!albumpic.moved()) {
        response.badRequest(albumpic.errors())
        return
      }

      fileName = `static/album/${fileName}`

      const album = yield Album.create({
        album_pic: fileName,
        gallery_id: galleryId
      });
      yield request
        .with({
          message: ['Album picture added']
        })
        .flash()
      response.redirect('back')

    } catch (e) {
      console.log(e);
    }

  }

  * displayshop(request, response) {
    const shop = yield Shop.all()
    yield response.sendView('admin.shop', {
      shop: shop.toJSON()
    })
    return
  }

  * getemail(request, response) {
    const emails = yield Email.all()
    yield response.sendView('admin.email', {
      emails: emails.toJSON()
    })
    return
  }

  * logpage(request, response) {
    const isLoggedIn = yield request.auth.check()
    if (!isLoggedIn) {
      yield response.sendView('admin.adminlogin')
    }
    if (isLoggedIn) {
      yield response.redirect('/admin/event_feed')
    }

    return
  }

}
module.exports = UserController
