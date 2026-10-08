/*!
 * Orbiscale Flow · team work board (module of Orbiscale)
 * Copyright (C) 2026 Ernesto Athaualpa Rojas (Neto). All rights reserved except as granted below.
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * Commercial licence (no AGPL obligations, enterprise modules, support): see COMMERCIAL.md
 */
/* ============================================================================
   Método — como a Infra LATAM trabalha hoje × como deveria trabalhar.
   Diagnóstico com evidência, semana-padrão, simulador de foco, fluxo de
   mudança (CAB), gestão de crise e modo aula. Só números agregados.
   ========================================================================= */
(function(){
'use strict';
function Lg(){return (window.BL&&BL.L())||'pt'}
function P(o){return o&&(o[Lg()]||o.pt)||''}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function nf(v,d){return Number(v).toLocaleString(Lg()==='en'?'en-US':Lg()==='es'?'es-ES':'pt-BR',{maximumFractionDigits:d==null?1:d})}
function ls(k,v){try{return v===undefined?localStorage.getItem(k):localStorage.setItem(k,v)}catch(e){return null}}
function live(){var S=(typeof SDP!=='undefined'&&SDP)||{},B=(S.l2&&S.l2.byOwner)||{},o=0,p=0;for(var k in B){o+=B[k].overdue||0;p+=B[k].paused||0}
  return {open:(S.l2&&S.l2.total)||0,ov:o,pa:p,inn:S.perf&&S.perf.l2.totals.in,done:S.perf&&S.perf.l2.totals.done}}

/* ---------- evidência coletada em 01/10 (somente leitura) ---------- */
var EV={changes:18,lastChange:'03/08/2026',lastTenRequested:8,lastTenCompleted:1,problems:1,cabEvents:0,fronts:35,team:9,noisePct:29,catPct:24,specPct:10,dailyNoOwner:'4/5',freeH:2.5};

/* ---------- textos de interface ---------- */
var TX={
pt:{title:'Método — como trabalhar de verdade',sub:'Hoje cada tema anda do jeito que dá. Esta aba mostra, com número, a diferença entre o jeito atual e um método simples de TI: separar o tipo de trabalho, dar um ritual para cada um, e medir.',
 how:'📖 Como ler',tags:{fato:'FATO',prov:'PROVÁVEL',hip:'HIPÓTESE'},
 s0:'O modelo em uma figura',s0x:'Todo pedido entra por um lugar só e é separado em cinco tipos. Cada tipo tem um dono, um ritual e uma régua.',
 l0:'Leia da esquerda para a direita. A <b>entrada</b> é única (SDP). A <b>triagem</b> decide o tipo. Cada caixa colorida é um tipo de trabalho com seu <b>ritual</b> (quando se olha) e sua <b>régua</b> (como se mede).',
 s1:'Diagnóstico — onde estamos',s1x:'Nota de 0 a 5 por processo. Barra cinza = hoje. Ponto = meta em 90 dias. Clique numa linha para ver a evidência e o primeiro passo.',
 l1:'<b>0</b> não existe · <b>1</b> informal, depende de uma pessoa · <b>2</b> definido, mas ninguém segue · <b>3</b> definido e seguido · <b>4</b> medido · <b>5</b> melhorado com os números. A nota de hoje é avaliação sobre a evidência mostrada — [PROVÁVEL], não medição.',
 now:'hoje',goal:'meta 90 dias',evid:'Evidência',first:'Primeiro passo',
 s2:'A semana-padrão',s2x:'Os rituais que fazem o método funcionar. Nenhum dura mais de uma hora. Alterne entre a semana de planejamento e a de entrega.',
 l2:'Cada cartão é um ritual: <b>quando</b>, <b>quanto tempo</b>, <b>quem</b> e <b>o que sai dele</b>. Cor = tipo de trabalho, a mesma da figura acima.',
 wA:'Semana 1 · planejar',wB:'Semana 2 · entregar',days:['Seg','Ter','Qua','Qui','Sex'],
 s3:'Simulador — por que menos frentes entrega mais',s3x:'Quanto mais temas uma pessoa toca ao mesmo tempo, mais tempo se perde trocando de contexto. Mexa e veja quanto tempo de projeto sobra.',
 l3:'Barra <b>cinza</b> = hoje. Barra <b>azul</b> = com o método. O número grande é quantas semanas leva um projeto de 80 h. A perda por troca de contexto segue a regra de Gerald Weinberg (1992): 2 temas = 20% perdido, 3 = 40%, 4 = 60%, 5 = 75% — é [HIPÓTESE] de ordem de grandeza, não medição da Contoso.',
 lvP:'Pessoas no time',lvPr:'Parte do tempo para projetos',lvW:'Temas ao mesmo tempo por pessoa — hoje',lvW2:'— com o método',
 rH:'h úteis de projeto por semana',rW:'semanas para um projeto de 80 h',rL:'h perdidas por semana trocando de contexto',
 s4:'Uma mudança, do pedido ao fechamento (CAB)',s4x:'Escolha um exemplo real e veja o caminho que ele percorre. Mudança padrão não vai ao CAB; normal vai; emergencial tem caminho curto e revisão depois.',
 l4:'Cada caixa é uma etapa. As <b>acesas</b> são as que o exemplo escolhido percorre. Embaixo, o que é obrigatório em cada etapa para valer como evidência SOX/GxP.',
 s5:'Gestão de crise — os primeiros 60 minutos',s5x:'Quando algo grande cai, o problema raramente é técnico: é ninguém saber quem decide e quem avisa. Quatro papéis e um relógio resolvem isso.',
 l5:'Escolha a <b>severidade</b>. Ela define quem é chamado, em quanto tempo, e de quanto em quanto tempo se comunica.',
 s6:'Hoje × com o método',s6x:'A mesma situação, nos dois jeitos de trabalhar.',
 s7:'Modo aula',s7x:'Roteiro para dar a aula ao time em 20 minutos. Use as setas. Cada tela tem a mensagem, um exemplo nosso e uma pergunta para o time.',
 prev:'← anterior',next:'próxima →',q:'Pergunta para o time',ex:'Exemplo nosso',of:'de',
 sev:'Severidade',roles:'Papéis',clock:'Relógio',comm:'Mensagem pronta'},
es:{title:'Método — cómo trabajar de verdad',sub:'Hoy cada tema avanza como puede. Esta pestaña muestra, con números, la diferencia entre el modo actual y un método simple de TI: separar el tipo de trabajo, darle un ritual a cada uno, y medir.',
 how:'📖 Cómo leer',tags:{fato:'HECHO',prov:'PROBABLE',hip:'HIPÓTESIS'},
 s0:'El modelo en una figura',s0x:'Todo pedido entra por un solo lugar y se separa en cinco tipos. Cada tipo tiene dueño, ritual y regla.',
 l0:'Lee de izquierda a derecha. La <b>entrada</b> es única (SDP). El <b>triage</b> decide el tipo. Cada caja de color es un tipo de trabajo con su <b>ritual</b> (cuándo se mira) y su <b>regla</b> (cómo se mide).',
 s1:'Diagnóstico — dónde estamos',s1x:'Nota de 0 a 5 por proceso. Barra gris = hoy. Punto = meta a 90 días. Haz clic en una fila para ver la evidencia y el primer paso.',
 l1:'<b>0</b> no existe · <b>1</b> informal, depende de una persona · <b>2</b> definido, pero nadie lo sigue · <b>3</b> definido y seguido · <b>4</b> medido · <b>5</b> mejorado con los números. La nota de hoy es juicio sobre la evidencia — [PROBABLE].',
 now:'hoy',goal:'meta 90 días',evid:'Evidencia',first:'Primer paso',
 s2:'La semana estándar',s2x:'Los rituales que hacen funcionar el método. Ninguno dura más de una hora. Alterna entre la semana de planificar y la de entregar.',
 l2:'Cada tarjeta es un ritual: <b>cuándo</b>, <b>cuánto</b>, <b>quién</b> y <b>qué sale</b>. Color = tipo de trabajo.',
 wA:'Semana 1 · planificar',wB:'Semana 2 · entregar',days:['Lun','Mar','Mié','Jue','Vie'],
 s3:'Simulador — por qué menos frentes entrega más',s3x:'Cuantos más temas toca una persona a la vez, más tiempo pierde cambiando de contexto.',
 l3:'Barra <b>gris</b> = hoy. Barra <b>azul</b> = con el método. El número grande son las semanas para un proyecto de 80 h. La pérdida sigue la regla de Gerald Weinberg (1992): 2 temas = 20%, 3 = 40%, 4 = 60%, 5 = 75% — [HIPÓTESIS] de orden de magnitud.',
 lvP:'Personas en el equipo',lvPr:'Parte del tiempo para proyectos',lvW:'Temas a la vez por persona — hoy',lvW2:'— con el método',
 rH:'h útiles de proyecto por semana',rW:'semanas para un proyecto de 80 h',rL:'h perdidas por semana cambiando de contexto',
 s4:'Un cambio, del pedido al cierre (CAB)',s4x:'Elige un ejemplo real y mira el camino. El cambio estándar no va al CAB; el normal sí; el de emergencia tiene camino corto y revisión después.',
 l4:'Cada caja es una etapa. Las <b>encendidas</b> son las que recorre el ejemplo. Abajo, lo obligatorio en cada etapa para valer como evidencia SOX/GxP.',
 s5:'Gestión de crisis — los primeros 60 minutos',s5x:'Cuando algo grande cae, el problema rara vez es técnico: es que nadie sabe quién decide y quién avisa.',
 l5:'Elige la <b>severidad</b>. Define a quién se llama, en cuánto tiempo, y cada cuánto se comunica.',
 s6:'Hoy × con el método',s6x:'La misma situación, en los dos modos de trabajar.',
 s7:'Modo clase',s7x:'Guion para dar la clase al equipo en 20 minutos. Cada pantalla tiene el mensaje, un ejemplo nuestro y una pregunta.',
 prev:'← anterior',next:'siguiente →',q:'Pregunta para el equipo',ex:'Ejemplo nuestro',of:'de',
 sev:'Severidad',roles:'Roles',clock:'Reloj',comm:'Mensaje listo'},
en:{title:'Method — how to really work',sub:'Today each topic moves however it can. This tab shows, in numbers, the gap between the current way and a simple IT method: separate the type of work, give each one a ritual, and measure.',
 how:'📖 How to read',tags:{fato:'FACT',prov:'PROBABLE',hip:'HYPOTHESIS'},
 s0:'The model in one picture',s0x:'Every request comes in through one door and is split into five types. Each type has an owner, a ritual and a measure.',
 l0:'Read left to right. <b>Intake</b> is single (SDP). <b>Triage</b> picks the type. Each coloured box is a type of work with its <b>ritual</b> and its <b>measure</b>.',
 s1:'Diagnosis — where we are',s1x:'Score 0–5 per process. Grey bar = today. Dot = 90-day target. Click a row for evidence and the first step.',
 l1:'<b>0</b> none · <b>1</b> informal · <b>2</b> defined, not followed · <b>3</b> defined and followed · <b>4</b> measured · <b>5</b> improved with data. Today’s score is judgement on the evidence — [PROBABLE].',
 now:'today',goal:'90-day target',evid:'Evidence',first:'First step',
 s2:'The standard week',s2x:'The rituals that make the method work. None lasts over an hour.',
 l2:'Each card is a ritual: <b>when</b>, <b>how long</b>, <b>who</b> and <b>output</b>. Colour = type of work.',
 wA:'Week 1 · plan',wB:'Week 2 · deliver',days:['Mon','Tue','Wed','Thu','Fri'],
 s3:'Simulator — why fewer fronts deliver more',s3x:'The more topics one person juggles, the more time is lost switching context.',
 l3:'<b>Grey</b> = today. <b>Blue</b> = with the method. The big number is weeks for an 80 h project. Loss follows Gerald Weinberg’s rule (1992): 2 topics = 20%, 3 = 40%, 4 = 60%, 5 = 75% — an order-of-magnitude [HYPOTHESIS].',
 lvP:'People on the team',lvPr:'Share of time for projects',lvW:'Topics at once per person — today',lvW2:'— with the method',
 rH:'useful project h per week',rW:'weeks for an 80 h project',rL:'h lost per week to context switching',
 s4:'A change, from request to close (CAB)',s4x:'Pick a real example and see its path. Standard changes skip CAB; normal ones go; emergency ones take the short path and get reviewed after.',
 l4:'Each box is a step. <b>Lit</b> boxes are the ones the example goes through. Below, what each step needs to count as SOX/GxP evidence.',
 s5:'Crisis management — the first 60 minutes',s5x:'When something big goes down, the problem is rarely technical: nobody knows who decides and who informs.',
 l5:'Pick the <b>severity</b>. It sets who is called, how fast, and how often to communicate.',
 s6:'Today × with the method',s6x:'The same situation, both ways of working.',
 s7:'Lesson mode',s7x:'A 20-minute script for teaching the team. Each screen has the message, one of our examples and a question.',
 prev:'← previous',next:'next →',q:'Question for the team',ex:'Our example',of:'of',
 sev:'Severity',roles:'Roles',clock:'Clock',comm:'Ready message'}};
function t(k){return (TX[Lg()]||TX.pt)[k]}

/* ---------- tipos de trabalho ---------- */
var TYPES=[
 {k:'inc',c:'var(--cp1)',n:{pt:'Incidente',es:'Incidente',en:'Incident'},d:{pt:'Algo parou ou piorou',es:'Algo se detuvo o empeoró',en:'Something stopped or degraded'},r:{pt:'Kanban diário + plantonista',es:'Kanban diario + guardia',en:'Daily kanban + on-duty'},m:{pt:'% no prazo · vencidos',es:'% en plazo · vencidos',en:'% on time · overdue'}},
 {k:'req',c:'var(--cp3)',n:{pt:'Requisição',es:'Requerimiento',en:'Request'},d:{pt:'Pedido padrão: acesso, licença, equipamento',es:'Pedido estándar: acceso, licencia, equipo',en:'Standard ask: access, licence, device'},r:{pt:'Catálogo com formulário',es:'Catálogo con formulario',en:'Catalog with a form'},m:{pt:'tempo de atendimento',es:'tiempo de atención',en:'fulfilment time'}},
 {k:'chg',c:'var(--cp2)',n:{pt:'Mudança',es:'Cambio',en:'Change'},d:{pt:'Alterar produção: firewall, servidor, SBC',es:'Alterar producción: firewall, servidor, SBC',en:'Alter production: firewall, server, SBC'},r:{pt:'CAB semanal + janela',es:'CAB semanal + ventana',en:'Weekly CAB + window'},m:{pt:'% com sucesso · rollback',es:'% con éxito · rollback',en:'% successful · rollback'}},
 {k:'prj',c:'var(--cp4)',n:{pt:'Projeto',es:'Proyecto',en:'Project'},d:{pt:'Entrega com prazo: Lab, Sentinel, Data Lake',es:'Entrega con plazo: Lab, Sentinel, Data Lake',en:'Deadline delivery: Lab, Sentinel, Data Lake'},r:{pt:'Sprint de 2 semanas',es:'Sprint de 2 semanas',en:'2-week sprint'},m:{pt:'entregue × prometido',es:'entregado × prometido',en:'delivered × promised'}},
 {k:'prb',c:'var(--v-s3)',n:{pt:'Problema',es:'Problema',en:'Problem'},d:{pt:'Causa de incidentes que voltam',es:'Causa de incidentes que vuelven',en:'Cause of recurring incidents'},r:{pt:'Revisão mensal top 5',es:'Revisión mensual top 5',en:'Monthly top-5 review'},m:{pt:'incidentes repetidos',es:'incidentes repetidos',en:'repeat incidents'}}];
var TC={};TYPES.forEach(function(x){TC[x.k]=x.c});

/* ---------- diagnóstico ---------- */
function DIAG(n){return [
 {k:'req',now:1,goal:3,t:{pt:'Entrada única (todo pedido vira chamado)',es:'Entrada única (todo pedido es ticket)',en:'Single intake (every ask is a ticket)'},
  e:{pt:'[FATO] De 29/09 a 01/10 chegaram pelo menos 9 demandas reais por chat ou e-mail (seção “Demanda que o SDP não vê”), contra 4 chamados reais abertos no SDP para o mesmo analista — os outros 12 eram aviso automático.',es:'[HECHO] Del 29/09 al 01/10 llegaron al menos 9 demandas reales por chat o correo, contra 4 tickets reales en SDP para el mismo analista.',en:'[FACT] From 29/09 to 01/10 at least 9 real demands arrived by chat or email, against 4 real SDP tickets for the same analyst.'},
  f:{pt:'Regra: pedido que chega por chat ou e-mail vira chamado em 1 minuto — quem recebe abre, ou encaminha para o Service Desk.',es:'Regla: pedido por chat o correo se vuelve ticket en 1 minuto — quien lo recibe lo abre o lo reenvía al Service Desk.',en:'Rule: an ask by chat or email becomes a ticket within 1 minute — whoever gets it opens it or forwards it to the Service Desk.'}},
 {k:'inc',now:2,goal:3,t:{pt:'Gestão de incidentes',es:'Gestión de incidentes',en:'Incident management'},
  e:{pt:'[FATO] O SDP existe e tem SLA. Mas hoje são '+n.open+' abertos no L2, '+n.ov+' vencidos e '+n.pa+' com SLA pausado. Não há plantonista: todo mundo é interrompido por tudo.',es:'[HECHO] El SDP existe y tiene SLA. Pero hoy hay '+n.open+' abiertos en L2, '+n.ov+' vencidos y '+n.pa+' con SLA pausado. No hay guardia.',en:'[FACT] SDP exists with SLAs. But today L2 has '+n.open+' open, '+n.ov+' overdue and '+n.pa+' paused. No on-duty person.'},
  f:{pt:'Um plantonista por semana, em rodízio, que faz a triagem e protege o resto do time.',es:'Una guardia por semana, rotativa, que hace triage y protege al resto.',en:'A weekly rotating on-duty person who triages and shields the rest.'}},
 {k:'req',now:1,goal:3,t:{pt:'Requisições e catálogo',es:'Requerimientos y catálogo',en:'Requests and catalog'},
  e:{pt:'[FATO] '+EV.catPct+'% da entrada do L2 em 30 dias foi licença, acesso ou entrada/saída de pessoas — pedidos repetidos sem formulário. Na mesma semana, uma área comprou licenças direto com o fornecedor, sem passar pela TI.',es:'[HECHO] El '+EV.catPct+'% de la entrada de L2 fue licencia, acceso o ingresos/bajas — pedidos repetidos sin formulario. La misma semana, un área compró licencias directo al proveedor, sin pasar por TI.',en:'[FACT] '+EV.catPct+'% of L2 intake was licences, access or joiners/leavers with no form. The same week, a department bought licences straight from the vendor, bypassing IT.'},
  f:{pt:'Cinco formulários no SDP: licença, acesso, novo colaborador, desligamento, equipamento — cada um com aprovação embutida.',es:'Cinco formularios en SDP: licencia, acceso, ingreso, baja, equipo — con aprobación incluida.',en:'Five SDP forms: licence, access, joiner, leaver, device — with built-in approval.'}},
 {k:'chg',now:1,goal:3,t:{pt:'Mudanças e CAB',es:'Cambios y CAB',en:'Change and CAB'},
  e:{pt:'[FATO] O módulo de mudanças do SDP tem '+EV.changes+' registros no total; o último é de '+EV.lastChange+'. Dos 10 mais recentes, '+EV.lastTenRequested+' nunca saíram de "Requested" e só 1 foi concluído. Quase todos são do ERP — nenhum de FortiGate, SBC ou servidor. [FATO] Nenhum evento de CAB ou GMUD na agenda de julho a outubro.',es:'[HECHO] El módulo de cambios del SDP tiene '+EV.changes+' registros en total; el último es del '+EV.lastChange+'. De los 10 más recientes, '+EV.lastTenRequested+' nunca salieron de "Requested". Casi todos son de ERP — ninguno de FortiGate, SBC o servidor. [HECHO] Ningún evento de CAB o GMUD en la agenda de julio a octubre.',en:'[FACT] The SDP change module holds '+EV.changes+' records in total; the latest is from '+EV.lastChange+'. Of the 10 most recent, '+EV.lastTenRequested+' never left "Requested". Almost all are ERP — none for FortiGate, SBC or servers. [FACT] No CAB or GMUD event on the calendar July–October.'},
  f:{pt:'CAB semanal de 30 min e regra: nada muda em produção sem RFC no SDP com risco e rollback.',es:'CAB semanal de 30 min y regla: nada cambia en producción sin RFC en SDP con riesgo y rollback.',en:'A 30-min weekly CAB and a rule: nothing changes in production without an SDP RFC with risk and rollback.'}},
 {k:'prb',now:0,goal:2,t:{pt:'Gestão de problemas',es:'Gestión de problemas',en:'Problem management'},
  e:{pt:'[FATO] O módulo de problemas do SDP tem 1 registro: "prueba problema", de outubro de 2024. [FATO] A causa da falha das linhas do Uruguai veio pelo RCA do fornecedor (seu e-mail de 29/09), não de um registro nosso. [FATO] Os avisos de Service Health se repetem até 5 vezes cada na fila.',es:'[HECHO] El módulo de problemas del SDP tiene 1 registro: "prueba problema", de octubre 2024. [HECHO] La causa de la falla de líneas de Uruguay vino del RCA del proveedor. [HECHO] Los avisos de Service Health se repiten hasta 5 veces.',en:'[FACT] The SDP problem module holds 1 record: "prueba problema", from October 2024. [FACT] The Uruguay line failure cause came from the vendor RCA. [FACT] Service Health notices repeat up to 5 times each.'},
  f:{pt:'Uma vez por mês, pegar os 5 assuntos que mais se repetem e abrir um Problema para cada um.',es:'Una vez al mes, tomar los 5 asuntos que más se repiten y abrir un Problema para cada uno.',en:'Once a month, take the 5 most repeated subjects and open a Problem for each.'}},
 {k:'prj',now:1,goal:3,t:{pt:'Projetos e portfólio',es:'Proyectos y portafolio',en:'Projects and portfolio'},
  e:{pt:'[FATO] '+EV.fronts+' frentes com bloco na agenda para '+EV.team+' pessoas, mediana de 2,5 h de foco por frente no mês. [FATO] '+EV.dailyNoOwner+' das últimas atas da daily fecham pedindo um responsável. [FATO] O módulo de projetos do SDP tem 29 registros, o último criado em 24/08 — e a agenda tem 35 frentes: parte do trabalho real não está lá.',es:'[HECHO] '+EV.fronts+' frentes para '+EV.team+' personas, mediana de 2,5 h de foco por frente al mes. [HECHO] '+EV.dailyNoOwner+' de las últimas actas cierran pidiendo un responsable. [HECHO] El módulo de proyectos del SDP tiene 29 registros, el último del 24/08, contra 35 frentes en la agenda.',en:'[FACT] '+EV.fronts+' fronts for '+EV.team+' people, 2.5 h median focus per front per month. [FACT] '+EV.dailyNoOwner+' recent recaps close asking for an owner. [FACT] The SDP project module holds 29 records, the latest from 24/08, against 35 calendar fronts.'},
  f:{pt:'Lista única de projetos com dono, prazo e prioridade; no máximo 2 projetos por pessoa ao mesmo tempo.',es:'Lista única de proyectos con dueño, plazo y prioridad; máximo 2 proyectos por persona a la vez.',en:'One project list with owner, date and priority; at most 2 projects per person at once.'}},
 {k:'chg',now:1,goal:2,t:{pt:'Preventiva e hardening',es:'Preventiva y hardening',en:'Preventive and hardening'},
  e:{pt:'[FATO] Chegou ao L2 o chamado 41643 "Vulnerabilidades SNMP otros paises en FW" — vulnerabilidade achada depois, não por rotina. [PROVÁVEL] Não há calendário de patch nem checklist de hardening por tipo de equipamento.',es:'[HECHO] Llegó a L2 el ticket 41643 "Vulnerabilidades SNMP otros paises en FW" — vulnerabilidad hallada después, no por rutina. [PROBABLE] No hay calendario de parches ni checklist de hardening.',en:'[FACT] L2 got ticket 41643 "Vulnerabilidades SNMP otros paises en FW" — found after the fact, not by routine. [PROBABLE] No patch calendar or hardening checklist.'},
  f:{pt:'Janela mensal de patch (uma semana depois da Microsoft) e checklist de hardening para FortiGate, servidor e SBC.',es:'Ventana mensual de parches (una semana después de Microsoft) y checklist de hardening para FortiGate, servidor y SBC.',en:'A monthly patch window (a week after Microsoft’s) and a hardening checklist for FortiGate, servers and SBC.'}},
 {k:'inc',now:1,goal:2,t:{pt:'Continuidade e DR',es:'Continuidad y DR',en:'Continuity and DR'},
  e:{pt:'[FATO] Existe a frente de Teams DR (VOZ-01). [PROVÁVEL] Não achei registro de teste de recuperação concluído; as tarefas de validação estavam vencidas desde maio no Planner, segundo a baseline de 04/09 [NÃO CONFIRMADO].',es:'[HECHO] Existe el frente Teams DR (VOZ-01). [PROBABLE] No encontré registro de prueba de recuperación concluida.',en:'[FACT] A Teams DR front exists (VOZ-01). [PROBABLE] No record found of a completed recovery test.'},
  f:{pt:'Lista dos 10 serviços críticos com tempo máximo parado; um teste de restauração por trimestre, com evidência.',es:'Lista de 10 servicios críticos con tiempo máximo caído; una prueba de restauración por trimestre.',en:'List the 10 critical services with max downtime; one restore test per quarter, with evidence.'}},
 {k:'inc',now:1,goal:2,t:{pt:'Gestão de crise',es:'Gestión de crisis',en:'Crisis management'},
  e:{pt:'[FATO] Na falha das linhas do Uruguai (DEVN-Process-2026-3013) a comunicação correu por e-mail com 8 pessoas e virou desvio de qualidade. [PROVÁVEL] Não há papéis definidos nem modelo de comunicação.',es:'[HECHO] En la falla de líneas de Uruguay (DEVN-Process-2026-3013) la comunicación corrió por correo con 8 personas y se volvió desvío de calidad. [PROBABLE] No hay roles ni modelo de comunicación.',en:'[FACT] In the Uruguay line failure (DEVN-Process-2026-3013) communication ran by email to 8 people and became a quality deviation. [PROBABLE] No roles or communication template.'},
  f:{pt:'Quatro papéis fixos e uma mensagem modelo por severidade (seção abaixo).',es:'Cuatro roles fijos y un mensaje modelo por severidad (sección abajo).',en:'Four fixed roles and a template message per severity (section below).'}}];}

/* ---------- semana-padrão ---------- */
var RIT=[
 {d:0,wk:'AB',ty:'inc',h:'10:00',m:15,t:{pt:'Daily (todos os dias)',es:'Daily (todos los días)',en:'Daily (every day)'},w:{pt:'Time todo',es:'Todo el equipo',en:'Whole team'},o:{pt:'Bloqueios e dono de cada um. Nada sai sem nome e data.',es:'Bloqueos y dueño de cada uno. Nada sale sin nombre y fecha.',en:'Blockers and their owners. Nothing leaves without a name and a date.'}},
 {d:0,wk:'AB',ty:'inc',h:'09:00',m:30,t:{pt:'Triagem do plantonista (todos os dias)',es:'Triage de la guardia (todos los días)',en:'On-duty triage (every day)'},w:{pt:'Plantonista da semana',es:'Guardia de la semana',en:'On-duty of the week'},o:{pt:'Fila classificada por tipo; o resto do time não é interrompido.',es:'Cola clasificada por tipo; el resto no es interrumpido.',en:'Queue sorted by type; the rest are not interrupted.'}},
 {d:0,wk:'A',ty:'prj',h:'11:00',m:60,t:{pt:'Planejamento da sprint',es:'Planificación del sprint',en:'Sprint planning'},w:{pt:'Time + coordenação',es:'Equipo + coordinación',en:'Team + lead'},o:{pt:'O que cada projeto entrega em 2 semanas. Máximo 2 por pessoa.',es:'Qué entrega cada proyecto en 2 semanas. Máximo 2 por persona.',en:'What each project delivers in 2 weeks. Max 2 per person.'}},
 {d:2,wk:'AB',ty:'chg',h:'14:00',m:30,t:{pt:'CAB semanal',es:'CAB semanal',en:'Weekly CAB'},w:{pt:'Coordenação + dono de cada RFC + Segurança',es:'Coordinación + dueño de cada RFC + Seguridad',en:'Lead + each RFC owner + Security'},o:{pt:'RFCs aprovadas para a janela de quinta. Risco e rollback conferidos.',es:'RFC aprobadas para la ventana del jueves. Riesgo y rollback revisados.',en:'RFCs approved for Thursday’s window. Risk and rollback checked.'}},
 {d:3,wk:'AB',ty:'chg',h:'19:00',m:120,t:{pt:'Janela de mudança',es:'Ventana de cambio',en:'Change window'},w:{pt:'Executor + validador',es:'Ejecutor + validador',en:'Implementer + validator'},o:{pt:'Mudança feita, validada e evidência anexada à RFC.',es:'Cambio hecho, validado y evidencia en la RFC.',en:'Change done, validated, evidence attached to the RFC.'}},
 {d:1,wk:'AB',ty:'prj',h:'14:00',m:120,t:{pt:'Bloco de foco protegido (ter e qui)',es:'Bloque de foco protegido (mar y jue)',en:'Protected focus block (Tue and Thu)'},w:{pt:'Quem não está de plantão',es:'Quien no está de guardia',en:'Everyone not on duty'},o:{pt:'Projeto anda. Sem reunião, sem chamado.',es:'El proyecto avanza. Sin reunión, sin ticket.',en:'Projects move. No meetings, no tickets.'}},
 {d:4,wk:'B',ty:'prj',h:'15:00',m:45,t:{pt:'Review + retrospectiva',es:'Review + retrospectiva',en:'Review + retro'},w:{pt:'Time + quem pediu',es:'Equipo + solicitantes',en:'Team + requesters'},o:{pt:'O que foi entregue de verdade e uma melhoria para a próxima sprint.',es:'Lo entregado de verdad y una mejora para el próximo sprint.',en:'What was really delivered and one improvement for next sprint.'}},
 {d:4,wk:'B',ty:'prb',h:'11:00',m:45,t:{pt:'Revisão de problemas (mensal)',es:'Revisión de problemas (mensual)',en:'Problem review (monthly)'},w:{pt:'Time',es:'Equipo',en:'Team'},o:{pt:'Top 5 repetições do mês viram Problema com dono.',es:'Top 5 repeticiones del mes se vuelven Problema con dueño.',en:'Top 5 repeats of the month become Problems with owners.'}},
 {d:4,wk:'A',ty:'req',h:'11:00',m:30,t:{pt:'Capacidade com a gestão (mensal)',es:'Capacidad con la gerencia (mensual)',en:'Capacity with management (monthly)'},w:{pt:'Coordenação + gestão',es:'Coordinación + gerencia',en:'Lead + management'},o:{pt:'Números da aba Capacidade e decisão do que entra e do que sai.',es:'Números de Capacidad y decisión de qué entra y qué sale.',en:'Capacity tab numbers and a decision on what goes in and out.'}}];

/* ---------- exemplos de mudança ---------- */
var STEPS=[
 {k:'rfc',t:{pt:'1. RFC no SDP',es:'1. RFC en SDP',en:'1. RFC in SDP'},e:{pt:'Quem, o quê, por quê, quando',es:'Quién, qué, por qué, cuándo',en:'Who, what, why, when'}},
 {k:'cls',t:{pt:'2. Classificar',es:'2. Clasificar',en:'2. Classify'},e:{pt:'Padrão, normal ou emergencial',es:'Estándar, normal o emergencia',en:'Standard, normal or emergency'}},
 {k:'risk',t:{pt:'3. Risco e rollback',es:'3. Riesgo y rollback',en:'3. Risk and rollback'},e:{pt:'Impacto, plano de volta, teste',es:'Impacto, plan de vuelta, prueba',en:'Impact, back-out plan, test'}},
 {k:'cab',t:{pt:'4. CAB aprova',es:'4. CAB aprueba',en:'4. CAB approves'},e:{pt:'Registro da aprovação na RFC',es:'Registro de la aprobación en la RFC',en:'Approval logged on the RFC'}},
 {k:'ecab',t:{pt:'4b. ECAB por chat',es:'4b. ECAB por chat',en:'4b. ECAB via chat'},e:{pt:'2 aprovadores, registro em 1 h',es:'2 aprobadores, registro en 1 h',en:'2 approvers, logged within 1 h'}},
 {k:'win',t:{pt:'5. Janela',es:'5. Ventana',en:'5. Window'},e:{pt:'Usuários avisados antes',es:'Usuarios avisados antes',en:'Users told in advance'}},
 {k:'run',t:{pt:'6. Executar e validar',es:'6. Ejecutar y validar',en:'6. Implement and validate'},e:{pt:'Print/log com data e hora',es:'Print/log con fecha y hora',en:'Screenshot/log with timestamp'}},
 {k:'pir',t:{pt:'7. Fechar com evidência',es:'7. Cerrar con evidencia',en:'7. Close with evidence'},e:{pt:'Emergencial: revisão no próximo CAB',es:'Emergencia: revisión en el próximo CAB',en:'Emergency: reviewed at next CAB'}}];
var CHX=[
 {k:'std',ty:{pt:'Padrão',es:'Estándar',en:'Standard'},path:['rfc','cls','run','pir'],t:{pt:'Criar usuário de um novo colaborador',es:'Crear usuario de un nuevo ingreso',en:'Create a joiner’s user'},n:{pt:'Já testado, risco baixo e roteiro fixo: vai direto pelo catálogo, sem CAB.',es:'Ya probado, riesgo bajo y guion fijo: va directo por catálogo, sin CAB.',en:'Pre-tested, low risk, fixed runbook: straight through the catalog, no CAB.'}},
 {k:'nrm',ty:{pt:'Normal',es:'Normal',en:'Normal'},path:['rfc','cls','risk','cab','win','run','pir'],t:{pt:'Migrar FortiGate 60F para 121G em Montreal',es:'Migrar FortiGate 60F a 121G en Montreal',en:'Migrate FortiGate 60F to 121G in Montreal'},n:{pt:'Mexe na borda da rede de um país: passa por risco, rollback, CAB e janela.',es:'Toca el borde de red de un país: pasa por riesgo, rollback, CAB y ventana.',en:'Touches a country’s network edge: risk, rollback, CAB and window.'}},
 {k:'nrm2',ty:{pt:'Normal com prazo',es:'Normal con plazo',en:'Normal with deadline'},path:['rfc','cls','risk','cab','win','run','pir'],t:{pt:'Renovar o certificado do SBC',es:'Renovar el certificado *.contoso.example',en:'Renew the *.contoso.example certificate'},n:{pt:'Com 4 dias de prazo ainda cabe no CAB desta semana. Se esperar mais, vira emergencial — o método mostra o atraso antes.',es:'Con 4 días aún cabe en el CAB de esta semana. Si espera más, se vuelve emergencia.',en:'With 4 days left it still fits this week’s CAB. Wait longer and it becomes an emergency.'}},
 {k:'emg',ty:{pt:'Emergencial',es:'Emergencia',en:'Emergency'},path:['rfc','cls','risk','ecab','run','pir'],t:{pt:'Regra de DID que faltava no SBC (caso Uruguai)',es:'Regla DID que faltaba en el SBC (caso Uruguay)',en:'Missing DID rule on the SBC (Uruguay case)'},n:{pt:'Serviço parado: aprova por chat com dois nomes, executa, e a revisão vai para o próximo CAB.',es:'Servicio caído: aprueba por chat con dos nombres, ejecuta, y la revisión va al próximo CAB.',en:'Service down: approve by chat with two names, implement, review at the next CAB.'}}];

/* ---------- crise ---------- */
var SEV=[
 {k:1,t:{pt:'Sev 1 · país ou serviço crítico parado',es:'Sev 1 · país o servicio crítico caído',en:'Sev 1 · country or critical service down'},ex:{pt:'Telefonia de um país inteiro, e-mail, ERP em produção',es:'Telefonía de un país, correo, ERP en producción',en:'A whole country’s telephony, email, ERP in production'},call:'15 min',upd:'30 min',who:{pt:'Coordenação + gestão + fornecedor',es:'Coordinación + gerencia + proveedor',en:'Lead + management + vendor'}},
 {k:2,t:{pt:'Sev 2 · serviço degradado ou um site parado',es:'Sev 2 · servicio degradado o un sitio caído',en:'Sev 2 · service degraded or one site down'},ex:{pt:'Link de uma planta, VPN de um país',es:'Enlace de una planta, VPN de un país',en:'A plant’s link, a country’s VPN'},call:'30 min',upd:'1 h',who:{pt:'Coordenação + responsável técnico',es:'Coordinación + responsable técnico',en:'Lead + technical owner'}},
 {k:3,t:{pt:'Sev 3 · poucos usuários afetados',es:'Sev 3 · pocos usuarios afectados',en:'Sev 3 · few users affected'},ex:{pt:'Impressora de um andar, uma aplicação para um time',es:'Impresora de un piso, una app para un equipo',en:'One floor’s printer, an app for one team'},call:'—',upd:'4 h',who:{pt:'Plantonista',es:'Guardia',en:'On-duty'}}];
var ROLES=[
 {t:{pt:'Comandante',es:'Comandante',en:'Commander'},d:{pt:'Decide e prioriza. Não mexe no teclado.',es:'Decide y prioriza. No toca el teclado.',en:'Decides and prioritises. Hands off the keyboard.'}},
 {t:{pt:'Técnico',es:'Técnico',en:'Technical'},d:{pt:'Diagnostica e corrige. Só fala com o comandante.',es:'Diagnostica y corrige. Solo habla con el comandante.',en:'Diagnoses and fixes. Talks only to the commander.'}},
 {t:{pt:'Comunicação',es:'Comunicación',en:'Comms'},d:{pt:'Avisa usuários e gestão no relógio combinado.',es:'Avisa a usuarios y gerencia en el reloj acordado.',en:'Updates users and management on the agreed clock.'}},
 {t:{pt:'Escriba',es:'Escriba',en:'Scribe'},d:{pt:'Anota hora a hora. Vira a linha do tempo do RCA.',es:'Anota hora a hora. Es la línea de tiempo del RCA.',en:'Logs every step. Becomes the RCA timeline.'}}];
function commMsg(s){var l=Lg();
  if(l==='es')return '[Sev '+s.k+'] Estamos trabajando en una falla que afecta a <servicio/país>. Inicio: <hora>. Impacto: <qué no funciona>. Próxima actualización en '+s.upd+'. Contacto: <comandante>.';
  if(l==='en')return '[Sev '+s.k+'] We are working on an outage affecting <service/country>. Start: <time>. Impact: <what is not working>. Next update in '+s.upd+'. Contact: <commander>.';
  return '[Sev '+s.k+'] Estamos trabalhando numa falha que afeta <serviço/país>. Início: <hora>. Impacto: <o que não funciona>. Próxima atualização em '+s.upd+'. Contato: <comandante>.'}

/* ---------- hoje × método ---------- */
function CMP(n){return [
 [{pt:'Chega um pedido de licença',es:'Llega un pedido de licencia',en:'A licence request arrives'},{pt:'E-mail ou chat para alguém do time; às vezes o próprio setor compra sem TI (licenças avulsas).',es:'Correo o chat a alguien; a veces el área compra sin TI (licenças avulsas).',en:'Email or chat to someone; sometimes the area buys without IT (licenças avulsas).'},{pt:'Formulário do catálogo, aprovação automática do gestor, licença atribuída no grupo certo.',es:'Formulario de catálogo, aprobación del gerente, licencia en el grupo correcto.',en:'Catalog form, manager approval, licence in the right group.'}],
 [{pt:'Precisa mexer num firewall',es:'Hay que tocar un firewall',en:'A firewall must change'},{pt:'Quem sabe faz quando dá; sem RFC, sem rollback escrito.',es:'Quien sabe lo hace cuando puede; sin RFC, sin rollback escrito.',en:'Whoever knows does it when possible; no RFC, no written rollback.'},{pt:'RFC na segunda, CAB na quarta, janela na quinta, evidência anexada.',es:'RFC el lunes, CAB el miércoles, ventana el jueves, evidencia adjunta.',en:'RFC Monday, CAB Wednesday, window Thursday, evidence attached.'}],
 [{pt:'Um projeto com prazo (Novo Lab)',es:'Un proyecto con plazo (Nuevo Lab)',en:'A deadline project (New Lab)'},{pt:'Disputa espaço com 34 outras frentes; perguntas de compra ficam dias sem resposta.',es:'Compite con otros 34 frentes; preguntas de compra quedan días sin respuesta.',en:'Competes with 34 other fronts; purchase questions sit for days.'},{pt:'Está na sprint, tem dono, tem bloco de foco, e as decisões vão para a review.',es:'Está en el sprint, tiene dueño, bloque de foco, y las decisiones van a la review.',en:'In the sprint, with an owner and focus blocks; decisions go to review.'}],
 [{pt:'O mesmo aviso aparece 5 vezes',es:'El mismo aviso aparece 5 veces',en:'The same notice appears 5 times'},{pt:'Cada um vira chamado e alguém fecha um por um.',es:'Cada uno es un ticket y alguien los cierra uno a uno.',en:'Each becomes a ticket, closed one by one.'},{pt:'Vira Problema, a causa é corrigida uma vez e a regra para de abrir chamado.',es:'Se vuelve Problema, se corrige la causa una vez.',en:'Becomes a Problem; the cause is fixed once.'}],
 [{pt:'Cai a telefonia de um país',es:'Cae la telefonía de un país',en:'A country’s telephony goes down'},{pt:'Todo mundo no mesmo chat, ninguém comunica, a causa chega pelo fornecedor dias depois.',es:'Todos en el mismo chat, nadie comunica, la causa llega días después.',en:'Everyone in one chat, nobody communicates, the cause arrives days later.'},{pt:'Sev 1 em 15 min, quatro papéis, aviso a cada 30 min, RCA nosso em 5 dias.',es:'Sev 1 en 15 min, cuatro roles, aviso cada 30 min, RCA propio en 5 días.',en:'Sev 1 in 15 min, four roles, updates every 30 min, our own RCA in 5 days.'}]];}

/* ---------- aula ---------- */
function LESSON(n){return [
 {t:{pt:'Por que mudar',es:'Por qué cambiar',en:'Why change'},m:{pt:'Não é falta de esforço: é falta de método. Chega mais do que sai, e o que sai sai devagar porque todo mundo faz tudo ao mesmo tempo.',es:'No es falta de esfuerzo: es falta de método. Entra más de lo que sale, y lo que sale sale lento porque todos hacen todo a la vez.',en:'It is not lack of effort: it is lack of method. More comes in than goes out, and it goes out slowly because everyone does everything at once.'},
  x:{pt:'Em 30 dias: '+(n.inn||334)+' chamados entraram no L2 e '+(n.done||293)+' saíram. '+n.ov+' estão vencidos hoje. 35 frentes para 9 pessoas.',es:'En 30 días: '+(n.inn||334)+' entraron y '+(n.done||293)+' salieron. '+n.ov+' vencidos hoy. 35 frentes para 9 personas.',en:'In 30 days: '+(n.inn||334)+' in, '+(n.done||293)+' out. '+n.ov+' overdue today. 35 fronts for 9 people.'},
  q:{pt:'Qual tema você tocou esta semana que não andou nada?',es:'¿Qué tema tocaste esta semana que no avanzó nada?',en:'Which topic did you touch this week that did not move at all?'}},
 {t:{pt:'Cinco tipos de trabalho',es:'Cinco tipos de trabajo',en:'Five types of work'},m:{pt:'Incidente, requisição, mudança, projeto e problema. Cada um tem um ritmo diferente — misturar todos na mesma fila é o que trava.',es:'Incidente, requerimiento, cambio, proyecto y problema. Cada uno tiene un ritmo distinto — mezclarlos es lo que traba.',en:'Incident, request, change, project and problem. Each has its own rhythm — mixing them is what jams.'},
  x:{pt:'Da entrada do L2: 29% nem deveria ser chamado, 24% é pedido repetido, só 10% é trabalho de especialista. E isso é só o que virou chamado: numa amostra de 3 dias, 9 demandas chegaram por chat e e-mail contra 4 chamados reais.',es:'De la entrada de L2: 29% ni debería ser ticket, 24% es pedido repetido, solo 10% es trabajo de especialista.',en:'Of L2 intake: 29% should not be a ticket, 24% is repeated asks, only 10% is specialist work.'},
  q:{pt:'Pense no último chamado que você fechou: que tipo ele era?',es:'Piensa en el último ticket que cerraste: ¿qué tipo era?',en:'Think of the last ticket you closed: which type was it?'}},
 {t:{pt:'Plantonista: um protege os outros',es:'Guardia: uno protege a los demás',en:'On-duty: one shields the rest'},m:{pt:'Uma pessoa por semana, em rodízio, faz a triagem e atende o urgente. Os outros ganham blocos de foco sem interrupção.',es:'Una persona por semana, rotativa, hace triage y atiende lo urgente. Los demás ganan foco sin interrupción.',en:'One person a week, rotating, triages and handles the urgent. The others get uninterrupted focus.'},
  x:{pt:'Hoje sobram 2,5 h livres por dia e o maior bloco livre tem 1,2 h — nenhum projeto anda em pedaços de uma hora.',es:'Hoy quedan 2,5 h libres por día y el mayor bloque es de 1,2 h.',en:'Today there are 2.5 free hours a day and the longest block is 1.2 h.'},
  q:{pt:'Quantas vezes você foi interrompido ontem?',es:'¿Cuántas veces te interrumpieron ayer?',en:'How many times were you interrupted yesterday?'}},
 {t:{pt:'Projeto em sprint de 2 semanas',es:'Proyecto en sprint de 2 semanas',en:'Projects in 2-week sprints'},m:{pt:'Lista única de projetos com dono e prazo. A cada duas semanas: planejar o que se entrega, entregar, mostrar. Máximo 2 projetos por pessoa.',es:'Lista única de proyectos con dueño y plazo. Cada dos semanas: planificar, entregar, mostrar. Máximo 2 por persona.',en:'One project list with owners and dates. Every two weeks: plan, deliver, show. Max 2 per person.'},
  x:{pt:'Passando de 4 para 2 temas ao mesmo tempo, o tempo útil de projeto do time dobra (veja o simulador).',es:'Pasando de 4 a 2 temas a la vez, el tiempo útil de proyecto se duplica (ver simulador).',en:'Going from 4 to 2 topics at once doubles useful project time (see the simulator).'},
  q:{pt:'Se você só pudesse tocar 2 temas, quais seriam?',es:'Si solo pudieras tocar 2 temas, ¿cuáles serían?',en:'If you could only touch 2 topics, which would they be?'}},
 {t:{pt:'Mudança passa pelo CAB',es:'El cambio pasa por el CAB',en:'Changes go through CAB'},m:{pt:'Nada muda em produção sem RFC com risco e rollback. CAB de 30 minutos às quartas, janela às quintas. Padrão vai direto; emergencial tem caminho curto.',es:'Nada cambia en producción sin RFC con riesgo y rollback. CAB de 30 minutos los miércoles, ventana los jueves.',en:'Nothing changes in production without an RFC with risk and rollback. 30-minute CAB on Wednesdays, window on Thursdays.'},
  x:{pt:'O SDP tem 18 mudanças registradas na vida inteira; a última é de 03/08 e 8 das 10 últimas nunca saíram de "Requested".',es:'El SDP tiene 18 cambios en total; el último es del 03/08 y 8 de los 10 últimos nunca salieron de "Requested".',en:'SDP has 18 changes ever; the latest is 03/08 and 8 of the last 10 never left "Requested".'},
  q:{pt:'Qual foi a última mudança que você fez em produção? Ela tem registro?',es:'¿Cuál fue el último cambio que hiciste en producción? ¿Tiene registro?',en:'What was the last production change you made? Is it recorded?'}},
 {t:{pt:'Problema: parar de apagar o mesmo incêndio',es:'Problema: dejar de apagar el mismo incendio',en:'Problem: stop fighting the same fire'},m:{pt:'Todo mês, os 5 assuntos que mais se repetem viram um Problema com dono. Corrige a causa uma vez.',es:'Cada mes, los 5 asuntos más repetidos se vuelven un Problema con dueño.',en:'Every month, the top 5 repeated subjects become a Problem with an owner.'},
  x:{pt:'Avisos de Service Health se repetem até 5 vezes cada; o módulo de problemas do SDP tem 1 registro, de teste, de 2024.',es:'Los avisos de Service Health se repiten hasta 5 veces; el módulo de problemas tiene 1 registro de prueba de 2024.',en:'Service Health notices repeat up to 5 times; the problem module has 1 test record from 2024.'},
  q:{pt:'Que chamado você já resolveu mais de três vezes?',es:'¿Qué ticket ya resolviste más de tres veces?',en:'Which ticket have you solved more than three times?'}},
 {t:{pt:'Preventiva, hardening e DR',es:'Preventiva, hardening y DR',en:'Preventive, hardening and DR'},m:{pt:'O que não tem data não acontece. Janela mensal de patch, checklist de hardening por equipamento e um teste de restauração por trimestre.',es:'Lo que no tiene fecha no pasa. Ventana mensual de parches, checklist de hardening y una prueba de restauración por trimestre.',en:'What has no date does not happen. Monthly patch window, hardening checklist and one restore test a quarter.'},
  x:{pt:'O chamado 41643 trouxe vulnerabilidades SNMP nos firewalls de outros países — achado depois, não por rotina.',es:'El ticket 41643 trajo vulnerabilidades SNMP en firewalls de otros países — halladas después.',en:'Ticket 41643 surfaced SNMP vulnerabilities on other countries’ firewalls — found after the fact.'},
  q:{pt:'Se o servidor mais importante do seu país cair hoje, em quanto tempo ele volta?',es:'Si el servidor más importante de tu país cae hoy, ¿en cuánto vuelve?',en:'If your country’s most important server dies today, how long until it is back?'}},
 {t:{pt:'Crise: quatro papéis e um relógio',es:'Crisis: cuatro roles y un reloj',en:'Crisis: four roles and a clock'},m:{pt:'Comandante decide, técnico corrige, comunicação avisa, escriba anota. Sev 1: todos chamados em 15 minutos e aviso a cada 30.',es:'Comandante decide, técnico corrige, comunicación avisa, escriba anota. Sev 1: todos en 15 minutos y aviso cada 30.',en:'Commander decides, technical fixes, comms informs, scribe logs. Sev 1: everyone in 15 minutes, updates every 30.'},
  x:{pt:'Falha das linhas do Uruguai: virou desvio de qualidade e a causa chegou pelo RCA do fornecedor.',es:'Falla de líneas de Uruguay: se volvió desvío de calidad y la causa llegó por el RCA del proveedor.',en:'Uruguay line failure: it became a quality deviation and the cause came from the vendor RCA.'},
  q:{pt:'No último incidente grande, quem avisou os usuários?',es:'En el último incidente grande, ¿quién avisó a los usuarios?',en:'In the last big incident, who told the users?'}},
 {t:{pt:'O que muda na segunda-feira',es:'Qué cambia el lunes',en:'What changes on Monday'},m:{pt:'1) plantonista da semana; 2) daily de 15 min com dono e data; 3) RFC para toda mudança em produção; 4) lista única de projetos, máximo 2 por pessoa. O resto vem nas próximas semanas.',es:'1) guardia de la semana; 2) daily de 15 min con dueño y fecha; 3) RFC para todo cambio en producción; 4) lista única de proyectos, máximo 2 por persona.',en:'1) on-duty of the week; 2) a 15-min daily with owner and date; 3) an RFC for every production change; 4) one project list, max 2 per person.'},
  x:{pt:'Daqui a 30 dias, a aba Capacidade mostra se o saldo da fila mudou.',es:'En 30 días, la pestaña Capacidad muestra si el saldo cambió.',en:'In 30 days, the Capacity tab shows whether the queue net changed.'},
  q:{pt:'Quem é o primeiro plantonista?',es:'¿Quién es la primera guardia?',en:'Who is the first on-duty?'}}];}


/* ---------- demanda fora do SDP (amostra lida nesta sessão) ---------- */
var INV=[
 {d:'29/09',ch:'chat',f:'NET-04',t:{pt:'SD-WAN: qual link fica como principal?',es:'SD-WAN: ¿qué enlace queda como principal?',en:'SD-WAN: which link stays primary?'}},
 {d:'29/09',ch:'chat',f:'SEC-01',t:{pt:'Certificado do SBC: data e renovação',es:'Certificado del SBC: fecha y renovación',en:'SBC certificate: date and renewal'}},
 {d:'29/09',ch:'chat',f:'SEC-01',t:{pt:'Certificado do SBC: quem renova?',es:'Certificado del SBC: ¿quién renueva?',en:'SBC certificate: who renews it?'}},
 {d:'29/09',ch:'e-mail',f:'SRV-02',t:{pt:'Garantia dos hosts: renovar ou trocar?',es:'Garantía de hosts: ¿renovar o cambiar?',en:'Host warranty: renew or replace?'}},
 {d:'30/09',ch:'chat',f:'SEC-05',t:{pt:'FortiGates da Argentina para o Sentinel',es:'FortiGates de Argentina hacia Sentinel',en:'Argentine FortiGates into Sentinel'}},
 {d:'30/09',ch:'e-mail',f:'APP-04',t:{pt:'Licenças compradas fora do processo — 14 mensagens',es:'Licencias compradas fuera del proceso — 14 mensajes',en:'Licences bought outside the process — 14 messages'}},
 {d:'01/10',ch:'chat',f:'VOZ-03',t:{pt:'Tronco SIP do México: janela e rollback',es:'Troncal SIP de México: ventana y rollback',en:'Mexico SIP trunk: window and rollback'}}];
var SDPREAL3=4, SDPNOISE3=12, SDP30=66;
/* ---------- estado ---------- */
var S={inv:3,sel:-1,wk:'A',chx:'nrm',sev:1,slide:0,ppl:9,prj:30,w0:4,w1:2};
try{var sv=JSON.parse(ls('met_s')||'null');if(sv)for(var k in sv)if(k in S)S[k]=sv[k]}catch(e){}
function save(){ls('met_s',JSON.stringify(S))}
var WEIN={1:0,2:.2,3:.4,4:.6,5:.75};

/* ---------- estilos ---------- */
function css(){if(document.getElementById('mt-css'))return;var s=document.createElement('style');s.id='mt-css';s.textContent=
 '.mt-flow{display:grid;grid-template-columns:minmax(110px,150px) minmax(110px,150px) minmax(0,1fr);gap:10px;align-items:stretch}'+
 '.mt-box{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:10px 12px;box-shadow:var(--raise);font-size:12.5px;color:var(--ink-2)}.mt-box b{display:block;color:var(--ink);font-size:13.5px;font-family:var(--display)}'+
 '.mt-in{display:flex;flex-direction:column;justify-content:center;text-align:center;position:relative}.mt-in:after{content:"→";position:absolute;right:-12px;top:50%;transform:translateY(-50%);color:var(--ink-3);font-size:16px}'+
 '.mt-types{display:grid;gap:6px}.mt-ty{display:grid;grid-template-columns:6px minmax(90px,130px) minmax(0,1fr) minmax(0,1fr);gap:10px;align-items:center;background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:8px 10px 8px 0;font-size:12.5px;color:var(--ink-2);overflow:hidden}'+
 '.mt-ty i{align-self:stretch;margin:-8px 0;border-radius:0}.mt-ty b{color:var(--ink);font-family:var(--display);font-size:13.5px}.mt-ty small{display:block;color:var(--ink-3);font-size:11.5px}'+
 '.mt-dg{display:grid;grid-template-columns:minmax(150px,220px) minmax(0,1fr) 70px;gap:4px 12px;align-items:center}'+
 '.mt-dg .row{display:contents;cursor:pointer}.mt-dg .lb{font-size:13px;padding:6px 0}.mt-dg .lb.on{font-weight:700;color:var(--accent)}'+
 '.mt-dg .tr{position:relative;height:16px;background:var(--v-track);border-radius:0 4px 4px 0}.mt-dg .now{position:absolute;left:0;top:0;bottom:0;border-radius:0 4px 4px 0}.mt-dg .gl{position:absolute;top:50%;width:14px;height:14px;border-radius:50%;background:var(--surface);border:3px solid var(--ok);transform:translate(-50%,-50%)}'+
 '.mt-dg .vl{font-family:var(--mono);font-size:11.5px;color:var(--ink-2);text-align:right}.mt-ax{display:grid;grid-template-columns:repeat(6,1fr);font-family:var(--mono);font-size:10.5px;color:var(--ink-3)}'+
 '.mt-det{grid-column:1/-1;background:var(--surface-2);border-radius:6px;padding:10px 12px;font-size:13px;color:var(--ink-2);margin:2px 0 8px}.mt-det b{color:var(--ink)}'+
 '.mt-week{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}.mt-day h4{font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3);margin:0 0 6px}'+
 '.mt-rit{background:var(--surface);border:1px solid var(--line);border-left:4px solid var(--c);border-radius:6px;padding:8px 9px;margin-bottom:6px;font-size:12px;color:var(--ink-2);box-shadow:var(--raise)}.mt-rit b{display:block;color:var(--ink);font-size:12.5px}.mt-rit .tm{font-family:var(--mono);font-size:10.5px;color:var(--ink-3)}'+
 '.mt-seg{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 10px}.mt-seg button{font-size:13px;font-weight:600;padding:6px 12px;border:1px solid var(--line);border-radius:16px;background:var(--surface);color:var(--ink-2);cursor:pointer}.mt-seg button[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}'+
 '.mt-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(118px,1fr));gap:6px}.mt-st{border:1px solid var(--line);border-radius:6px;padding:8px 9px;font-size:12px;color:var(--ink-3);background:var(--surface);opacity:.45}.mt-st.on{opacity:1;border-color:var(--cp2);box-shadow:0 0 0 1px var(--cp2);color:var(--ink-2)}.mt-st b{display:block;color:var(--ink);font-size:12.5px}'+
 '.mt-cmp{width:100%;border-collapse:separate;border-spacing:0 6px;font-size:13px}.mt-cmp td{background:var(--surface);padding:9px 11px;vertical-align:top;color:var(--ink-2);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.mt-cmp td:first-child{border-left:1px solid var(--line);border-radius:6px 0 0 6px;font-weight:600;color:var(--ink)}.mt-cmp td:last-child{border-right:1px solid var(--line);border-radius:0 6px 6px 0}'+
 '.mt-cmp th{font-family:var(--mono);font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3);text-align:left;padding:0 11px}.mt-cmp .bad{border-left:3px solid var(--crit)}.mt-cmp .good{border-left:3px solid var(--ok)}'+
 '.mt-slide{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:22px 24px;box-shadow:var(--raise);min-height:260px}.mt-slide h3{font-family:var(--display);font-size:22px;margin:0 0 10px}.mt-slide p.m{font-size:16px;line-height:1.55;color:var(--ink);margin:0 0 14px;max-width:70ch}'+
 '.mt-slide .x,.mt-slide .q{font-size:13.5px;border-radius:6px;padding:10px 12px;margin-top:8px;max-width:76ch}.mt-slide .x{background:var(--surface-2);color:var(--ink-2)}.mt-slide .q{background:var(--accent-soft);color:var(--ink)}'+
 '.mt-dots{display:flex;gap:5px;justify-content:center;margin-top:10px}.mt-dots button{width:9px;height:9px;border-radius:50%;border:0;background:var(--line);cursor:pointer;padding:0}.mt-dots button[aria-current="true"]{background:var(--accent)}'+
 '.mt-nav{display:flex;justify-content:space-between;align-items:center;margin-top:12px}'+
 ':root{--cp1:#2a78d6;--cp2:#eb6834;--cp3:#1baf7a;--cp4:#eda100}@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--cp1:#3987e5;--cp2:#d95926;--cp3:#199e70;--cp4:#c98500}}:root[data-theme="dark"]{--cp1:#3987e5;--cp2:#d95926;--cp3:#199e70;--cp4:#c98500}'+
 '.cp-legend{display:flex;gap:14px;flex-wrap:wrap;font-size:12px;color:var(--ink-2);margin:2px 0 10px}.cp-legend i{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:5px;vertical-align:-1px}'+'.cp-lv{display:grid;gap:14px 22px;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));margin-top:4px}.cp-lv label{display:block;font-size:12.5px;color:var(--ink);font-weight:600;margin-bottom:4px}.cp-lv .row{display:flex;align-items:center;gap:10px}.cp-lv input[type=range]{flex:1;accent-color:var(--accent);min-width:0}.cp-lv output{font-family:var(--mono);font-size:12px;min-width:44px;text-align:right;color:var(--ink)}'+'.cp-bars{display:grid;grid-template-columns:minmax(110px,170px) minmax(0,1fr) 54px;gap:5px 10px;align-items:center}.cp-bars .lb{font-size:12.5px}.cp-bars .tr{height:16px;display:flex}.cp-bars .sg{height:100%;border-radius:0 4px 4px 0;min-width:2px}.cp-bars .vl{font-family:var(--mono);font-size:11.5px;text-align:right;color:var(--ink-2)}'+'.mt-inv{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px}.mt-li{display:grid;grid-template-columns:70px 64px minmax(0,1fr);gap:8px;font-size:12.5px;color:var(--ink-2);padding:6px 0;border-top:1px solid var(--line-soft)}.mt-li b{color:var(--ink)}.mt-ch{font-family:var(--mono);font-size:10px;font-weight:600;padding:1px 6px;border-radius:8px;background:var(--surface-2);text-align:center;align-self:start}'+'@media (max-width:720px){.mt-inv{grid-template-columns:1fr}.mt-li{grid-template-columns:56px minmax(0,1fr)}.mt-li .mt-ch{grid-column:1}.mt-flow{grid-template-columns:1fr}.mt-in:after{content:"↓";right:auto;left:50%;top:auto;bottom:-14px;transform:translateX(-50%)}.mt-ty{grid-template-columns:6px minmax(0,1fr)}.mt-ty>span:nth-child(n+3){grid-column:2}.mt-week{grid-template-columns:1fr}.mt-dg{grid-template-columns:minmax(0,1fr) 60px}.mt-dg .tr{grid-column:1/-1;order:3}.mt-slide h3{font-size:19px}.mt-slide p.m{font-size:15px}}';
 document.head.appendChild(s)}

function how(k){return '<div class="cp-how" style="font-size:12.5px;line-height:1.5;color:var(--ink-2);background:var(--surface-2);border-radius:6px;padding:8px 10px;margin:0 0 10px"><b style="color:var(--ink);margin-right:4px">'+esc(t('how'))+'</b> '+t(k)+'</div>'}
function sec(id,title,note,body){return '<section id="'+id+'"><div class="sh"><h2>'+esc(title)+'</h2></div>'+(note?'<p class="snote">'+esc(note)+'</p>':'')+body+'</section>'}

/* ---------- vista ---------- */
function view(){
  css(); var n=live(), h='';
  h+='<section><div class="sh"><h2>🧭 '+esc(t('title'))+'</h2><span class="sc">'+esc(P({pt:'evidência lida em 01/10 · somente leitura',es:'evidencia leída el 01/10 · solo lectura',en:'evidence read on 01/10 · read-only'}))+'</span></div><p class="snote">'+esc(t('sub'))+'</p></section>';

  /* aula primeiro, porque é o uso principal */
  var L=LESSON(n), sl=Math.min(S.slide,L.length-1), c=L[sl];
  h+=sec('mt-s7','🎓 '+t('s7'),t('s7x'),'<div class="mt-slide"><div class="sc">'+(sl+1)+' '+esc(t('of'))+' '+L.length+'</div><h3>'+esc(P(c.t))+'</h3><p class="m">'+esc(P(c.m))+'</p>'+
    '<div class="x"><b>'+esc(t('ex'))+':</b> '+esc(P(c.x))+'</div><div class="q"><b>💬 '+esc(t('q'))+':</b> '+esc(P(c.q))+'</div>'+
    '<div class="mt-nav"><button class="btn" data-sl="-1"'+(sl===0?' disabled':'')+'>'+esc(t('prev'))+'</button><button class="btn pri" data-sl="1"'+(sl===L.length-1?' disabled':'')+'>'+esc(t('next'))+'</button></div>'+
    '<div class="mt-dots">'+L.map(function(_,i){return '<button data-go="'+i+'" aria-current="'+(i===sl)+'" aria-label="'+(i+1)+'"></button>'}).join('')+'</div></div>');

  /* 0 · modelo */
  h+=sec('mt-s0','🗂️ '+t('s0'),t('s0x'),how('l0')+'<div class="mt-flow"><div class="mt-box mt-in"><b>'+esc(P({pt:'Entrada única',es:'Entrada única',en:'Single intake'}))+'</b>SDP · '+esc(P({pt:'e-mail e chat viram chamado',es:'correo y chat se vuelven ticket',en:'email and chat become tickets'}))+'</div>'+
    '<div class="mt-box mt-in"><b>'+esc(P({pt:'Triagem',es:'Triage',en:'Triage'}))+'</b>'+esc(P({pt:'plantonista decide o tipo',es:'la guardia decide el tipo',en:'on-duty picks the type'}))+'</div>'+
    '<div class="mt-types">'+TYPES.map(function(x){return '<div class="mt-ty"><i style="background:'+x.c+'"></i><span><b>'+esc(P(x.n))+'</b><small>'+esc(P(x.d))+'</small></span><span><small>'+esc(P({pt:'ritual',es:'ritual',en:'ritual'}))+'</small>'+esc(P(x.r))+'</span><span><small>'+esc(P({pt:'régua',es:'regla',en:'measure'}))+'</small>'+esc(P(x.m))+'</span></div>'}).join('')+'</div></div>');

  /* 1 · diagnóstico */
  var D=DIAG(n), avgN=0,avgG=0; D.forEach(function(d){avgN+=d.now;avgG+=d.goal}); avgN/=D.length; avgG/=D.length;
  var dg='<div class="mt-dg">'+D.map(function(d,i){var on=S.sel===i;
    return '<div class="row" data-dg="'+i+'"><div class="lb'+(on?' on':'')+'">'+(on?'▾ ':'▸ ')+esc(P(d.t))+'</div><div class="tr" data-tip="'+esc('<b>'+P(d.t)+'</b><br>'+t('now')+': '+d.now+' · '+t('goal')+': '+d.goal)+'">'+
      '<div class="now" style="width:'+(d.now/5*100)+'%;background:'+(d.now<=1?'var(--crit)':'var(--v-pause)')+';min-width:3px"></div><div class="gl" style="left:'+(d.goal/5*100)+'%"></div></div><div class="vl">'+d.now+' → '+d.goal+'</div></div>'+
      (on?'<div class="mt-det"><b>'+esc(t('evid'))+':</b> '+esc(P(d.e))+'<br><br><b>'+esc(t('first'))+':</b> '+esc(P(d.f))+'</div>':'')}).join('')+
    '<div></div><div class="mt-ax"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div><div></div></div>'+
    '<div class="cp-legend" style="margin-top:10px"><span><i style="background:var(--crit)"></i>'+esc(P({pt:'hoje, nota 0–1',es:'hoy, nota 0–1',en:'today, score 0–1'}))+'</span><span><i style="background:var(--v-pause)"></i>'+esc(P({pt:'hoje, nota 2+',es:'hoy, nota 2+',en:'today, score 2+'}))+'</span><span>◯ '+esc(t('goal'))+'</span>'+
    '<span><b>'+esc(P({pt:'média',es:'promedio',en:'average'}))+':</b> '+nf(avgN)+' → '+nf(avgG)+'</span></div>';
  h+=sec('mt-s1','🩺 '+t('s1'),t('s1x'),'<div class="viz">'+how('l1')+dg+'</div>');


  /* 1b · demanda fora do SDP */
  var obs=INV.length, per=S.inv*22, vis=Math.round(SDP30/(SDP30+per)*100);
  var lst=INV.map(function(x){return '<div class="mt-li"><span class="sc">'+x.d+' · '+x.f+'</span><span class="mt-ch">'+x.ch+'</span><span>'+esc(P(x.t))+'</span></div>'}).join('');
  var mx2=Math.max(SDP30,per,1);
  h+=sec('mt-sinv','🕳️ '+P({pt:'Demanda que o SDP não vê',es:'Demanda que el SDP no ve',en:'Demand SDP does not see'}),
    P({pt:'A fila do SDP é só uma parte do trabalho. Muita coisa chega por chat e e-mail e nunca vira chamado — então nenhum número de capacidade está completo.',es:'La cola del SDP es solo una parte del trabajo. Mucho llega por chat y correo y nunca se vuelve ticket.',en:'The SDP queue is only part of the work. Much arrives by chat and email and never becomes a ticket.'}),
    '<div class="viz">'+'<div class="cp-how" style="font-size:12.5px;line-height:1.5;color:var(--ink-2);background:var(--surface-2);border-radius:6px;padding:8px 10px;margin:0 0 10px"><b style="color:var(--ink);margin-right:4px">'+esc(t('how'))+'</b> '+
    P({pt:'À esquerda, uma amostra real de 3 dias (29/09 a 01/10) de um analista: o que chegou por chat e e-mail sem número de chamado. À direita, a conta do mês: barra <b>azul</b> = chamados no SDP, barra <b>cinza</b> = demanda fora dele, pela sua estimativa por dia. Comece pelo valor observado na amostra e ajuste.',es:'A la izquierda, una muestra real de 3 días (29/09 a 01/10): lo que llegó por chat y correo sin ticket. A la derecha, la cuenta del mes: <b>azul</b> = tickets en SDP, <b>gris</b> = demanda fuera de él según tu estimación diaria.',en:'Left: a real 3-day sample (29/09–01/10) of what arrived by chat and email with no ticket. Right: the monthly maths — <b>blue</b> = SDP tickets, <b>grey</b> = demand outside it, from your daily estimate.'})+'</div>'+
    '<div class="tiles"><div class="tile"><div class="n">'+SDPREAL3+'</div><div class="l">'+esc(P({pt:'chamados reais no SDP em 3 dias',es:'tickets reales en SDP en 3 días',en:'real SDP tickets in 3 days'}))+'</div></div>'+
    '<div class="tile w"><div class="n">≥ '+obs+'</div><div class="l">'+esc(P({pt:'demandas por chat ou e-mail no mesmo período',es:'demandas por chat o correo en el mismo período',en:'chat or email demands in the same period'}))+'</div></div>'+
    '<div class="tile c"><div class="n">'+Math.round(obs/(obs+SDPREAL3)*100)+'%</div><div class="l">'+esc(P({pt:'da demanda real da amostra chegou fora do SDP',es:'de la demanda real de la muestra llegó fuera del SDP',en:'of the sample’s real demand came outside SDP'}))+'</div></div>'+
    '<div class="tile"><div class="n">'+SDPNOISE3+'</div><div class="l">'+esc(P({pt:'chamados no SDP que eram só aviso automático',es:'tickets en SDP que eran solo aviso automático',en:'SDP tickets that were just automatic notices'}))+'</div></div></div>'+
    '<div class="mt-inv" style="margin-top:12px"><div><h3 style="font-family:var(--display);font-size:14px;margin:0 0 4px">'+esc(P({pt:'O que chegou fora do SDP',es:'Lo que llegó fuera del SDP',en:'What arrived outside SDP'}))+' <span class="cp-tag" style="font-family:var(--mono);font-size:9.5px;padding:1px 6px;border-radius:8px;background:var(--surface-2);color:var(--ink-3)">'+esc(t('tags').fato)+'</span></h3>'+lst+'</div>'+
    '<div><h3 style="font-family:var(--display);font-size:14px;margin:0 0 8px">'+esc(P({pt:'A conta do mês, com a sua estimativa',es:'La cuenta del mes, con tu estimación',en:'The monthly maths, with your estimate'}))+' <span class="cp-tag" style="font-family:var(--mono);font-size:9.5px;padding:1px 6px;border-radius:8px;background:var(--warn-bg);color:var(--warn)">'+esc(t('tags').hip)+'</span></h3>'+
      '<div class="cp-lv" style="grid-template-columns:1fr"><div><label for="mt-inv">'+esc(P({pt:'Demandas fora do SDP por dia útil (amostra: 3)',es:'Demandas fuera del SDP por día hábil (muestra: 3)',en:'Demands outside SDP per working day (sample: 3)'}))+'</label><div class="row"><input type="range" id="mt-inv" data-mk="inv" min="0" max="15" step="1" value="'+S.inv+'"><output id="mto-inv">'+S.inv+'</output></div></div></div>'+
      '<div class="cp-bars" style="margin-top:12px"><div class="lb">'+esc(P({pt:'No SDP (30 dias)',es:'En SDP (30 días)',en:'In SDP (30 days)'}))+'</div><div class="tr"><div class="sg" style="width:'+(SDP30/mx2*100)+'%;background:var(--v-a)"></div></div><div class="vl">'+SDP30+'</div>'+
      '<div class="lb">'+esc(P({pt:'Fora do SDP (estimado)',es:'Fuera del SDP (estimado)',en:'Outside SDP (estimated)'}))+'</div><div class="tr"><div class="sg" style="width:'+(per/mx2*100)+'%;background:var(--v-pause)"></div></div><div class="vl">'+per+'</div></div>'+
      '<p style="font-size:14px;margin:12px 0 4px;color:var(--ink)"><b style="font-family:var(--display);font-size:22px;color:var(--'+(vis<70?'crit':'ok')+')">'+vis+'%</b> '+esc(P({pt:'da demanda deste analista aparece no SDP.',es:'de la demanda de este analista aparece en el SDP.',en:'of this analyst’s demand shows in SDP.'}))+'</p>'+
      '<p class="snote" style="margin:0">'+esc(P({pt:'Se isso vale para o time, a aba Capacidade mostra só uma parte do problema: a falta de gente é maior do que ela calcula. Os 66 do SDP ainda incluem avisos automáticos, então a parte visível real é menor.',es:'Si esto vale para el equipo, la pestaña Capacidad muestra solo una parte: la falta de gente es mayor. Los 66 del SDP aún incluyen avisos automáticos.',en:'If this holds for the team, the Capacity tab shows only part of it: the staffing gap is larger. The 66 SDP tickets still include automatic notices.'}))+'</p></div></div>'+
    '<div class="cp-how" style="font-size:12.5px;line-height:1.5;color:var(--ink-2);background:var(--surface-2);border-radius:6px;padding:8px 10px;margin:12px 0 0"><b style="color:var(--ink)">'+esc(P({pt:'Limites desta medida',es:'Límites de esta medida',en:'Limits of this measure'}))+':</b> '+
      esc(P({pt:'Amostra de 3 dias, só da caixa e dos chats de um analista — os do resto do time não são lidos. A média de 30 dias de e-mail e Teams não foi calculada nesta execução porque o conector do Microsoft 365 caiu no meio; ela entra na próxima rodada da tarefa diária. Os 9 itens são o mínimo observado, não o total.',es:'Muestra de 3 días, solo del correo y chats de un analista. El promedio de 30 días no se calculó porque el conector de Microsoft 365 se cayó; entra en la próxima ejecución.',en:'A 3-day sample from one analyst’s mailbox and chats only. The 30-day average was not computed because the Microsoft 365 connector dropped mid-run; it comes in the next daily run.'}))+'</div></div>');

  /* 2 · semana */
  var wk='<div class="mt-seg">'+['A','B'].map(function(w){return '<button data-wk="'+w+'" aria-pressed="'+(S.wk===w)+'">'+esc(t('w'+w))+'</button>'}).join('')+'</div><div class="mt-week">'+
    t('days').map(function(dn,di){var rs=RIT.filter(function(r){return (r.d===di||(r.d===0&&r.wk==='AB'&&(r.m<=30)))&&r.wk.indexOf(S.wk)>-1});
      rs=RIT.filter(function(r){var daily=(r.d===0&&r.m<=30&&r.wk==='AB');var focus=(r.d===1&&r.m===120);return r.wk.indexOf(S.wk)>-1&&(daily||r.d===di||(focus&&di===3))});
      rs.sort(function(a,b){return a.h<b.h?-1:1});
      return '<div class="mt-day"><h4>'+esc(dn)+'</h4>'+rs.map(function(r){return '<div class="mt-rit" style="--c:'+TC[r.ty]+'" data-tip="'+esc('<b>'+P(r.t)+'</b><br>'+P(r.w)+'<br>'+P(r.o))+'"><span class="tm">'+r.h+' · '+r.m+' min</span><b>'+esc(P(r.t).replace(/ \(.*\)$/,''))+'</b>'+esc(P(r.o))+'</div>'}).join('')+'</div>'}).join('')+'</div>'+
    '<div class="cp-legend" style="margin-top:10px">'+TYPES.map(function(x){return '<span><i style="background:'+x.c+'"></i>'+esc(P(x.n))+'</span>'}).join('')+'</div>';
  var tot=0;RIT.forEach(function(r){var times=(r.d===0&&r.m<=30&&r.wk==='AB')?10:(r.m===120&&r.d===1)?4:(r.wk==='AB'?2:1);if(r.ty!=='prj'||r.m<120)if(r.ty!=='chg'||r.m<120)tot+=r.m*times});
  h+=sec('mt-s2','📅 '+t('s2'),t('s2x'),'<div class="viz">'+how('l2')+wk+'<p class="snote" style="margin-top:8px">'+esc(P({pt:'Rituais (sem contar janela e foco) somam ~',es:'Los rituales (sin ventana ni foco) suman ~',en:'Rituals (excluding window and focus) add up to ~'}))+nf(tot/60/2)+' h '+esc(P({pt:'por semana por pessoa — menos que as ~10 h de reunião por semana de hoje.',es:'por semana por persona — menos que las ~10 h de reunión semanal de hoy.',en:'per person per week — less than today’s ~10 h of meetings a week.'}))+'</p></div>');

  /* 3 · simulador */
  var LV=[['ppl',5,12,1,t('lvP'),function(v){return v}],['prj',10,60,5,t('lvPr'),function(v){return v+'%'}],['w0',1,5,1,t('lvW'),function(v){return v}],['w1',1,5,1,t('lvW2'),function(v){return v}]];
  h+=sec('mt-s3','⚙️ '+t('s3'),t('s3x'),'<div class="viz">'+how('l3')+'<div class="cp-lv">'+LV.map(function(l){return '<div><label for="mt-'+l[0]+'">'+esc(l[4])+'</label><div class="row"><input type="range" id="mt-'+l[0]+'" data-mk="'+l[0]+'" min="'+l[1]+'" max="'+l[2]+'" step="'+l[3]+'" value="'+S[l[0]]+'"><output id="mto-'+l[0]+'">'+esc(l[5](S[l[0]]))+'</output></div></div>'}).join('')+'</div><div id="mt-simres" style="margin-top:14px"></div></div>');

  /* 4 · CAB */
  var ex=CHX.filter(function(x){return x.k===S.chx})[0]||CHX[1];
  h+=sec('mt-s4','🔁 '+t('s4'),t('s4x'),'<div class="viz">'+how('l4')+'<div class="mt-seg">'+CHX.map(function(x){return '<button data-chx="'+x.k+'" aria-pressed="'+(x.k===S.chx)+'">'+esc(P(x.ty))+' · '+esc(P(x.t))+'</button>'}).join('')+'</div>'+
    '<div class="mt-steps">'+STEPS.map(function(s){var on=ex.path.indexOf(s.k)>-1;return '<div class="mt-st'+(on?' on':'')+'"><b>'+esc(P(s.t))+'</b>'+esc(P(s.e))+'</div>'}).join('')+'</div>'+
    '<div class="cp-how" style="margin-top:10px;font-size:13px;color:var(--ink-2);background:var(--surface-2);border-radius:6px;padding:9px 11px"><b style="color:var(--ink)">'+esc(P(ex.ty))+' — '+esc(P(ex.t))+':</b> '+esc(P(ex.n))+'</div></div>');

  /* 5 · crise */
  var sv=SEV.filter(function(x){return x.k===S.sev})[0];
  h+=sec('mt-s5','🚨 '+t('s5'),t('s5x'),'<div class="viz">'+how('l5')+'<div class="mt-seg">'+SEV.map(function(x){return '<button data-sev="'+x.k+'" aria-pressed="'+(x.k===S.sev)+'">Sev '+x.k+'</button>'}).join('')+'</div>'+
    '<div class="grid2"><div><h3 style="font-family:var(--display);font-size:14px;margin:0 0 6px">'+esc(P(sv.t))+'</h3><p class="snote" style="margin:0 0 8px">'+esc(P(sv.ex))+'</p>'+
      '<div class="tiles"><div class="tile c"><div class="n">'+sv.call+'</div><div class="l">'+esc(P({pt:'para abrir a sala de crise',es:'para abrir la sala de crisis',en:'to open the war room'}))+'</div></div><div class="tile w"><div class="n">'+sv.upd+'</div><div class="l">'+esc(P({pt:'entre um aviso e outro',es:'entre un aviso y otro',en:'between updates'}))+'</div></div></div>'+
      '<p class="snote" style="margin-top:8px"><b>'+esc(P({pt:'Quem é chamado',es:'A quién se llama',en:'Who is called'}))+':</b> '+esc(P(sv.who))+'</p></div>'+
    '<div><h3 style="font-family:var(--display);font-size:14px;margin:0 0 6px">'+esc(t('roles'))+'</h3>'+ROLES.map(function(r,i){return '<div class="mt-rit" style="--c:'+['var(--cp2)','var(--cp1)','var(--cp3)','var(--cp4)'][i]+'"><b>'+esc(P(r.t))+'</b>'+esc(P(r.d))+'</div>'}).join('')+'</div></div>'+
    '<h3 style="font-family:var(--display);font-size:14px;margin:12px 0 6px">'+esc(t('comm'))+'</h3><div class="cp-exec" id="mt-comm" style="background:var(--surface);border:1px solid var(--line);border-left:3px solid var(--accent);border-radius:var(--r);padding:12px 14px;font-size:13.5px">'+esc(commMsg(sv))+'</div><div style="margin-top:8px"><button class="btn" id="mt-copy">📋 '+esc(P({pt:'Copiar mensagem',es:'Copiar mensaje',en:'Copy message'}))+'</button></div></div>');

  /* 6 · comparação */
  h+=sec('mt-s6','⚖️ '+t('s6'),t('s6x'),'<div class="tscroll" style="background:none;border:0;box-shadow:none"><table class="mt-cmp"><thead><tr><th></th><th>'+esc(P({pt:'Hoje',es:'Hoy',en:'Today'}))+'</th><th>'+esc(P({pt:'Com o método',es:'Con el método',en:'With the method'}))+'</th></tr></thead><tbody>'+
    CMP(n).map(function(r){return '<tr><td>'+esc(P(r[0]))+'</td><td class="bad">'+esc(P(r[1]))+'</td><td class="good">'+esc(P(r[2]))+'</td></tr>'}).join('')+'</tbody></table></div>');
  return h;
}

function drawSim(){
  var el=document.getElementById('mt-simres'); if(!el)return;
  function calc(w){var base=S.ppl*40*S.prj/100, eff=1-(WEIN[w]||0); return {h:base*eff,lost:base*(1-eff),weeks:80/Math.max(base*eff/Math.max(S.ppl,1),0.01)/1}}
  /* semanas para 80 h de UM projeto, tocado por uma pessoa com a fração e o WIP dados */
  function weeks(w){var per=40*S.prj/100*(1-(WEIN[w]||0))/w; return 80/Math.max(per,0.01)}
  var a=calc(S.w0), b=calc(S.w1), wa=weeks(S.w0), wb=weeks(S.w1), mx=Math.max(a.h,b.h,1);
  function bar(lbl,v,c){return '<div class="lb">'+esc(lbl)+'</div><div class="tr" data-tip="'+esc('<b>'+lbl+'</b> — '+nf(v,0)+' h')+'"><div class="sg" style="width:'+(v/mx*100)+'%;background:'+c+'"></div></div><div class="vl">'+nf(v,0)+' h</div>'}
  var today=P({pt:'Hoje',es:'Hoy',en:'Today'}), meth=P({pt:'Com o método',es:'Con el método',en:'With the method'});
  el.innerHTML='<div class="cp-bars">'+bar(today,a.h,'var(--v-pause)')+bar(meth,b.h,'var(--v-a)')+'</div>'+
    '<div class="tiles" style="margin-top:12px"><div class="tile c"><div class="n">'+nf(wa,0)+'</div><div class="l">'+esc(t('rW'))+' · '+esc(today)+'</div></div>'+
    '<div class="tile o"><div class="n">'+nf(wb,0)+'</div><div class="l">'+esc(t('rW'))+' · '+esc(meth)+'</div></div>'+
    '<div class="tile w"><div class="n">'+nf(a.lost-b.lost,0)+' h</div><div class="l">'+esc(P({pt:'recuperadas por semana para o time',es:'recuperadas por semana para el equipo',en:'recovered per week for the team'}))+'</div></div>'+
    '<div class="tile"><div class="n">'+nf(b.h/Math.max(a.h,1),1)+'×</div><div class="l">'+esc(P({pt:'mais tempo útil de projeto',es:'más tiempo útil de proyecto',en:'more useful project time'}))+'</div></div></div>';
}
function after(v){
  drawSim();
  function rr(){var y=window.scrollY;save();BL.render();window.scrollTo(0,y)}
  [].forEach.call(v.querySelectorAll('[data-sl]'),function(b){b.onclick=function(){S.slide=Math.max(0,S.slide+ +b.dataset.sl);rr()}});
  [].forEach.call(v.querySelectorAll('.mt-dots [data-go]'),function(b){b.onclick=function(){S.slide=+b.dataset.go;rr()}});
  [].forEach.call(v.querySelectorAll('[data-dg]'),function(b){b.onclick=function(){var i=+b.dataset.dg;S.sel=S.sel===i?-1:i;rr()}});
  [].forEach.call(v.querySelectorAll('[data-wk]'),function(b){b.onclick=function(){S.wk=b.dataset.wk;rr()}});
  [].forEach.call(v.querySelectorAll('[data-chx]'),function(b){b.onclick=function(){S.chx=b.dataset.chx;rr()}});
  [].forEach.call(v.querySelectorAll('[data-sev]'),function(b){b.onclick=function(){S.sev=+b.dataset.sev;rr()}});
  [].forEach.call(v.querySelectorAll('[data-mk]'),function(i){i.onchange=function(){if(i.dataset.mk==='inv')rr()};i.oninput=function(){S[i.dataset.mk]=+i.value;save();var o=document.getElementById('mto-'+i.dataset.mk);if(o)o.textContent=i.dataset.mk==='prj'?i.value+'%':i.value;drawSim()}});
  var cp=document.getElementById('mt-copy');if(cp)cp.onclick=function(){var tx=document.getElementById('mt-comm').textContent;try{navigator.clipboard.writeText(tx).then(function(){BL.toast(P({pt:'Copiado.',es:'Copiado.',en:'Copied.'}))})}catch(e){}};
  document.onkeydown=function(e){if(BL.view()!=='met'||/INPUT|TEXTAREA/.test((document.activeElement||{}).tagName||''))return;if(e.key==='ArrowRight'){S.slide=Math.min(S.slide+1,8);rr()}if(e.key==='ArrowLeft'){S.slide=Math.max(S.slide-1,0);rr()}};
}
window.BLM={view:view,after:after};
})();
