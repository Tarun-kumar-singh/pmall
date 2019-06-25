'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

//Static Images

//Taking gallery image from storage
Route.get('static/gallery/:url', function(request, response) {
  const Helpers = use('Helpers')
  response.download(Helpers.storagePath(`gallery/${request.param('url')}`))
})

//Taking album images from storage
Route.get('static/album/:url', function(request, response) {
  const Helpers = use('Helpers')
  response.download(Helpers.storagePath(`gallery/${request.param('url')}`))
})

//Taking shop images from storage
Route.get('static/shopimage/:url', function(request, response) {
  const Helpers = use('Helpers')
  response.download(Helpers.storagePath(`shop/${request.param('url')}`))
})

//Taking shop logo band from storage
Route.get('static/shoplogo/:url', function(request, response) {
  const Helpers = use('Helpers')
  response.download(Helpers.storagePath(`shop/${request.param('url')}`))
})

//Taking offer image from storage
Route.get('static/offer/:url', function(request, response) {
  const Helpers = use('Helpers')
  response.download(Helpers.storagePath(`offer/${request.param('url')}`))
})

// Taking the event images
Route.get('static/eventimage/:url', function(request, response) {
  const Helpers = use('Helpers')
  response.download(Helpers.storagePath(`event/${request.param('url')}`))
})


Route.get('/', 'HomeController.index') // Taking to the home page

Route.get('/shop', 'ShopController.index') // Taking to the shop page
Route.get('/shop_detail/:id', 'ShopController.detail') // displaying the details of the shop from the shop page on the user side
Route.get('/deleteshop/:id', 'ShopController.deleteshop') // deleting a shop from the database

Route.get('/offer', 'OfferController.index') // Taking to the offer page and displaying the offers

Route.get('/event', 'EventController.index') // Taking to the event page
Route.get('/event_registration/:id', 'EventController.eventregistration') // Taking to the the event registration page for event
Route.post('/registration_complete/:id', 'EventController.registrationcomplete') //completeing the event registration and redirect to the event page

Route.get('/event_details/:id', 'EventController.eventreadmore') // Displaying the details of the event on the next page

Route.post('/offer', 'OfferController.create')

Route.get('/image', 'ImageController.index')
Route.on('/food').render('food')// Static food page on user side
Route.on('/cafe-restaurants').render('cafe-restaurants')// static cafe-restaurant page from food page 
Route.on('/food-court').render('food-court')//static food-court page from food page

Route.on('/entertainment').render('entertainment')
Route.on('/services').render('services')
Route.on('/otherlocations').render('otherlocations')
Route.post('/signupforupdate', 'EmailController.signupforupdate')
Route.post('/eventfeed', 'EventController.create')
Route.post('/galleryimage', 'UserController.creategallery')
Route.post('/shop', 'ShopController.create') // TO create the shop from the admin pannel

Route.get('/adminlogin', 'UserController.logpage')

Route.post('/login', 'UserController.login') // To authenticate the user and return to the admin page
Route.get('/admin/logout', 'UserController.logout') // logging out the user
Route.get('/floor-plan').render('floor-plan') // To display the static floor plan on user side
Route.get('/career').render('career')
Route.get('/aboutus').render('aboutus') // To display the static about us page on user side
Route.get('/contactus').render('contactus') // Displaying the static contactus page on user side
Route.get('/displaygallery', 'ImageController.displaygallery') //TO display gallery images on user side
Route.get('/displaygallery2').render('displaygallery2')

Route.post('/generalenquiry', 'UserController.generalenquiry')
Route.post('/businessenquiry', 'UserController.businessenquiry')
Route.post('/careers', 'UserController.careers')
Route.post('/happensonce', 'UserController.happensonce')
Route.post('/recurring', 'UserController.recurring')
Route.get('/album/:id', 'UserController.displayalbum') // Displaying the pictures of the album for a gallery on the ADMIN SIDE
Route.get('/displayalbum/:id', 'ImageController.displayalbum') // Displaying the pictures of the album for a gallery on the user side

Route.post('/createalbum/:id', 'UserController.createalbum') // To add the album Pictures

Route.get('/sitemap').render('sitemap') // Displaying the statc page sitemap
Route.get('/privacypolicy').render('privacypolicy') // Displaying the static privacy and policy pag
Route.get('/disclaimer').render('disclaimer') // Displaying the static disclaimer page privacy policy

try {
  Route.group('admin', function() {
      Route.get('/eventguestdetail/:id', 'EventController.eventguestdetail') // Displaying the guests of a event
      Route.get('/eventlist', 'EventController.eventlist') // Listing the events further displaying the guests of the event
      Route.get('/admin/usersemail', 'UserController.getemail') // Displaying the subscribed email of he users

      Route.get('/admin/gallery', 'UserController.displaygallery')
      Route.get('/admin/createevent', 'EventController.create')
      Route.get('/admin/createoffer', 'OfferController.create')
      Route.get('/admin/createshop', 'ShopController.create')
      Route.on('/admin/event_feed').render('admin/event_feed')
      Route.get('/admin/shops', 'UserController.displayshop') //Displaying the shop page of admin side
      Route.on('/admin/offer').render('admin/offer')
    })
    .middleware('auth')
} catch (e) {
  console.log(e);
}
