const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  // console.log(data)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}
const onSignIn = function (event) {
  const data = getFormFields(this)
  // console.log(data)
  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}
const onChangePassword = function (event) {
  const data = getFormFields(this)
  // console.log(data)
  event.preventDefault()
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}
const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}
const onCreateNote = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  // console.log(data)
  // const data = {
  //   'note': {
  //     'comment': $('input[name=comment]').html(),
  //     'time': $('input[name=time]').html()
  //   }
  // }
  api.createNote(data)
    .then(ui.createNoteSuccess)
    .catch(ui.createNoteFailure)
}
const onGetNotes = function (event) {
  event.preventDefault()
  // const data = getFormFields(this)
  api.getNotes()
    .then(ui.getNotesSuccess)
    .catch(ui.getNoteFailure)
}

const onCollapse = function (event) {
  event.preventDefault()
  ui.collapseTable()
}

const addHandlers = function () {
  $('#collapseNotesButton').hide()
  $('#sign-out').hide()
  $('.notes-table').hide()
  $('.main').hide()
  $('#wrapper').hide()
  $('#content').hide()
  $('.btn-default').hide()
  $('#change-password').hide()
  $('.edit-cancel').hide()
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
  $('#note').on('submit', onCreateNote)
  $('#getNotesButton').on('click', onGetNotes)
  $('#collapseNotesButton').on('click', onCollapse)
}

module.exports = {
  addHandlers
}
