// test/converter.controller.ts
import { R4 } from '@ahryman40k/ts-fhir-types';
import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../../src';
import fs from 'fs';
import path from 'path';

const rsp_k11: string = fs.readFileSync(
  path.resolve(__dirname, '../data/rsp_k11_z32.hl7'),
  'utf8'
);
const rsp_k11_422: string = fs.readFileSync(
  path.resolve(__dirname, '../data/rsp_k11_z32_422.hl7'),
  'utf8'
);

describe('Converter API', () => {
  describe('Test POST route /api/convert/text', () => {
    it('converts RSP_K11 message to FHIR bundle', (done) => {
      request(Server)
        .post('/api/v1/convert/text')
        .set({
          'Content-Type': 'text/plain',
        })
        .send(rsp_k11)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, r) {
          if (err) throw err;
          expect(r.body).to.be.an('object');
          const bundle: R4.IBundle = r.body;
          expect(bundle.resourceType).to.equal('Bundle');
          expect(bundle.entry?.length).to.equal(2);
          expect(bundle.entry?.[0].fullUrl).to.contain('resource:Patient');
          expect(bundle.entry?.[0].resource?.resourceType).to.equal('Patient');
          expect(bundle.entry?.[1].resource?.resourceType).to.equal(
            'Immunization'
          );
          return done();
        });
    });

    it('status 400 for message parse errors', function (done) {
      request(Server)
        .post('/api/v1/convert/text')
        .set({
          'Content-Type': 'text/plain',
        })
        .send('test')
        .expect('Content-Type', /json/)
        .expect(400, done);
    });

    it('status 422 for unsupported message type and event', function (done) {
      request(Server)
        .post('/api/v1/convert/text')
        .set({
          'Content-Type': 'text/plain',
        })
        .send(rsp_k11_422)
        .expect('Content-Type', /json/)
        .expect(422, done);
    });
  });
});
