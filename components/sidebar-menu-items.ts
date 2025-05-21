
import { LayoutDashboard, Calendar, Video, Users, UserCircle, Settings } from "lucide-react";

export const sidebarMenuItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Temas do Mês", href: "/temas", icon: Calendar },
  { title: "Meus Selftapes", href: "/selftapes", icon: Video },
  { title: "Mentorias", href: "/mentorias", icon: Users },
  { title: "Perfil", href: "/perfil", icon: UserCircle },
  { title: "Configurações", href: "/configuracoes", icon: Settings }
];
