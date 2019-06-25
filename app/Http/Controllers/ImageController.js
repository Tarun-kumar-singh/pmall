'use strict'

var Image = use('App/Model/Image')
const Helpers = use('Helpers')
const Gallery = use('App/Model/Gallery')
const Database = use('Database')

class ImageController {

  * upload(request, response) {

    try {
      const gallerypic = request.file('gallerypic', {
        // maxSize: '2mb',
        allowedExtensions: ['jpg', 'png', 'jpeg']
      })

      const fileName = `${(new Date()).getTime()}.${gallerypic.extension()}`
      yield gallerypic.move(Helpers.storagePath('/gallery'), fileName)

      if (!gallerypic.moved()) {
        response.badRequest(gallerypic.errors())
        return
      }

      const image = yield Image.create({
        image: fileName,
        title: request.input('imagetitle')
      });

      yield request
        .with({
          message: ['Image uploaded']
        })
        .flash()
      response.redirect('back')

    } catch (e) {
      console.log(e);
    }
  }


  * displaygallery(request, response) {
    let gallery = yield Gallery.all()
    const moment = use('moment')
    const _ = use('lodash')

    try {
       let gall = yield Database.select('*').from('gallery').orderBy('created_at', 'desc')
      var grouped = _.groupBy(gall, function(element) {
        return moment(element.created_at).format('MMMM YYYY');
      });

    } catch (e) {
      console.log(e);
    }
    yield response.sendView('displaygallery', {
      grouped
    })
    return
  }


  * displayalbum(request, response) {
    const galleryid = request.param('id');
    let albums = yield Gallery.query().where('id', galleryid).with('albums').first()
    albums = albums.toJSON()
    yield response.sendView('displayalbum', {
      albums: albums
    })
    return
  }
}


module.exports = ImageController
