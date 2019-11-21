const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /apps', () => {
    it ('should return an array of apps', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf.at.least(1);
                const playstoreApp = res.body[0];
                expect(playstoreApp).to.include.all.keys(
                    'App', 'Rating', 'Installs', 'Type', 'Price', 'Genres'
                );
            });
    });

    it ('should be 400 if sort is incorrect', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'Mistake' })
            .expect(400, 'Sort must be one of Rating or Apps');
    });

    it ('should be 400 if genres is incorrect', () => {
        return supertest(app)
            .get('/apps')
            .query({ genres: 'Something' })
            .expect(400, 'Genre must be one of Action, Puzzle, Strategy, Casual, Arcade, or Card');
    });
});