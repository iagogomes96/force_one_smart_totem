import { projectTypes } from './content';
export type LeadFields = { name: string; whatsapp: string; city: string; projectType: string };
export type FieldErrors = Partial<Record<keyof LeadFields, string>>;
export function validateLead(input: Record<string, unknown>) {
  const clean = (key: string, max: number) =>
    typeof input[key] === 'string'
      ? (input[key] as string)
          .replace(/[<>\x00-\x1f]/g, '')
          .trim()
          .slice(0, max)
      : '';
  const name = clean('name', 100),
    city = clean('city', 100),
    projectType = clean('projectType', 50);
  let phone = clean('whatsapp', 30).replace(/\D/g, '');
  if (phone.length === 13 && phone.startsWith('55')) phone = phone.slice(2);
  const errors: FieldErrors = {};
  if (name.replace(/\s/g, '').length < 2)
    errors.name = 'Informe seu nome com pelo menos 2 caracteres.';
  if (!/^[1-9]{2}9\d{8}$/.test(phone)) errors.whatsapp = 'Informe um celular com DDD e 9 dígitos.';
  if (city.length < 2) errors.city = 'Informe a cidade do projeto.';
  if (!projectTypes.includes(projectType as (typeof projectTypes)[number]))
    errors.projectType = 'Selecione o tipo de projeto.';
  return { errors, data: { name, whatsapp: `+55${phone}`, city, projectType } };
}
export function maskPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}
