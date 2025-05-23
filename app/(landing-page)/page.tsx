"use client";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { useEffect } from "react";

// Rolagem suave para seção (opcional, pode tirar se não gostar)
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function LandingPage() {
  useEffect(() => {
    document.body.classList.remove("overflow-hidden");
  }, []);

  return (
    <div className="bg-background min-h-screen">
      {/* Header topo fixo com botões de login/registro e navegação */}
      <header className="sticky top-0 z-50 bg-white/90 border-b flex items-center justify-between px-6 py-2 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-primary tracking-tight">
            CENA Selftape Club
          </span>
          <nav className="hidden md:flex gap-4 ml-8">
            <button
              onClick={() => scrollToSection("como-funciona")}
              className="hover:underline text-base"
            >
              Como Funciona
            </button>
            <button
              onClick={() => scrollToSection("planos")}
              className="hover:underline text-base"
            >
              Planos
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="hover:underline text-base"
            >
              FAQ
            </button>
          </nav>
        </div>
        <div className="flex gap-2">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 rounded-lg font-semibold border border-primary text-primary hover:bg-primary hover:text-white transition">
                Entrar
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 rounded-lg font-semibold bg-primary text-white hover:bg-primary/90 transition">
                Registrar
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </header>

      {/* HERO / FUNIL PRINCIPAL */}
      <section className="max-w-3xl mx-auto text-center py-20 px-4" id="header">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-primary">
          Sua carreira em cena, todo mês
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Entre para a comunidade de atores que mais cresce no Brasil. Receba
          desafios mensais, feedback personalizado de tutores e participe de uma
          rede nacional exclusiva para profissionais.
        </p>
        <a
          href="#planos"
          className="inline-block px-8 py-3 bg-primary text-white rounded-lg text-lg font-bold shadow hover:bg-primary/90 transition"
        >
          Quero participar
        </a>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-16 px-4 bg-muted/30" id="como-funciona">
        <h2 className="text-2xl font-bold mb-6 text-center">Como Funciona</h2>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
          <ol className="space-y-6 text-lg flex-1">
            <li>1. Escolha um plano, registre-se e faça parte do clube.</li>
            <li>2. Receba os desafios e materiais do mês.</li>
            <li>3. Envie seus selftapes pelo painel exclusivo.</li>
            <li>4. Receba feedbacks personalizados dos tutores.</li>
            <li>5. Participe de mentorias, eventos e oportunidades.</li>
          </ol>
          <div className="flex-1 flex items-center justify-center">
            <img
              src="/club-actors.svg"
              alt="Atores gravando selftape"
              className="rounded-xl w-full max-w-xs shadow"
            />
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section className="py-16 px-4" id="planos">
        <h2 className="text-2xl font-bold mb-6 text-center">Planos</h2>
        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto justify-center">
          {/* Plano Básico */}
          <div className="bg-white rounded-xl shadow p-8 flex-1 border">
            <h3 className="text-xl font-bold mb-2">Básico</h3>
            <p className="mb-4">Para quem está começando</p>
            <ul className="mb-6 list-disc list-inside text-base">
              <li>1 monólogo/mês</li>
              <li>1 feedback em vídeo</li>
              <li>Acesso à comunidade</li>
            </ul>
            <span className="block text-2xl font-bold mb-4">R$97/mês</span>
            <a
              href="#"
              className="block w-full bg-primary text-white py-2 rounded-lg text-center font-semibold hover:bg-primary/90 transition"
            >
              Quero esse plano
            </a>
          </div>
          {/* Plano Plus */}
          <div className="bg-white rounded-xl shadow p-8 flex-1 border border-primary scale-105">
            <h3 className="text-xl font-bold mb-2 text-primary">Plus</h3>
            <p className="mb-4">Mais recursos para sua carreira</p>
            <ul className="mb-6 list-disc list-inside text-base">
              <li>2 monólogos/mês</li>
              <li>2 feedbacks em vídeo</li>
              <li>Mentoria em grupo</li>
              <li>1 selftape pode ser texto livre ou teste confidencial</li>
            </ul>
            <span className="block text-2xl font-bold mb-4">R$167/mês</span>
            <a
              href="#"
              className="block w-full bg-primary text-white py-2 rounded-lg text-center font-semibold hover:bg-primary/90 transition"
            >
              Quero esse plano
            </a>
          </div>
          {/* Plano Pro */}
          <div className="bg-white rounded-xl shadow p-8 flex-1 border">
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <p className="mb-4">Para profissionais exigentes</p>
            <ul className="mb-6 list-disc list-inside text-base">
              <li>5 monólogos/mês</li>
              <li>5 feedbacks em vídeo</li>
              <li>Mentoria individual</li>
              <li>
                Até 2 selftapes podem ser textos livres/testes confidenciais
              </li>
              <li>Participação em festivais e eventos</li>
            </ul>
            <span className="block text-2xl font-bold mb-4">R$247/mês</span>
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
      <section className="py-16 px-4 bg-muted/30" id="faq">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Perguntas Frequentes
        </h2>
        <div className="max-w-2xl mx-auto space-y-6">
          <details className="p-4 rounded border">
            <summary className="cursor-pointer font-semibold">
              Como faço para participar?
            </summary>
            <p className="mt-2 text-muted-foreground">
              Basta escolher um plano, criar sua conta e já pode acessar os
              desafios do mês.
            </p>
          </details>
          <details className="p-4 rounded border">
            <summary className="cursor-pointer font-semibold">
              Posso cancelar a qualquer momento?
            </summary>
            <p className="mt-2 text-muted-foreground">
              Sim, a assinatura é livre de fidelidade e pode ser cancelada a
              qualquer momento.
            </p>
          </details>
          <details className="p-4 rounded border">
            <summary className="cursor-pointer font-semibold">
              Os feedbacks são realmente personalizados?
            </summary>
            <p className="mt-2 text-muted-foreground">
              Sim, cada tutor grava um vídeo único para cada selftape,
              respondendo suas dúvidas e sugerindo melhorias.
            </p>
          </details>
        </div>
      </section>
      <footer className="py-6 text-center text-muted-foreground text-sm border-t mt-8">
        &copy; {new Date().getFullYear()} CENA Selftape Club — Todos os direitos
        reservados.
      </footer>
    </div>
  );
}
