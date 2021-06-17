import { makePost, updateUI } from '../src/client/js/app'
 const request = require('supertest')
 const { app } = require('../src/server/server')
 import { dateHandler } from '../src/server/dateHandler'

describe('test updateUI function to be defined', () => {
    test('ensure updateUI exists', () => {
        expect(updateUI).toBeDefined();
    })
})


describe('testing makePost function to be defined', () => {
    test('ensure makePost function exists', () => {
        expect(makePost).toBeDefined();
    })
})
