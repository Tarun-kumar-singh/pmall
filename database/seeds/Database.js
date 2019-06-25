'use strict'

/*
|--------------------------------------------------------------------------
| Database Seeder
|--------------------------------------------------------------------------
| Database Seeder can be used to seed dummy data to your application
| database. Here you can make use of Factories to create records.
|
| make use of Ace to generate a new seed
|   ./ace make:seed [name]
|
*/

// const Factory = use('Factory')

class DatabaseSeeder {

  * run () {
        try {
        const Hash = use('Hash')
        const User = use('App/Model/User')

        const email = 'admin@maple.com'
        const password = yield Hash.make('password123')
        const user = yield User.create({
          email,
          password,
          user_type: 0,
          phone: '9988774455',
          name: 'Admin'
        });
      } catch (e) {
        console.log(e);
      }
    // yield Factory.model('App/Model/User').create(5)
  }

}

module.exports = DatabaseSeeder
