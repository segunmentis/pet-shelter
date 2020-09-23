process.env.NODE_ENV = 'test'

const pet = require('../models/pet.model')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const should = chai.should()
chai.use(chaiHttp)

describe('Pets', () => {
    /*
     * Test the /GET route
     */
    describe('/GET pet/:index/:limit', () => {
        it('should Get pets using index and limit', (done) => {
            const offset = 2
            const limit = 5
            chai.request(app)
                .get('/pets/' + offset + '/' + limit)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('data')
                    res.body.should.have
                        .property('data')
                        .to.have.length.of.at.most(limit)
                    done()
                })
        })
    })

    describe('/GET pet/:id', () => {
        it('should Get pets using id', (done) => {
            const id = 2
            chai.request(app)
                .get('/pets/' + id)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('data')
                    res.body.should.have.deep.nested
                        .property('data.id')
                        .equal(id)
                    done()
                })
        })
    })

    /*
     * Test the /POST route
     */
    describe('/POST pets', () => {
        it('should validate and post the pet info', (done) => {
            const pet = {
                name: ' john',
                breed: 'Bull',
                type: 'Dog',
                latitude: '87.00976',
                longitude: '87.87553',
            }
            chai.request(app)
                .post('/pets/add')
                .send(pet)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('data')
                    res.body.should.have
                        .property('data')
                        .to.deep.include.all.keys(pet)
                    res.body.should.have.property('message')
                    done()
                })
        })
    })
})
