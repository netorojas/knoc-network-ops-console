/* Contoso Ops Suite — shared content (i18n strings, integrations catalog, FAQ, changelog).
   Loaded before portal.js. Everything here is demo content; no endpoint is ever called. */
(function () {
'use strict';
var L3 = function (pt, es, en) { return { pt: pt, es: es, en: en }; };

var UI = {
 pt: { search: 'Buscar ou executar um comando', cmd: 'Comandos', apps: 'Suite', tour: 'Tour rápido', faq: 'Perguntas frequentes', log: 'Diário de bordo',
  settings: 'Configurações', menu: 'Menu', signOut: 'Sair', profile: 'Perfil', guest: 'Visitante', demo: 'demo',
  goTo: 'Ir para', actions: 'Ações', theme: 'Alternar tema', lang: 'Idioma', openOther: 'Abrir', noRes: 'Nada encontrado.',
  next: 'Próximo', back: 'Voltar', done: 'Concluir', skip: 'Pular', of: 'de', invite: 'Primeira vez aqui? Tour de 60 segundos.', start: 'Começar', later: 'Agora não',
  // login
  welcome: 'Bem-vindo de volta', signIn: 'Entre para continuar', withMs: 'Microsoft Entra ID', withG: 'Google Workspace', withGh: 'GitHub', withSso: 'SSO corporativo',
  ssoHint: 'SAML 2.0 · OIDC', or: 'ou', explore: 'Explorar a demo', domain: 'Domínio corporativo', cont: 'Continuar', redirecting: 'Simulando redirecionamento…',
  discovered: 'Provedor encontrado (simulado)', disclaimer: 'Ambiente de demonstração com dados fictícios. Nenhuma senha é solicitada ou armazenada: os botões simulam o fluxo de login.',
  signedVia: 'Sessão demo iniciada via', saved: 'Configuração salva neste navegador.',
  // settings
  sGeneral: 'Geral', sInt: 'Integrações', sAuth: 'Autenticação & SSO', sNotif: 'Notificações', sData: 'Dados & privacidade', sApi: 'API & Webhooks', sAbout: 'Sobre',
  sSub: 'Tudo o que dá para configurar. Nesta demo nada sai do seu navegador.',
  appearance: 'Aparência', language: 'Idioma', themeL: 'Tema', auto: 'Auto', light: 'Claro', dark: 'Escuro', density: 'Modo compacto', densityS: 'Mais informação por tela',
  motion: 'Reduzir animações', motionS: 'Desliga transições e efeitos', region: 'Região', tz: 'Fuso horário', startPage: 'Página inicial',
  intSub: 'Conecte as ferramentas que o seu time já usa. Conectores somente leitura por padrão; segredos ficam no cofre (Key Vault), nunca aqui.',
  all: 'Todas', connected: 'Conectado', available: 'Disponível', beta: 'Beta', configure: 'Configurar', backAll: '← Todas as integrações',
  instance: 'URL da instância', authM: 'Método de autenticação', secretRef: 'Referência do segredo (cofre)', readOnly: 'Somente leitura', readOnlyS: 'Recomendado. O conector nunca altera dados na origem.',
  allowWrite: 'Permitir escrita', allowWriteS: 'Ex.: abrir chamado automaticamente. Exige aprovação (CAB).', sync: 'Sincronização', mapping: 'Mapeamento de campos',
  test: 'Testar conexão', save: 'Salvar', disconnect: 'Desconectar', simOk: 'Simulação concluída: nenhuma chamada real foi feita.',
  providers: 'Provedores de identidade', saml: 'SAML 2.0', oidc: 'OpenID Connect', scim: 'Provisionamento SCIM', scimS: 'Cria e remove usuários a partir do IdP',
  mfa: 'Exigir MFA no IdP', mfaS: 'A sessão só é aceita se o IdP confirmar MFA', session: 'Tempo de sessão', roles: 'Papéis e permissões',
  channels: 'Canais', rules: 'Regras de alerta', quiet: 'Horário silencioso', retention: 'Retenção de dados', mask: 'Mascarar dados pessoais (LGPD)', maskS: 'Nome e e-mail aparecem só para Admin',
  export: 'Exportar configuração (JSON)', audit: 'Trilha de auditoria (esta sessão)', apiBase: 'URL base da API', keys: 'Chaves de API', hooks: 'Webhooks de saída', addHook: '+ Adicionar webhook',
  version: 'Versão', license: 'Licença', author: 'Autor', repo: 'Código-fonte', roadmap: 'Próximos passos',
  faqSub: 'Respostas curtas para as dúvidas mais comuns.', faqSearch: 'Buscar nas perguntas…', logSub: 'A evolução dos dois produtos, versão por versão.',
  both: 'Suite', when: 'Quando', who: 'Quem', what: 'O quê'
 },
 es: { search: 'Buscar o ejecutar un comando', cmd: 'Comandos', apps: 'Suite', tour: 'Tour rápido', faq: 'Preguntas frecuentes', log: 'Bitácora',
  settings: 'Configuración', menu: 'Menú', signOut: 'Salir', profile: 'Perfil', guest: 'Visitante', demo: 'demo',
  goTo: 'Ir a', actions: 'Acciones', theme: 'Cambiar tema', lang: 'Idioma', openOther: 'Abrir', noRes: 'Sin resultados.',
  next: 'Siguiente', back: 'Atrás', done: 'Terminar', skip: 'Omitir', of: 'de', invite: '¿Primera vez aquí? Tour de 60 segundos.', start: 'Empezar', later: 'Ahora no',
  welcome: 'Bienvenido de nuevo', signIn: 'Inicia sesión para continuar', withMs: 'Microsoft Entra ID', withG: 'Google Workspace', withGh: 'GitHub', withSso: 'SSO corporativo',
  ssoHint: 'SAML 2.0 · OIDC', or: 'o', explore: 'Explorar la demo', domain: 'Dominio corporativo', cont: 'Continuar', redirecting: 'Simulando redirección…',
  discovered: 'Proveedor encontrado (simulado)', disclaimer: 'Entorno de demostración con datos ficticios. No se solicita ni guarda ninguna contraseña: los botones simulan el flujo de inicio de sesión.',
  signedVia: 'Sesión demo iniciada con', saved: 'Configuración guardada en este navegador.',
  sGeneral: 'General', sInt: 'Integraciones', sAuth: 'Autenticación y SSO', sNotif: 'Notificaciones', sData: 'Datos y privacidad', sApi: 'API y Webhooks', sAbout: 'Acerca de',
  sSub: 'Todo lo que se puede configurar. En esta demo nada sale de tu navegador.',
  appearance: 'Apariencia', language: 'Idioma', themeL: 'Tema', auto: 'Auto', light: 'Claro', dark: 'Oscuro', density: 'Modo compacto', densityS: 'Más información por pantalla',
  motion: 'Reducir animaciones', motionS: 'Desactiva transiciones y efectos', region: 'Región', tz: 'Zona horaria', startPage: 'Página de inicio',
  intSub: 'Conecta las herramientas que tu equipo ya usa. Conectores de solo lectura por defecto; los secretos quedan en el vault, nunca aquí.',
  all: 'Todas', connected: 'Conectado', available: 'Disponible', beta: 'Beta', configure: 'Configurar', backAll: '← Todas las integraciones',
  instance: 'URL de la instancia', authM: 'Método de autenticación', secretRef: 'Referencia del secreto (vault)', readOnly: 'Solo lectura', readOnlyS: 'Recomendado. El conector nunca cambia datos en el origen.',
  allowWrite: 'Permitir escritura', allowWriteS: 'Ej.: abrir ticket automáticamente. Requiere aprobación (CAB).', sync: 'Sincronización', mapping: 'Mapeo de campos',
  test: 'Probar conexión', save: 'Guardar', disconnect: 'Desconectar', simOk: 'Simulación completa: no se hizo ninguna llamada real.',
  providers: 'Proveedores de identidad', saml: 'SAML 2.0', oidc: 'OpenID Connect', scim: 'Aprovisionamiento SCIM', scimS: 'Crea y elimina usuarios desde el IdP',
  mfa: 'Exigir MFA en el IdP', mfaS: 'La sesión solo se acepta si el IdP confirma MFA', session: 'Duración de sesión', roles: 'Roles y permisos',
  channels: 'Canales', rules: 'Reglas de alerta', quiet: 'Horario silencioso', retention: 'Retención de datos', mask: 'Enmascarar datos personales', maskS: 'Nombre y correo solo para Admin',
  export: 'Exportar configuración (JSON)', audit: 'Auditoría (esta sesión)', apiBase: 'URL base de la API', keys: 'Claves de API', hooks: 'Webhooks de salida', addHook: '+ Agregar webhook',
  version: 'Versión', license: 'Licencia', author: 'Autor', repo: 'Código fuente', roadmap: 'Próximos pasos',
  faqSub: 'Respuestas cortas para las dudas más comunes.', faqSearch: 'Buscar en las preguntas…', logSub: 'La evolución de los dos productos, versión por versión.',
  both: 'Suite', when: 'Cuándo', who: 'Quién', what: 'Qué'
 },
 en: { search: 'Search or run a command', cmd: 'Commands', apps: 'Suite', tour: 'Quick tour', faq: 'FAQ', log: 'Changelog',
  settings: 'Settings', menu: 'Menu', signOut: 'Sign out', profile: 'Profile', guest: 'Guest', demo: 'demo',
  goTo: 'Go to', actions: 'Actions', theme: 'Toggle theme', lang: 'Language', openOther: 'Open', noRes: 'No results.',
  next: 'Next', back: 'Back', done: 'Done', skip: 'Skip', of: 'of', invite: 'First time here? 60-second tour.', start: 'Start', later: 'Not now',
  welcome: 'Welcome back', signIn: 'Sign in to continue', withMs: 'Microsoft Entra ID', withG: 'Google Workspace', withGh: 'GitHub', withSso: 'Enterprise SSO',
  ssoHint: 'SAML 2.0 · OIDC', or: 'or', explore: 'Explore the demo', domain: 'Company domain', cont: 'Continue', redirecting: 'Simulating redirect…',
  discovered: 'Provider found (simulated)', disclaimer: 'Demo environment with fictional data. No password is requested or stored: the buttons simulate the sign-in flow.',
  signedVia: 'Demo session started via', saved: 'Settings saved in this browser.',
  sGeneral: 'General', sInt: 'Integrations', sAuth: 'Authentication & SSO', sNotif: 'Notifications', sData: 'Data & privacy', sApi: 'API & Webhooks', sAbout: 'About',
  sSub: 'Everything you can configure. In this demo nothing leaves your browser.',
  appearance: 'Appearance', language: 'Language', themeL: 'Theme', auto: 'Auto', light: 'Light', dark: 'Dark', density: 'Compact mode', densityS: 'More information per screen',
  motion: 'Reduce motion', motionS: 'Turns off transitions and effects', region: 'Region', tz: 'Time zone', startPage: 'Start page',
  intSub: 'Connect the tools your team already uses. Read-only connectors by default; secrets stay in the vault (Key Vault), never here.',
  all: 'All', connected: 'Connected', available: 'Available', beta: 'Beta', configure: 'Configure', backAll: '← All integrations',
  instance: 'Instance URL', authM: 'Authentication method', secretRef: 'Secret reference (vault)', readOnly: 'Read-only', readOnlyS: 'Recommended. The connector never changes data at the source.',
  allowWrite: 'Allow write', allowWriteS: 'E.g. open a ticket automatically. Requires approval (CAB).', sync: 'Sync', mapping: 'Field mapping',
  test: 'Test connection', save: 'Save', disconnect: 'Disconnect', simOk: 'Simulation complete: no real call was made.',
  providers: 'Identity providers', saml: 'SAML 2.0', oidc: 'OpenID Connect', scim: 'SCIM provisioning', scimS: 'Creates and removes users from the IdP',
  mfa: 'Require MFA at the IdP', mfaS: 'Sessions are accepted only when the IdP confirms MFA', session: 'Session lifetime', roles: 'Roles & permissions',
  channels: 'Channels', rules: 'Alert rules', quiet: 'Quiet hours', retention: 'Data retention', mask: 'Mask personal data', maskS: 'Name and e-mail visible to Admin only',
  export: 'Export settings (JSON)', audit: 'Audit trail (this session)', apiBase: 'API base URL', keys: 'API keys', hooks: 'Outgoing webhooks', addHook: '+ Add webhook',
  version: 'Version', license: 'License', author: 'Author', repo: 'Source code', roadmap: 'What’s next',
  faqSub: 'Short answers to the most common questions.', faqSearch: 'Search the questions…', logSub: 'How both products evolved, release by release.',
  both: 'Suite', when: 'When', who: 'Who', what: 'What'
 }
};

var CATS = { itsm: L3('ITSM', 'ITSM', 'ITSM'), mon: L3('Monitoramento', 'Monitoreo', 'Monitoring'), comm: L3('Comunicação', 'Comunicación', 'Communication'),
  cloud: L3('Cloud & identidade', 'Cloud e identidad', 'Cloud & identity'), net: L3('Rede & segurança', 'Red y seguridad', 'Network & security'), auto: L3('Automação', 'Automatización', 'Automation') };

/* [id, name, cat, color, short, desc, products, defaultStatus, placeholderUrl] */
var INT = [
 ['servicenow', 'ServiceNow ITSM', 'itsm', '#62D84E', 'SN', L3('Incidentes, requisições, mudanças e CMDB via Table API.', 'Incidentes, solicitudes, cambios y CMDB vía Table API.', 'Incidents, requests, changes and CMDB via Table API.'), 'both', 'available', 'https://contoso.service-now.example'],
 ['jsm', 'Jira Service Management', 'itsm', '#2684FF', 'JS', L3('Filas, SLAs e projetos sincronizados com o quadro.', 'Colas, SLAs y proyectos sincronizados con el tablero.', 'Queues, SLAs and projects synced with the board.'), 'both', 'available', 'https://contoso.atlassian.example'],
 ['sdp', 'ManageEngine ServiceDesk Plus', 'itsm', '#E8462B', 'SD', L3('Filas L1/L2/L3, tempos e categorias (já usado na v1).', 'Colas L1/L2/L3, tiempos y categorías (usado en la v1).', 'L1/L2/L3 queues, timings and categories (used since v1).'), 'both', 'connected', 'https://servicedesk.contoso.example'],
 ['freshservice', 'Freshservice', 'itsm', '#2B6FEB', 'FS', L3('Tickets de MSP e parceiros externos.', 'Tickets de MSP y socios externos.', 'Tickets from MSPs and outside partners.'), 'both', 'available', 'https://contoso.freshservice.example'],
 ['zabbix', 'Zabbix', 'mon', '#D40000', 'ZB', L3('Triggers e disponibilidade por host, cruzados com o inventário.', 'Triggers y disponibilidad por host, cruzados con el inventario.', 'Triggers and per-host availability, matched to the inventory.'), 'both', 'connected', 'https://zabbix.contoso.example'],
 ['prtg', 'PRTG Network Monitor', 'mon', '#00A2E0', 'PR', L3('Sensores de link, banda e latência por site.', 'Sensores de enlace, ancho de banda y latencia por sitio.', 'Link, bandwidth and latency sensors per site.'), 'knoc', 'available', 'https://prtg.contoso.example'],
 ['datadog', 'Datadog', 'mon', '#632CA6', 'DD', L3('Métricas e eventos de cloud e aplicações.', 'Métricas y eventos de cloud y aplicaciones.', 'Cloud and application metrics and events.'), 'both', 'available', 'https://api.datadoghq.example'],
 ['grafana', 'Grafana', 'mon', '#F46800', 'GF', L3('Painéis embutidos por site e por link WAN.', 'Paneles embebidos por sitio y enlace WAN.', 'Embedded dashboards per site and WAN link.'), 'knoc', 'available', 'https://grafana.contoso.example'],
 ['sentinel', 'Microsoft Sentinel', 'mon', '#0078D4', 'MS', L3('Incidentes de segurança e saúde dos conectores (AMA/DCR).', 'Incidentes de seguridad y salud de conectores (AMA/DCR).', 'Security incidents and connector health (AMA/DCR).'), 'both', 'available', 'https://portal.azure.com'],
 ['teams', 'Microsoft Teams', 'comm', '#5B5FC7', 'MT', L3('Post diário no canal e leitura das notas da Daily.', 'Post diario en el canal y lectura de notas de la Daily.', 'Daily channel post and Daily meeting notes.'), 'both', 'connected', 'https://teams.microsoft.com'],
 ['slack', 'Slack', 'comm', '#4A154B', 'SL', L3('Alertas e resumo diário em canais.', 'Alertas y resumen diario en canales.', 'Alerts and daily digest in channels.'), 'both', 'available', 'https://contoso.slack.example'],
 ['graph', 'Microsoft 365 (Graph)', 'comm', '#D83B01', 'M3', L3('E-mail, agenda e Service Health, somente leitura.', 'Correo, agenda y Service Health, solo lectura.', 'Mail, calendar and Service Health, read-only.'), 'backlog', 'connected', 'https://graph.microsoft.com'],
 ['pagerduty', 'PagerDuty', 'comm', '#06AC38', 'PD', L3('Escala de plantão e acionamento de P0.', 'Guardias y escalamiento de P0.', 'On-call schedules and P0 paging.'), 'both', 'available', 'https://contoso.pagerduty.example'],
 ['opsgenie', 'Opsgenie', 'comm', '#2684FF', 'OG', L3('Alternativa de plantão integrada ao Jira.', 'Alternativa de guardias integrada a Jira.', 'On-call alternative integrated with Jira.'), 'both', 'beta', 'https://api.opsgenie.example'],
 ['azure', 'Azure Resource Graph', 'cloud', '#0078D4', 'AZ', L3('Inventário de VMs, VNets e Arc com identidade gerenciada.', 'Inventario de VMs, VNets y Arc con identidad administrada.', 'VM, VNet and Arc inventory via managed identity.'), 'knoc', 'available', 'https://management.azure.com'],
 ['entra', 'Microsoft Entra ID', 'cloud', '#0067B8', 'EN', L3('Usuários, grupos e Conditional Access para o SSO.', 'Usuarios, grupos y Conditional Access para el SSO.', 'Users, groups and Conditional Access for SSO.'), 'both', 'connected', 'https://login.microsoftonline.com'],
 ['intune', 'Microsoft Intune', 'cloud', '#00A4EF', 'IN', L3('Conformidade de dispositivos por país.', 'Cumplimiento de dispositivos por país.', 'Device compliance by country.'), 'knoc', 'available', 'https://graph.microsoft.com'],
 ['aws', 'AWS (Config / EC2)', 'cloud', '#FF9900', 'AW', L3('Inventário multi-cloud para quem tem AWS.', 'Inventario multicloud para quien usa AWS.', 'Multi-cloud inventory for AWS shops.'), 'knoc', 'beta', 'https://config.aws.example'],
 ['fortigate', 'FortiGate REST API', 'net', '#EE3124', 'FG', L3('Interfaces, SD-WAN SLA e túneis VPN, token somente leitura.', 'Interfaces, SLA SD-WAN y túneles VPN, token de solo lectura.', 'Interfaces, SD-WAN SLA and VPN tunnels, read-only token.'), 'knoc', 'available', 'https://fw-br-sp-01.contoso.example'],
 ['fortimanager', 'FortiManager', 'net', '#C8102E', 'FM', L3('Políticas e firmware de todos os FortiGates.', 'Políticas y firmware de todos los FortiGate.', 'Policies and firmware across all FortiGates.'), 'knoc', 'available', 'https://fmg.contoso.example'],
 ['meraki', 'Cisco Meraki Dashboard', 'net', '#00A86B', 'CM', L3('Sites Meraki lado a lado com Fortinet.', 'Sitios Meraki junto a Fortinet.', 'Meraki sites side by side with Fortinet.'), 'knoc', 'beta', 'https://api.meraki.example'],
 ['panorama', 'Palo Alto Panorama', 'net', '#FA582D', 'PA', L3('Inventário e políticas para ambientes Palo Alto.', 'Inventario y políticas para entornos Palo Alto.', 'Inventory and policies for Palo Alto estates.'), 'knoc', 'beta', 'https://panorama.contoso.example'],
 ['audiocodes', 'AudioCodes SBC', 'net', '#00467F', 'AC', L3('Proxy sets, chamadas ativas e alarmes do SBC.', 'Proxy sets, llamadas activas y alarmas del SBC.', 'Proxy sets, active calls and SBC alarms.'), 'knoc', 'available', 'https://sbc.contoso.example'],
 ['webhook', 'Webhooks', 'auto', '#334155', 'WH', L3('Envie eventos para qualquer sistema.', 'Envía eventos a cualquier sistema.', 'Send events to any system.'), 'both', 'available', 'https://hooks.contoso.example'],
 ['powerautomate', 'Power Automate', 'auto', '#0066FF', 'PW', L3('Fluxos de aprovação e notificações no M365.', 'Flujos de aprobación y notificaciones en M365.', 'Approval flows and notifications in M365.'), 'both', 'available', 'https://make.powerautomate.example'],
 ['n8n', 'n8n', 'auto', '#EA4B71', 'n8', L3('Automação self-hosted sem lock-in.', 'Automatización self-hosted sin lock-in.', 'Self-hosted automation, no lock-in.'), 'both', 'beta', 'https://n8n.contoso.example']
];

var MAP = {
 itsm: [['Prioridade', 'priority'], ['Status', 'state'], ['Grupo', 'assignment_group'], ['Categoria', 'category']],
 mon: [['Ativo', 'host.name'], ['Severidade', 'trigger.severity'], ['Site', 'host.group']],
 comm: [['Canal', 'channel.id'], ['Resumo', 'message.body']],
 cloud: [['Recurso', 'resource.id'], ['Tag de site', 'tags.site']],
 net: [['Hostname', 'hostname'], ['Interface', 'intf.name'], ['Status do link', 'sla.state']],
 auto: [['Evento', 'event.type'], ['Payload', 'body']]
};

var FAQ = {
 suite: [
  [L3('Os dados são reais?', '¿Los datos son reales?', 'Is the data real?'), L3('Não. Empresa, pessoas, IPs, chamados e números são fictícios (Contoso LATAM). Os IPs públicos vêm das faixas de documentação RFC 5737.', 'No. Empresa, personas, IPs, tickets y números son ficticios (Contoso LATAM). Las IPs públicas vienen de los rangos de documentación RFC 5737.', 'No. Company, people, IPs, tickets and numbers are fictional (Contoso LATAM). Public IPs come from the RFC 5737 documentation ranges.')],
  [L3('O login é de verdade?', '¿El inicio de sesión es real?', 'Is the sign-in real?'), L3('Na demo, não: os botões simulam o fluxo e nenhuma senha é pedida. Em produção, o SSO usa OIDC/SAML com o seu IdP (Entra ID, Okta, Google) e MFA exigido no próprio IdP.', 'En la demo, no: los botones simulan el flujo y no se pide contraseña. En producción, el SSO usa OIDC/SAML con tu IdP (Entra ID, Okta, Google) y MFA exigido en el IdP.', 'Not in the demo: the buttons simulate the flow and no password is asked. In production SSO uses OIDC/SAML with your IdP (Entra ID, Okta, Google) and MFA enforced at the IdP.')],
  [L3('Funciona com ServiceNow, Jira e outras ferramentas?', '¿Funciona con ServiceNow, Jira y otras?', 'Does it work with ServiceNow, Jira and others?'), L3('O modelo de conectores foi desenhado para isso: ITSM, monitoramento, comunicação, cloud e rede. Veja Configurações → Integrações. Todos começam somente leitura.', 'El modelo de conectores fue diseñado para eso: ITSM, monitoreo, comunicación, cloud y red. Ver Configuración → Integraciones. Todos empiezan en solo lectura.', 'The connector model was designed for it: ITSM, monitoring, comms, cloud and network. See Settings → Integrations. All start read-only.')],
  [L3('Onde ficam os segredos (tokens, chaves)?', '¿Dónde quedan los secretos?', 'Where do secrets live?'), L3('Nunca na ferramenta. A configuração guarda só a referência do segredo no cofre (ex.: Azure Key Vault) e o conector lê com identidade gerenciada.', 'Nunca en la herramienta. Solo se guarda la referencia al secreto en el vault (ej.: Azure Key Vault) y el conector lo lee con identidad administrada.', 'Never in the tool. Settings keep only a reference to the secret in the vault (e.g. Azure Key Vault) and the connector reads it with a managed identity.')],
  [L3('Funciona no celular?', '¿Funciona en el celular?', 'Does it work on mobile?'), L3('Sim. A v2 é responsiva: menu lateral vira gaveta, mapa e topologia se ajustam à tela e as janelas viram painéis de baixo para cima.', 'Sí. La v2 es responsiva: el menú lateral se vuelve cajón, mapa y topología se ajustan y las ventanas se vuelven paneles inferiores.', 'Yes. v2 is responsive: the side menu becomes a drawer, map and topology fit the screen and dialogs become bottom sheets.')]
 ],
 knoc: [
  [L3('O que é o KNOC?', '¿Qué es KNOC?', 'What is KNOC?'), L3('Um console de NOC numa tela: mapa, topologia, inventário, telefonia, parceiros e playbooks de troubleshooting para uma operação multi-país.', 'Una consola de NOC en una pantalla: mapa, topología, inventario, telefonía, socios y playbooks para una operación multipaís.', 'A one-screen NOC console: map, topology, inventory, telephony, partners and troubleshooting playbooks for a multi-country operation.')],
  [L3('De onde vem o status online/fora?', '¿De dónde viene el estado?', 'Where does online/down status come from?'), L3('Do KNOC Sweep, um agente PowerShell que roda dentro da rede e publica só up/down/latência. O navegador não alcança IP interno sozinho.', 'Del KNOC Sweep, un agente PowerShell que corre dentro de la red y publica solo up/down/latencia.', 'From the KNOC Sweep, a PowerShell agent inside the network that publishes only up/down/latency. Browsers can’t reach private IPs.')],
  [L3('Como uso o troubleshooting?', '¿Cómo uso el troubleshooting?', 'How do I use troubleshooting?'), L3('Escolha o sintoma, preencha host/IP uma vez e siga as camadas na ordem: Rede → Firewall → DNS → DHCP → VPN → Azure → M365 → Servidor → Aplicação → Endpoint. Os comandos saem prontos para copiar.', 'Elige el síntoma, completa host/IP una vez y sigue las capas en orden. Los comandos salen listos para copiar.', 'Pick the symptom, fill host/IP once and walk the layers in order: Network → Firewall → DNS → DHCP → VPN → Azure → M365 → Server → App → Endpoint. Commands come ready to copy.')],
  [L3('Posso exportar a topologia?', '¿Puedo exportar la topología?', 'Can I export the topology?'), L3('Sim: "Exportar SVG" na barra da topologia gera um arquivo vetorial para Visio, draw.io ou documentação.', 'Sí: "Exportar SVG" genera un archivo vectorial para Visio, draw.io o documentación.', 'Yes: "Export SVG" on the topology toolbar creates a vector file for Visio, draw.io or docs.')],
  [L3('Atalhos de teclado?', '¿Atajos de teclado?', 'Keyboard shortcuts?'), L3('/ busca ativos · ⌘K ou Ctrl+K abre comandos · Esc fecha janelas e volta o mapa para a visão completa.', '/ busca activos · ⌘K o Ctrl+K abre comandos · Esc cierra ventanas.', '/ searches assets · ⌘K or Ctrl+K opens commands · Esc closes dialogs and resets the map.')]
 ],
 backlog: [
  [L3('O que é o Infra Backlog?', '¿Qué es Infra Backlog?', 'What is Infra Backlog?'), L3('Um painel que o time nunca preenche: uma tarefa agendada lê e-mail, Teams, a Daily e o ServiceDesk e republica as prioridades com evidência.', 'Un panel que el equipo nunca completa: una tarea programada lee correo, Teams, la Daily y el ServiceDesk y republica las prioridades con evidencia.', 'A board the team never fills in: a scheduled task reads e-mail, Teams, the Daily and the ServiceDesk and republishes priorities with evidence.')],
  [L3('O que significam FATO, PROVÁVEL e HIPÓTESE?', '¿Qué significan HECHO, PROBABLE e HIPÓTESIS?', 'What do FACT, PROBABLE and HYPOTHESIS mean?'), L3('FATO veio de uma fonte nesta execução, com remetente e hora. PROVÁVEL é padrão conhecido, a confirmar. HIPÓTESE é inferência que precisa de validação.', 'HECHO vino de una fuente en esta ejecución. PROBABLE es un patrón conocido, a confirmar. HIPÓTESIS necesita validación.', 'FACT came from a source in this run, with sender and time. PROBABLE is a known pattern to confirm. HYPOTHESIS is an inference that needs validation.')],
  [L3('Com que frequência atualiza?', '¿Con qué frecuencia se actualiza?', 'How often does it update?'), L3('Por padrão em dias úteis às 07:30 e depois da Daily (11:15). Ajuste em Configurações → Geral.', 'Por defecto días hábiles a las 07:30 y después de la Daily (11:15).', 'By default on weekdays at 07:30 and after the Daily (11:15). Change it in Settings → General.')],
  [L3('Como exporto um relatório?', '¿Cómo exporto un reporte?', 'How do I export a report?'), L3('Em Relatórios, escolha fonte, período e pessoas e exporte em XLSX, CSV, JSON, Markdown ou HTML.', 'En Reportes, elige fuente, período y personas y exporta en XLSX, CSV, JSON, Markdown o HTML.', 'In Reports, pick source, period and people, then export to XLSX, CSV, JSON, Markdown or HTML.')],
  [L3('Por que medir idade da fila e não só o total?', '¿Por qué medir la antigüedad y no solo el total?', 'Why measure queue age, not just the total?'), L3('Porque a fila pode encolher enquanto os vencidos sobem. Isso é envelhecimento, e só aparece com mediana de idade e vencidos lado a lado.', 'Porque la cola puede bajar mientras los vencidos suben. Eso es envejecimiento.', 'Because the queue can shrink while overdue items rise. That is ageing, and it only shows with median age and overdue side by side.')]
 ]
};

/* changelog — [product, version, date, title L3, bullets L3[]] */
var LOG = [
 ['both', '2.0', '2026-10-06', L3('Suite v2: redesign do portal', 'Suite v2: rediseño del portal', 'Suite v2: portal redesign'),
  [L3('Novo design system claro/escuro com acentos por produto', 'Nuevo design system claro/oscuro con acentos por producto', 'New light/dark design system with product accents'),
   L3('Responsivo de verdade: gaveta no mobile, mapa e topologia ocupam a tela', 'Responsivo de verdad: cajón en móvil, mapa y topología ocupan la pantalla', 'Truly responsive: mobile drawer, map and topology fill the screen'),
   L3('Login demo com SSO (OIDC/SAML) e provedores sociais simulados', 'Login demo con SSO (OIDC/SAML) y proveedores sociales simulados', 'Demo sign-in with SSO (OIDC/SAML) and simulated social providers'),
   L3('Configurações com 26 integrações (ServiceNow, Jira, Zabbix, Teams, FortiGate…)', 'Configuración con 26 integraciones (ServiceNow, Jira, Zabbix, Teams, FortiGate…)', 'Settings with 26 integrations (ServiceNow, Jira, Zabbix, Teams, FortiGate…)'),
   L3('Paleta de comandos ⌘K, FAQ, diário de bordo e tour de 60 s nos dois produtos', 'Paleta de comandos ⌘K, FAQ, bitácora y tour de 60 s en ambos', '⌘K command palette, FAQ, changelog and 60-second tour in both products')]],
 ['both', '1.1', '2026-10-05', L3('Demo pública no GitHub', 'Demo pública en GitHub', 'Public demo on GitHub'),
  [L3('Dados trocados por uma empresa fictícia (Contoso LATAM)', 'Datos reemplazados por una empresa ficticia (Contoso LATAM)', 'Data replaced by a fictional company (Contoso LATAM)'),
   L3('Varredura de vazamento (gitleaks) em cada push', 'Escaneo de fugas (gitleaks) en cada push', 'Leak scanning (gitleaks) on every push'),
   L3('READMEs com GIF, vídeo e cards de link (Open Graph)', 'READMEs con GIF, video y tarjetas de enlace (Open Graph)', 'READMEs with GIF, video and link cards (Open Graph)')]],
 ['knoc', '1.0', '2026-10', L3('KNOC Sweep e base compartilhada', 'KNOC Sweep y base compartida', 'KNOC Sweep and shared database'),
  [L3('Agente PowerShell publica up/down/latência de dentro da rede', 'Agente PowerShell publica up/down/latencia desde la red', 'PowerShell agent publishes up/down/latency from inside the network'),
   L3('Bloqueio de segredos no formulário e cópia embutida somente leitura', 'Bloqueo de secretos en el formulario y copia embebida de solo lectura', 'Secret blocking in forms and a read-only embedded snapshot')]],
 ['backlog', '10', '2026-10', L3('Assistente, compartilhar e tour guiado', 'Asistente, compartir y tour guiado', 'Assistant, sharing and guided tour'),
  [L3('Perguntas em linguagem natural sobre o quadro', 'Preguntas en lenguaje natural sobre el tablero', 'Natural-language questions over the board'),
   L3('Texto pronto para Teams e e-mail', 'Texto listo para Teams y correo', 'Ready-made text for Teams and e-mail')]],
 ['knoc', '0.9', '2026-09', L3('Telefonia: Teams → SBC → carrier → país', 'Telefonía: Teams → SBC → carrier → país', 'Telephony: Teams → SBC → carrier → country'),
  [L3('Mapa de chamadas, números, URAs e troncos SIP', 'Mapa de llamadas, números, IVR y troncales SIP', 'Call map, numbers, IVRs and SIP trunks')]],
 ['backlog', '8–9', '2026-09', L3('Capacidade e método de trabalho', 'Capacidad y método de trabajo', 'Capacity and way of working'),
  [L3('Simulador de foco, mix de demanda e fluxo de mudança (mini-CAB)', 'Simulador de foco, mix de demanda y flujo de cambio (mini-CAB)', 'Focus simulator, demand mix and change flow (mini-CAB)')]],
 ['knoc', '0.6–0.8', '2026-09', L3('Topologia e troubleshooting por camada', 'Topología y troubleshooting por capa', 'Topology and layer-by-layer troubleshooting'),
  [L3('Visão hierárquica e grafo, exportação SVG', 'Vista jerárquica y grafo, exportación SVG', 'Hierarchical and graph views, SVG export'),
   L3('13 camadas com comandos prontos (PowerShell, FortiOS, Graph)', '13 capas con comandos listos', '13 layers with ready commands (PowerShell, FortiOS, Graph)')]],
 ['backlog', '6–7', '2026-09', L3('Daily automática', 'Daily automática', 'Automatic Daily'),
  [L3('Leitura das notas do Facilitator e detecção de tema repetido sem dono', 'Lectura de notas del Facilitator y detección de temas repetidos sin dueño', 'Reads Facilitator notes and flags repeated ownerless topics')]],
 ['backlog', '4–5', '2026-09', L3('Fila do ServiceDesk ao vivo e relatórios', 'Cola del ServiceDesk en vivo y reportes', 'Live ServiceDesk queue and reports'),
  [L3('KPIs clicáveis, placar por analista e exportações', 'KPIs clicables, marcador por analista y exportaciones', 'Clickable KPIs, per-analyst scoreboard and exports')]],
 ['knoc', '0.1–0.5', '2026-09', L3('Do inventário em planilha ao mapa LATAM', 'Del inventario en planilla al mapa LATAM', 'From spreadsheet inventory to the LATAM map'),
  [L3('Inventário com rótulo de confiança e mapa por país', 'Inventario con etiqueta de confianza y mapa por país', 'Inventory with confidence labels and per-country map')]],
 ['backlog', '1–3', '2026-09', L3('Backlog único com evidência', 'Backlog único con evidencia', 'Single backlog with evidence'),
  [L3('E-mail e Teams viram itens com fonte, hora e rótulo de confiança', 'Correo y Teams se vuelven ítems con fuente, hora y etiqueta', 'E-mail and Teams become items with source, time and confidence label')]]
];

window.PF_CONTENT = { UI: UI, CATS: CATS, INT: INT, MAP: MAP, FAQ: FAQ, LOG: LOG, L3: L3 };
})();
