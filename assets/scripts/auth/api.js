'use strict'
const config = require('../config')
const store = require('../store')

const signUp = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}
const signIn = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}
const changePassword = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + store.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}
const signOut = function () {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
const createNote = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/notes',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const getNotes = function () {
  return $.ajax({
    url: config.apiOrigin + '/notes',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
const removeNotes = function (noteId) {
  return $.ajax({
    url: config.apiOrigin + '/notes/' + noteId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
// const removeAllNotes = function (data) {
//   return $.ajax({
//     url: config.apiOrigin + '/notes/',
//     method: 'DELETE',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     },
//     data
//   })
// }
const editNotes = function (data, noteId) {
  return $.ajax({
    url: config.apiOrigin + '/notes/' + noteId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  getNotes,
  createNote,
  removeNotes,
  editNotes
}
