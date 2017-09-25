const store = require('../store')
const showNotesTemplate = require('../templates/note-listing.handlebars')

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
  $('#note').show()
  $('#content').show()
  $('.btn-default').show()
  $('.note-listing').show()
  $('#wrapper').show()
}
const changePasswordSuccess = function (data) {
  console.log('Great success!')
  $('#change-password').trigger('reset')
  $('#message').text('You`ve successfully changed your password!')
}
const signOutSuccess = function () {
  $('#sign-out').hide()
  store.user = null
  store.data = null
  $('#message').text('You`ve successfully signed out!')
  $('#sign-up').show()
  $('#sign-in').show()
  $('#note').hide()
  $('#content').hide()
  $('.btn-default').hide()
  $('.note-listing').hide()
  $('#wrapper').hide()
}
// const getNotesSuccess = function (data) {
//   store.notes = data.notes
//   console.log(data)
const getNotesSuccess = (data) => {
  const showNotesHtml = showNotesTemplate({ notes: data.notes })
  $('.note-listing').append(showNotesHtml)
  // $('.remove').on('click', function () {
  //   $(this).parent().parent().html('')
  // })
}
// }
const createNoteSuccess = function (data) {
  console.log(data)
  console.log('Note created!')
  $('#message').text('You created a new game!')
  store.notes = data.notes
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
const failure = (data) => {
  console.error(data)
}
module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  getNotesSuccess,
  createNoteSuccess,
  failure
}
