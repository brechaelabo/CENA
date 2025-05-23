import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

// Middleware para proteger rotas e encaminhar conforme o papel
export default clerkMiddleware((req: NextRequest) => {
  const auth = req.auth;

  // Se não autenticado, apenas continue.
  if (!auth || !auth.user) {
    return;
  }

  const { user } = auth;
  const role = user.publicMetadata?.role as string | undefined;

  // Redirecione usuários admin para dashboard admin
  if (role === "ADMIN" && req.nextUrl.pathname === "/") {
    return Response.redirect(new URL("/admin", req.url));
  }
  // Exemplo: outros redirecionamentos podem ser feitos aqui para papéis diferentes
});

// Ative o middleware para todas as rotas, exceto APIs e arquivos estáticos
export const config = {
  matcher: [
    /*
     * Exclui arquivos estáticos (/_next, /images, etc.) e API routes
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
