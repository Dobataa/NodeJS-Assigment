import * as chai from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';
import app from '../index.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Currency Conversion and Rates API', () => {
    before(() => {
        nock('http://api.exchangeratesapi.io')
            .get('/v1/latest')
            .query({ access_key: '339ee2e5ada4e38a19f5867c837136d6' })
            .reply(200, {
                rates: {
                    USD: 1.2,
                    EUR: 1.0,
                    GBP: 0.9,
                },
            });
    });

    describe('GET /convert', () => {
        it('should convert currency correctly', (done) => {
            chai.request(app)
                .get('/convert?from=USD&to=EUR&amount=120')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('convertedAmount', 100);
                    done();
                });
        });

        it('should return 400 if parameters are missing', (done) => {
            chai.request(app)
                .get('/convert?from=USD&to=EUR')
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error', 'Provide from, to, and amount query parameters');
                    done();
                });
        });

        it('should return 400 if currency code is invalid', (done) => {
            chai.request(app)
                .get('/convert?from=USD&to=XYZ&amount=120')
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error', 'Invalid currency code');
                    done();
                });
        });

        it('should handle server error', (done) => {
            nock.cleanAll();
            nock('http://api.exchangeratesapi.io')
                .get('/v1/latest')
                .query({ access_key: '339ee2e5ada4e38a19f5867c837136d6' })
                .reply(500, { error: 'Internal Server Error' });

            chai.request(app)
                .get('/convert?from=USD&to=EUR&amount=120')
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });
    });

    describe('GET /rates', () => {
        it('should return currency rates', (done) => {
            chai.request(app)
                .get('/rates')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('USD', 1.2);
                    expect(res.body).to.have.property('EUR', 1.0);
                    expect(res.body).to.have.property('GBP', 0.9);
                    done();
                });
        });

        it('should handle server error', (done) => {
            nock.cleanAll();
            nock('http://api.exchangeratesapi.io')
                .get('/v1/latest')
                .query({ access_key: '339ee2e5ada4e38a19f5867c837136d6' })
                .reply(500, { error: 'Internal Server Error' });

            chai.request(app)
                .get('/rates')
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });
    });
});
