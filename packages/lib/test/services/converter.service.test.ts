// test/converter.service.ts
import converter from '../../src/services/converter.service';
import fs from 'fs';
import path from 'path';
import { R4 } from '@ahryman40k/ts-fhir-types';
import chai from 'chai';

const expect = chai.expect;
const vxu_v04: string = fs.readFileSync(
  path.resolve(__dirname, '../data/vxu_v04.hl7'),
  'utf8'
);
const rsp_k11: string = fs.readFileSync(
  path.resolve(__dirname, '../data/rsp_k11_z32.hl7'),
  'utf8'
);

describe('Converter', function () {
  describe('convert', function () {
    it('converts RSP_K11 message to FHIR bundle', function (done) {
      converter
        .convert(rsp_k11)
        .then((r) => {
          expect(r.resourceType).to.equal('Bundle');
          expect(r.entry?.length).to.equal(2);
          expect(r.entry?.[0].fullUrl).to.contain('resource:0');
          expect(r.entry?.[0].resource?.resourceType).to.equal('Patient');
          expect(r.entry?.[1].fullUrl).to.contain('resource:1');
          expect(r.entry?.[1].resource?.resourceType).to.equal('Immunization');
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });

    it('converts VXU message to FHIR bundle', function (done) {
      converter
        .convert(vxu_v04)
        .then((r) => {
          expect(r.resourceType).to.equal('Bundle');
          expect(r.entry?.length).to.equal(2);
          expect(r.entry?.[0].fullUrl).to.contain('resource:0');
          expect(r.entry?.[0].resource?.resourceType).to.equal('Patient');
          expect(r.entry?.[1].fullUrl).to.contain('resource:1');
          expect(r.entry?.[1].resource?.resourceType).to.equal('Immunization');
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });

    it('converts PID segment to FHIR patient', async () => {
      const fhir_data = await converter.convert(rsp_k11);
      expect(fhir_data.entry?.[0].resource?.resourceType).to.equal('Patient');
      const patient: R4.IPatient = fhir_data.entry?.[0].resource as R4.IPatient;
      expect(patient.name?.length).to.equal(1);
      const humanName: R4.IHumanName = patient.name![0];
      expect(humanName.family).to.equal('Patient');
      expect(humanName.given?.[0]).to.equal('Johnny');
      expect(humanName.given?.[1]).to.equal('New');
      expect(patient.birthDate).to.equal('20110411');
    });

    it('converts ORC/RXA segment to FHIR immunization', async () => {
      const fhir_data = await converter.convert(rsp_k11);
      expect(fhir_data.entry?.[1].resource?.resourceType).to.equal(
        'Immunization'
      );
      const immunization: R4.IImmunization = fhir_data.entry?.[1]
        .resource as R4.IImmunization;
      expect(immunization.patient.reference).to.equal('resource:0');
      expect(immunization.status).to.equal('completed');
      expect(immunization.isSubpotent).to.equal(true);
      expect(immunization.occurrenceDateTime).to.equal('20110415');
      expect(immunization.lotNumber).to.equal('12345');
      const vaccineCode: R4.ICodeableConcept = immunization.vaccineCode;
      expect(vaccineCode.coding?.length).to.equal(1);
      expect(vaccineCode.coding?.[0].system).to.equal(
        'http://hl7.org/fhir/sid/cvx'
      );
      expect(vaccineCode.coding?.[0].code).to.equal('83');
      const manufacturer: R4.IIdentifier = immunization.manufacturer
        ?.identifier as R4.IIdentifier;
      expect(manufacturer.system).to.equal(
        'http://terminology.hl7.org/CodeSystem/MVX'
      );
      expect(manufacturer.value).to.equal('SKB');
      const performer: R4.IReference = immunization.performer?.[0]
        ?.actor as R4.IReference;
      expect(performer.display).to.equal("CHILDREN'S HOSPITAL");
    });
  });
});
