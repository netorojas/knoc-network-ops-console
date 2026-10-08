/*!
 * Orbiscale Flow · team work board (module of Orbiscale)
 * Copyright (C) 2026 Ernesto Athaualpa Rojas (Neto). All rights reserved except as granted below.
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * Commercial licence (no AGPL obligations, enterprise modules, support): see COMMERCIAL.md
 */
/* ============================================================================
   Capacidade — aba de capacidade operacional do quadro Infra LATAM.
   Só números agregados do time (nenhum dado individual).
   Ao vivo: fila L2 e fluxo de 30 dias vêm de sdp.js (republicado pela rotina).
   Retrato: mix de demanda e agenda vêm de CAPD (data no topo da aba).
   ========================================================================= */
(function(){
'use strict';
var CAPD = {"at":"2026-10-01T09:30-03:00","src":{"pt":"Retrato de demo · números fictícios","es":"Foto de demo · números ficticios","en":"Demo snapshot · fictional numbers"},"team":{"size":9,"external":1,"fronts":33},"flowSnap":{"in":376,"done":283,"daily":[{"d":"2026-09-02","in":14,"out":11},{"d":"2026-09-03","in":22,"out":6},{"d":"2026-09-04","in":16,"out":3},{"d":"2026-09-05","in":0,"out":0},{"d":"2026-09-06","in":0,"out":0},{"d":"2026-09-07","in":11,"out":11},{"d":"2026-09-08","in":12,"out":10},{"d":"2026-09-09","in":15,"out":46},{"d":"2026-09-10","in":24,"out":3},{"d":"2026-09-11","in":18,"out":38},{"d":"2026-09-12","in":1,"out":0},{"d":"2026-09-13","in":2,"out":0},{"d":"2026-09-14","in":21,"out":21},{"d":"2026-09-15","in":20,"out":20},{"d":"2026-09-16","in":21,"out":9},{"d":"2026-09-17","in":8,"out":18},{"d":"2026-09-18","in":8,"out":11},{"d":"2026-09-19","in":1,"out":0},{"d":"2026-09-20","in":0,"out":0},{"d":"2026-09-21","in":13,"out":6},{"d":"2026-09-22","in":8,"out":8},{"d":"2026-09-23","in":15,"out":17},{"d":"2026-09-24","in":14,"out":10},{"d":"2026-09-25","in":13,"out":10},{"d":"2026-09-26","in":0,"out":0},{"d":"2026-09-27","in":0,"out":0},{"d":"2026-09-28","in":14,"out":13},{"d":"2026-09-29","in":10,"out":9},{"d":"2026-09-30","in":19,"out":12},{"d":"2026-10-01","in":3,"out":0}],"owners":9},"demand":{"window":{"from":"2026-09-02","to":"2026-10-01","days":30},"total":302,"byType":{"ruido":{"n":67,"open":13,"resolved":43,"medHours":86.31,"p90Hours":117.6},"phishing":{"n":34,"open":1,"resolved":33,"medHours":6.12,"p90Hours":21.19},"licenca":{"n":23,"open":12,"resolved":11,"medHours":82.32,"p90Hours":106.91},"acesso":{"n":37,"open":9,"resolved":21,"medHours":21.78,"p90Hours":256.64},"onboarding":{"n":29,"open":7,"resolved":17,"medHours":150.8,"p90Hours":192.8},"hardware":{"n":47,"open":13,"resolved":28,"medHours":26.01,"p90Hours":179.66},"telefonia":{"n":2,"open":2,"resolved":0,"medHours":null,"p90Hours":null},"rede":{"n":8,"open":1,"resolved":9,"medHours":73.07,"p90Hours":194},"app":{"n":20,"open":8,"resolved":13,"medHours":18.83,"p90Hours":41.5},"outro":{"n":89,"open":14,"resolved":81,"medHours":24.26,"p90Hours":198.56}},"dailyByType":[{"d":"2026-09-02","ruido":0,"phishing":0,"licenca":2,"acesso":3,"onboarding":3,"hardware":2,"telefonia":0,"rede":1,"app":1,"outro":4},{"d":"2026-09-03","ruido":10,"phishing":0,"licenca":0,"acesso":1,"onboarding":0,"hardware":5,"telefonia":0,"rede":0,"app":1,"outro":7},{"d":"2026-09-04","ruido":15,"phishing":1,"licenca":1,"acesso":0,"onboarding":0,"hardware":0,"telefonia":0,"rede":1,"app":1,"outro":1},{"d":"2026-09-05","ruido":0,"phishing":0,"licenca":0,"acesso":0,"onboarding":0,"hardware":0,"telefonia":0,"rede":0,"app":0,"outro":0},{"d":"2026-09-06","ruido":0,"phishing":0,"licenca":0,"acesso":0,"onboarding":0,"hardware":0,"telefonia":0,"rede":0,"app":0,"outro":0},{"d":"2026-09-07","ruido":3,"phishing":0,"licenca":0,"acesso":0,"onboarding":0,"hardware":2,"telefonia":0,"rede":0,"app":1,"outro":4},{"d":"2026-09-08","ruido":4,"phishing":0,"licenca":0,"acesso":1,"onboarding":0,"hardware":3,"telefonia":0,"rede":0,"app":2,"outro":2},{"d":"2026-09-09","ruido":2,"phishing":1,"licenca":1,"acesso":0,"onboarding":2,"hardware":3,"telefonia":1,"rede":0,"app":1,"outro":4},{"d":"2026-09-10","ruido":0,"phishing":15,"licenca":0,"acesso":1,"onboarding":3,"hardware":1,"telefonia":0,"rede":0,"app":0,"outro":3},{"d":"2026-09-11","ruido":2,"phishing":8,"licenca":2,"acesso":0,"onboarding":2,"hardware":1,"telefonia":0,"rede":4,"app":0,"outro":2},{"d":"2026-09-12","ruido":0,"phishing":0,"licenca":0,"acesso":0,"onboarding":0,"hardware":0,"telefonia":0,"rede":0,"app":0,"outro":1},{"d":"2026-09-13","ruido":0,"phishing":1,"licenca":0,"acesso":1,"onboarding":0,"hardware":0,"telefonia":0,"rede":0,"app":0,"outro":0},{"d":"2026-09-14","ruido":2,"phishing":10,"licenca":0,"acesso":3,"onboarding":0,"hardware":3,"telefonia":0,"rede":1,"app":1,"outro":3},{"d":"2026-09-15","ruido":4,"phishing":4,"licenca":1,"acesso":1,"onboarding":2,"hardware":3,"telefonia":0,"rede":1,"app":1,"outro":2},{"d":"2026-09-16","ruido":1,"phishing":0,"licenca":1,"acesso":2,"onboarding":1,"hardware":3,"telefonia":0,"rede":0,"app":2,"outro":11},{"d":"2026-09-17","ruido":0,"phishing":0,"licenca":0,"acesso":1,"onboarding":1,"hardware":3,"telefonia":0,"rede":0,"app":1,"outro":3},{"d":"2026-09-18","ruido":1,"phishing":0,"licenca":0,"acesso":2,"onboarding":1,"hardware":1,"telefonia":0,"rede":0,"app":0,"outro":3},{"d":"2026-09-19","ruido":0,"phishing":0,"licenca":0,"acesso":0,"onboarding":0,"hardware":0,"telefonia":0,"rede":0,"app":0,"outro":1},{"d":"2026-09-20","ruido":0,"phishing":0,"licenca":0,"acesso":0,"onboarding":0,"hardware":0,"telefonia":0,"rede":0,"app":0,"outro":0},{"d":"2026-09-21","ruido":1,"phishing":0,"licenca":1,"acesso":1,"onboarding":3,"hardware":2,"telefonia":0,"rede":0,"app":1,"outro":6},{"d":"2026-09-22","ruido":1,"phishing":0,"licenca":1,"acesso":1,"onboarding":1,"hardware":1,"telefonia":0,"rede":0,"app":0,"outro":4},{"d":"2026-09-23","ruido":1,"phishing":0,"licenca":0,"acesso":5,"onboarding":1,"hardware":0,"telefonia":0,"rede":1,"app":1,"outro":4},{"d":"2026-09-24","ruido":1,"phishing":0,"licenca":2,"acesso":2,"onboarding":1,"hardware":3,"telefonia":0,"rede":0,"app":1,"outro":3},{"d":"2026-09-25","ruido":1,"phishing":0,"licenca":3,"acesso":1,"onboarding":3,"hardware":1,"telefonia":1,"rede":0,"app":2,"outro":3},{"d":"2026-09-26","ruido":0,"phishing":0,"licenca":0,"acesso":0,"onboarding":0,"hardware":0,"telefonia":0,"rede":0,"app":0,"outro":0},{"d":"2026-09-27","ruido":0,"phishing":0,"licenca":0,"acesso":0,"onboarding":0,"hardware":0,"telefonia":0,"rede":0,"app":0,"outro":0},{"d":"2026-09-28","ruido":2,"phishing":0,"licenca":2,"acesso":4,"onboarding":0,"hardware":2,"telefonia":0,"rede":0,"app":1,"outro":4},{"d":"2026-09-29","ruido":1,"phishing":0,"licenca":2,"acesso":1,"onboarding":0,"hardware":1,"telefonia":0,"rede":0,"app":2,"outro":4},{"d":"2026-09-30","ruido":10,"phishing":0,"licenca":1,"acesso":1,"onboarding":0,"hardware":1,"telefonia":0,"rede":0,"app":2,"outro":4},{"d":"2026-10-01","ruido":1,"phishing":1,"licenca":1,"acesso":2,"onboarding":2,"hardware":1,"telefonia":0,"rede":0,"app":0,"outro":3}],"byWeekday":{"seg":56,"ter":52,"qua":91,"qui":75,"sex":57,"sab":2,"dom":2}},"cal":{"past":{"totals":{"events":278,"hours":222.68,"foco_h":132.67,"buffer_h":20.21,"ritual_h":15.32,"reuniao_interna_h":10.22,"reuniao_externa_h":15.34,"allday_skipped":1,"cancelled_skipped":7,"weekend_events":0,"workdays":22},"collisions":60,"collision_hours":32.31,"collision_days":20,"duplicates":18,"meetings_over_foco":17,"switches_per_day":13.69,"free_h":54.97,"free_h_per_day":2.74,"longest_free_block_avg_h":1.18},"ahead":{"totals":{"events":138,"hours":73.22,"foco_h":52.27,"buffer_h":7.72,"ritual_h":8.17,"reuniao_interna_h":3,"reuniao_externa_h":4.72,"allday_skipped":3,"cancelled_skipped":0,"weekend_events":0,"workdays":10},"collisions":23,"collision_hours":10.85,"collision_days":9,"duplicates":7,"meetings_over_foco":8,"switches_per_day":10.87,"free_h":26.38,"free_h_per_day":3.08,"longest_free_block_avg_h":1.39},"daily":[{"d":"2026-09-01","booked":7.75,"meet":1.76,"foco":6.27,"free":3.33,"col":2},{"d":"2026-09-02","booked":7.09,"meet":1.36,"foco":9,"free":2.26,"col":3},{"d":"2026-09-03","booked":8.43,"meet":1.76,"foco":6.97,"free":2.54,"col":2},{"d":"2026-09-04","booked":8.87,"meet":1.98,"foco":7,"free":2.56,"col":3},{"d":"2026-09-07","booked":2.32,"meet":0.72,"foco":1.68,"free":7.23,"col":0},{"d":"2026-09-08","booked":5.39,"meet":1.31,"foco":5.05,"free":3.7,"col":1},{"d":"2026-09-09","booked":6.68,"meet":1.58,"foco":7,"free":2.51,"col":4},{"d":"2026-09-10","booked":8.77,"meet":0.66,"foco":6.43,"free":2.36,"col":1},{"d":"2026-09-11","booked":8.07,"meet":1.8,"foco":7,"free":2.09,"col":4},{"d":"2026-09-14","booked":9.11,"meet":2.87,"foco":7.46,"free":1.65,"col":3},{"d":"2026-09-15","booked":6.24,"meet":2.46,"foco":6,"free":3.01,"col":3},{"d":"2026-09-16","booked":8.79,"meet":1.9,"foco":7,"free":1.32,"col":2},{"d":"2026-09-17","booked":7.46,"meet":4.03,"foco":7.37,"free":2.36,"col":5},{"d":"2026-09-18","booked":7.67,"meet":3.4,"foco":7,"free":1.91,"col":4},{"d":"2026-09-21","booked":8.58,"meet":0.67,"foco":6.61,"free":1.62,"col":0},{"d":"2026-09-22","booked":6.63,"meet":3.22,"foco":6.81,"free":3.05,"col":6},{"d":"2026-09-23","booked":9.04,"meet":1.89,"foco":8,"free":1.42,"col":2},{"d":"2026-09-24","booked":7.01,"meet":0.7,"foco":6.89,"free":2.28,"col":1},{"d":"2026-09-25","booked":8.92,"meet":2.68,"foco":8,"free":1.92,"col":5},{"d":"2026-09-28","booked":10,"meet":4.19,"foco":7.1,"free":1,"col":4},{"d":"2026-09-29","booked":6.64,"meet":3.13,"foco":6.85,"free":2.74,"col":5},{"d":"2026-09-30","booked":7.92,"meet":0.78,"foco":8,"free":2.19,"col":2}],"byFront":{"SEC-01":1.47,"NET-04":1,"GOV-02":1,"TKT-07":2.69,"SEC-05":2,"SRV-02":2,"APP-04":2,"CLD-02":2,"OPS-07":2,"NET-09":2,"MON-01":2,"GOV-01":2,"VOZ-03":2,"END-02":2,"HW-11":2,"ONB-04":2},"frontMedian":2.43,"frontSum":118.12},"daily":{"withoutOwner":4,"of":4}};

/* ---------- base ---------- */
function Lg(){return (window.BL&&BL.L())||'pt'}
function loc(){var l=Lg();return l==='en'?'en-US':l==='es'?'es-ES':'pt-BR'}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function nf(v,d){if(v==null||isNaN(v))return '—';return Number(v).toLocaleString(loc(),{maximumFractionDigits:d==null?1:d,minimumFractionDigits:0})}
function pick(o){return o&&(o[Lg()]||o.pt)||''}
function ls(k,v){try{return v===undefined?localStorage.getItem(k):localStorage.setItem(k,v)}catch(e){return null}}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}

/* ---------- textos ---------- */
var TX={
pt:{title:'Capacidade da operação',sub:'O tamanho do time contra o tamanho da demanda, em números. Só totais do time — nenhum número individual. Passe o mouse em qualquer gráfico para ver o valor; mexa nas alavancas do simulador para ver o efeito.',
 how:'Como ler',howT:'[FATO] veio de ferramenta (SDP, agenda, ata). [PROVÁVEL] é cálculo sobre fatos. [HIPÓTESE] é premissa que você ajusta no simulador.',
 live:'ao vivo',snap:'retrato',
 k1:'chamados/mês a mais do que o time fecha',k1x:'entrada {i} × saída {o} no L2 em 30 dias',
 k2:'da entrada L2 é automatizável',k2x:'{n} de {t} são aviso automático ou phishing reportado',
 k3:'frentes ativas para {p} pessoas',k3x:'{h} h de foco por frente no mês (mediana)',
 k4:'livres por dia na agenda',k4x:'maior bloco livre: {b} h · {c} colisões em {d} de {w} dias',
 k5:'da fila L2 com SLA pausado',k5x:'{p} de {t} abertos esperando usuário, aprovação ou fornecedor',
 k6:'das últimas atas da daily sem dono',k6x:'decisão que sai sem responsável volta na reunião seguinte',
 s1:'A conta não fecha',s1x:'Entrada e saída acumuladas da fila L2 nos últimos 30 dias. A distância entre as linhas é trabalho que ficou para trás.',
 inS:'entrou',outS:'saiu',gap:'diferença',days:'dias',
 fteT:'Pessoas que faltam, por cenário',fteX:'Quantas pessoas a mais o L2 precisaria, na vazão média atual por pessoa. Primeira barra: só para a fila parar de crescer. Segunda: para também zerar os vencidos em 60 dias.',
 fteA:'parar de crescer',fteB:'parar + zerar vencidos em 60 d',sc0:'Hoje',sc1:'Com automação',sc2:'Automação + catálogo',
 s2:'Simulador — o que muda a fila',s2x:'Mexa nas alavancas. A linha tracejada é a fila se nada mudar; a contínua é o cenário montado aqui.',
 lvFte:'Pessoas a mais no L2',lvAuto:'Avisos e phishing automatizados',lvCat:'Ganho do catálogo (licença, acesso, onboarding)',lvHpt:'Esforço médio por chamado real',lvMpn:'Triagem por aviso automático',
 hyp:'HIPÓTESE',base:'sem mudança',scen:'cenário',
 r90:'fila em {h} dias',rNet:'saldo por mês',rZero:'fila zera em',rNever:'não zera',rFree:'horas liberadas por mês',
 s3:'Para onde vai a demanda',s3x:'Chamados criados no L2 em 30 dias, separados pela forma certa de atender. Clique numa trilha para destacá-la.',
 lanes:{auto:'Automatizar',cat:'Catálogo / padrão',campo:'Suporte de campo',esp:'Especialista L2'},
 laneRule:{auto:'Não deveria virar chamado: regra de filtro, deduplicação e botão de reporte direto para segurança.',cat:'Formulário com aprovação e roteiro fixo. Entra pronto, sai rápido.',campo:'Hardware e pedidos simples: N1 com roteiro, ou janela fixa de atendimento.',esp:'Rede, telefonia e aplicações: aqui o L2 agrega valor e precisa de tempo protegido.'},
 types:{ruido:'Avisos automáticos',phishing:'Phishing reportado',licenca:'Licenças',acesso:'Acessos',onboarding:'Entrada e saída de pessoas',hardware:'Hardware',outro:'Outros pedidos',rede:'Rede',telefonia:'Telefonia',app:'Aplicações'},
 med:'mediana para resolver',open:'abertos',perDay:'Entrada diária por trilha',
 s4:'Para onde vai o tempo',s4x:'Agenda de setembro do único analista lido pelo conector, dias úteis das 08:00 às 18:00. É tempo planejado, não esforço medido.',
 foco:'blocos de foco',meet:'reuniões e daily',free:'livre',over:'sobreposto',
 dayT:'Horas livres por dia útil',dayX:'Ponto vermelho: dia com colisão de agenda.',col:'colisões',
 frT:'Tempo de foco por frente no mês',frX:'Cada barra é uma frente com bloco na agenda. A linha é o mínimo por frente que você define abaixo.',
 frMin:'Mínimo para uma frente andar',frFit:'frentes cabem na agenda',frOf:'de',frNeed:'faltam {h} h/mês (≈ {f} pessoa)',
 sw:'trocas de contexto por dia',dup:'blocos próprios duplicados',mof:'reuniões em cima de bloco de foco',
 s5:'Riscos operacionais pelo tamanho do time',s5x:'Probabilidade × impacto. Os pontos cheios são riscos que crescem porque o time é pequeno para o volume. Passe o mouse para ver a evidência.',
 onlySz:'só os ligados ao tamanho do time',prob:'probabilidade',imp:'impacto',zc:'crítico',zw:'atenção',zo:'controlado',szL:'ligado ao tamanho do time',othL:'outro fator',
 s6:'Plano em três ondas',s6x:'Primeiro tirar o que não deveria estar na fila, depois padronizar, depois dimensionar com os números deste painel. Marque o que já foi feito — fica salvo só no seu navegador.',
 w1:'0–30 dias · parar o sangramento',w2:'30–60 dias · padronizar',w3:'60–90 dias · dimensionar',eff:'efeito esperado',
 s7:'Resumo para a gestão',s7x:'Dez linhas, no formato executivo. Os números se atualizam junto com a fila.',copy:'Copiar resumo',copied:'Copiado.',
 s8:'Método e premissas',mth:'ver como cada número é calculado'},
es:{title:'Capacidad de la operación',sub:'El tamaño del equipo contra el tamaño de la demanda, en números. Solo totales del equipo — ningún número individual. Pasa el mouse sobre cualquier gráfico para ver el valor; mueve las palancas del simulador para ver el efecto.',
 how:'Cómo leer',howT:'[HECHO] vino de una herramienta (SDP, agenda, acta). [PROBABLE] es cálculo sobre hechos. [HIPÓTESIS] es una premisa que ajustas en el simulador.',
 live:'en vivo',snap:'foto',
 k1:'tickets/mes más de los que el equipo cierra',k1x:'entrada {i} × salida {o} en L2 en 30 días',
 k2:'de la entrada L2 es automatizable',k2x:'{n} de {t} son avisos automáticos o phishing reportado',
 k3:'frentes activos para {p} personas',k3x:'{h} h de foco por frente al mes (mediana)',
 k4:'libres por día en la agenda',k4x:'mayor bloque libre: {b} h · {c} colisiones en {d} de {w} días',
 k5:'de la cola L2 con SLA pausado',k5x:'{p} de {t} abiertos esperando usuario, aprobación o proveedor',
 k6:'de las últimas actas de la daily sin dueño',k6x:'la decisión sin responsable vuelve en la reunión siguiente',
 s1:'La cuenta no cierra',s1x:'Entrada y salida acumuladas de la cola L2 en 30 días. La distancia entre las líneas es trabajo que quedó atrás.',
 inS:'entró',outS:'salió',gap:'diferencia',days:'días',
 fteT:'Personas que faltan, por escenario',fteX:'Cuántas personas más necesitaría L2, a la tasa media actual por persona. Primera barra: solo para que la cola deje de crecer. Segunda: para además vaciar los vencidos en 60 días.',
 fteA:'dejar de crecer',fteB:'dejar de crecer + vaciar vencidos en 60 d',sc0:'Hoy',sc1:'Con automatización',sc2:'Automatización + catálogo',
 s2:'Simulador — qué cambia la cola',s2x:'Mueve las palancas. La línea punteada es la cola si nada cambia; la continua es el escenario armado aquí.',
 lvFte:'Personas más en L2',lvAuto:'Avisos y phishing automatizados',lvCat:'Ganancia del catálogo (licencia, acceso, onboarding)',lvHpt:'Esfuerzo medio por ticket real',lvMpn:'Triage por aviso automático',
 hyp:'HIPÓTESIS',base:'sin cambio',scen:'escenario',
 r90:'cola en {h} días',rNet:'saldo por mes',rZero:'la cola se vacía en',rNever:'no se vacía',rFree:'horas liberadas por mes',
 s3:'A dónde va la demanda',s3x:'Tickets creados en L2 en 30 días, separados por la forma correcta de atenderlos. Haz clic en una vía para destacarla.',
 lanes:{auto:'Automatizar',cat:'Catálogo / estándar',campo:'Soporte de campo',esp:'Especialista L2'},
 laneRule:{auto:'No debería volverse ticket: regla de filtro, deduplicación y botón de reporte directo a seguridad.',cat:'Formulario con aprobación y guion fijo. Entra listo, sale rápido.',campo:'Hardware y pedidos simples: N1 con guion, o ventana fija de atención.',esp:'Red, telefonía y aplicaciones: aquí L2 agrega valor y necesita tiempo protegido.'},
 types:{ruido:'Avisos automáticos',phishing:'Phishing reportado',licenca:'Licencias',acesso:'Accesos',onboarding:'Ingresos y bajas',hardware:'Hardware',outro:'Otros pedidos',rede:'Red',telefonia:'Telefonía',app:'Aplicaciones'},
 med:'mediana para resolver',open:'abiertos',perDay:'Entrada diaria por vía',
 s4:'A dónde va el tiempo',s4x:'Agenda de septiembre del único analista leído por el conector, días hábiles de 08:00 a 18:00. Es tiempo planificado, no esfuerzo medido.',
 foco:'bloques de foco',meet:'reuniones y daily',free:'libre',over:'superpuesto',
 dayT:'Horas libres por día hábil',dayX:'Punto rojo: día con colisión de agenda.',col:'colisiones',
 frT:'Tiempo de foco por frente al mes',frX:'Cada barra es un frente con bloque en la agenda. La línea es el mínimo por frente que defines abajo.',
 frMin:'Mínimo para que un frente avance',frFit:'frentes caben en la agenda',frOf:'de',frNeed:'faltan {h} h/mes (≈ {f} persona)',
 sw:'cambios de contexto por día',dup:'bloques propios duplicados',mof:'reuniones sobre un bloque de foco',
 s5:'Riesgos operativos por el tamaño del equipo',s5x:'Probabilidad × impacto. Los puntos llenos son riesgos que crecen porque el equipo es pequeño para el volumen. Pasa el mouse para ver la evidencia.',
 onlySz:'solo los ligados al tamaño del equipo',prob:'probabilidad',imp:'impacto',zc:'crítico',zw:'atención',zo:'controlado',szL:'ligado al tamaño del equipo',othL:'otro factor',
 s6:'Plan en tres olas',s6x:'Primero sacar lo que no debería estar en la cola, luego estandarizar, luego dimensionar con los números de este panel. Marca lo hecho — se guarda solo en tu navegador.',
 w1:'0–30 días · detener la pérdida',w2:'30–60 días · estandarizar',w3:'60–90 días · dimensionar',eff:'efecto esperado',
 s7:'Resumen para la gerencia',s7x:'Diez líneas, en formato ejecutivo. Los números se actualizan con la cola.',copy:'Copiar resumen',copied:'Copiado.',
 s8:'Método y premisas',mth:'ver cómo se calcula cada número'},
en:{title:'Operational capacity',sub:'Team size against demand size, in numbers. Team totals only — no individual figures. Hover any chart for values; move the simulator levers to see the effect.',
 how:'How to read',howT:'[FACT] came from a tool (SDP, calendar, recap). [PROBABLE] is a calculation on facts. [HYPOTHESIS] is an assumption you tune in the simulator.',
 live:'live',snap:'snapshot',
 k1:'more tickets/month than the team closes',k1x:'{i} in × {o} out at L2 over 30 days',
 k2:'of L2 intake can be automated',k2x:'{n} of {t} are automatic notices or reported phishing',
 k3:'active fronts for {p} people',k3x:'{h} h of focus per front per month (median)',
 k4:'free per day on the calendar',k4x:'longest free block: {b} h · {c} clashes on {d} of {w} days',
 k5:'of the L2 queue with the SLA paused',k5x:'{p} of {t} open waiting on user, approval or vendor',
 k6:'of recent daily recaps with no owner',k6x:'a decision with no owner comes back the next meeting',
 s1:'The numbers do not add up',s1x:'Cumulative L2 intake and output over 30 days. The distance between the lines is work left behind.',
 inS:'in',outS:'out',gap:'gap',days:'days',
 fteT:'People missing, by scenario',fteX:'How many more people L2 would need at the current average per-person rate. First bar: just to stop the queue growing. Second: to also clear the overdue in 60 days.',
 fteA:'stop growing',fteB:'stop + clear overdue in 60 d',sc0:'Today',sc1:'With automation',sc2:'Automation + catalog',
 s2:'Simulator — what moves the queue',s2x:'Move the levers. The dashed line is the queue if nothing changes; the solid one is the scenario built here.',
 lvFte:'Extra people at L2',lvAuto:'Notices and phishing automated',lvCat:'Catalog gain (licence, access, onboarding)',lvHpt:'Average effort per real ticket',lvMpn:'Triage per automatic notice',
 hyp:'HYPOTHESIS',base:'no change',scen:'scenario',
 r90:'queue in {h} days',rNet:'net per month',rZero:'queue clears in',rNever:'never clears',rFree:'hours freed per month',
 s3:'Where the demand goes',s3x:'Tickets created at L2 over 30 days, split by the right way to handle them. Click a lane to highlight it.',
 lanes:{auto:'Automate',cat:'Catalog / standard',campo:'Field support',esp:'L2 specialist'},
 laneRule:{auto:'Should not become a ticket: filter rule, deduplication and a report button straight to security.',cat:'Form with approval and a fixed runbook. Comes in ready, goes out fast.',campo:'Hardware and simple requests: L1 with a runbook, or a fixed service window.',esp:'Network, telephony and applications: this is where L2 adds value and needs protected time.'},
 types:{ruido:'Automatic notices',phishing:'Reported phishing',licenca:'Licences',acesso:'Access',onboarding:'Joiners and leavers',hardware:'Hardware',outro:'Other requests',rede:'Network',telefonia:'Telephony',app:'Applications'},
 med:'median to resolve',open:'open',perDay:'Daily intake by lane',
 s4:'Where the time goes',s4x:'September calendar of the one analyst the connector reads, weekdays 08:00–18:00. Planned time, not measured effort.',
 foco:'focus blocks',meet:'meetings and daily',free:'free',over:'overlapping',
 dayT:'Free hours per working day',dayX:'Red dot: a day with a calendar clash.',col:'clashes',
 frT:'Focus time per front per month',frX:'Each bar is a front with a block on the calendar. The line is the per-front minimum you set below.',
 frMin:'Minimum for a front to move',frFit:'fronts fit the calendar',frOf:'of',frNeed:'{h} h/month short (≈ {f} person)',
 sw:'context switches per day',dup:'self-duplicated blocks',mof:'meetings on top of a focus block',
 s5:'Operational risks from team size',s5x:'Probability × impact. Filled dots are risks that grow because the team is small for the volume. Hover for the evidence.',
 onlySz:'only those tied to team size',prob:'probability',imp:'impact',zc:'critical',zw:'watch',zo:'contained',szL:'tied to team size',othL:'other factor',
 s6:'Three-wave plan',s6x:'First remove what should not be in the queue, then standardise, then size the team with this panel’s numbers. Tick what is done — saved only in your browser.',
 w1:'0–30 days · stop the bleeding',w2:'30–60 days · standardise',w3:'60–90 days · size the team',eff:'expected effect',
 s7:'Summary for management',s7x:'Ten lines, executive format. The numbers update with the queue.',copy:'Copy summary',copied:'Copied.',
 s8:'Method and assumptions',mth:'see how each number is calculated'}};
function t(k){return (TX[Lg()]||TX.pt)[k]}
function sub(s,o){return String(s).replace(/\{(\w+)\}/g,function(_,k){return o[k]!=null?o[k]:''})}

/* ---------- trilhas de demanda ---------- */
var LANE_OF={ruido:'auto',phishing:'auto',licenca:'cat',acesso:'cat',onboarding:'cat',hardware:'campo',outro:'campo',rede:'esp',telefonia:'esp',app:'esp'};
var LANES=['auto','cat','campo','esp'];
var LANE_VAR={auto:'var(--cp1)',cat:'var(--cp2)',campo:'var(--cp3)',esp:'var(--cp4)'};

/* ---------- estado ---------- */
var S={fte:0,auto:0,cat:0,hpt:1.5,mpn:10,minFront:8,lane:null,onlySz:false,hor:90,mode:'simples'};
/* ---------- modo simples: legendas, roteiro e glossário ---------- */
var EZ={
pt:{mS:'🎤 Modo apresentação',mC:'🔧 Modo completo',mNote:'Modo apresentação: só o essencial, com legenda em cada gráfico. Modo completo: todas as alavancas e detalhes.',
 heroT:'Os 4 números da call',
 h1:['Chega mais do que sai','Em 30 dias entraram {i} chamados no L2 e saíram {o}. Sobram {g} por mês na fila.'],
 h2:['{p}% nem deveria ser chamado','{n} de {t} são aviso automático da Microsoft ou e-mail de phishing reportado.'],
 h3:['{f} temas para {s} pessoas','Cada tema recebe, na mediana, {h} h de foco por mês — pouco para qualquer projeto andar.'],
 h4:['{f} h livres por dia','O maior bloco livre tem {b} h. Houve choque de agenda em {d} de {w} dias úteis.'],
 how:'📖 Como ler',
 l_gap:'<b>Linha azul</b> = chamados que chegaram, somados dia a dia. <b>Linha laranja</b> = chamados que o time fechou. A <b>área vermelha</b> entre as duas é o que ficou acumulado: quanto mais ela abre, mais a fila cresce.',
 l_fte:'Cada cenário tem duas barras. <b>Barra de cima</b>: pessoas a mais só para a fila parar de crescer. <b>Barra de baixo</b>: para também zerar os atrasados em 2 meses. Repare que, tirando o ruído, a necessidade cai.',
 l_sim:'Clique num cenário. A <b>linha tracejada cinza</b> é a fila se nada mudar. A <b>linha azul</b> é a fila no cenário escolhido. Os quadrinhos logo abaixo dos botões mostram o resultado em 90 dias.',
 l_dem:'Cada cor é uma forma de atender. <b style="color:var(--cp1)">Azul</b>: não deveria virar chamado. <b style="color:var(--cp2)">Laranja</b>: pedido repetido que pode virar formulário. <b style="color:var(--cp3)">Verde</b>: suporte simples. <b style="color:var(--cp4)">Amarelo</b>: trabalho que só o especialista faz. O ponto: só uma pequena parte da fila é trabalho de especialista.',
 l_dly:'Cada coluna é um dia. As cores empilhadas somam os chamados que chegaram naquele dia, por tipo de atendimento.',
 l_time:'A barra inteira é o mês útil (dias úteis × 10 h). <b style="color:var(--v-a)">Azul</b>: blocos de trabalho. <b style="color:var(--v-b)">Laranja</b>: reuniões e daily. <b>Cinza</b>: o que sobrou livre.',
 l_day:'Cada coluna é um dia útil e mostra as horas livres na agenda. A <b>linha vermelha tracejada</b> marca 2 h, o mínimo para uma tarefa de projeto. O <b>ponto vermelho</b> marca dia com dois compromissos no mesmo horário.',
 l_fr:'Cada barra é um tema (frente) e o tempo de foco que ele recebeu no mês. A <b>linha vermelha</b> é o mínimo para um tema andar. <b>Barra cinza</b> = tema abaixo do mínimo.',
 l_risk:'Quanto mais <b>para cima</b>, mais provável. Quanto mais <b>para a direita</b>, maior o estrago. Canto superior direito = mais grave. <b>Bolinha preta</b> = risco que existe porque o time é pequeno. <b>Bolinha branca</b> = outro motivo. Passe o mouse para ver a evidência.',
 l_plan:'Três etapas, da mais rápida para a mais estrutural. Marque o que já foi feito.',
 presT:'Escolha um cenário',pr0:'Hoje',pr1:'Tirando o ruído',pr2:'Ruído + catálogo',pr3:'+1 pessoa',
 glT:'📚 Glossário rápido',
 gl:[['L2','Time de infraestrutura que recebe o que o Service Desk (N1) não resolve.'],['N1','Service Desk: primeiro atendimento.'],['Vencido','Chamado que passou do prazo combinado (SLA).'],['SLA pausado','Relógio do prazo parado porque o chamado espera usuário, aprovação ou fornecedor.'],['Frente','Um tema de trabalho: Sentinel, Novo Lab, Data Lake, SBC…'],['Ruído','Chamado criado por automação (aviso da Microsoft) ou phishing reportado — não é demanda de verdade.'],['Catálogo','Formulário padrão no SDP para pedidos repetidos, como licença e acesso.'],['Colisão','Dois compromissos no mesmo horário da agenda.']],
 rtT:'🎯 Roteiro para a call (10 minutos)',
 rt:['Compartilhe a tela com esta aba aberta, no <b>Modo apresentação</b>. Use <b>Ctrl +</b> para aumentar o zoom.','Comece pelos <b>4 números</b>: chega mais do que sai, quase um terço é ruído, temas demais para o time, pouco tempo livre.','Em <b>A conta não fecha</b>, aponte a área vermelha: é o trabalho que fica para trás todo mês.','No <b>Simulador</b>, clique nos cenários em ordem: Hoje → Tirando o ruído → Ruído + catálogo → +1 pessoa. Mostre a fila em 90 dias mudando.','Em <b>Para onde vai a demanda</b>: só a parte amarela é trabalho de especialista.','Em <b>Tempo</b> e <b>Riscos</b>: pouco tempo livre e os pontos pretos no canto vermelho.','Feche com o <b>Plano em três ondas</b> e cole o <b>Resumo para a gestão</b> no chat da call.'],
 rtTip:'Dica: passe o mouse em qualquer barra ou linha para mostrar o número exato. Os selos dizem a origem: <b>ao vivo</b> = SDP de hoje; <b>retrato</b> = foto de 01/10; <b>HIPÓTESE</b> = premissa ajustável.'},
es:{mS:'🎤 Modo presentación',mC:'🔧 Modo completo',mNote:'Modo presentación: solo lo esencial, con leyenda en cada gráfico. Modo completo: todas las palancas y detalles.',
 heroT:'Los 4 números de la call',
 h1:['Entra más de lo que sale','En 30 días entraron {i} tickets a L2 y salieron {o}. Sobran {g} por mes en la cola.'],
 h2:['{p}% ni debería ser ticket','{n} de {t} son avisos automáticos de Microsoft o phishing reportado.'],
 h3:['{f} temas para {s} personas','Cada tema recibe, en mediana, {h} h de foco al mes.'],
 h4:['{f} h libres por día','El mayor bloque libre es de {b} h. Hubo choque de agenda en {d} de {w} días hábiles.'],
 how:'📖 Cómo leer',
 l_gap:'<b>Línea azul</b> = tickets que llegaron, sumados día a día. <b>Línea naranja</b> = tickets cerrados. El <b>área roja</b> entre ambas es lo acumulado.',
 l_fte:'Cada escenario tiene dos barras. <b>Arriba</b>: personas para que la cola deje de crecer. <b>Abajo</b>: para además vaciar los vencidos en 2 meses.',
 l_sim:'Haz clic en un escenario. La <b>línea punteada gris</b> es la cola sin cambios; la <b>azul</b>, el escenario elegido.',
 l_dem:'Cada color es una forma de atender. <b style="color:var(--cp1)">Azul</b>: no debería ser ticket. <b style="color:var(--cp2)">Naranja</b>: pedido repetido que puede ser formulario. <b style="color:var(--cp3)">Verde</b>: soporte simple. <b style="color:var(--cp4)">Amarillo</b>: trabajo de especialista.',
 l_dly:'Cada columna es un día; los colores suman los tickets que llegaron.',
 l_time:'La barra entera es el mes hábil. <b style="color:var(--v-a)">Azul</b>: bloques de trabajo. <b style="color:var(--v-b)">Naranja</b>: reuniones. <b>Gris</b>: libre.',
 l_day:'Horas libres por día hábil. <b>Línea roja</b> = 2 h, mínimo para tarea de proyecto. <b>Punto rojo</b> = día con choque de agenda.',
 l_fr:'Cada barra es un tema y su tiempo de foco al mes. <b>Línea roja</b> = mínimo para avanzar. <b>Gris</b> = bajo el mínimo.',
 l_risk:'<b>Arriba</b> = más probable. <b>Derecha</b> = mayor daño. <b>Punto negro</b> = riesgo por el tamaño del equipo.',
 l_plan:'Tres etapas, de la más rápida a la más estructural. Marca lo hecho.',
 presT:'Elige un escenario',pr0:'Hoy',pr1:'Sin el ruido',pr2:'Ruido + catálogo',pr3:'+1 persona',
 glT:'📚 Glosario rápido',
 gl:[['L2','Equipo de infraestructura que recibe lo que el Service Desk (N1) no resuelve.'],['N1','Service Desk: primera atención.'],['Vencido','Ticket fuera del plazo (SLA).'],['SLA pausado','Reloj detenido esperando usuario, aprobación o proveedor.'],['Frente','Un tema de trabajo: Sentinel, Nuevo Lab, Data Lake…'],['Ruido','Ticket creado por automatización o phishing reportado.'],['Catálogo','Formulario estándar para pedidos repetidos.'],['Colisión','Dos compromisos a la misma hora.']],
 rtT:'🎯 Guion para la call (10 minutos)',
 rt:['Comparte la pantalla en <b>Modo presentación</b>; usa <b>Ctrl +</b> para ampliar.','Empieza por los <b>4 números</b>.','En <b>La cuenta no cierra</b>, señala el área roja.','En el <b>Simulador</b>, haz clic en los escenarios en orden.','En <b>Demanda</b>: solo el amarillo es trabajo de especialista.','En <b>Tiempo</b> y <b>Riesgos</b>: poco tiempo libre y los puntos negros.','Cierra con el <b>Plan</b> y pega el <b>Resumen</b> en el chat.'],
 rtTip:'Pasa el mouse sobre cualquier barra para ver el número. Sellos: <b>en vivo</b> = SDP de hoy; <b>foto</b> = 01/10; <b>HIPÓTESIS</b> = premisa ajustable.'},
en:{mS:'🎤 Presentation mode',mC:'🔧 Full mode',mNote:'Presentation mode: essentials only, with a legend on every chart. Full mode: all levers and details.',
 heroT:'The 4 numbers for the call',
 h1:['More comes in than goes out','Over 30 days {i} tickets came into L2 and {o} left. {g} pile up each month.'],
 h2:['{p}% should not even be a ticket','{n} of {t} are automatic Microsoft notices or reported phishing.'],
 h3:['{f} topics for {s} people','Each topic gets, at the median, {h} h of focus a month.'],
 h4:['{f} free hours a day','The longest free block is {b} h. Calendar clashes on {d} of {w} working days.'],
 how:'📖 How to read',
 l_gap:'<b>Blue line</b> = tickets that came in, added up day by day. <b>Orange line</b> = tickets closed. The <b>red area</b> between them is what piled up.',
 l_fte:'Each scenario has two bars. <b>Top</b>: people needed just to stop growth. <b>Bottom</b>: to also clear overdue in 2 months.',
 l_sim:'Click a scenario. The <b>dashed grey line</b> is the queue with no change; the <b>blue line</b> is the chosen scenario.',
 l_dem:'Each colour is a way of handling. <b style="color:var(--cp1)">Blue</b>: should not be a ticket. <b style="color:var(--cp2)">Orange</b>: repeated request that can become a form. <b style="color:var(--cp3)">Green</b>: simple support. <b style="color:var(--cp4)">Yellow</b>: specialist work.',
 l_dly:'Each column is a day; colours add up the tickets that came in.',
 l_time:'The full bar is the working month. <b style="color:var(--v-a)">Blue</b>: work blocks. <b style="color:var(--v-b)">Orange</b>: meetings. <b>Grey</b>: free.',
 l_day:'Free hours per working day. <b>Red dashed line</b> = 2 h, the minimum for project work. <b>Red dot</b> = a clash day.',
 l_fr:'Each bar is a topic and its monthly focus time. <b>Red line</b> = minimum to move. <b>Grey</b> = below it.',
 l_risk:'<b>Up</b> = more likely. <b>Right</b> = more damage. <b>Black dot</b> = risk from team size.',
 l_plan:'Three steps, from quickest to most structural. Tick what is done.',
 presT:'Pick a scenario',pr0:'Today',pr1:'Without noise',pr2:'Noise + catalog',pr3:'+1 person',
 glT:'📚 Quick glossary',
 gl:[['L2','Infrastructure team that takes what the Service Desk (L1) cannot solve.'],['L1','Service Desk: first line.'],['Overdue','Ticket past its SLA.'],['Paused SLA','Clock stopped waiting on user, approval or vendor.'],['Front','A work topic: Sentinel, New Lab, Data Lake…'],['Noise','Ticket created by automation or reported phishing.'],['Catalog','Standard form for repeated requests.'],['Clash','Two commitments at the same time.']],
 rtT:'🎯 Call script (10 minutes)',
 rt:['Share your screen in <b>Presentation mode</b>; use <b>Ctrl +</b> to zoom.','Start with the <b>4 numbers</b>.','In <b>The numbers do not add up</b>, point at the red area.','In the <b>Simulator</b>, click the scenarios in order.','In <b>Demand</b>: only yellow is specialist work.','In <b>Time</b> and <b>Risks</b>: little free time and the black dots.','Close with the <b>Plan</b> and paste the <b>Summary</b> in the chat.'],
 rtTip:'Hover any bar or line for the exact number. Badges: <b>live</b> = today’s SDP; <b>snapshot</b> = 01/10; <b>HYPOTHESIS</b> = adjustable assumption.'}};
function ez(k){return (EZ[Lg()]||EZ.pt)[k]}
function howto(k){return '<div class="cp-how"><b>'+esc(ez('how'))+'</b> '+ez(k)+'</div>'}
var PRESETS=[['pr0',{fte:0,auto:0,cat:0}],['pr1',{fte:0,auto:100,cat:0}],['pr2',{fte:0,auto:100,cat:40}],['pr3',{fte:1,auto:100,cat:40}]];
function presetOn(o){return S.fte===o.fte&&S.auto===o.auto&&S.cat===o.cat}

try{var sv=JSON.parse(ls('cap_sim2')||'null'); if(sv)for(var k in sv)if(k in S&&k!=='lane')S[k]=sv[k]}catch(e){}
function save(){var o={};for(var k in S)if(k!=='lane')o[k]=S[k];ls('cap_sim2',JSON.stringify(o))}

/* ---------- números (ao vivo quando dá) ---------- */
function N(){
  var SD=(typeof SDP!=='undefined'&&SDP)||window.SDP||{}, L2=SD.l2||{}, B=L2.byOwner||{}, perf=SD.perf&&SD.perf.l2, live=!!(perf&&perf.totals);
  var ov=0,pa=0; for(var k in B){ov+=B[k].overdue||0;pa+=B[k].paused||0}
  var inn=live?perf.totals.in:CAPD.flowSnap.in, done=live?perf.totals.done:CAPD.flowSnap.done;
  var owners=live?Object.keys(perf.byOwner||{}).filter(function(k){return (perf.byOwner[k].done||0)>0}).length:CAPD.flowSnap.owners;
  var daily=live?perf.daily:CAPD.flowSnap.daily;
  var bt=CAPD.demand.byType, noise=bt.ruido.n+bt.phishing.n, noiseDone=bt.ruido.resolved+bt.phishing.resolved, noiseOpen=bt.ruido.open+bt.phishing.open;
  var catN=bt.licenca.n+bt.acesso.n+bt.onboarding.n;
  return {open:L2.total||0,overdue:ov,paused:pa,inn:inn,done:done,owners:Math.max(owners,1),perPerson:done/Math.max(owners,1),daily:daily,
    noise:noise,noiseDone:noiseDone,noiseOpen:noiseOpen,catN:catN,dTotal:CAPD.demand.total,live:live,from:live?SD.perf.from:CAPD.demand.window.from,to:live?SD.perf.to:CAPD.demand.window.to};
}
/* modelo — tudo por mês (30 dias) */
function model(n,o){
  var a=o.auto/100, c=o.cat/100;
  var inM=n.inn-a*n.noise, outM=n.done-a*n.noiseDone;
  var freedH=a*n.noiseDone*o.mpn/60 + n.catN*o.hpt*c;
  var freedT=freedH/o.hpt, fteT=o.fte*n.perPerson;
  var net=inM-(outM+freedT+fteT);                 /* saldo/mês: + cresce, − encolhe */
  var gapNoFte=inM-(outM+freedT);
  var b0=Math.max(0,n.open-a*n.noiseOpen);
  return {net:net,freedH:freedH,b0:b0,
    fteStop:Math.max(0,gapNoFte)/n.perPerson,
    fteClear:Math.max(0,gapNoFte+n.overdue/2)/n.perPerson,
    at:function(d){return Math.max(0,b0+net*d/30)},
    zero:net<0?Math.ceil(b0/(-net)*30):null};
}

/* ---------- riscos ---------- */
function risks(n){
  var m0=model(n,{auto:0,cat:0,fte:0,hpt:S.hpt,mpn:S.mpn}), cal=CAPD.cal.past;
  var R=[
   {id:1,p:5,i:5,sz:0,t:{pt:'Certificado vence sem dono',es:'Certificado vence sin dueño',en:'Certificate expires with no owner'},
    e:{pt:'Prazo em 05/10 pela ata de 28/09 e quatro dias sem responsável nomeado. Se for o do SBC, cai a telefonia PSTN ↔ Teams.',es:'Plazo 05/10 por el acta del 28/09 y cuatro días sin responsable. Si es el del SBC, cae la telefonía PSTN ↔ Teams.',en:'Due 05/10 per the 28/09 recap and four days with no owner. If it is the SBC one, PSTN ↔ Teams calling drops.'}},
   {id:2,p:5,i:4,sz:1,t:{pt:'Fila L2 cresce mais rápido do que sai',es:'La cola L2 crece más rápido de lo que sale',en:'L2 queue grows faster than it drains'},
    e:{pt:'Entrada '+n.inn+' × saída '+n.done+' em 30 dias: +'+nf(n.inn-n.done,0)+' por mês. '+n.overdue+' vencidos hoje.',es:'Entrada '+n.inn+' × salida '+n.done+' en 30 días: +'+nf(n.inn-n.done,0)+' al mes. '+n.overdue+' vencidos hoy.',en:n.inn+' in × '+n.done+' out over 30 days: +'+nf(n.inn-n.done,0)+' a month. '+n.overdue+' overdue today.'}},
   {id:3,p:3,i:5,sz:1,t:{pt:'Frente com uma pessoa só',es:'Frente con una sola persona',en:'Fronts held by one person'},
    e:{pt:CAPD.team.fronts+' frentes para '+CAPD.team.size+' pessoas. Férias, doença ou saída param a frente inteira — não há segundo nome.',es:CAPD.team.fronts+' frentes para '+CAPD.team.size+' personas. Vacaciones o salida detienen el frente entero.',en:CAPD.team.fronts+' fronts for '+CAPD.team.size+' people. Leave or departure stops the whole front — there is no second name.'}},
   {id:4,p:3,i:5,sz:1,t:{pt:'Ruído esconde o alerta real',es:'El ruido esconde la alerta real',en:'Noise hides the real alert'},
    e:{pt:n.noise+' de '+n.dTotal+' chamados em 30 dias foram aviso automático ou phishing reportado. Com o time no limite, o alerta verdadeiro espera na mesma fila.',es:n.noise+' de '+n.dTotal+' tickets en 30 días fueron aviso automático o phishing. Con el equipo al límite, la alerta real espera en la misma cola.',en:n.noise+' of '+n.dTotal+' tickets in 30 days were automatic notices or reported phishing. With the team at the limit, the real alert waits in the same queue.'}},
   {id:5,p:4,i:3,sz:0,t:{pt:'Decisão sai da daily sem dono',es:'La decisión sale de la daily sin dueño',en:'Decisions leave the daily with no owner'},
    e:{pt:CAPD.daily.withoutOwner+' das '+CAPD.daily.of+' últimas atas legíveis fecham pedindo um responsável.',es:CAPD.daily.withoutOwner+' de las '+CAPD.daily.of+' últimas actas legibles cierran pidiendo un responsable.',en:CAPD.daily.withoutOwner+' of the last '+CAPD.daily.of+' readable recaps close asking for an owner.'}},
   {id:6,p:4,i:4,sz:1,t:{pt:'Projeto com prazo disputa com a operação',es:'Proyecto con plazo compite con la operación',en:'Deadline projects compete with operations'},
    e:{pt:'Mediana de '+nf(CAPD.cal.frontMedian)+' h de foco por frente no mês e maior bloco livre de '+nf(cal.longest_free_block_avg_h)+' h por dia. Lab, Sentinel e Data Lake não cabem em pedaços de uma hora.',es:'Mediana de '+nf(CAPD.cal.frontMedian)+' h de foco por frente al mes y mayor bloque libre de '+nf(cal.longest_free_block_avg_h)+' h por día.',en:'Median '+nf(CAPD.cal.frontMedian)+' h of focus per front per month and a '+nf(cal.longest_free_block_avg_h)+' h longest free block per day.'}},
   {id:7,p:5,i:3,sz:1,t:{pt:'Agenda sem foco',es:'Agenda sin foco',en:'A calendar with no focus'},
    e:{pt:cal.collisions+' colisões em '+cal.collision_days+' de '+cal.totals.workdays+' dias úteis, '+nf(cal.switches_per_day)+' trocas de contexto por dia e '+cal.meetings_over_foco+' reuniões em cima de bloco de foco.',es:cal.collisions+' colisiones en '+cal.collision_days+' de '+cal.totals.workdays+' días hábiles y '+nf(cal.switches_per_day)+' cambios de contexto por día.',en:cal.collisions+' clashes on '+cal.collision_days+' of '+cal.totals.workdays+' working days and '+nf(cal.switches_per_day)+' context switches per day.'}},
   {id:8,p:4,i:3,sz:1,t:{pt:'Capacidade terceirizada sem vazão',es:'Capacidad tercerizada sin salida',en:'Outsourced capacity not delivering'},
    e:{pt:'A fila sob parceiro externo tem quase todos os chamados vencidos e quase nenhum resolvido em 30 dias. Capacidade que existe no papel e não na fila.',es:'La cola bajo socio externo tiene casi todos los tickets vencidos y casi ninguno resuelto en 30 días.',en:'The queue under the external partner is almost all overdue with almost nothing resolved in 30 days.'}},
   {id:9,p:3,i:4,sz:1,t:{pt:'Evidência de compliance desatualizada',es:'Evidencia de compliance desactualizada',en:'Stale compliance evidence'},
    e:{pt:'A baseline do backlog no OneDrive tem 27 dias. Sem tempo para manter registro, a evidência de SOX/GxP envelhece junto.',es:'La baseline del backlog en OneDrive tiene 27 días. Sin tiempo para mantener registro, la evidencia SOX/GxP envejece.',en:'The OneDrive backlog baseline is 27 days old. Without time to keep records, SOX/GxP evidence ages with it.'}},
   {id:10,p:4,i:3,sz:0,t:{pt:'SLA pausado mascara atraso',es:'SLA pausado oculta atraso',en:'Paused SLA masks delay'},
    e:{pt:n.paused+' de '+n.open+' chamados abertos estão com o relógio parado. O indicador fica verde e o usuário continua esperando.',es:n.paused+' de '+n.open+' tickets abiertos tienen el reloj detenido.',en:n.paused+' of '+n.open+' open tickets have the clock stopped.'}}
  ];
  return R;
}

/* ---------- plano ---------- */
var PLAN=[
 {w:1,id:'p1',t:{pt:'Deduplicar e filtrar os avisos do Service Health no SDP e no Flow do Teams',es:'Deduplicar y filtrar los avisos de Service Health en SDP y en el Flow de Teams',en:'Deduplicate and filter Service Health notices in SDP and the Teams Flow'},fx:'auto'},
 {w:1,id:'p2',t:{pt:'Phishing reportado vai direto para a automação de segurança, não vira chamado L2',es:'El phishing reportado va directo a la automatización de seguridad, no a L2',en:'Reported phishing goes straight to security automation, not to L2'},fx:'phish'},
 {w:1,id:'p3',t:{pt:'Regra da daily: nada sai sem dono e data escritos no chat',es:'Regla de la daily: nada sale sin dueño y fecha escritos en el chat',en:'Daily rule: nothing leaves without an owner and a date written in the chat'},fx:'own'},
 {w:1,id:'p4',t:{pt:'Limite de frentes: no máximo 3 frentes andando por pessoa por semana',es:'Límite de frentes: máximo 3 frentes activos por persona por semana',en:'Front limit: at most 3 moving fronts per person per week'},fx:'wip'},
 {w:1,id:'p5',t:{pt:'Agenda: apagar blocos duplicados e proteger duas janelas de 2 h por dia',es:'Agenda: borrar bloques duplicados y proteger dos ventanas de 2 h por día',en:'Calendar: delete duplicate blocks and protect two 2-hour windows a day'},fx:'cal'},
 {w:2,id:'p6',t:{pt:'Catálogo no SDP para licença, acesso, entrada e saída de pessoas, com aprovação embutida',es:'Catálogo en SDP para licencia, acceso, ingresos y bajas, con aprobación incluida',en:'SDP catalog for licences, access, joiners and leavers, with built-in approval'},fx:'cat'},
 {w:2,id:'p7',t:{pt:'Entrada de pessoas avisada pelo RH com antecedência mínima combinada',es:'Ingresos avisados por RR. HH. con antelación mínima acordada',en:'Joiners notified by HR with an agreed minimum lead time'},fx:'onb'},
 {w:2,id:'p8',t:{pt:'Pausados: prazo de retorno do usuário e fechamento automático depois dele',es:'Pausados: plazo de respuesta del usuario y cierre automático después',en:'Paused tickets: user reply deadline and auto-close after it'},fx:'pause'},
 {w:2,id:'p9',t:{pt:'Parceiro externo: prazo por escrito ou a fila volta para o time',es:'Socio externo: plazo por escrito o la cola vuelve al equipo',en:'External partner: a written deadline or the queue comes back to the team'},fx:'ext'},
 {w:3,id:'p10',t:{pt:'Refazer a conta com este painel; se o saldo seguir positivo, pedir pessoa com o número na mão',es:'Rehacer la cuenta con este panel; si el saldo sigue positivo, pedir persona con el número en la mano',en:'Redo the maths with this panel; if the net stays positive, ask for headcount with the number in hand'},fx:'fte'},
 {w:3,id:'p11',t:{pt:'Portfólio: congelar ou encerrar frentes que recebem menos que o mínimo por mês e agrupar o resto em trilhas',es:'Portafolio: congelar o cerrar frentes bajo el mínimo mensual y agrupar el resto',en:'Portfolio: freeze or close fronts below the monthly minimum and group the rest'},fx:'port'},
 {w:3,id:'p12',t:{pt:'Ritual mensal de capacidade com a gestão, usando esta aba',es:'Ritual mensual de capacidad con la gerencia, usando esta pestaña',en:'Monthly capacity review with management, using this tab'},fx:'rit'}
];
function effect(fx,n){
  var bt=CAPD.demand.byType, cal=CAPD.cal.past, l=Lg();
  var M={
   auto:{pt:'tira ~'+bt.ruido.n+' chamados/mês da fila',es:'saca ~'+bt.ruido.n+' tickets/mes de la cola',en:'removes ~'+bt.ruido.n+' tickets/month'},
   phish:{pt:'tira ~'+bt.phishing.n+' chamados/mês da fila',es:'saca ~'+bt.phishing.n+' tickets/mes',en:'removes ~'+bt.phishing.n+' tickets/month'},
   own:{pt:'ataca as '+CAPD.daily.withoutOwner+' de '+CAPD.daily.of+' atas sem dono',es:'ataca las '+CAPD.daily.withoutOwner+' de '+CAPD.daily.of+' actas sin dueño',en:'targets the '+CAPD.daily.withoutOwner+' of '+CAPD.daily.of+' recaps with no owner'},
   wip:{pt:'troca '+CAPD.team.fronts+' frentes picadas por poucas andando',es:'cambia '+CAPD.team.fronts+' frentes picados por pocos avanzando',en:'swaps '+CAPD.team.fronts+' sliced fronts for a few that move'},
   cal:{pt:'devolve até '+cal.duplicates+' slots duplicados e reduz as '+cal.collisions+' colisões',es:'devuelve hasta '+cal.duplicates+' slots duplicados',en:'returns up to '+cal.duplicates+' duplicate slots'},
   cat:{pt:'padroniza ~'+n.catN+' chamados/mês',es:'estandariza ~'+n.catN+' tickets/mes',en:'standardises ~'+n.catN+' tickets/month'},
   onb:{pt:'mediana de '+nf(bt.onboarding.medHours,0)+' h por entrada ou saída hoje',es:'mediana de '+nf(bt.onboarding.medHours,0)+' h por ingreso o baja hoy',en:'median '+nf(bt.onboarding.medHours,0)+' h per joiner or leaver today'},
   pause:{pt:n.paused+' chamados com relógio parado',es:n.paused+' tickets con reloj detenido',en:n.paused+' tickets with the clock stopped'},
   ext:{pt:'capacidade que hoje não sai',es:'capacidad que hoy no sale',en:'capacity that is not delivering today'},
   fte:{pt:'pedido baseado em saldo medido',es:'pedido basado en saldo medido',en:'a request based on measured net flow'},
   port:{pt:'foco onde há prazo',es:'foco donde hay plazo',en:'focus where there is a deadline'},
   rit:{pt:'decisão mensal com número',es:'decisión mensual con número',en:'a monthly decision with numbers'}};
  return (M[fx]&&(M[fx][l]||M[fx].pt))||'';
}
function planDone(){try{return JSON.parse(ls('cap_plan')||'{}')||{}}catch(e){return{}}}

/* ---------- estilos próprios ---------- */
function css(){
  if(document.getElementById('cp-css'))return;
  var s=document.createElement('style'); s.id='cp-css';
  s.textContent=
  ':root{--cp1:#2a78d6;--cp2:#eb6834;--cp3:#1baf7a;--cp4:#eda100}'+
  '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--cp1:#3987e5;--cp2:#d95926;--cp3:#199e70;--cp4:#c98500}}'+
  ':root[data-theme="dark"]{--cp1:#3987e5;--cp2:#d95926;--cp3:#199e70;--cp4:#c98500}'+
  '.cp-hero{display:grid;gap:10px;grid-template-columns:repeat(auto-fill,minmax(165px,1fr));margin-top:12px}'+
  '.cp-k{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:12px 14px;box-shadow:var(--raise)}'+
  '.cp-k .n{font-family:var(--display);font-weight:700;font-size:27px;line-height:1.05;font-variant-numeric:tabular-nums}'+
  '.cp-k .l{font-size:12.5px;font-weight:600;margin-top:3px;color:var(--ink)}.cp-k .x{font-size:11.5px;color:var(--ink-3);margin-top:4px;line-height:1.35}'+
  '.cp-k.c .n{color:var(--crit)}.cp-k.w .n{color:var(--warn)}'+
  '.cp-tag{font-family:var(--mono);font-size:9.5px;font-weight:600;letter-spacing:.05em;padding:1px 6px;border-radius:8px;background:var(--surface-2);color:var(--ink-3);vertical-align:2px;margin-left:5px;white-space:nowrap}'+
  '.cp-tag.live{background:var(--ok-bg);color:var(--ok)}.cp-tag.hyp{background:var(--warn-bg);color:var(--warn)}'+
  '.cp-svg{width:100%;min-height:200px}.cp-svg svg{display:block;overflow:visible}'+
  '.cp-lv{display:grid;gap:14px 22px;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));margin-top:4px}'+
  '.cp-lv label{display:block;font-size:12.5px;color:var(--ink);font-weight:600;margin-bottom:4px}'+
  '.cp-lv .row{display:flex;align-items:center;gap:10px}.cp-lv input[type=range]{flex:1;accent-color:var(--accent);min-width:0}'+
  '.cp-lv output{font-family:var(--mono);font-size:12px;min-width:58px;text-align:right;color:var(--ink);font-variant-numeric:tabular-nums}'+
  '.cp-res{display:grid;gap:10px;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));margin-top:14px}'+
  '.cp-lanes{display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));margin-top:12px}'+
  '.cp-lane{text-align:left;background:var(--surface);border:1px solid var(--line);border-top:4px solid var(--c);border-radius:var(--r);padding:10px 12px;cursor:pointer;color:inherit;box-shadow:var(--raise)}'+
  '.cp-lane[aria-pressed="true"]{box-shadow:0 0 0 2px var(--accent),var(--raise)}.cp-lane.dim{opacity:.45}'+
  '.cp-lane b{display:block;font-family:var(--display);font-size:20px;font-variant-numeric:tabular-nums}.cp-lane span{display:block;font-size:12.5px;font-weight:600}.cp-lane small{display:block;font-size:11.5px;color:var(--ink-3);margin-top:4px;line-height:1.35}'+
  '.cp-bars{display:grid;grid-template-columns:minmax(110px,170px) minmax(0,1fr) 44px;gap:5px 10px;align-items:center}'+
  '.cp-bars .lb{font-size:12.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cp-bars .tr{height:14px;display:flex}.cp-bars .sg{height:100%;border-radius:0 4px 4px 0;min-width:2px}'+
  '.cp-bars .vl{font-family:var(--mono);font-size:11.5px;text-align:right;color:var(--ink-2);font-variant-numeric:tabular-nums}.cp-bars .dim{opacity:.35}'+
  '.cp-stack{display:flex;height:26px;border-radius:6px;overflow:hidden;gap:2px;background:var(--surface)}.cp-stack div{height:100%}'+
  '.cp-scroll{max-height:380px;overflow-y:auto;padding-right:4px}'+
  '.cp-mx{display:grid;grid-template-columns:28px repeat(5,minmax(0,1fr));grid-template-rows:repeat(5,64px) 26px;gap:3px;position:relative}'+
  '.cp-mx .cell{border-radius:4px;position:relative}.cp-mx .ax{font-family:var(--mono);font-size:10.5px;color:var(--ink-3);display:flex;align-items:center;justify-content:center}'+
  '.cp-dot{position:absolute;width:24px;height:24px;border-radius:50%;font-family:var(--mono);font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:default;transform:translate(-50%,-50%)}'+
  '.cp-dot.sz{background:var(--ink);color:var(--surface);border:2px solid var(--surface)}.cp-dot.ot{background:var(--surface);color:var(--ink);border:2px solid var(--ink)}'+
  '.cp-rl{margin:10px 0 0;padding:0;list-style:none;display:grid;gap:6px}.cp-rl li{font-size:13px;color:var(--ink-2);display:grid;grid-template-columns:28px minmax(0,1fr);gap:8px}.cp-rl li b{color:var(--ink)}'+
  '.cp-rl .nm{font-family:var(--mono);font-size:11px;font-weight:600;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center}'+
  '.cp-waves{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));margin-top:10px}'+
  '.cp-wave{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:12px 14px;box-shadow:var(--raise)}'+
  '.cp-wave h3{font-family:var(--display);font-size:14px;margin:0 0 8px}.cp-wave .bar{height:6px;border-radius:3px;background:var(--v-track);overflow:hidden;margin-bottom:10px}.cp-wave .bar i{display:block;height:100%;background:var(--ok)}'+
  '.cp-act{display:grid;grid-template-columns:20px minmax(0,1fr);gap:8px;padding:7px 0;border-top:1px solid var(--line-soft);font-size:13px;cursor:pointer}'+
  '.cp-act input{margin-top:3px;accent-color:var(--ok)}.cp-act.done span{text-decoration:line-through;color:var(--ink-3)}.cp-act small{display:block;color:var(--ink-3);font-size:11.5px;margin-top:2px}'+
  '.cp-exec{background:var(--surface);border:1px solid var(--line);border-left:3px solid var(--accent);border-radius:var(--r);padding:14px 16px;box-shadow:var(--raise);font-size:13.5px;line-height:1.6;white-space:pre-wrap;font-family:var(--body);color:var(--ink)}'+
  '.cp-tbl summary{cursor:pointer;color:var(--accent);font-weight:600;font-size:12px;margin-top:10px}.cp-tbl .tbl{margin-top:6px}'+
  '.cp-legend{display:flex;gap:14px;flex-wrap:wrap;font-size:12px;color:var(--ink-2);margin:2px 0 10px}.cp-legend i{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:5px;vertical-align:-1px}'+
  '.cp-legend i.ln{height:2px;width:14px;vertical-align:3px;border-radius:1px}'+
  '.cp-how{font-size:12.5px;line-height:1.5;color:var(--ink-2);background:var(--surface-2);border-radius:6px;padding:8px 10px;margin:0 0 10px}.cp-how b:first-child{color:var(--ink);margin-right:4px}'+'.cp-mode{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-top:10px}.cp-mode button,.cp-pre button{font-size:13px;font-weight:600;padding:7px 13px;border:1px solid var(--line);border-radius:18px;background:var(--surface);color:var(--ink-2);cursor:pointer}'+'.cp-mode button[aria-pressed="true"],.cp-pre button[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}'+'.cp-pre{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0 4px}'+'.cp-big{display:grid;gap:10px;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));margin-top:12px}.cp-big .cp-k .n{font-size:22px}.cp-big .cp-k .x{font-size:12.5px;color:var(--ink-2)}'+'.cp-gl{display:grid;gap:6px 14px;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));font-size:12.5px;color:var(--ink-2)}.cp-gl b{color:var(--ink)}'+'.cp-rt{margin:6px 0 0;padding-left:20px;font-size:13.5px;color:var(--ink-2)}.cp-rt li{margin-bottom:5px}'+'@media (max-width:620px){.cp-bars{grid-template-columns:96px minmax(0,1fr) 36px}.cp-mx{grid-template-rows:repeat(5,52px) 24px}.cp-k .n{font-size:23px}}';
  document.head.appendChild(s);
}

/* ---------- peças ---------- */
function tag(kind){var m={live:t('live'),snap:t('snap'),hyp:t('hyp'),prov:({pt:'PROVÁVEL',es:'PROBABLE',en:'PROBABLE'})[Lg()]};return '<span class="cp-tag '+kind+'">'+esc(m[kind])+'</span>'}
function sec(id,title,note,body,tg){return '<section id="'+id+'"><div class="sh"><h2>'+esc(title)+'</h2>'+(tg||'')+'</div>'+(note?'<p class="snote">'+esc(note)+'</p>':'')+body+'</section>'}
function viz(title,note,body,tg){return '<div class="viz"><h3>'+esc(title)+(tg||'')+'</h3>'+(note?'<div class="vs">'+esc(note)+'</div>':'')+body+'</div>'}
function tbl(head,rows){return '<details class="cp-tbl"><summary>'+esc(window.BL?BL.u('tbl'):'tabela')+'</summary><div class="tscroll" style="box-shadow:none"><table class="tbl"><thead><tr>'+
  head.map(function(h,i){return '<th'+(i?' class="num"':'')+'>'+esc(h)+'</th>'}).join('')+'</tr></thead><tbody>'+
  rows.map(function(r){return '<tr>'+r.map(function(c,i){return '<td'+(i?' class="num"':'')+'>'+esc(c)+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table></div></details>'}
function tip(html){return ' data-tip="'+esc(html)+'"'}
function dm(s){return s.slice(8,10)+'/'+s.slice(5,7)}

/* ---------- vista ---------- */
function view(){
  css();
  var n=N(), cal=CAPD.cal.past, h='';
  var srcTag=n.live?tag('live'):tag('snap');
  var SIMP=S.mode==='simples';
  h+='<section><div class="sh"><h2>📐 '+esc(t('title'))+'</h2><span class="sc">'+esc(pick(CAPD.src))+'</span></div>'+
     '<div class="cp-mode"><button data-mode="simples" aria-pressed="'+SIMP+'">'+esc(ez('mS'))+'</button><button data-mode="completo" aria-pressed="'+(!SIMP)+'">'+esc(ez('mC'))+'</button></div>'+
     '<p class="snote" style="margin-top:8px">'+esc(ez('mNote'))+'</p>'+(SIMP?'':'<p class="snote">'+esc(t('sub'))+'</p><p class="snote"><b>'+esc(t('how'))+':</b> '+esc(t('howT'))+'</p>')+
     '<details class="viz" style="margin-top:10px"'+(SIMP?' open':'')+'><summary style="cursor:pointer;font-weight:600;font-family:var(--display)">'+esc(ez('rtT'))+'</summary><ol class="cp-rt">'+ez('rt').map(function(x){return '<li>'+x+'</li>'}).join('')+'</ol><div class="cp-how" style="margin-top:8px">'+ez('rtTip')+'</div></details>';
  var gapM=n.inn-n.done, autoPct=Math.round(n.noise/Math.max(n.dTotal,1)*100);
  var K=[
   {c:'c',n:(gapM>0?'+':'')+nf(gapM,0),l:t('k1'),x:sub(t('k1x'),{i:n.inn,o:n.done}),g:srcTag},
   {c:'w',n:autoPct+'%',l:t('k2'),x:sub(t('k2x'),{n:n.noise,t:n.dTotal}),g:tag('snap')},
   {c:'w',n:CAPD.team.fronts,l:sub(t('k3'),{p:CAPD.team.size}),x:sub(t('k3x'),{h:nf(CAPD.cal.frontMedian)}),g:tag('snap')},
   {c:'c',n:nf(cal.free_h_per_day)+' h',l:t('k4'),x:sub(t('k4x'),{b:nf(cal.longest_free_block_avg_h),c:cal.collisions,d:cal.collision_days,w:cal.totals.workdays}),g:tag('snap')},
   {c:'w',n:Math.round(n.paused/Math.max(n.open,1)*100)+'%',l:t('k5'),x:sub(t('k5x'),{p:n.paused,t:n.open}),g:tag('live')},
   {c:'c',n:CAPD.daily.withoutOwner+'/'+CAPD.daily.of,l:t('k6'),x:t('k6x'),g:tag('snap')}];
  if(SIMP){var H=[['h1',{i:n.inn,o:n.done,g:(gapM>0?'+':'')+gapM},'c',srcTag],['h2',{p:autoPct,n:n.noise,t:n.dTotal},'w',tag('snap')],['h3',{f:CAPD.team.fronts,s:CAPD.team.size,h:nf(CAPD.cal.frontMedian)},'w',tag('snap')],['h4',{f:nf(cal.free_h_per_day),b:nf(cal.longest_free_block_avg_h),d:cal.collision_days,w:cal.totals.workdays},'c',tag('snap')]];
    h+='<h3 style="font-family:var(--display);font-size:15px;margin:16px 0 0">'+esc(ez('heroT'))+'</h3><div class="cp-big">'+H.map(function(x,i){var e=ez(x[0]);return '<div class="cp-k '+x[2]+'"><div class="n">'+(i+1)+'. '+esc(sub(e[0],x[1]))+x[3]+'</div><div class="x">'+esc(sub(e[1],x[1]))+'</div></div>'}).join('')+'</div>';
    h+='<details class="viz" style="margin-top:10px"><summary style="cursor:pointer;font-weight:600;font-family:var(--display)">'+esc(ez('glT'))+'</summary><div class="cp-gl" style="margin-top:8px">'+ez('gl').map(function(g){return '<div><b>'+esc(g[0])+'</b> — '+esc(g[1])+'</div>'}).join('')+'</div></details></section>';}
  else h+='<div class="cp-hero">'+K.map(function(k){return '<div class="cp-k '+k.c+'"><div class="n">'+esc(k.n)+'</div><div class="l">'+esc(k.l)+k.g+'</div><div class="x">'+esc(k.x)+'</div></div>'}).join('')+'</div></section>';

  /* 1 · a conta não fecha */
  var sc=[{k:'sc0',o:{auto:0,cat:0}},{k:'sc1',o:{auto:100,cat:0}},{k:'sc2',o:{auto:100,cat:40}}].map(function(x){
    var m=model(n,{auto:x.o.auto,cat:x.o.cat,fte:0,hpt:S.hpt,mpn:S.mpn}); return {k:x.k,a:m.fteStop,b:m.fteClear}});
  var mx=Math.max.apply(null,sc.map(function(s){return s.b}).concat([0.5]));
  var fte='<div class="cp-legend"><span><i style="background:var(--v-s1)"></i>'+esc(t('fteA'))+'</span><span><i style="background:var(--v-s3)"></i>'+esc(t('fteB'))+'</span></div><div class="cp-bars">'+
    sc.map(function(s){return '<div class="lb">'+esc(t(s.k))+'</div><div style="display:flex;flex-direction:column;gap:2px">'+
      '<div class="tr"'+tip('<b>'+t(s.k)+'</b><br>'+t('fteA')+': '+nf(s.a)+'<br>'+t('fteB')+': '+nf(s.b))+'><div class="sg" style="width:'+(s.a/mx*100)+'%;background:var(--v-s1)"></div></div>'+
      '<div class="tr"'+tip('<b>'+t(s.k)+'</b><br>'+t('fteB')+': '+nf(s.b))+'><div class="sg" style="width:'+(s.b/mx*100)+'%;background:var(--v-s3)"></div></div></div>'+
      '<div class="vl">'+nf(s.a)+'<br>'+nf(s.b)+'</div>'}).join('')+'</div>'+
    tbl(['',t('fteA'),t('fteB')],sc.map(function(s){return [t(s.k),nf(s.a),nf(s.b)]}));
  h+=sec('cp-s1','📉 '+t('s1'),'', '<div class="grid2">'+
     viz(t('s1'),SIMP?'':t('s1x'),howto('l_gap')+'<div class="cp-legend"><span><i class="ln" style="background:var(--v-a)"></i>'+esc(t('inS'))+'</span><span><i class="ln" style="background:var(--v-b)"></i>'+esc(t('outS'))+'</span></div><div class="cp-svg" id="cp-gap"></div>'+
       tbl(['', t('inS'), t('outS')], n.daily.map(function(d){return [d.d,d.in,d.out]})), srcTag)+
     viz(t('fteT'),SIMP?'':t('fteX'),howto('l_fte')+fte,tag('hyp'))+'</div>');

  /* 2 · simulador */
  var LV=[['fte',0,3,0.5,t('lvFte'),function(v){return '+'+nf(v)}],['auto',0,100,10,t('lvAuto'),function(v){return v+'%'}],['cat',0,80,10,t('lvCat'),function(v){return v+'%'}],
          ['hpt',0.5,4,0.25,t('lvHpt'),function(v){return nf(v,2)+' h'}],['mpn',2,30,1,t('lvMpn'),function(v){return v+' min'}]];
  var preH='<div style="font-size:12.5px;font-weight:600">'+esc(ez('presT'))+'</div><div class="cp-pre">'+PRESETS.map(function(p){return '<button data-preset="'+p[0]+'" aria-pressed="'+presetOn(p[1])+'">'+esc(ez(p[0]))+'</button>'}).join('')+'</div>';
  h+=sec('cp-s2','🎛️ '+t('s2'),SIMP?'':t('s2x'),
    '<div class="viz">'+howto('l_sim')+preH+'<div class="cp-lv"'+(SIMP?' style="display:none"':'')+'>'+LV.map(function(l){return '<div><label for="cp-'+l[0]+'">'+esc(l[4])+(l[0]==='hpt'||l[0]==='mpn'||l[0]==='cat'?tag('hyp'):'')+'</label><div class="row">'+
      '<input type="range" id="cp-'+l[0]+'" data-k="'+l[0]+'" min="'+l[1]+'" max="'+l[2]+'" step="'+l[3]+'" value="'+S[l[0]]+'"><output id="cpo-'+l[0]+'">'+esc(l[5](S[l[0]]))+'</output></div></div>'}).join('')+'</div>'+
    '<div class="cp-res" id="cp-res"></div>'+
    '<div class="cp-legend" style="margin-top:14px"><span><i class="ln" style="background:var(--v-pause)"></i>'+esc(t('base'))+'</span><span><i class="ln" style="background:var(--v-a)"></i>'+esc(t('scen'))+'</span></div>'+
    '<div class="cp-svg" id="cp-proj"></div></div>');

  /* 3 · demanda */
  var bt=CAPD.demand.byType, laneTot={}; LANES.forEach(function(l){laneTot[l]=0});
  Object.keys(bt).forEach(function(k){laneTot[LANE_OF[k]]+=bt[k].n});
  var types=Object.keys(bt).sort(function(a,b){return LANES.indexOf(LANE_OF[a])-LANES.indexOf(LANE_OF[b])||bt[b].n-bt[a].n});
  var tmax=Math.max.apply(null,types.map(function(k){return bt[k].n}));
  var lanesH='<div class="cp-lanes">'+LANES.map(function(l){var on=S.lane===l;
    return '<button class="cp-lane'+(S.lane&&!on?' dim':'')+'" data-lane="'+l+'" aria-pressed="'+on+'" style="--c:'+LANE_VAR[l]+'"><b>'+laneTot[l]+' · '+Math.round(laneTot[l]/CAPD.demand.total*100)+'%</b><span>'+esc(t('lanes')[l])+'</span><small>'+esc(t('laneRule')[l])+'</small></button>'}).join('')+'</div>';
  var barsH='<div class="cp-bars">'+types.map(function(k){var l=LANE_OF[k],d=S.lane&&S.lane!==l?' dim':'',b=bt[k];
    var tp='<b>'+t('types')[k]+'</b> — '+b.n+'<br>'+t('lanes')[l]+'<br>'+t('open')+': '+b.open+'<br>'+t('med')+': '+(b.medHours==null?'—':nf(b.medHours,0)+' h');
    return '<div class="lb'+d+'">'+esc(t('types')[k])+'</div><div class="tr'+d+'"'+tip(tp)+'><div class="sg" style="width:'+(b.n/tmax*100)+'%;background:'+LANE_VAR[l]+'"></div></div><div class="vl'+d+'">'+b.n+'</div>'}).join('')+'</div>'+
    tbl(['',t('open'),t('med')+' (h)','n'],types.map(function(k){return [t('types')[k],bt[k].open,bt[k].medHours==null?'—':nf(bt[k].medHours,0),bt[k].n]}));
  h+=sec('cp-s3','🧭 '+t('s3'),SIMP?'':t('s3x'),howto('l_dem')+lanesH+'<div class="grid2" style="margin-top:12px">'+
     viz(t('s3'),CAPD.demand.window.from+' → '+CAPD.demand.window.to+' · n='+CAPD.demand.total,barsH,tag('snap'))+
     viz(t('perDay'),'',  howto('l_dly')+'<div class="cp-legend">'+LANES.map(function(l){return '<span><i style="background:'+LANE_VAR[l]+'"></i>'+esc(t('lanes')[l])+'</span>'}).join('')+'</div><div class="cp-svg" id="cp-dly"></div>',tag('snap'))+'</div>');

  /* 4 · tempo */
  var band=cal.totals.workdays*10, meet=cal.totals.ritual_h+cal.totals.reuniao_interna_h+cal.totals.reuniao_externa_h;
  var free=cal.free_h, foco=Math.max(0,band-free-meet);
  var parts=[['foco',foco,'var(--v-a)'],['meet',meet,'var(--v-b)'],['free',free,'var(--v-pause)']];
  var stack='<div class="cp-stack">'+parts.map(function(p){return '<div style="flex:'+p[1]+' 0 0;background:'+p[2]+'"'+tip('<b>'+t(p[0])+'</b> — '+nf(p[1],0)+' h · '+Math.round(p[1]/band*100)+'%')+'></div>'}).join('')+'</div>'+
    '<div class="cp-legend" style="margin-top:8px">'+parts.map(function(p){return '<span><i style="background:'+p[2]+'"></i>'+esc(t(p[0]))+' · '+nf(p[1],0)+' h ('+Math.round(p[1]/band*100)+'%)</span>'}).join('')+
    '<span>'+esc(t('over'))+' · '+nf(cal.collision_hours,0)+' h</span></div>'+
    '<div class="tiles" style="margin-top:10px"><div class="tile c"><div class="n">'+nf(cal.switches_per_day)+'</div><div class="l">'+esc(t('sw'))+'</div></div>'+
    '<div class="tile w"><div class="n">'+cal.duplicates+'</div><div class="l">'+esc(t('dup'))+'</div></div>'+
    '<div class="tile w"><div class="n">'+cal.meetings_over_foco+'</div><div class="l">'+esc(t('mof'))+'</div></div>'+
    '<div class="tile c"><div class="n">'+cal.collision_days+'/'+cal.totals.workdays+'</div><div class="l">'+esc(t('col'))+'</div></div></div>';
  var fr=CAPD.cal.byFront, fk=Object.keys(fr), fmx=Math.max.apply(null,fk.map(function(k){return fr[k]}).concat([S.minFront]));
  var frH='<div class="cp-lv" style="margin-bottom:12px"><div><label for="cp-minFront">'+esc(t('frMin'))+tag('hyp')+'</label><div class="row"><input type="range" id="cp-minFront" data-k="minFront" min="2" max="24" step="1" value="'+S.minFront+'"><output id="cpo-minFront">'+S.minFront+' h</output></div></div>'+
    '<div id="cp-fit" style="font-size:13px;color:var(--ink-2);align-self:end"></div></div>'+
    '<div class="cp-scroll"><div class="cp-bars" id="cp-fr" style="position:relative">'+fk.map(function(k){var v=fr[k];
      return '<div class="lb">'+esc(k)+'</div><div class="tr" style="position:relative"'+tip('<b>'+k+'</b> — '+nf(v)+' h')+'><div class="sg" style="width:'+(v/fmx*100)+'%;background:var(--v-a)"></div>'+
        '<div class="cp-ref" style="position:absolute;top:-3px;bottom:-3px;width:2px;background:var(--crit);left:'+(S.minFront/fmx*100)+'%"></div></div><div class="vl">'+nf(v)+'</div>'}).join('')+'</div></div>';
  h+=sec('cp-s4','⏱️ '+t('s4'),t('s4x'),'<div class="grid2">'+
     viz(t('s4'),cal.totals.workdays+' × 10 h = '+band+' h',howto('l_time')+stack,tag('snap'))+
     viz(t('dayT'),SIMP?'':t('dayX'),howto('l_day')+'<div class="cp-svg" id="cp-day"></div>',tag('snap'))+'</div>'+
     (SIMP?'':'<div style="margin-top:12px">'+viz(t('frT'),t('frX'),howto('l_fr')+frH,tag('snap'))+'</div>'));

  /* 5 · riscos */
  var R=risks(n).filter(function(r){return !S.onlySz||r.sz});
  var cells='';
  for(var p=5;p>=1;p--){ cells+='<div class="ax">'+p+'</div>';
    for(var i=1;i<=5;i++){var z=p*i>=15?'var(--crit-bg)':p*i>=8?'var(--warn-bg)':'var(--ok-bg)'; cells+='<div class="cell" data-c="'+p+'-'+i+'" style="background:'+z+'"></div>'}}
  cells+='<div></div>'+[1,2,3,4,5].map(function(i){return '<div class="ax">'+i+'</div>'}).join('');
  var mxH='<div style="display:flex;gap:8px;align-items:stretch"><div style="writing-mode:vertical-rl;transform:rotate(180deg);font-size:11px;color:var(--ink-3);text-align:center">'+esc(t('prob'))+' →</div>'+
    '<div style="flex:1;min-width:0"><div class="cp-mx" id="cp-mx">'+cells+'</div><div style="text-align:center;font-size:11px;color:var(--ink-3);margin-top:2px">'+esc(t('imp'))+' →</div></div></div>'+
    '<div class="cp-legend" style="margin-top:10px"><span><i style="background:var(--crit-bg);border:1px solid var(--crit)"></i>'+esc(t('zc'))+'</span><span><i style="background:var(--warn-bg);border:1px solid var(--warn)"></i>'+esc(t('zw'))+'</span><span><i style="background:var(--ok-bg);border:1px solid var(--ok)"></i>'+esc(t('zo'))+'</span>'+
    '<span>● '+esc(t('szL'))+'</span><span>○ '+esc(t('othL'))+'</span></div>';
  var rl='<ul class="cp-rl">'+R.slice().sort(function(a,b){return b.p*b.i-a.p*a.i}).map(function(r){return '<li><span class="nm" style="'+(r.sz?'background:var(--ink);color:var(--surface)':'border:2px solid var(--ink);color:var(--ink)')+'">'+r.id+'</span><span><b>'+esc(pick(r.t))+'</b> · '+r.p+'×'+r.i+'='+(r.p*r.i)+'<br>'+esc(pick(r.e))+'</span></li>'}).join('')+'</ul>';
  h+=sec('cp-s5','⚠️ '+t('s5'),SIMP?'':t('s5x'),'<div class="viz">'+howto('l_risk')+'<label class="tgl"><input type="checkbox" id="cp-onlySz"'+(S.onlySz?' checked':'')+'> '+esc(t('onlySz'))+'</label>'+
     '<div class="grid2" style="margin-top:10px"><div>'+mxH+'</div><div>'+rl+'</div></div></div>',tag('prov'));

  /* 6 · plano */
  var done=planDone();
  h+=sec('cp-s6','🗺️ '+t('s6'),SIMP?ez('l_plan').replace(/<[^>]+>/g,''):t('s6x'),'<div class="cp-waves">'+[1,2,3].map(function(w){
    var it=PLAN.filter(function(x){return x.w===w}), dn=it.filter(function(x){return done[x.id]}).length;
    return '<div class="cp-wave"><h3>'+esc(t('w'+w))+' <span class="sc">'+dn+'/'+it.length+'</span></h3><div class="bar"><i style="width:'+(dn/it.length*100)+'%"></i></div>'+
      it.map(function(x){return '<label class="cp-act'+(done[x.id]?' done':'')+'"><input type="checkbox" data-plan="'+x.id+'"'+(done[x.id]?' checked':'')+'><span>'+esc(pick(x.t))+'<small>'+esc(t('eff'))+': '+esc(effect(x.fx,n))+'</small></span></label>'}).join('')+'</div>'}).join('')+'</div>');

  /* 7 · resumo */
  h+=sec('cp-s7','📝 '+t('s7'),t('s7x'),'<div class="cp-exec" id="cp-exec">'+esc(execText(n))+'</div><div style="margin-top:8px"><button class="btn pri" id="cp-copy">📋 '+esc(t('copy'))+'</button></div>');

  /* 8 · método */
  if(!SIMP)h+=sec('cp-s8','📏 '+t('s8'),'','<details class="viz"><summary style="cursor:pointer;color:var(--accent);font-weight:600">'+esc(t('mth'))+'</summary><div class="doc" style="box-shadow:none;border:0;padding:8px 0 0;margin:0;max-width:none">'+method(n)+'</div></details>');
  return h;
}

function execText(n){
  var m0=model(n,{auto:0,cat:0,fte:0,hpt:S.hpt,mpn:S.mpn}), m2=model(n,{auto:100,cat:40,fte:0,hpt:S.hpt,mpn:S.mpn}), cal=CAPD.cal.past;
  var gap=n.inn-n.done, l=Lg();
  if(l==='es')return 'Situación: el L2 recibe '+n.inn+' tickets por mes y cierra '+n.done+' — saldo de +'+gap+' al mes. Hoy hay '+n.open+' abiertos y '+n.overdue+' vencidos.\n'+
    'El '+Math.round(n.noise/n.dTotal*100)+'% de la entrada son avisos automáticos o phishing reportado. Son '+CAPD.team.fronts+' frentes activos para '+CAPD.team.size+' personas.\n'+
    'Riesgo: al ritmo actual la cola llega a ~'+nf(m0.at(90),0)+' en 90 días; los frentes con plazo (Lab, Sentinel, Data Lake) compiten con la operación en bloques de ~1 h.\n'+
    'Impacto: SLA, plazo de proyectos y compliance (evidencia SOX/GxP desactualizada).\n'+
    'Próxima acción: 1) automatizar avisos y phishing (30 días); 2) catálogo para licencias, accesos e ingresos (60 días); 3) con eso faltan ~'+nf(m2.fteClear)+' persona(s) para vaciar los vencidos en 60 días — sin eso, ~'+nf(m0.fteClear)+'.';
  if(l==='en')return 'Situation: L2 takes in '+n.inn+' tickets a month and closes '+n.done+' — a net +'+gap+' a month. Today there are '+n.open+' open and '+n.overdue+' overdue.\n'+
    Math.round(n.noise/n.dTotal*100)+'% of intake is automatic notices or reported phishing. There are '+CAPD.team.fronts+' active fronts for '+CAPD.team.size+' people.\n'+
    'Risk: at this rate the queue reaches ~'+nf(m0.at(90),0)+' in 90 days; deadline projects (Lab, Sentinel, Data Lake) compete with operations in ~1-hour blocks.\n'+
    'Impact: SLA, project deadlines and compliance (stale SOX/GxP evidence).\n'+
    'Next action: 1) automate notices and phishing (30 days); 2) catalog for licences, access and joiners (60 days); 3) after that ~'+nf(m2.fteClear)+' extra person(s) clear the overdue in 60 days — without it, ~'+nf(m0.fteClear)+'.';
  return 'Situação: o L2 recebe '+n.inn+' chamados por mês e fecha '+n.done+' — saldo de +'+gap+' por mês. Hoje são '+n.open+' abertos e '+n.overdue+' vencidos.\n'+
    Math.round(n.noise/n.dTotal*100)+'% da entrada é aviso automático ou phishing reportado. São '+CAPD.team.fronts+' frentes ativas para '+CAPD.team.size+' pessoas, com mediana de '+nf(CAPD.cal.frontMedian)+' h de foco por frente no mês.\n'+
    'Risco: no ritmo atual a fila chega a ~'+nf(m0.at(90),0)+' em 90 dias; os projetos com prazo (Novo Lab, Sentinel, Data Lake) disputam com a operação em blocos de ~'+nf(cal.longest_free_block_avg_h)+' h.\n'+
    'Impacto: SLA, prazo de projeto e compliance (evidência SOX/GxP desatualizada).\n'+
    'Próxima ação: 1) automatizar avisos e phishing (30 dias); 2) catálogo para licença, acesso e entrada de pessoas (60 dias); 3) feito isso, faltam ~'+nf(m2.fteClear)+' pessoa(s) para zerar os vencidos em 60 dias — sem isso, ~'+nf(m0.fteClear)+'.';
}

function method(n){
  var l=Lg(), pt=l==='pt';
  var M={
   pt:'<h4>Fluxo do L2</h4><p>Entrada e saída vêm de <code>SDP.perf</code>: chamados do grupo L2 - Infrastructure criados nos últimos 30 dias e resolvidos nos últimos 30 dias (campo <code>resolved_time</code>). Atualiza segundas e quintas pela rotina diária. Fila aberta, vencidos e pausados vêm da leitura ao vivo do dia.</p>'+
      '<h4>Pessoas que faltam</h4><p>Vazão média por pessoa = resolvidos em 30 dias ÷ pessoas que resolveram algo no período ('+n.owners+' hoje) = '+nf(n.perPerson)+' chamados/mês. Pessoas para parar de crescer = saldo mensal ÷ vazão por pessoa. Para zerar vencidos em 60 dias soma-se metade dos vencidos ao saldo.</p>'+
      '<h4>Alavancas do simulador</h4><p><b>Automação</b>: tira a fração escolhida dos avisos e phishing da entrada e da saída, e devolve o tempo de triagem (minutos por aviso) como capacidade. <b>Catálogo</b>: reduz o esforço dos '+n.catN+' pedidos mensais de licença, acesso e entrada/saída de pessoas pela porcentagem escolhida. <b>Esforço por chamado</b> converte horas liberadas em chamados. Essas três são HIPÓTESES — ajuste com o que o time sabe.</p>'+
      '<h4>Mix de demanda</h4><p>'+CAPD.demand.total+' chamados criados no L2 entre '+CAPD.demand.window.from+' e '+CAPD.demand.window.to+', classificados pelo assunto (palavra-chave, primeira regra que bate). É um retrato: refaz-se pedindo a atualização desta aba.</p>'+
      '<h4>Agenda</h4><p>Agenda de setembro do único analista lido pelo conector, dias úteis das 08:00 às 18:00. Colisão = dois compromissos no mesmo horário. Tempo de foco por frente = soma dos blocos com o código da frente no título. É tempo planejado, não esforço medido; a agenda do resto do time não é lida.</p>'+
      '<h4>Riscos</h4><p>Probabilidade e impacto de 1 a 5 são julgamento sobre a evidência mostrada em cada risco — [PROVÁVEL], não medição.</p>',
   es:'<h4>Flujo de L2</h4><p>Entrada y salida vienen de <code>SDP.perf</code> (creados y resueltos en 30 días, campo <code>resolved_time</code>). Cola, vencidos y pausados son la lectura en vivo del día.</p><h4>Personas que faltan</h4><p>Tasa media por persona = resueltos en 30 días ÷ personas que resolvieron algo ('+n.owners+') = '+nf(n.perPerson)+' tickets/mes. Personas para dejar de crecer = saldo mensual ÷ tasa por persona.</p><h4>Palancas</h4><p>Automatización, catálogo y esfuerzo por ticket son HIPÓTESIS ajustables.</p><h4>Agenda</h4><p>Agenda de septiembre del único analista leído, días hábiles 08:00–18:00. Tiempo planificado, no medido.</p><h4>Riesgos</h4><p>Probabilidad e impacto 1–5 son juicio sobre la evidencia — [PROBABLE].</p>',
   en:'<h4>L2 flow</h4><p>Intake and output come from <code>SDP.perf</code> (created and resolved over 30 days, <code>resolved_time</code>). Queue, overdue and paused are today’s live read.</p><h4>People missing</h4><p>Average rate per person = resolved in 30 days ÷ people who resolved anything ('+n.owners+') = '+nf(n.perPerson)+' tickets/month. People to stop growth = monthly net ÷ rate per person.</p><h4>Levers</h4><p>Automation, catalog and effort per ticket are adjustable HYPOTHESES.</p><h4>Calendar</h4><p>September calendar of the one analyst read, weekdays 08:00–18:00. Planned, not measured time.</p><h4>Risks</h4><p>Probability and impact 1–5 are judgement on the evidence — [PROBABLE].</p>'};
  return M[l]||M.pt;
}

/* ---------- gráficos SVG ---------- */
function lineChart(el,X,series,opt){
  if(!el)return; opt=opt||{};
  var W=Math.max(el.clientWidth,280),H=opt.h||220,P={l:38,r:14,t:14,b:26},iw=W-P.l-P.r,ih=H-P.t-P.b,n=X.length;
  var all=[]; series.forEach(function(s){all=all.concat(s.v)});
  var mx=Math.max.apply(null,all.concat([1])); var step=Math.pow(10,Math.floor(Math.log10(mx)));
  if(mx/step<2)step/=5;else if(mx/step<5)step/=2; mx=Math.ceil(mx/step)*step;
  var x=function(i){return P.l+(n<2?iw/2:i*iw/(n-1))}, y=function(v){return P.t+ih-v/mx*ih};
  var g='';for(var v=0;v<=mx+1e-9;v+=step){g+='<line x1="'+P.l+'" x2="'+(W-P.r)+'" y1="'+y(v)+'" y2="'+y(v)+'" stroke="var(--line-soft)"/><text x="'+(P.l-6)+'" y="'+(y(v)+4)+'" text-anchor="end" font-size="10.5" fill="var(--ink-3)">'+nf(v,0)+'</text>'}
  var ev=Math.ceil(n/(W<520?4:7)),xl='';X.forEach(function(lb,i){if((i%ev===0&&(n-1-i)>=ev/2)||i===n-1)xl+='<text x="'+x(i)+'" y="'+(H-8)+'" text-anchor="'+(i===n-1?'end':i===0?'start':'middle')+'" font-size="10.5" fill="var(--ink-3)">'+esc(opt.fx?opt.fx(lb):lb)+'</text>'});
  var area='';
  if(opt.fillBetween&&series.length===2){var a=series[0].v,b=series[1].v;
    area='<path d="'+a.map(function(v,i){return (i?'L':'M')+x(i).toFixed(1)+','+y(v).toFixed(1)}).join('')+b.slice().reverse().map(function(v,j){var i=n-1-j;return 'L'+x(i).toFixed(1)+','+y(v).toFixed(1)}).join('')+'Z" fill="var(--crit)" opacity=".10"/>'}
  var ps=series.map(function(s){return '<path d="'+s.v.map(function(v,i){return (i?'L':'M')+x(i).toFixed(1)+','+y(v).toFixed(1)}).join('')+'" fill="none" stroke="'+s.c+'" stroke-width="2" stroke-linejoin="round"'+(s.dash?' stroke-dasharray="5 4"':'')+'/>'}).join('');
  var ends=series.map(function(s){var v=s.v[n-1];return '<circle cx="'+x(n-1)+'" cy="'+y(v)+'" r="4" fill="'+s.c+'" stroke="var(--surface)" stroke-width="2"/><text x="'+(x(n-1)-8)+'" y="'+(y(v)-8)+'" text-anchor="end" font-size="11" font-weight="600" fill="var(--ink)">'+nf(v,0)+'</text>'}).join('');
  el.innerHTML='<svg width="'+W+'" height="'+H+'" role="img">'+g+xl+area+ps+ends+'<line class="xh" y1="'+P.t+'" y2="'+(P.t+ih)+'" stroke="var(--ink-3)" stroke-dasharray="3 3" style="display:none"/>'+
    series.map(function(s,k){return '<circle class="d'+k+'" r="4.5" fill="'+s.c+'" stroke="var(--surface)" stroke-width="2" style="display:none"/>'}).join('')+'<rect x="'+P.l+'" y="'+P.t+'" width="'+iw+'" height="'+ih+'" fill="transparent" class="hit"/></svg>';
  var svg=el.querySelector('svg'),xh=svg.querySelector('.xh'),hit=svg.querySelector('.hit'),tp=document.getElementById('tip');
  function mv(e){var r=svg.getBoundingClientRect(),cx=(e.touches?e.touches[0].clientX:e.clientX),i=clamp(Math.round((cx-r.left-P.l)/(iw/Math.max(n-1,1))),0,n-1);
    xh.setAttribute('x1',x(i));xh.setAttribute('x2',x(i));xh.style.display='';
    series.forEach(function(s,k){var c=svg.querySelector('.d'+k);c.setAttribute('cx',x(i));c.setAttribute('cy',y(s.v[i]));c.style.display=''});
    if(tp){tp.innerHTML='<b>'+esc(opt.fx?opt.fx(X[i]):X[i])+'</b><br>'+series.map(function(s){return esc(s.n)+': '+nf(s.v[i],0)}).join('<br>')+(opt.extra?opt.extra(i):'');tp.style.display='block';
      var px=cx+14,py=(e.touches?e.touches[0].clientY:e.clientY)+14;if(px+tp.offsetWidth>innerWidth-8)px-=tp.offsetWidth+28;tp.style.left=px+'px';tp.style.top=py+'px'}}
  function out(){xh.style.display='none';[].forEach.call(svg.querySelectorAll('circle[class]'),function(c){c.style.display='none'});if(tp)tp.style.display='none'}
  hit.addEventListener('mousemove',mv);hit.addEventListener('touchmove',mv,{passive:true});hit.addEventListener('mouseleave',out);hit.addEventListener('touchend',out);
}
function stackCols(el,rows,keys,colorOf,opt){
  if(!el)return; opt=opt||{};
  var W=Math.max(el.clientWidth,280),H=opt.h||200,P={l:30,r:8,t:10,b:24},iw=W-P.l-P.r,ih=H-P.t-P.b,n=rows.length;
  var tot=rows.map(function(r){return keys.reduce(function(a,k){return a+(r[k]||0)},0)}), mx=Math.max.apply(null,tot.concat([1]));
  var step=mx>40?10:mx>15?5:mx>6?2:1; mx=Math.ceil(mx/step)*step;
  var bw=Math.max(3,iw/n-2), y=function(v){return v/mx*ih};
  var g='';for(var v=0;v<=mx;v+=step){var yy=P.t+ih-y(v);g+='<line x1="'+P.l+'" x2="'+(W-P.r)+'" y1="'+yy+'" y2="'+yy+'" stroke="var(--line-soft)"/><text x="'+(P.l-5)+'" y="'+(yy+4)+'" text-anchor="end" font-size="10.5" fill="var(--ink-3)">'+v+'</text>'}
  var b='';rows.forEach(function(r,i){var x0=P.l+i*(iw/n)+1,acc=0,tp='<b>'+esc(opt.fx?opt.fx(r.d):r.d)+'</b> — '+tot[i];
    keys.forEach(function(k){var v=r[k]||0;if(!v)return;var hh=y(v),yy=P.t+ih-y(acc)-hh;tp+='<br>'+esc(opt.name(k))+': '+v;
      b+='<rect x="'+x0.toFixed(1)+'" y="'+(yy+ (acc?1:0)).toFixed(1)+'" width="'+bw.toFixed(1)+'" height="'+Math.max(0,hh-(acc?1:0)).toFixed(1)+'" fill="'+colorOf(k)+'"'+(opt.dim&&opt.dim(k)?' opacity=".25"':'')+(acc+v===tot[i]?' rx="2"':'')+'/>';acc+=v});
    if(opt.dot&&opt.dot(r))b+='<circle cx="'+(x0+bw/2)+'" cy="'+(P.t+ih-y(tot[i])-8)+'" r="4" fill="var(--crit)"/>';
    b+='<rect x="'+x0.toFixed(1)+'" y="'+P.t+'" width="'+(iw/n).toFixed(1)+'" height="'+ih+'" fill="transparent" data-tip="'+esc(tp)+'"/>'});
  var ev=Math.ceil(n/(W<520?4:7)),xl='';rows.forEach(function(r,i){if((i%ev===0&&(n-1-i)>=ev/2)||i===n-1)xl+='<text x="'+(P.l+i*(iw/n)+bw/2)+'" y="'+(H-7)+'" text-anchor="middle" font-size="10.5" fill="var(--ink-3)">'+esc(opt.fx?opt.fx(r.d):r.d)+'</text>'});
  el.innerHTML='<svg width="'+W+'" height="'+H+'" role="img">'+g+b+xl+(opt.ref!=null?'<line x1="'+P.l+'" x2="'+(W-P.r)+'" y1="'+(P.t+ih-y(opt.ref))+'" y2="'+(P.t+ih-y(opt.ref))+'" stroke="var(--crit)" stroke-width="1.5" stroke-dasharray="5 4"/>':'')+'</svg>';
}

/* ---------- partes que reagem ---------- */
function drawSim(){
  var n=N(), m=model(n,S), m0=model(n,{auto:0,cat:0,fte:0,hpt:S.hpt,mpn:S.mpn});
  var D=[];for(var d=0;d<=S.hor;d+=3)D.push(d);
  var res=document.getElementById('cp-res');
  if(res)res.innerHTML=
    '<div class="tile '+(m.at(90)>n.open?'c':'o')+'"><div class="n">'+nf(m.at(90),0)+'</div><div class="l">'+esc(sub(t('r90'),{h:90}))+' · '+esc(t('base'))+': '+nf(m0.at(90),0)+'</div></div>'+
    '<div class="tile '+(m.net>0?'c':'o')+'"><div class="n">'+(m.net>0?'+':'')+nf(m.net,0)+'</div><div class="l">'+esc(t('rNet'))+'</div></div>'+
    '<div class="tile"><div class="n">'+(m.zero!=null?m.zero+' '+esc(t('days')):esc(t('rNever')))+'</div><div class="l">'+esc(t('rZero'))+'</div></div>'+
    '<div class="tile o"><div class="n">'+nf(m.freedH,0)+' h</div><div class="l">'+esc(t('rFree'))+'</div></div>';
  lineChart(document.getElementById('cp-proj'),D,[{n:t('base'),c:'var(--v-pause)',v:D.map(m0.at),dash:1},{n:t('scen'),c:'var(--v-a)',v:D.map(m.at)}],{fx:function(d){return '+'+d+' d'}});
  var ex=document.getElementById('cp-exec'); if(ex)ex.textContent=execText(n);
}
function drawFit(){
  var fr=CAPD.cal.byFront, fk=Object.keys(fr), sum=CAPD.cal.frontSum, fit=Math.floor(sum/S.minFront), need=Math.max(0,fk.length*S.minFront-sum);
  var el=document.getElementById('cp-fit');
  if(el)el.innerHTML='<b style="font-family:var(--display);font-size:20px;color:var(--'+(fit<fk.length?'crit':'ok')+')">'+fit+'</b> '+esc(t('frOf'))+' '+fk.length+' '+esc(t('frFit'))+'<br>'+esc(sub(t('frNeed'),{h:nf(need,0),f:nf(need/160)}));
  var fmx=Math.max.apply(null,fk.map(function(k){return fr[k]}).concat([S.minFront]));
  [].forEach.call(document.querySelectorAll('#cp-fr .cp-ref'),function(r){r.style.left=(S.minFront/fmx*100)+'%'});
  [].forEach.call(document.querySelectorAll('#cp-fr .sg'),function(s,i){s.style.width=(fr[fk[i]]/fmx*100)+'%';s.style.background=fr[fk[i]]<S.minFront?'var(--v-pause)':'var(--v-a)'});
}
function drawStatic(){
  var n=N(), D=n.daily, ci=0, co=0, A=[], B=[];
  D.forEach(function(d){ci+=d.in;co+=d.out;A.push(ci);B.push(co)});
  lineChart(document.getElementById('cp-gap'),D.map(function(d){return d.d}),[{n:t('inS'),c:'var(--v-a)',v:A},{n:t('outS'),c:'var(--v-b)',v:B}],
    {fx:dm,fillBetween:1,extra:function(i){return '<br>'+esc(t('gap'))+': +'+(A[i]-B[i])}});
  var rows=CAPD.demand.dailyByType.map(function(r){var o={d:r.d};LANES.forEach(function(l){o[l]=0});Object.keys(r).forEach(function(k){if(LANE_OF[k])o[LANE_OF[k]]+=r[k]});return o});
  stackCols(document.getElementById('cp-dly'),rows,LANES,function(l){return LANE_VAR[l]},{fx:dm,name:function(l){return t('lanes')[l]},dim:function(l){return S.lane&&S.lane!==l}});
  stackCols(document.getElementById('cp-day'),CAPD.cal.daily.map(function(r){return {d:r.d,free:r.free,col:r.col}}),['free'],function(){return 'var(--v-pause)'},
    {fx:dm,name:function(){return t('free')+' (h)'},dot:function(r){return r.col>0},ref:2});
  /* riscos no mapa */
  var mxEl=document.getElementById('cp-mx'); if(mxEl){var R=risks(n).filter(function(r){return !S.onlySz||r.sz}),by={};
    R.forEach(function(r){var k=r.p+'-'+r.i;(by[k]=by[k]||[]).push(r)});
    Object.keys(by).forEach(function(k){var c=mxEl.querySelector('[data-c="'+k+'"]');if(!c)return;var L_=by[k];
      L_.forEach(function(r,j){var d=document.createElement('div');d.className='cp-dot '+(r.sz?'sz':'ot');d.textContent=r.id;
        var cols=Math.min(L_.length,3),row=Math.floor(j/3),col=j%3;d.style.left=((col+1)/(cols+1)*100)+'%';d.style.top=(L_.length>3?(row?72:30):50)+'%';
        d.setAttribute('data-tip',esc('<b>'+r.id+' · '+pick(r.t)+'</b><br>'+t('prob')+' '+r.p+' × '+t('imp')+' '+r.i+'<br>'+pick(r.e)));c.appendChild(d)})})}
}
function after(v){
  drawStatic(); drawSim(); drawFit();
  [].forEach.call(v.querySelectorAll('.cp-lv input[type=range]'),function(inp){inp.oninput=function(){var k=inp.dataset.k;S[k]=parseFloat(inp.value);save();
    var o=document.getElementById('cpo-'+k);if(o)o.textContent=k==='fte'?'+'+nf(S[k]):k==='auto'||k==='cat'?S[k]+'%':k==='hpt'?nf(S[k],2)+' h':k==='mpn'?S[k]+' min':S[k]+' h';
    if(k==='minFront')drawFit();else drawSim()};
    inp.onchange=function(){var k=inp.dataset.k;if(k==='hpt'||k==='mpn'||k==='cat')rerender()}});
  [].forEach.call(v.querySelectorAll('[data-lane]'),function(b){b.onclick=function(){S.lane=S.lane===b.dataset.lane?null:b.dataset.lane;rerender('cp-s3')}});
  var oz=document.getElementById('cp-onlySz');if(oz)oz.onchange=function(){S.onlySz=this.checked;save();rerender('cp-s5')};
  [].forEach.call(v.querySelectorAll('[data-plan]'),function(c){c.onchange=function(){var d=planDone();if(c.checked)d[c.dataset.plan]=1;else delete d[c.dataset.plan];ls('cap_plan',JSON.stringify(d));rerender('cp-s6')}});
  [].forEach.call(v.querySelectorAll('[data-mode]'),function(b){b.onclick=function(){S.mode=b.dataset.mode;save();rerender()}});
  [].forEach.call(v.querySelectorAll('[data-preset]'),function(b){b.onclick=function(){var p=PRESETS.filter(function(x){return x[0]===b.dataset.preset})[0][1];S.fte=p.fte;S.auto=p.auto;S.cat=p.cat;save();rerender()}});
  var cp=document.getElementById('cp-copy');if(cp)cp.onclick=function(){var txt=execText(N());
    try{navigator.clipboard.writeText(txt).then(function(){window.BL&&BL.toast(t('copied'))},function(){sel()})}catch(e){sel()}
    function sel(){var r=document.createRange();r.selectNodeContents(document.getElementById('cp-exec'));var s=getSelection();s.removeAllRanges();s.addRange(r)}};
}
function rerender(anchor){
  var y=window.scrollY; if(window.BL)BL.render(); window.scrollTo(0,y);
}
var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){if(window.BL&&BL.view()==='cap'){drawStatic();drawSim()}},200)});

window.BLC={view:view,after:after};
})();
