'use strict'

const Lucid = use('Lucid')
// const Hash = use('Hash')

class User extends Lucid {

  static get table () {
    return 'users'
  }

  // static boot () {
  //   super.boot()
  //
  //   /**
  //    * Hashing password before storing to the
  //    * database.
  //    */
  //   this.addHook('beforeCreate', function * (next) {
  //     this.password = yield Hash.make(this.password)
  //     yield next
  //   })
  // }

}

module.exports = User
