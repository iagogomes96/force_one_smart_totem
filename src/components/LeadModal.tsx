'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { projectTypes } from '@/lib/content';
import { maskPhone, validateLead, type FieldErrors, type LeadFields } from '@/lib/leads';
import { track } from '@/lib/analytics';
import { buildWhatsAppUrl, siteConfig, sitePath } from '@/lib/site-config';
export function LeadModal({
  onClose,
  returnFocusTo,
}: {
  onClose: () => void;
  returnFocusTo: HTMLElement | null;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [fields, setFields] = useState<LeadFields>({
    name: '',
    whatsapp: '',
    city: '',
    projectType: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [whatsappUrl, setWhatsAppUrl] = useState('');
  const started = useRef(false);
  const redirectTimer = useRef<number | null>(null);
  useEffect(() => {
    const previous = returnFocusTo || (document.activeElement as HTMLElement);
    const dialog = ref.current;
    dialog?.showModal();
    const before = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = before;
      if (redirectTimer.current) window.clearTimeout(redirectTimer.current);
      requestAnimationFrame(() => previous?.focus());
    };
  }, [returnFocusTo]);
  function update(key: keyof LeadFields, value: string) {
    setFields((old) => ({ ...old, [key]: key === 'whatsapp' ? maskPhone(value) : value }));
    setErrors((old) => ({ ...old, [key]: undefined }));
    if (!started.current) {
      track('form_start');
      started.current = true;
    }
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    track('lead_submit_attempt');
    const result = validateLead(fields);
    setErrors(result.errors);
    if (Object.keys(result.errors).length) {
      const key = Object.keys(result.errors)[0];
      document.getElementById(`lead-${key}`)?.focus();
      return;
    }
    setStatus('sending');
    const destination = buildWhatsAppUrl(result.data);

    // O evento dispara enquanto os campos ainda estão no DOM para que o GTM possa
    // coletar os dados fornecidos pelo usuário conforme a configuração da conversão otimizada.
    track(siteConfig.analytics.conversionEvent, { project_type: result.data.projectType });
    track('lead_submit_success');
    setWhatsAppUrl(destination);
    setStatus('success');
    track('lead_whatsapp_redirect');
    redirectTimer.current = window.setTimeout(() => window.location.assign(destination), 900);
  }
  return (
    <dialog
      ref={ref}
      className="lead-dialog"
      aria-labelledby="lead-title"
      onCancel={onClose}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const elements = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'button:not(:disabled), input:not([tabindex="-1"]), select, a[href]',
          ),
        ).filter((el) => el.getClientRects().length > 0);
        if (!elements.length) return;
        event.preventDefault();
        const index = elements.indexOf(document.activeElement as HTMLElement);
        const next = (index + (event.shiftKey ? -1 : 1) + elements.length) % elements.length;
        elements[next].focus();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <span className="sheet-handle" />
        <button className="close-button" aria-label="Fechar formulário" onClick={onClose}>
          <X size={22} />
        </button>
        {status === 'success' ? (
          <div className="success-state" role="status">
            <span className="success-icon">
              <Check />
            </span>
            <p className="eyebrow">Mensagem preparada</p>
            <h2 id="lead-title">
              O próximo ponto
              <br />
              <em>começa com você.</em>
            </h2>
            <p>
              Estamos abrindo o WhatsApp com uma mensagem pronta para você enviar à equipe Force
              One.
            </p>
            <a className="button" href={whatsappUrl}>
              Continuar no WhatsApp <ArrowUpRight size={18} />
            </a>
          </div>
        ) : (
          <>
            <p className="eyebrow">Vamos conectar sua região</p>
            <h2 id="lead-title">
              Conte onde você quer <em>ampliar sua segurança.</em>
            </h2>
            <form onSubmit={submit} noValidate>
              {(['name', 'whatsapp', 'city'] as const).map((key) => (
                <div className="field" key={key}>
                  <label htmlFor={`lead-${key}`}>
                    {{ name: 'Nome', whatsapp: 'WhatsApp', city: 'Cidade' }[key]}
                  </label>
                  <input
                    id={`lead-${key}`}
                    name={key}
                    value={fields[key]}
                    onChange={(e) => update(key, e.target.value)}
                    type={key === 'whatsapp' ? 'tel' : 'text'}
                    autoComplete={
                      { name: 'name', whatsapp: 'tel-national', city: 'address-level2' }[key]
                    }
                    placeholder={
                      { name: 'Seu nome', whatsapp: '(11) 99999-9999', city: 'Cidade do projeto' }[
                        key
                      ]
                    }
                    maxLength={key === 'whatsapp' ? 16 : 100}
                    required
                    aria-invalid={!!errors[key]}
                    aria-describedby={errors[key] ? `error-${key}` : undefined}
                  />
                  {errors[key] && (
                    <small className="field-error" id={`error-${key}`}>
                      {errors[key]}
                    </small>
                  )}
                </div>
              ))}
              <div className="field">
                <label htmlFor="lead-projectType">Tipo de projeto</label>
                <select
                  id="lead-projectType"
                  value={fields.projectType}
                  onChange={(e) => update('projectType', e.target.value)}
                  required
                  aria-invalid={!!errors.projectType}
                  aria-describedby={errors.projectType ? 'error-projectType' : undefined}
                >
                  <option value="">Selecione uma opção</option>
                  {projectTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                {errors.projectType && (
                  <small className="field-error" id="error-projectType">
                    {errors.projectType}
                  </small>
                )}
              </div>
              <div className="honey" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <button className="button submit-button" disabled={status === 'sending'}>
                {status === 'sending' ? 'Enviando…' : 'Solicitar contato'}
                <ArrowUpRight size={20} />
              </button>
              <p className="form-privacy">
                Seus dados serão usados para preparar o contato pelo WhatsApp e medir esta
                conversão.{' '}
                <a
                  href={sitePath(siteConfig.links.privacyUrl)}
                  target="_blank"
                  rel="noopener"
                  onClick={() => track('privacy_click')}
                >
                  Política de Privacidade
                </a>
                .
              </p>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
