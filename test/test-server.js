process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const dirtyChai = require('dirty-chai');
chai.use(dirtyChai);
// const mongoose = require('mongoose');

const server = require('../app');
const Blob = require('../server/models/blob');

const should = chai.should();
chai.use(chaiHttp);

describe('Blobs', () => {
    Blob.collection.drop();

    beforeEach(done => {
        const newBlob = new Blob({
            name: 'Bat',
            lastName: 'man'
        });
        newBlob.save(err => {
            done();
        });
    });
    afterEach(done => {
        Blob.collection.drop();
        return done();
    });

    it('should list ALL blobs on /blobs GET', done => {
        chai
            .request(server)
            .get('/blobs')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json();
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0].should.have.property('lastName');
                res.body[0].name.should.equal('Bat');
                res.body[0].lastName.should.equal('man');
                done();
            });
    });

    it('should list a SINGLE blob on /blob/<id> GET', done => {
        const newBlob = new Blob({
            name: 'Super',
            lastName: 'man'
        });
        newBlob.save((err, data) => {
            chai
                .request(server)
                .get(`/blob/${data.id}`)
                .end((errInner, res) => {
                    res.should.have.status(200);
                    res.should.be.json();
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('lastName');
                    res.body.name.should.equal('Super');
                    res.body.lastName.should.equal('man');
                    res.body._id.should.equal(data.id);
                    done();
                });
        });
    });

    it('should add a SINGLE blob on /blobs POST', done => {
        chai
            .request(server)
            .post('/blobs')
            .send({ name: 'Java', lastName: 'Script' })
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json();
                res.body.should.be.a('object');
                res.body.should.have.property('SUCCESS');
                res.body.SUCCESS.should.be.a('object');
                res.body.SUCCESS.should.have.property('name');
                res.body.SUCCESS.should.have.property('lastName');
                res.body.SUCCESS.should.have.property('_id');
                res.body.SUCCESS.name.should.equal('Java');
                res.body.SUCCESS.lastName.should.equal('Script');
                done();
            });
    });

    it('should update a SINGLE blob on /blob/<id> PUT', done => {
        chai
            .request(server)
            .get('/blobs')
            .end((err, res) => {
                chai
                    .request(server)
                    .put(`/blob/${res.body[0]._id}`)
                    .send({ name: 'Spider' })
                    .end((error, response) => {
                        response.should.have.status(200);
                        response.should.be.json();
                        response.body.should.be.a('object');
                        response.body.should.have.property('UPDATED');
                        response.body.UPDATED.should.be.a('object');
                        response.body.UPDATED.should.have.property('name');
                        response.body.UPDATED.should.have.property('_id');
                        response.body.UPDATED.name.should.equal('Spider');
                        done();
                    });
            });
    });

    it('should delete a SINGLE blob on /blob/<id> DELETE', done => {
        chai
            .request(server)
            .get('/blobs')
            .end((err, res) => {
                chai
                    .request(server)
                    .delete(`/blob/${res.body[0]._id}`)
                    .end((error, response) => {
                        response.should.have.status(200);
                        response.should.be.json();
                        response.body.should.be.a('object');
                        response.body.should.have.property('REMOVED');
                        response.body.REMOVED.should.be.a('object');
                        response.body.REMOVED.should.have.property('name');
                        response.body.REMOVED.should.have.property('_id');
                        response.body.REMOVED.name.should.equal('Bat');
                        done();
                    });
            });
    });
});
