// test/converter.service.ts
import converter from '../../src/services/converter.service';
import fs from 'fs';
import path from 'path';
import { R4 } from  '@ahryman40k/ts-fhir-types'
import chai from  'chai'

var expect = chai.expect;
var v2:string = fs.readFileSync(path.resolve(__dirname, '../data/vxu_v04.hl7'), 'utf8');

describe("Converter", function() {
  describe("convert", function() {
    it("converts VXU message to FHIR bundle", function(done) {
      converter.convert(v2).then(r => {
        expect(r.resourceType).to.equal("Bundle");
        expect(r.entry?.length).to.equal(2);
        expect(r.entry![0].fullUrl).to.contain("resource:Patient");
        expect(r.entry![0].resource?.resourceType).to.equal("Patient");
        expect(r.entry![1].resource?.resourceType).to.equal("Immunization");
        done();
      });
    });

    it("converts PID segment to FHIR patient", async () => {
      var fhir_data = await converter.convert(v2);
      expect(fhir_data.entry![0].resource?.resourceType).to.equal("Patient");      
      var patient: R4.IPatient = fhir_data.entry![0].resource as R4.IPatient;
      expect(patient.name?.length).to.equal(1);
      var humanName: R4.IHumanName = patient.name![0];
      expect(humanName.family).to.equal("Patient");
      expect(humanName.given![0]).to.equal("Johnny");
      expect(humanName.given![1]).to.equal("New");
      expect(patient.birthDate).to.equal("20110411");
      expect(patient.gender).to.equal("male");
    });

    it("converts ORC/RXA segment to FHIR immunization", async () => {
      var fhir_data = await converter.convert(v2);
      expect(fhir_data.entry![1].resource?.resourceType).to.equal("Immunization");
      var immunization: R4.IImmunization = fhir_data.entry![1].resource as R4.IImmunization;
      expect(immunization.patient.reference).to.equal("resource:Patient");
      expect(immunization.occurrenceDateTime).to.equal("20110415");
      expect(immunization.lotNumber).to.equal("12345");      
      var vaccineCode: R4.ICodeableConcept = immunization.vaccineCode;
      expect(vaccineCode.coding?.length).to.equal(1);
      expect(vaccineCode.coding![0].system).to.equal("CVX");
      expect(vaccineCode.coding![0].code).to.equal("85");
    });
  });
});