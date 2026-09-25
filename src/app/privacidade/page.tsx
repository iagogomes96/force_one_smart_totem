import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Privacidade | Force One Smart Totem',
  robots: { index: false, follow: false },
};
export default function Privacy() {
  return (
    <main className="privacy-page">
      <a href="/">← Voltar ao Smart Totem</a>
      <h1>Privacidade e uso dos dados</h1>
      <p className="draft-note">
        Esta página descreve o tratamento implementado no formulário. A política institucional
        definitiva e o canal do responsável pela proteção de dados devem ser fornecidos pela Force
        One antes da publicação.
      </p>
      <h2>Informações solicitadas</h2>
      <p>
        O formulário solicita nome, WhatsApp, cidade e tipo de projeto. Esses dados são destinados
        ao contato sobre o projeto solicitado. Não solicitamos CPF ou RG.
      </p>
      <h2>Envio e finalidade</h2>
      <p>
        Os dados são utilizados no navegador para preparar a mensagem que será aberta no WhatsApp.
        Este site não mantém um banco de dados próprio com as informações preenchidas no formulário.
        A conversa somente é iniciada depois que você confirma o envio dentro do WhatsApp.
      </p>
      <h2>Dados de navegação</h2>
      <p>
        A implementação registra eventos técnicos de interação, como abertura do formulário e
        resultado do envio, sem nome ou telefone. Parâmetros de campanha presentes no endereço podem
        acompanhar a solicitação para identificar sua origem.
      </p>
      <h2>Seus dados e seu contato</h2>
      <p>
        Você pode pedir informações, correção ou exclusão de dados à Force One. O canal oficial para
        essas solicitações e os prazos de retenção serão informados na política institucional
        definitiva.
      </p>
      <p>Última atualização: setembro de 2026.</p>
    </main>
  );
}
