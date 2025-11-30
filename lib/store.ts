import { create } from "zustand";
import {
  type LucideIcon,
  KeyRound,
  UserX,
  Terminal,
  Users,
  Bug,
  Skull,
  Wifi,
} from "lucide-react";

export type SecurityTopic = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  Icon: LucideIcon;
  color: string;
  iconColor: string;
  details: {
    definition: string;
    examples: string[];
    prevention: string[];
    impact: string;
  };
};

interface SecurityState {
  currentTopic: string | null;
  isDetailView: boolean;
  topics: SecurityTopic[];
  setCurrentTopic: (topicId: string | null) => void;
  openDetailView: () => void;
  closeDetailView: () => void;
  navigateToNextTopic: () => void;
  navigateToPreviousTopic: () => void;
}

export const useSecurityStore = create<SecurityState>((set, get) => ({
  currentTopic: null,
  isDetailView: false,
  topics: [
    {
      id: "credentials",
      title: "Micro Credenciales",
      shortTitle: "Credenciales",
      description: "Robo y gestión de contraseñas",
      Icon: KeyRound,
      color: "#f43f5e",
      iconColor: "#000000",
      details: {
        definition:
          "Las micro credenciales son piezas pequeñas de información de autenticación que pueden ser vulnerables a ataques.",
        examples: [
          "Contraseñas débiles o reutilizadas",
          "Tokens de sesión expuestos",
          "Credenciales hardcodeadas en código",
          "Claves API sin protección",
        ],
        prevention: [
          "Usar autenticación multifactor (2FA/MFA)",
          "Gestores de contraseñas seguros",
          "Rotación regular de credenciales",
          "Implementar políticas de contraseñas fuertes",
        ],
        impact: "Acceso no autorizado a sistemas y datos sensibles",
      },
    },
    {
      id: "identity-theft",
      title: "Robo de Identidad",
      shortTitle: "Identidad",
      description: "Suplantación de identidad digital",
      Icon: UserX,
      color: "#6366f1",
      iconColor: "#000000",
      details: {
        definition:
          "El robo de identidad ocurre cuando un atacante obtiene y usa información personal de otra persona sin autorización.",
        examples: [
          "Phishing y spear phishing",
          "Compra fraudulenta con datos robados",
          "Creación de cuentas falsas",
          "Uso indebido de documentos personales",
        ],
        prevention: [
          "Monitorear regularmente cuentas y crédito",
          "No compartir información personal en línea",
          "Usar conexiones seguras (HTTPS)",
          "Verificar autenticidad de sitios web",
        ],
        impact: "Pérdidas financieras, daño reputacional y problemas legales",
      },
    },
    {
      id: "hacking",
      title: "Hacking / Cracking",
      shortTitle: "Hacking",
      description: "Acceso no autorizado a sistemas",
      Icon: Terminal,
      color: "#10b981",
      iconColor: "#000000",
      details: {
        definition:
          "Proceso de explotar vulnerabilidades en sistemas para obtener acceso no autorizado o causar daño.",
        examples: [
          "Explotación de vulnerabilidades de software",
          "Ataques de fuerza bruta",
          "Escalada de privilegios",
          "Backdoors y rootkits",
        ],
        prevention: [
          "Mantener software actualizado",
          "Implementar firewalls y sistemas IDS/IPS",
          "Realizar auditorías de seguridad regulares",
          "Principio de mínimo privilegio",
        ],
        impact:
          "Compromiso total del sistema, robo de datos y pérdida de control",
      },
    },
    {
      id: "social-engineering",
      title: "Ingeniería Social",
      shortTitle: "Ing. Social",
      description: "Manipulación psicológica de usuarios",
      Icon: Users,
      color: "#eab308",
      iconColor: "#000000",
      details: {
        definition:
          "Técnicas de manipulación psicológica para engañar a las personas y obtener información confidencial.",
        examples: [
          "Pretexting (crear escenarios falsos)",
          "Baiting (señuelos con malware)",
          "Tailgating (acceso físico no autorizado)",
          "Quid pro quo (ofrecer servicios falsos)",
        ],
        prevention: [
          "Capacitación y concienciación constante",
          "Verificar identidad antes de compartir información",
          "Políticas claras de seguridad",
          "Simulacros de ataques de ingeniería social",
        ],
        impact:
          "Exposición de información confidencial sin comprometer sistemas técnicos",
      },
    },
    {
      id: "malware",
      title: "Malware",
      shortTitle: "Malware",
      description: "Software malicioso y amenazas",
      Icon: Bug,
      color: "#f97316",
      iconColor: "#000000",
      details: {
        definition:
          "Software diseñado con intención maliciosa para dañar, explotar o comprometer sistemas informáticos.",
        examples: [
          "Virus y gusanos informáticos",
          "Ransomware (secuestro de datos)",
          "Troyanos y spyware",
          "Adware y keyloggers",
        ],
        prevention: [
          "Antivirus y antimalware actualizados",
          "No abrir archivos adjuntos sospechosos",
          "Mantener sistemas operativos actualizados",
          "Usar software de fuentes confiables",
        ],
        impact:
          "Pérdida de datos, cifrado de archivos, robo de información y daño al sistema",
      },
    },
    {
      id: "piracy",
      title: "Piratería y Uso Ilegal",
      shortTitle: "Piratería",
      description: "Uso no autorizado de software",
      Icon: Skull,
      color: "#8b5cf6",
      iconColor: "#000000",
      details: {
        definition:
          "Uso, distribución o reproducción no autorizada de software, contenido digital o propiedad intelectual.",
        examples: [
          "Software crackeado sin licencia",
          "Distribución ilegal de contenido con derechos de autor",
          "Uso de cracks y keygens",
          "Descarga de material protegido",
        ],
        prevention: [
          "Adquirir licencias legítimas",
          "Usar alternativas open source",
          "Implementar DRM cuando sea apropiado",
          "Educación sobre propiedad intelectual",
        ],
        impact:
          "Problemas legales, malware oculto en software pirata, falta de soporte técnico",
      },
    },
    {
      id: "network-attacks",
      title: "Ataques de Red",
      shortTitle: "Red",
      description: "Ataques a infraestructura de red",
      Icon: Wifi,
      color: "#06b6d4",
      iconColor: "#000000",
      details: {
        definition:
          "Intentos de comprometer, interrumpir o explotar vulnerabilidades en redes de comunicación.",
        examples: [
          "DDoS (Denegación de servicio distribuida)",
          "Man-in-the-Middle (interceptación)",
          "Sniffing de paquetes",
          "Ataques DNS y spoofing",
        ],
        prevention: [
          "Encriptación de tráfico (VPN, TLS)",
          "Segmentación de red",
          "Monitoreo de tráfico en tiempo real",
          "Implementar protección DDoS",
        ],
        impact:
          "Interrupción de servicios, interceptación de datos y compromiso de comunicaciones",
      },
    },
  ],
  setCurrentTopic: (topicId) => set({ currentTopic: topicId }),
  openDetailView: () => set({ isDetailView: true }),
  closeDetailView: () => set({ isDetailView: false, currentTopic: null }),
  navigateToNextTopic: () => {
    const { topics, currentTopic } = get();
    const currentIndex = topics.findIndex((t) => t.id === currentTopic);
    const nextIndex = (currentIndex + 1) % topics.length;
    const nextTopic = topics[nextIndex];
    set({ currentTopic: nextTopic.id });
  },
  navigateToPreviousTopic: () => {
    const { topics, currentTopic } = get();
    const currentIndex = topics.findIndex((t) => t.id === currentTopic);
    const prevIndex = (currentIndex - 1 + topics.length) % topics.length;
    const prevTopic = topics[prevIndex];
    set({ currentTopic: prevTopic.id });
  },
}));
