import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Instância do Prisma Client
const prisma = new PrismaClient();

// Proteção opcional: checar se o usuário está autenticado (exemplo, pode adaptar para Clerk)
async function requireAuth(req: NextRequest) {
  // Exemplo: use req.cookies ou integração Clerk/JWT aqui se necessário
  // Para MVP, avançaremos sem bloqueio, mas você pode inserir o controle aqui.
  return true;
}

export async function GET(req: NextRequest) {
  // Listar ou pegar o tema do mês atual
  try {
    // Checar autenticação se for necessário
    await requireAuth(req);

    // Pega o último tema criado, pode adaptar lógica para buscar por mês/ano específico
    const theme = await prisma.theme.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (!theme) {
      return NextResponse.json(
        { message: "Nenhum tema encontrado." },
        { status: 404 },
      );
    }

    return NextResponse.json(theme);
  } catch (error) {
    console.error("Erro ao buscar tema:", error);
    return NextResponse.json(
      { error: "Erro ao buscar tema." },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Checar autenticação se necessário
    await requireAuth(req);

    const body = await req.json();

    const {
      title,
      description,
      headerImageUrl,
      youtubeEmbedUrl,
      monologuePdfs,
    } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes." },
        { status: 400 },
      );
    }

    const theme = await prisma.theme.create({
      data: {
        title,
        description,
        headerImageUrl,
        youtubeEmbedUrl,
        // Armazene como array de strings caso esteja assim em seu schema
        monologuePdfs,
      },
    });

    return NextResponse.json(theme, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar tema:", error);
    return NextResponse.json({ error: "Erro ao criar tema." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Checar autenticação se necessário
    await requireAuth(req);

    const body = await req.json();
    const {
      id,
      title,
      description,
      headerImageUrl,
      youtubeEmbedUrl,
      monologuePdfs,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID do tema obrigatório." },
        { status: 400 },
      );
    }

    const updated = await prisma.theme.update({
      where: { id },
      data: {
        title,
        description,
        headerImageUrl,
        youtubeEmbedUrl,
        monologuePdfs,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro ao atualizar tema:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar tema." },
      { status: 500 },
    );
  }
}
