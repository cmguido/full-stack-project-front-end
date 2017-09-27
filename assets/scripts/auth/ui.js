const store = require('../store')
const api = require('./api')
const showNotesTemplate = require('../templates/note-listing.handlebars')
// const getFormFields = require('../../../lib/get-form-fields')

const signUpSuccess = function (data) {
  console.log(data)
  console.log('Successfully signed up!')
  $('#message').text('Successfully signed up').fadeIn().delay(8000).fadeOut()
  $('#sign-up').trigger('reset')
  $('#sign-in').trigger('reset')
  $('#sign-up').hide()
}
const signInSuccess = function (data) {
  console.log(data)
  console.log('Successfully signed in!')
  store.user = data.user
  $('#collapseNotesButton').hide()
  $('#message').text('You`re signed in!').fadeIn().delay(8000).fadeOut()
  $('#sign-in').trigger('reset')
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('.directions').hide()
  $('#sign-out').show()
  $('#change-password').show()
  $('.main').show()
  $('#note').show()
  $('#content').show()
  $('#getNotesButton').show()
  $('.note-listing').show()
  $('#wrapper').show()
  $('.all-notes').html('')
}
const changePasswordSuccess = function (data) {
  console.log('Great success!')
  $('#change-password').trigger('reset')
  $('#message').text('You`ve successfully changed your password!').fadeIn().delay(8000).fadeOut()
}
const signOutSuccess = function () {
  $('#sign-out').hide()
  store.user = null
  store.data = null
  store.notes = null
  $('#message').text('You`ve successfully signed out!').fadeIn().delay(8000).fadeOut()
  $('#sign-up').show()
  $('#sign-in').show()
  $('.directions').show()
  $('#main').hide()
  $('#note').hide()
  $('#content').hide()
  $('.btn-default').hide()
  $('.note-listing').hide()
  $('#wrapper').hide()
  $('#change-password').hide()
  $('.all-notes').html('')
}

const getNotesSuccess = (data) => {
  if (data.notes !== '') {
    $('#message').text('Got em!').fadeIn().delay(8000).fadeOut()
    const showNotesHtml = showNotesTemplate({ notes: data.notes })
    $('.notes-table').show()
    $('#collapseNotesButton').show()
    clearTable()
    $('.all-notes').append(showNotesHtml)
    $('.edit-note').on('click', onEditNote)
    $('.remove').on('click', function () {
      const noteId = $(this).parent().parent().attr('data-id')
      console.log(noteId)
      $(this).parent().parent().remove()
      api.removeNotes(data, noteId)
    // $('#clearNotesButton').on('click', function () {
    //   const noteId = $(this).parent().parent().data('id')
    //   console.log(noteId)
    //   $(this).parent().parent().remove()
    //   api.removeAllNotes(data)
    })
  } else {
    getNoteFailure()
  }
}
const onEditNote = function () {
  // const data = getFormFields(this)
  event.preventDefault()
  const noteId = $(this).parent().parent().attr('data-id')
  const comment = $(this).parent().siblings()[0]
  const time = $(this).parent().siblings()[1]
  comment.contentEditable = true
  time.contentEditable = true
  $('.remove').hide()
  $(this).parent().append('<button class="edit-note">Confirm Edit</button>')
  $(this).parent().append('<button class="edit-cancel">Cancel Edit</button>')
  $(this).hide()
  $(this).hide()
  $('.edit-cancel').on('click', function () {
    clearTable()
    $('.edit-cancel').hide()
    $('#collapseNotesButton').hide()
  })
  $('.edit-note').on('click', function (event) {
    onNoteEdit(noteId, comment, time)
    $('td').each(function () {
      let text = $(this).html()
      text = text.replace(/&amp;/g, '&')
      $(this).html(text)
    })
    $('td').each(function () {
      let text = $(this).html()
      text = text.replace(/<br>/g, '')
      $(this).html(text)
    })
    $(this).parent().parent().append()
  })
}

const clearTable = function () {
  $('.all-notes').html('')
}

const collapseTable = function () {
  clearTable()
  $('#collapseNotesButton').hide()
}
const onNoteEdit = function (noteId, comment, time) {
  const newComment = $(comment).html()
  const newTime = $(time).html()
  const data =
    {
      note: {
        comment: newComment,
        time: newTime
      }
    }

  api.editNotes(data, noteId)
    .then(editNoteSuccess)
    .catch(failure)
}
const createNoteSuccess = function (data) {
  console.log(data)
  console.log('Note created!')
  $('#message').text('You created a new note!').fadeIn().delay(8000).fadeOut()
  $('#note').trigger('reset')
  // store.notes = data.notes
}
const editNoteSuccess = function (data) {
  console.log(data)
  $('#message').text('You edited a note!').fadeIn().delay(8000).fadeOut()
  store.notes = data.notes
  clearTable()
  api.getNotes()
    .then(getNotesSuccess)
    .catch(failure)
}
// //////////////////
const signUpFailure = function (data) {
  console.error(data)
  $('#message').text('Issue on sign-up! Try again!').fadeIn().delay(8000).fadeOut()
}
const signInFailure = function (data) {
  console.log(data)
  console.log('failure!')
  $('#message').text('try again!')
}
const changePasswordFailure = function (data) {
  console.log(data)
  console.log('FAIL!')
  $('#message').text('Something went wrong, change password!').fadeIn().delay(8000).fadeOut()
}
const signOutFailure = function (data) {
  console.log(data)
  console.log('FAIL!')
  $('#message').text('You have not signed out!').fadeIn().delay(8000).fadeOut()
}
const failure = (data) => {
  console.error(data)
}
const createNoteFailure = function (data) {
  console.log(data)
  $('#message').text('Please fill out comment!').fadeIn().delay(8000).fadeOut()
  $('#note').trigger('reset')
}
const getNoteFailure = function (data) {
  console.log(data)
  $('#message').text('Got nothin, make a note!').fadeIn().delay(8000).fadeOut()
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
  getNoteFailure,
  createNoteSuccess,
  createNoteFailure,
  failure,
  editNoteSuccess,
  onNoteEdit,
  collapseTable
}
