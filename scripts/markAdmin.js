// scripts/markAdmin.js
// Cria (se não existir) e/ou marca contato@labo.art.br como ADMIN.

const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const email = "contato@labo.art.br";
  const clerkId = "placeholder-clerk-id"; // ✅ coloque o verdadeiro ID do Clerk se quiser

  // Tenta achar no banco
  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    // Não existe? então cria agora
    user = await prisma.user.create({
      data: {
        clerkId,
        email,
        name: "Admin",
        role: Role.ADMIN,
      },
    });
    console.log(`👤 Usuário criado com ID ${user.id}`);
  } else {
    // Já existia: apenas garante role = ADMIN
    await prisma.user.update({
      where: { email },
      data: { role: Role.ADMIN },
    });
    console.log("✅ Usuário já existia — role atualizado para ADMIN.");
  }
}

main()
  .catch((e) => console.error("Erro no script:", e))
  .finally(async () => prisma.$disconnect());
