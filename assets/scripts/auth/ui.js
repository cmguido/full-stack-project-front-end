const store = require('../store')

const signUpSuccess = function (data) {
  console.log(data)
  console.log('Successfully signed up!')
  $('#message').text('Successfully signed up')
  $('#sign-up').trigger('reset')
  $('#sign-up').hide()
}
const signInSuccess = function (data) {
  console.log(data)
  console.log('Successfully signed in!')
  store.user = data.user
  $('#message').text('You`re signed in!')
  $('#sign-in').trigger('reset')
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#sign-out').show()
}
const changePasswordSuccess = function (data) {
  console.log('Great success!')
  $('#change-password').trigger('reset')
  $('#message').text('You`ve successfully changed your password!')
}
const signOutSuccess = function () {
  $('#sign-out').hide()
  store.user = null
  $('#message').text('You`ve successfully signed out!')
  $('#sign-up').show()
  $('#sign-in').show()
}

// //////////////////

const signUpFailure = function (data) {
  console.error(data)
  $('#message').text('Issue on sign-up! Try again!')
}
const signInFailure = function (data) {
  console.log(data)
  console.log('failure!')
  $('#message').text('try again!')
}
const changePasswordFailure = function (data) {
  console.log(data)
  console.log('FAIL!')
  $('#message').text('Something went wrong, change password!')
}
const signOutFailure = function (data) {
  console.log(data)
  console.log('FAIL!')
  $('#message').text('You have not signed out!')
}
module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
