const store = require('../store')
const api = require('./api')
const showNotesTemplate = require('../templates/note-listing.handlebars')
// const getFormFields = require('../../../lib/get-form-fields')

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
  $('.directions').hide()
  $('#sign-out').show()
  $('#change-password').show()
  $('.main').show()
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
  $('.directions').show()
  $('#main').hide()
  $('#note').hide()
  $('#content').hide()
  $('.btn-default').hide()
  $('.note-listing').hide()
  $('#wrapper').hide()
  $('#change-password').hide()
}

const getNotesSuccess = (data) => {
  const showNotesHtml = showNotesTemplate({ notes: data.notes })
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
}
const onEditNote = function () {
  // const data = getFormFields(this)
  event.preventDefault()
  const noteId = $(this).parent().parent().attr('data-id')
  const comment = $(this).parent().siblings()[0]
  const time = $(this).parent().siblings()[1]
  comment.contentEditable = true
  time.contentEditable = true
  $(comment).keydown(function (e) {
    if (e.which === 13) {
      comment.blur()
    }
  })
  $(time).keydown(function (e) {
    if (e.which === 13) {
      time.blur()
    }
  })
  $('.remove').hide()
  $(this).parent().append('<button class="edit-note">Confirm Edit</button>')
  $(this).parent().append('<button class="edit-cancel">Cancel Edit</button>')
  $(this).hide()
  // $('td').each(function () {
  //   let text = $(this).html()
  //   text = text.replace(/&amp;/g, '&')
  //   $(this).html(text)
  // })
  // $('td').each(function () {
  //   let text = $(this).html()
  //   text = text.replace(/<br>/g, '')
  //   $(this).html(text)
  // })
  $('.edit-cancel').on('click', function () {
    clearTable()
    $('.edit-cancel').hide()
  })
  $('.edit-note').on('click', function (event) {
    onNoteEdit(noteId, comment, time)
    // console.log(data)
    // $(this).parent().parent().append()
  })
}

const clearTable = function () {
  $('.all-notes').html('')
}

const collapseTable = function () {
  clearTable()
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
  $('#message').text('You created a new note!')
  $('#note').trigger('reset')
  store.notes = data.notes
}
const editNoteSuccess = function (data) {
  console.log(data)
  $('#message').text('You edited a note!')
  store.notes = data.notes
  clearTable()
  api.getNotes()
    .then(getNotesSuccess)
    .catch(failure)
}
// const clearAll = () => {
//   const noteId = $(this).parent().parent().data('id')
//   $('.all-notes').empty(noteId)
// }
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
  failure,
  editNoteSuccess,
  onNoteEdit,
  collapseTable
}
