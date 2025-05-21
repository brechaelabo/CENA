// /app/(landing-page)/page.tsx

export default function LandingPage() {
  return (
    <div>
      {/* HEADER DE FUNIL */}
      <section className="text-center py-16 bg-primary/10" id="header">
        <h1 className="text-4xl font-bold mb-4">
          Bem-vindo ao CENA Selftape Club
        </h1>
        <p className="max-w-xl mx-auto text-lg mb-6">
          A comunidade onde atores aprimoram seu talento com desafios mensais,
          feedback de especialistas e networking real.
        </p>
        <a
          href="#planos"
          className="mt-4 inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition"
        >
          Quero participar
        </a>
      </section>
      {/* BENEFÍCIOS */}
      <section className="py-16" id="beneficios">
        <h2 className="text-2xl font-semibold mb-4">Benefícios</h2>
        <ul className="max-w-xl mx-auto grid gap-4 text-lg list-disc list-inside">
          <li>Desafios mensais para aprimorar sua interpretação</li>
          <li>Feedbacks em vídeo de especialistas convidados</li>
          <li>Networking com outros atores de todo o Brasil</li>
          <li>Biblioteca de monólogos atualizada todo mês</li>
          <li>Acesso a planos exclusivos com mentorias individuais</li>
        </ul>
      </section>
      {/* COMO FUNCIONA */}
      <section className="py-16 bg-muted/30" id="como-funciona">
        <h2 className="text-2xl font-semibold mb-4">Como Funciona</h2>
        <ol className="max-w-xl mx-auto space-y-4 text-lg list-decimal list-inside">
          <li>Você escolhe um plano e entra para o clube.</li>
          <li>Recebe os desafios e materiais do mês.</li>
          <li>Envia seus selftapes pelo painel do ator.</li>
          <li>Recebe feedback personalizado do tutor.</li>
          <li>Participa das atividades e mentorias do mês.</li>
        </ol>
      </section>
      {/* PLANOS */}
      <section className="py-16" id="planos">
        <h2 className="text-2xl font-semibold mb-4">Planos</h2>
        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto justify-center">
          {/* PLANO BÁSICO */}
          <div className="bg-white rounded-xl shadow p-6 flex-1 border">
            <h3 className="text-xl font-bold mb-2">Básico</h3>
            <p className="mb-4">Para quem está começando</p>
            <ul className="mb-6 list-disc list-inside text-base">
              <li>1 monólogo/mês</li>
              <li>1 feedback em vídeo</li>
              <li>Acesso à comunidade</li>
            </ul>
            <span className="block text-2xl font-bold mb-4">R$89/mês</span>
            <a
              href="#"
              className="block w-full bg-primary text-white py-2 rounded-lg text-center font-semibold hover:bg-primary/90 transition"
            >
              Quero esse plano
            </a>
          </div>
          {/* PLANO PLUS */}
          <div className="bg-white rounded-xl shadow p-6 flex-1 border border-primary scale-105">
            <h3 className="text-xl font-bold mb-2 text-primary">Plus</h3>
            <p className="mb-4">Mais recursos para sua carreira</p>
            <ul className="mb-6 list-disc list-inside text-base">
              <li>2 monólogos/mês</li>
              <li>2 feedbacks em vídeo</li>
              <li>Mentorias mensais em grupo</li>
              <li>Acesso à biblioteca de roteiros</li>
            </ul>
            <span className="block text-2xl font-bold mb-4">R$129/mês</span>
            <a
              href="#"
              className="block w-full bg-primary text-white py-2 rounded-lg text-center font-semibold hover:bg-primary/90 transition"
            >
              Quero esse plano
            </a>
          </div>
          {/* PLANO PRO */}
          <div className="bg-white rounded-xl shadow p-6 flex-1 border">
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <p className="mb-4">Para profissionais exigentes</p>
            <ul className="mb-6 list-disc list-inside text-base">
              <li>5 monólogos/mês</li>
              <li>5 feedbacks em vídeo</li>
              <li>Mentorias individuais</li>
              <li>Participação em festivais</li>
              <li>Consultoria de carreira</li>
            </ul>
            <span className="block text-2xl font-bold mb-4">R$199/mês</span>
            <a
              href="#"
              className="block w-full bg-primary text-white py-2 rounded-lg text-center font-semibold hover:bg-primary/90 transition"
            >
              Quero esse plano
            </a>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="py-16 bg-muted/30" id="faq">
        <h2 className="text-2xl font-semibold mb-4">Perguntas Frequentes</h2>
        <div className="max-w-xl mx-auto space-y-4 text-base">
          <details className="p-4 rounded border">
            <summary className="cursor-pointer font-semibold">
              Como faço para participar?
            </summary>
            <p>
              Basta escolher um plano, criar sua conta e já pode acessar os
              desafios do mês.
            </p>
          </details>
          <details className="p-4 rounded border">
            <summary className="cursor-pointer font-semibold">
              Posso cancelar a qualquer momento?
            </summary>
            <p>
              Sim, a assinatura é livre de fidelidade e pode ser cancelada a
              qualquer momento.
            </p>
          </details>
          <details className="p-4 rounded border">
            <summary className="cursor-pointer font-semibold">
              Os feedbacks são realmente personalizados?
            </summary>
            <p>
              Sim, cada tutor grava um vídeo único para cada selftape,
              respondendo suas dúvidas e sugerindo melhorias.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
