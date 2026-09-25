export function track(event: string, properties: Record<string, string | number> = {}) {
  // Somente propriedades técnicas; nunca nome, telefone ou conteúdo do form.
  const target = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  target.dataLayer = target.dataLayer || [];
  target.dataLayer.push({ event, ...properties });
}
