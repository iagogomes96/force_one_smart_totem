import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateLead, maskPhone } from '../src/lib/leads';
const valid = {
  name: ' Maria Silva ',
  whatsapp: '(11) 99999-1234',
  city: 'Recife',
  projectType: 'Casa / Residência',
};
test('normaliza celular brasileiro em E.164 e aceita cidade fora de SP', () => {
  const result = validateLead(valid);
  assert.deepEqual(result.errors, {});
  assert.equal(result.data.whatsapp, '+5511999991234');
  assert.equal(result.data.name, 'Maria Silva');
  assert.equal(result.data.city, 'Recife');
});
test('valida também telefones já normalizados', () => {
  assert.deepEqual(validateLead({ ...valid, whatsapp: '+5511999991234' }).errors, {});
});
test('rejeita todos os campos ausentes', () => {
  assert.equal(Object.keys(validateLead({}).errors).length, 4);
});
test('rejeita número fixo e tipo de projeto arbitrário', () => {
  const { errors } = validateLead({
    ...valid,
    whatsapp: '(11) 3333-3333',
    projectType: 'injetado',
  });
  assert.ok(errors.whatsapp);
  assert.ok(errors.projectType);
});
test('remove controles e markup da entrada sem executar conteúdo', () => {
  assert.equal(validateLead({ ...valid, name: '<Ana>\u0000' }).data.name, 'Ana');
});
test('máscara mantém 11 dígitos e permite entrada parcial', () => {
  assert.equal(maskPhone('11999991234'), '(11) 99999-1234');
  assert.equal(maskPhone('11'), '11');
  assert.equal(maskPhone('11999'), '(11) 999');
});
