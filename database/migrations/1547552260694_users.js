'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name')
      table.string('email')
      table.string('password')
      table.string('phone')
      table.integer('user_type')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
