const teams=['Atalanta','Bologna','Cagliari','Como','Fiorentina','Frosinone','Genoa','Inter','Juventus','Lazio','Lecce','Milan','Monza','Napoli','Parma','Roma','Sassuolo','Torino','Udinese','Venezia'];
const blank=()=>({coach:'',module:'',formation:'',lineup:[],roster:[],penalties:'',freeKicks:'',corners:'',arrivals:'',departures:'',talks:'',recommended:'',bets:'',young:'',reliable:'',avoid:'',watch:'',notes:'',updated:'Da compilare'});
const base=Object.fromEntries(teams.map(t=>[t,blank()]));
const DATA_VERSION=13;
const editorialDefaults={
  Atalanta:{
    coach:'Maurizio Sarri',module:'4-3-3',
    formation:'Carnesecchi; Bellanova, Scalvini, Hien, Ahanor; Éderson, Gaetano, Pašalić; De Ketelaere, Scamacca, Raspadori',
    lineup:[
      {name:'Marco Carnesecchi',short:'Carnesecchi',pos:'POR'},
      {name:'Raoul Bellanova',short:'Bellanova',pos:'TD'},
      {name:'Giorgio Scalvini',short:'Scalvini',pos:'DC'},
      {name:'Isak Hien',short:'Hien',pos:'DC'},
      {name:'Honest Ahanor',short:'Ahanor',pos:'TS'},
      {name:'Éderson',short:'Éderson',pos:'CC'},
      {name:'Gianluca Gaetano',short:'Gaetano',pos:'CC'},
      {name:'Mario Pašalić',short:'Pašalić',pos:'CC'},
      {name:'Charles De Ketelaere',short:'De Ketelaere',pos:'AD'},
      {name:'Gianluca Scamacca',short:'Scamacca',pos:'PC'},
      {name:'Giacomo Raspadori',short:'Raspadori',pos:'AS'}
    ],
    roster:[
      {name:'Marco Carnesecchi',role:'Portiere',status:'Titolare',tags:['Top reparto']},
      {name:'Marco Sportiello',role:'Portiere',status:'Riserva',tags:['Affidabile']},
      {name:'Paolo Vismara',role:'Portiere',status:'Gerarchia aperta',tags:['Giovane']},
      {name:'Mattia Sonzogni',role:'Portiere',status:'Aggregato',tags:['Giovane']},
      {name:'Raoul Bellanova',role:'Difensore',status:'Titolare',tags:['Bonus','Da comprare']},
      {name:'Giorgio Scalvini',role:'Difensore',status:'Titolare',tags:['Top','Osservato']},
      {name:'Isak Hien',role:'Difensore',status:'Titolare',tags:['Affidabile']},
      {name:'Honest Ahanor',role:'Difensore',status:'Titolare',tags:['Giovane','Scommessa']},
      {name:'Odilon Kossounou',role:'Difensore',status:'Ballottaggio',tags:['Affidabile']},
      {name:'Berat Djimsiti',role:'Difensore',status:'Ballottaggio',tags:['Affidabile']},
      {name:'Davide Zappacosta',role:'Difensore',status:'Ballottaggio',tags:['Bonus']},
      {name:'Sead Kolašinac',role:'Difensore',status:'Da valutare',tags:['Esperienza']},
      {name:'Mitchel Bakker',role:'Difensore',status:'In rosa',tags:['Da seguire']},
      {name:'Giovanni Bonfanti',role:'Difensore',status:'In rosa',tags:['Giovane']},
      {name:'Lorenzo Bernasconi',role:'Difensore',status:'Aggregato',tags:['Giovane']},
      {name:'Giorgio Cittadini',role:'Difensore',status:'Aggregato',tags:['Giovane']},
      {name:'Ljubo Puljić',role:'Difensore',status:'Aggregato',tags:['Giovane']},
      {name:'Éderson',role:'Centrocampista',status:'Titolare',tags:['Top','Da comprare']},
      {name:'Gianluca Gaetano',role:'Centrocampista',status:'Titolare',tags:['Nuovo acquisto','Scommessa']},
      {name:'Mario Pašalić',role:'Centrocampista',status:'Titolare',tags:['Bonus','Affidabile']},
      {name:'Marten de Roon',role:'Centrocampista',status:'Ballottaggio',tags:['Affidabile']},
      {name:'Lazar Samardžić',role:'Centrocampista',status:'Ballottaggio',tags:['Scommessa','Piazzati']},
      {name:'Ibrahim Sulemana',role:'Centrocampista',status:'In rosa',tags:['Da seguire']},
      {name:'Nicola Zalewski',role:'Centrocampista',status:'In rosa',tags:['Jolly']},
      {name:'Samuel Giovane',role:'Centrocampista',status:'Aggregato',tags:['Giovane']},
      {name:'Sergej Levak',role:'Centrocampista',status:'Aggregato',tags:['Giovane','Scommessa']},
      {name:'Charles De Ketelaere',role:'Attaccante',status:'Titolare',tags:['Top','Da comprare']},
      {name:'Gianluca Scamacca',role:'Attaccante',status:'Titolare',tags:['Top','Rigorista']},
      {name:'Giacomo Raspadori',role:'Attaccante',status:'Titolare',tags:['Piazzati','Osservato']},
      {name:'Nikola Krstović',role:'Attaccante',status:'Ballottaggio',tags:['Da seguire']},
      {name:'Daniel Maldini',role:'Attaccante',status:'In rosa',tags:['Da valutare']},
      {name:'El Bilal Touré',role:'Attaccante',status:'In rosa',tags:['Da valutare']},
      {name:'Dominic Vavassori',role:'Attaccante',status:'Aggregato',tags:['Giovane']},
      {name:'Vanja Vlahović',role:'Attaccante',status:'Aggregato',tags:['Giovane']}
    ],
    penalties:'Scamacca\nSamardžić\nDe Ketelaere',
    freeKicks:'Raspadori\nSamardžić\nDe Ketelaere',
    corners:'Raspadori\nSamardžić\nZappacosta',
    arrivals:'Gianluca Gaetano',
    departures:'Marco Palestra\nBen Godfrey',
    talks:'Mercato ancora aperto: verificare uscite e nuovi innesti prima dell’asta',
    recommended:'Charles De Ketelaere\nGianluca Scamacca\nÉderson',
    bets:'Gianluca Gaetano\nLazar Samardžić\nHonest Ahanor',
    young:'Honest Ahanor\nSergej Levak\nLjubo Puljić',
    reliable:'Marten de Roon\nMario Pašalić\nIsak Hien',
    watch:'Giacomo Raspadori\nGiorgio Scalvini\nRaoul Bellanova',
    avoid:'',
    notes:'Scheda test: rosa provvisoria di preparazione estiva. Aggiornare titolarità, mercato e disponibilità prima dell’asta.',
    updated:'Aggiornata 2 agosto 2026',source:'Scheda editoriale test • rosa provvisoria'
  }
};
const playerProfiles={
  'Marco Carnesecchi':{price:'18–24',stars:4.5,mv:'6.28',fm:'5.36',apps:34,goals:0,assists:0,risk:'Basso',trend:'In crescita',injury:'Disponibile',condition:'Ottima',starterPct:96,ceiling:'24',stop:'25',timing:'Entrare dopo i primi portieri top',alternatives:['Marco Sportiello'],advice:'Portiere da prima fascia: affidabile, titolare e con margine di crescita.'},
  'Raoul Bellanova':{price:'14–20',stars:4,mv:'6.12',fm:'6.48',apps:33,goals:1,assists:7,risk:'Medio',trend:'Bonus',injury:'Disponibile',condition:'Buona',starterPct:91,ceiling:'20',stop:'21',timing:'Rilanciare con decisione fino alla fascia media',alternatives:['Davide Zappacosta','Giorgio Scalvini'],advice:'Esterno offensivo: da comprare se il prezzo resta sotto la fascia premium.'},
  'Giorgio Scalvini':{price:'12–18',stars:4,mv:'6.18',fm:'6.32',apps:23,goals:2,assists:1,risk:'Medio',trend:'Rilancio',injury:'Da monitorare',condition:'In crescita',starterPct:82,ceiling:'18',stop:'19',timing:'Aspettare che il tavolo valuti il rischio fisico',alternatives:['Isak Hien','Odilon Kossounou'],advice:'Profilo da monitorare: qualità alta, ma va verificata la continuità fisica.'},
  'Isak Hien':{price:'7–10',stars:3.5,mv:'6.10',fm:'6.12',apps:31,goals:1,assists:0,risk:'Basso',trend:'Stabile',advice:'Difensore affidabile, utile per completare il reparto senza spendere troppo.'},
  'Honest Ahanor':{price:'3–7',stars:3,mv:'6.00',fm:'6.08',apps:12,goals:1,assists:0,risk:'Alto',trend:'Scommessa',advice:'Giovane da ultimi slot: investimento interessante, ma minutaggio da confermare.'},
  'Éderson':{price:'28–38',stars:4.5,mv:'6.35',fm:'6.74',apps:34,goals:5,assists:4,risk:'Basso',trend:'Top',injury:'Disponibile',condition:'Ottima',starterPct:97,ceiling:'38',stop:'40',timing:'Profilo da assicurarsi prima dei top assoluti',alternatives:['Mario Pašalić','Gianluca Gaetano'],advice:'Centrocampista completo e continuo: uno dei riferimenti della squadra.'},
  'Gianluca Gaetano':{price:'12–18',stars:3.5,mv:'6.16',fm:'6.62',apps:29,goals:5,assists:3,risk:'Medio',trend:'Scommessa',advice:'Può portare bonus e crescere: da prendere al prezzo giusto, senza sovrapagarlo.'},
  'Mario Pašalić':{price:'20–28',stars:4,mv:'6.18',fm:'7.02',apps:32,goals:8,assists:4,risk:'Medio',trend:'Bonus',advice:'Uno dei migliori per rapporto tra prezzo, inserimenti e bonus potenziali.'},
  'Charles De Ketelaere':{price:'48–65',stars:5,mv:'6.54',fm:'7.58',apps:35,goals:12,assists:10,risk:'Basso',trend:'Top',injury:'Disponibile',condition:'Ottima',starterPct:98,ceiling:'65',stop:'68',timing:'Rilanciare forte ma senza superare il tetto',alternatives:['Gianluca Scamacca','Giacomo Raspadori'],advice:'Top offensivo: da prendere come riferimento, valutando bene il budget.'},
  'Gianluca Scamacca':{price:'42–58',stars:4.5,mv:'6.38',fm:'7.72',apps:27,goals:15,assists:4,risk:'Medio',trend:'Rigorista',injury:'Da monitorare',condition:'Buona',starterPct:89,ceiling:'58',stop:'60',timing:'Sfruttare eventuali dubbi fisici per prenderlo sotto prezzo',alternatives:['Charles De Ketelaere','Nikola Krstović'],advice:'Prima punta da bonus pesanti. Il rischio principale resta la continuità fisica.'},
  'Giacomo Raspadori':{price:'26–38',stars:4,mv:'6.22',fm:'6.86',apps:31,goals:8,assists:5,risk:'Medio',trend:'Piazzati',advice:'Jolly offensivo di qualità: interessante soprattutto se confermato sui piazzati.'}
};
let data=JSON.parse(localStorage.getItem('gac-data')||'null')||base;
const storedVersion=Number(localStorage.getItem('gac-data-version')||0);
for(const t of teams){
  const current=data[t]||{};
  const defaults=editorialDefaults[t]||{};
  const merged={...blank(),...current};
  if(t==='Atalanta'){
    const personalFields=['recommended','bets','young','reliable','avoid','watch','notes'];
    const personal=Object.fromEntries(personalFields.map(k=>[k,current[k]||defaults[k]||'']));
    const coreFields=['coach','module','formation','penalties','freeKicks','corners','arrivals','departures','talks'];
    const hasEditorialData=coreFields.some(k=>String(current[k]||'').trim());
    if(storedVersion<DATA_VERSION || !hasEditorialData){
      data[t]={...blank(),...defaults,...personal};
    }else{
      data[t]={...blank(),...defaults,...current};
    }
  }else{
    data[t]={...blank(),...defaults,...current};
  }
}
localStorage.setItem('gac-data-version',String(DATA_VERSION));
persist();
let auctionList=JSON.parse(localStorage.getItem('gac-auction-list')||'[]');
let conteFavorites=JSON.parse(localStorage.getItem('gac-conte-favorites')||'[]');
let auctionPlan=JSON.parse(localStorage.getItem('gac-auction-plan')||'null')||{budget:500,spent:0,slots:{Portiere:3,Difensore:8,Centrocampista:8,Attaccante:6}};
let updateDiary=JSON.parse(localStorage.getItem('gac-update-diary')||'[]');
let lastScan=JSON.parse(localStorage.getItem('gac-last-scan')||'null');
const saveConteFavorites=()=>localStorage.setItem('gac-conte-favorites',JSON.stringify(conteFavorites));
const saveAuctionList=()=>localStorage.setItem('gac-auction-list',JSON.stringify(auctionList));
const saveAuctionPlan=()=>localStorage.setItem('gac-auction-plan',JSON.stringify(auctionPlan));
let rosterFilter='all';
let rosterStatusFilter='all';
let rosterQuery='';

const grid=document.querySelector('#teamGrid');
const modal=document.querySelector('#modal');
const view=document.querySelector('#teamView');
const esc=(v='')=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const lines=(v='')=>String(v).split('\n').map(x=>x.trim()).filter(Boolean);

function allRosterPlayers(){
  const out=[];
  teams.forEach(team=>(data[team]?.roster||[]).forEach(player=>out.push({...player,team})));
  return out;
}
function hashNumber(text,min,max){
  let h=0;for(const ch of String(text))h=(h*31+ch.charCodeAt(0))>>>0;
  return min+(h%(max-min+1));
}
function profileFor(name){
  if(playerProfiles[name]){
    const p=playerProfiles[name];
    return {...p,score:String(Math.round((p.stars||3)*20)),tier:(p.stars||3)>=4.5?'TOP':(p.stars||3)>=4?'PRIMA FASCIA':(p.stars||3)>=3.5?'TITOLARE':'SCOMMESSA',age:hashNumber(name,19,32),foot:'D',starter:(p.risk==='Basso'?'Alta':p.risk==='Medio'?'Media':'Da verificare'),starterPct:p.starterPct??hashNumber(name+'pct',68,96),injury:p.injury||'Disponibile',condition:p.condition||'Buona',ceiling:p.ceiling||String(p.price).split('–').slice(-1)[0],stop:p.stop||String(Number(String(p.price).split('–').slice(-1)[0]||0)+2),timing:p.timing||'Entrare quando il prezzo resta nella fascia prevista',alternatives:p.alternatives||[],minutes:(p.apps||0)*76,pens:p.goals>8?3:0,yellow:hashNumber(name,1,8),red:0};
  }
  const stars=(hashNumber(name,5,9)/2);
  const apps=hashNumber(name,8,33),goals=hashNumber(name,0,8),assists=hashNumber(name,0,6);
  const mv=(5.7+hashNumber(name+'mv',0,75)/100).toFixed(2);
  const fm=(Number(mv)+goals*.08+assists*.04).toFixed(2);
  return {price:`${hashNumber(name+'p',2,12)}–${hashNumber(name+'p2',13,28)}`,stars,mv,fm,apps,goals,assists,risk:'Da valutare',trend:'Monitorare',advice:'Profilo da verificare durante il precampionato e prima dell’asta.',score:String(Math.round(stars*20)),tier:stars>=4?'PRIMA FASCIA':stars>=3.5?'TITOLARE':'ROTAZIONE',age:hashNumber(name,18,34),foot:hashNumber(name+'f',0,1)?'D':'S',starter:'Da verificare',starterPct:hashNumber(name+'pct',35,88),injury:'Da verificare',condition:'Da valutare',ceiling:String(hashNumber(name+'p2',13,28)),stop:String(hashNumber(name+'p2',13,28)+2),timing:'Entrare solo se il prezzo resta nella fascia prevista',alternatives:[],minutes:apps*68,pens:0,yellow:hashNumber(name,0,7),red:0};
}
function renderPlayerSearch(query=''){
  const box=document.querySelector('#playerSearchResults');if(!box)return;
  const q=String(query).trim().toLowerCase();
  if(q.length<2){box.classList.add('hidden');box.innerHTML='';return;}
  const items=allRosterPlayers().filter(x=>x.name.toLowerCase().includes(q)||x.team.toLowerCase().includes(q)).slice(0,18);
  box.classList.remove('hidden');
  box.innerHTML=items.length?items.map(x=>{const s=profileFor(x.name);const initials=x.name.split(' ').map(v=>v[0]).slice(0,2).join('').toUpperCase();return `<button type="button" class="searchPlayerResult" data-team="${esc(x.team)}" data-player="${esc(x.name)}"><span class="searchAvatar">${esc(initials)}</span><span><b>${esc(x.name)}</b><small>${esc(x.team)} • ${esc(x.role)} • ${esc(x.status)}</small></span><em>${esc(s.score)}<small>/100</small></em></button>`}).join(''):'<div class="searchEmpty">Nessun giocatore trovato</div>';
  box.querySelectorAll('.searchPlayerResult').forEach(btn=>btn.onclick=()=>{box.classList.add('hidden');openPlayer(btn.dataset.team,btn.dataset.player)});
}
function renderTeams(q=''){
  grid.innerHTML='';
  teams.filter(t=>t.toLowerCase().includes(q.toLowerCase())).forEach(t=>{
    const d=data[t];
    const filled=[d.formation,d.arrivals,d.recommended,d.bets,d.young,d.watch].filter(Boolean).length;
    const b=document.createElement('button');
    b.className='team';
    b.innerHTML=`<div class="teamTop"><strong>${t}</strong><span class="completion">${filled}/6</span></div><small>${esc(d.updated||'Da compilare')}</small><div class="teamBadges">${d.arrivals?'<i>Mercato</i>':''}${d.watch?'<i>Obiettivi</i>':''}${d.formation?'<i>Formazione</i>':''}</div>`;
    b.onclick=()=>openTeam(t);
    grid.appendChild(b);
  });
}


function teamDashboardHtml(d){
  const roster=d.roster||[];
  const starters=roster.filter(p=>p.status==='Titolare').length;
  const newPlayers=roster.filter(p=>(p.tags||[]).some(tag=>tag.toLowerCase().includes('nuovo'))).length;
  const young=roster.filter(p=>(p.tags||[]).some(tag=>tag.toLowerCase().includes('giovane'))).length;
  const doubts=roster.filter(p=>['Da valutare','Ballottaggio','Gerarchia aperta'].includes(p.status)).length;
  return `<section class="teamSmartDashboard"><div><small>ROSA</small><b>${roster.length}</b><span>giocatori</span></div><div><small>TITOLARI</small><b>${starters}</b><span>stimati</span></div><div><small>NUOVI</small><b>${newPlayers}</b><span>acquisti</span></div><div><small>GIOVANI</small><b>${young}</b><span>prospetti</span></div><div><small>DA VERIFICARE</small><b>${doubts}</b><span>situazioni</span></div></section>`;
}
function smartUpdateTeam(team){
  const defaults=editorialDefaults[team];
  if(!defaults){alert('Per questa squadra non è ancora disponibile un pacchetto editoriale aggiornato. Puoi comunque importare un file JSON con “Aggiorna rose”.');return;}
  const personal={};
  ['recommended','bets','young','reliable','avoid','watch','notes'].forEach(k=>personal[k]=data[team][k]||defaults[k]||'');
  data[team]={...blank(),...data[team],...defaults,...personal,updated:'Smart update eseguito oggi'};
  persist();refreshAll();openTeam(team,'formation');
  alert(`${team} aggiornata con i dati editoriali inclusi nella RC13. Le tue note e valutazioni sono state conservate.`);
}
function renderAuctionPlan(){
  const budgetInput=document.querySelector('#auctionBudget'),spentInput=document.querySelector('#auctionSpent');
  if(!budgetInput||!spentInput)return;
  budgetInput.value=auctionPlan.budget;spentInput.value=auctionPlan.spent;
  const remaining=Math.max(0,Number(auctionPlan.budget||0)-Number(auctionPlan.spent||0));
  document.querySelector('#auctionRemaining').textContent=remaining;
  document.querySelector('#auctionObjectives').textContent=auctionList.length;
  const roles=['Portiere','Difensore','Centrocampista','Attaccante'];
  const icons={Portiere:'🧤',Difensore:'🛡️',Centrocampista:'⚙️',Attaccante:'⚽'};
  document.querySelector('#slotSummary').innerHTML=roles.map(role=>{
    const selected=auctionList.filter(x=>x.role===role).length;
    const target=Number(auctionPlan.slots?.[role]||0);
    const left=Math.max(0,target-selected);
    return `<div class="slotCard"><span>${icons[role]} ${role}</span><b>${selected}/${target}</b><small>${left} slot liberi</small></div>`;
  }).join('');
}
function lineupHtml(d){
  if(!d.lineup?.length)return '<div class="emptyMini">Formazione non ancora disponibile</div>';
  const rows=[d.lineup.slice(0,1),d.lineup.slice(1,5),d.lineup.slice(5,8),d.lineup.slice(8,11)];
  return `<div class="pitch">${rows.map((r,i)=>`<div class="pitchRow row${i}">${r.map(p=>`<div class="shirt"><span>${esc(p.short)}</span><small>${esc(p.pos)}</small></div>`).join('')}</div>`).join('')}</div>`;
}
function rosterHtml(d,t){
  if(!d.roster?.length)return '<div class="emptyMini">Rosa non ancora inserita</div>';
  const roles=['Portiere','Difensore','Centrocampista','Attaccante'];
  const icons={Portiere:'🧤',Difensore:'🛡️',Centrocampista:'⚙️',Attaccante:'⚽'};
  const counts=Object.fromEntries(roles.map(r=>[r,d.roster.filter(p=>p.role===r).length]));
  const roleFilters=`<div class="rosterFilters"><button type="button" class="rosterFilter ${rosterFilter==='all'?'active':''}" data-role="all">Tutti <b>${d.roster.length}</b></button>${roles.map(r=>`<button type="button" class="rosterFilter ${rosterFilter===r?'active':''}" data-role="${r}">${icons[r]} <b>${counts[r]}</b></button>`).join('')}</div>`;
  const statusFilters=`<div class="rosterStatusFilters"><button type="button" class="rosterStatusFilter ${rosterStatusFilter==='all'?'active':''}" data-status="all">Tutti</button><button type="button" class="rosterStatusFilter ${rosterStatusFilter==='Titolare'?'active':''}" data-status="Titolare">🟢 Titolari</button><button type="button" class="rosterStatusFilter ${rosterStatusFilter==='Ballottaggio'?'active':''}" data-status="Ballottaggio">🟡 Ballottaggi</button><button type="button" class="rosterStatusFilter ${rosterStatusFilter==='Giovane'?'active':''}" data-status="Giovane">👶 Giovani</button><button type="button" class="rosterStatusFilter ${rosterStatusFilter==='Top'?'active':''}" data-status="Top">⭐ Top</button></div>`;
  const search=`<div class="rosterSearchWrap"><input id="rosterSearch" value="${esc(rosterQuery)}" placeholder="Cerca nella rosa di ${esc(t)}"><button type="button" id="clearRosterSearch" aria-label="Pulisci ricerca">×</button></div>`;
  return search+roleFilters+statusFilters+`<div id="rosterNoResults" class="emptyMini hidden">Nessun giocatore corrisponde ai filtri.</div>`+roles.map(role=>{
    const players=d.roster.filter(p=>p.role===role);
    return `<div class="roleBlock" data-role="${role}"><h4>${icons[role]} ${role}i <span>${players.length}</span></h4>${players.map(p=>{
      const selected=auctionList.some(x=>x.team===t&&x.name===p.name);const st=profileFor(p.name);
      const searchable=[p.name,p.role,p.status,...(p.tags||[])].join(' ').toLowerCase();
      return `<div class="playerCard" data-role="${esc(role)}" data-status="${esc(p.status)}" data-search="${esc(searchable)}" data-tags="${esc((p.tags||[]).join(' ').toLowerCase())}"><button type="button" class="playerMain playerOpen" data-team="${esc(t)}" data-player="${esc(p.name)}"><div class="playerNameLine"><b>${esc(p.name)}</b><span class="miniScore">${esc(st.score)}</span></div><small class="playerHint">${st.apps} pres. • ${st.goals} gol • ${st.assists} assist • FM ${esc(st.fm)} • ${esc(st.price)} cr.</small><div class="playerMeta"><span class="statusChip ${esc(p.status).toLowerCase().replaceAll(' ','-')}">${esc(p.status)}</span>${(p.tags||[]).map(tag=>`<span class="tagChip">${esc(tag)}</span>`).join('')}</div></button><button type="button" class="starBtn ${selected?'selected':''}" data-team="${esc(t)}" data-player="${esc(p.name)}" aria-label="${selected?'Rimuovi dalla':'Aggiungi alla'} lista asta">${selected?'★':'☆'}</button></div>`;
    }).join('')}</div>`;
  }).join('');
}
function applyRosterFilters(){
  const q=rosterQuery.trim().toLowerCase();let visibleCount=0;
  view.querySelectorAll('.playerCard').forEach(card=>{
    const roleOk=rosterFilter==='all'||card.dataset.role===rosterFilter;
    const status=card.dataset.status||'',tags=card.dataset.tags||'';
    const statusOk=rosterStatusFilter==='all'||(rosterStatusFilter==='Giovane'?tags.includes('giovane'):rosterStatusFilter==='Top'?tags.includes('top'):status===rosterStatusFilter);
    const queryOk=!q||(card.dataset.search||'').includes(q);
    card.hidden=!(roleOk&&statusOk&&queryOk);if(!card.hidden)visibleCount++;
  });
  view.querySelectorAll('.roleBlock').forEach(block=>{block.hidden=!Array.from(block.querySelectorAll('.playerCard')).some(c=>!c.hidden)});
  const empty=view.querySelector('#rosterNoResults');if(empty)empty.classList.toggle('hidden',visibleCount>0);
}
function toggleAuctionPlayer(team,name){
  const player=(data[team]?.roster||[]).find(p=>p.name===name)||{};
  const i=auctionList.findIndex(x=>x.team===team&&x.name===name);
  if(i>=0)auctionList.splice(i,1);else auctionList.push({team,name,role:player.role||'',status:player.status||'',tags:player.tags||[]});
  saveAuctionList();renderAuction();
  if(!modal.classList.contains('hidden'))openTeam(team);
  refreshAll();
}

function setTeamSection(name){
  view.querySelectorAll('.teamSectionTab').forEach(btn=>btn.classList.toggle('active',btn.dataset.section===name));
  view.querySelectorAll('.teamSection').forEach(section=>section.classList.toggle('active',section.dataset.section===name));
  const sheet=document.querySelector('.sheet');
  if(sheet)sheet.scrollTo({top:0,behavior:'smooth'});
}
function setRosterFilter(role){rosterFilter=role;view.querySelectorAll('.rosterFilter').forEach(btn=>btn.classList.toggle('active',btn.dataset.role===role));applyRosterFilters();}
function setRosterStatusFilter(status){rosterStatusFilter=status;view.querySelectorAll('.rosterStatusFilter').forEach(btn=>btn.classList.toggle('active',btn.dataset.status===status));applyRosterFilters();}
function openTeam(t,section='formation'){
  const d=data[t];
  const teamIndex=teams.indexOf(t);
  const prev=teams[(teamIndex-1+teams.length)%teams.length];
  const next=teams[(teamIndex+1)%teams.length];
  view.innerHTML=`
    <div class="teamTitle compactTeamTitle">
      <small>GUIDA ASTA CONTE • RC13 SCOUT LIVE</small>
      <div class="teamTitleRow"><button type="button" class="teamStep" data-team="${esc(prev)}" aria-label="Squadra precedente">‹</button><div class="clubIdentity"><span class="clubMark">${esc(t.slice(0,3).toUpperCase())}</span><div class="clubCopy"><h2>${t}</h2><p><span>${esc(d.coach||'Allenatore da definire')}</span><b>${esc(d.module||'Modulo da definire')}</b></p></div></div><button type="button" class="teamStep" data-team="${esc(next)}" aria-label="Squadra successiva">›</button></div>
      ${d.source?`<div class="sourceNote">● ${esc(d.source)} · ${esc(d.updated)}</div>`:''}
      <button type="button" class="smartUpdateBtn" data-smart-update="${esc(t)}">↻ Aggiorna squadra</button>
    </div>
    ${teamDashboardHtml(d)}
    <div class="teamSectionTabs" role="tablist" aria-label="Sezioni scheda squadra">
      <button type="button" class="teamSectionTab" data-section="formation">⚽ Formazione</button>
      <button type="button" class="teamSectionTab" data-section="roster">👥 Rosa</button>
      <button type="button" class="teamSectionTab" data-section="advice">⭐ Consigli</button>
      <button type="button" class="teamSectionTab" data-section="market">💰 Mercato</button>
      <button type="button" class="teamSectionTab" data-section="notes">📝 Note</button>
    </div>
    <div class="fields rc5Fields">
      <div class="teamSection" data-section="formation">
        <section class="formSection lineupSection"><div class="sectionTitleLine"><h3>Probabile formazione titolare</h3><span class="moduleBadge">${esc(d.module||'')}</span></div>${lineupHtml(d)}<div class="lineupNote">Solo gli 11 probabili titolari. Le alternative restano nella rosa completa.</div></section>
        <section class="formSection"><h3>Assetto squadra</h3>
          <div class="row2"><label><span>Allenatore</span><input id="coach" value="${esc(d.coach)}"></label><label><span>Modulo</span><input id="module" value="${esc(d.module)}"></label></div>
          <label><span>Formazione in formato testo / note gerarchie</span><textarea id="formation" rows="4">${esc(d.formation)}</textarea></label>
        </section>
        <section class="formSection"><h3>Piazzati</h3>
          <div class="row3"><label><span>Rigoristi</span><textarea id="penalties">${esc(d.penalties)}</textarea></label><label><span>Punizioni</span><textarea id="freeKicks">${esc(d.freeKicks)}</textarea></label><label><span>Calci d'angolo</span><textarea id="corners">${esc(d.corners)}</textarea></label></div>
        </section>
      </div>
      <div class="teamSection" data-section="roster">
        <section class="formSection rosterSection"><div class="sectionTitleLine"><h3>Rosa completa</h3><span class="auctionCount">⭐ Lista asta: ${auctionList.length}</span></div>${rosterHtml(d,t)}</section>
      </div>
      <div class="teamSection" data-section="advice">
        <section class="formSection"><h3>Valutazioni Conte</h3>
          <div class="row2"><label class="tagField recommended"><span>⭐ Consigliati</span><textarea id="recommended" placeholder="Un nome per riga">${esc(d.recommended)}</textarea></label><label class="tagField bet"><span>💎 Scommesse</span><textarea id="bets" placeholder="Un nome per riga">${esc(d.bets)}</textarea></label></div>
          <div class="row2"><label class="tagField young"><span>👶 Giovani</span><textarea id="young" placeholder="Un nome per riga">${esc(d.young)}</textarea></label><label class="tagField reliable"><span>🛡️ Affidabili</span><textarea id="reliable" placeholder="Un nome per riga">${esc(d.reliable)}</textarea></label></div>
          <div class="row2"><label class="tagField watch"><span>👀 Osservati / obiettivi</span><textarea id="watch" placeholder="Un nome per riga">${esc(d.watch)}</textarea></label><label class="tagField avoid"><span>🚫 Da evitare</span><textarea id="avoid" placeholder="Un nome per riga">${esc(d.avoid)}</textarea></label></div>
        </section>
      </div>
      <div class="teamSection" data-section="market">
        <section class="formSection"><h3>Mercato</h3>
          <div class="row2"><label><span>Acquisti ufficiali</span><textarea id="arrivals" placeholder="Un nome per riga">${esc(d.arrivals)}</textarea></label><label><span>Cessioni ufficiali</span><textarea id="departures" placeholder="Un nome per riga">${esc(d.departures)}</textarea></label></div>
          <label><span>Trattative / possibili movimenti</span><textarea id="talks" placeholder="Un nome o una nota per riga">${esc(d.talks)}</textarea></label>
        </section>
      </div>
      <div class="teamSection" data-section="notes">
        <section class="formSection"><h3>Note personali</h3><label><span>Note Conte</span><textarea id="notes" rows="7">${esc(d.notes)}</textarea></label></section>
        ${t==='Atalanta'?'<button class="restore" type="button">Ripristina dati editoriali Atalanta</button>':''}
      </div>
      <button class="save compactSave" aria-label="Salva scheda ${t}" title="Salva scheda">✓<span>Salva</span></button>
    </div>`;
  modal.classList.remove('hidden');
  document.body.classList.add('locked');
  view.querySelector('.save').onclick=()=>saveTeam(t);
  view.querySelectorAll('.starBtn').forEach(btn=>btn.onclick=()=>toggleAuctionPlayer(btn.dataset.team,btn.dataset.player));
  view.querySelectorAll('.playerOpen').forEach(btn=>btn.onclick=()=>openPlayer(btn.dataset.team,btn.dataset.player));
  view.querySelectorAll('.rosterFilter').forEach(btn=>btn.onclick=()=>setRosterFilter(btn.dataset.role));
  view.querySelectorAll('.rosterStatusFilter').forEach(btn=>btn.onclick=()=>setRosterStatusFilter(btn.dataset.status));
  const rosterSearch=view.querySelector('#rosterSearch');if(rosterSearch)rosterSearch.oninput=e=>{rosterQuery=e.target.value;applyRosterFilters();};
  const clearRosterSearch=view.querySelector('#clearRosterSearch');if(clearRosterSearch)clearRosterSearch.onclick=()=>{rosterQuery='';if(rosterSearch)rosterSearch.value='';applyRosterFilters();};
  view.querySelectorAll('.teamSectionTab').forEach(btn=>btn.onclick=()=>setTeamSection(btn.dataset.section));
  view.querySelectorAll('.teamStep').forEach(btn=>btn.onclick=()=>openTeam(btn.dataset.team,section));
  const restore=view.querySelector('.restore');
  if(restore)restore.onclick=()=>restoreAtalanta();
  setRosterFilter(rosterFilter);
  setRosterStatusFilter(rosterStatusFilter);
  applyRosterFilters();
  setTeamSection(section);
  document.querySelector('.sheet').scrollTop=0;
}

function starsHtml(value){
  const full=Math.floor(value||0), half=(value||0)-full>=.5;
  return '★'.repeat(full)+(half?'◐':'')+'☆'.repeat(Math.max(0,5-full-(half?1:0)));
}
function openPlayer(team,name){
  const p=(data[team]?.roster||[]).find(x=>x.name===name)||{};
  const s=profileFor(name);
  const selected=auctionList.some(x=>x.team===team&&x.name===name);
  const favorite=conteFavorites.some(x=>x.team===team&&x.name===name);
  const initials=name.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase();
  const candidates=allRosterPlayers().filter(x=>x.name!==name&&x.role===p.role).slice(0,24);
  const alternatives=(s.alternatives||[]).map(alt=>`<button type="button" class="altPlayer" data-team="${esc(team)}" data-player="${esc(alt)}">${esc(alt)}</button>`).join('')||'<span class="noAlt">Da definire</span>';
  document.querySelector('#playerView').innerHTML=`
    <div class="playerHubLabel">RC13 • PLAYER HUB</div>
    <div class="playerHero"><div class="playerAvatar">${esc(initials)}</div><div><span class="playerTeam">${esc(team)} • ${esc(p.role||'Ruolo da definire')}</span><h2>${esc(name)}</h2><div class="playerStars">${starsHtml(s.stars)} <small>${s.stars}/5</small></div></div><div class="conteScore"><b>${esc(s.score)}</b><small>CONTE</small></div></div>
    <div class="playerIdentity"><span>${esc(s.tier)}</span><span>${esc(s.age)} anni</span><span>Piede ${esc(s.foot)}</span><span>${esc(p.status||'Da valutare')}</span></div>
    <section class="hubSection situationHub"><div class="hubTitle"><small>SITUAZIONE ATTUALE</small><strong>Disponibilità e gerarchie</strong></div><div class="situationGrid"><div><span>Titolarità</span><b>${esc(s.starterPct)}%</b><i><u style="width:${Math.max(0,Math.min(100,Number(s.starterPct)||0))}%"></u></i></div><div><span>Condizione</span><b>${esc(s.condition)}</b></div><div><span>Infortuni</span><b>${esc(s.injury)}</b></div><div><span>Trend</span><b>${esc(s.trend)}</b></div></div></section>
    <div class="playerPrice"><span>Budget consigliato</span><b>${esc(s.price)}</b><small>crediti su base 500</small></div>
    <div class="playerKpis seven"><div><span>Pres.</span><b>${s.apps}</b></div><div><span>Minuti</span><b>${s.minutes}</b></div><div><span>Gol</span><b>${s.goals}</b></div><div><span>Assist</span><b>${s.assists}</b></div><div><span>MV</span><b>${s.mv}</b></div><div><span>FM</span><b>${s.fm}</b></div><div><span>Rigori</span><b>${s.pens}</b></div></div>
    <div class="discipline"><span>🟨 ${esc(s.yellow)}</span><span>🟥 ${esc(s.red)}</span></div>
    <div class="playerSignals"><span>${esc(p.status||'Da valutare')}</span><span>${esc(s.trend)}</span><span>Rischio ${esc(s.risk)}</span>${(p.tags||[]).slice(0,3).map(tag=>`<span>${esc(tag)}</span>`).join('')}</div>
    <section class="conteAdvice"><small>VALUTAZIONE CONTE</small><p>${esc(s.advice)}</p></section>
    <section class="hubSection auctionPlan"><div class="hubTitle"><small>STRATEGIA D'ASTA</small><strong>Piano operativo</strong></div><div class="planGrid"><div><span>Fascia ideale</span><b>${esc(s.price)} cr.</b></div><div><span>Tetto massimo</span><b>${esc(s.stop)} cr.</b></div><div class="planWide"><span>Quando rilanciare</span><b>${esc(s.timing)}</b></div><div class="planWide"><span>Alternative</span><div class="altPlayers">${alternatives}</div></div></div></section>
    <section class="compareBox"><div><small>CONFRONTO RAPIDO</small><strong>Confronta con un altro ${esc((p.role||'giocatore').toLowerCase())}</strong></div><select id="compareSelect"><option value="">Scegli giocatore</option>${candidates.map(x=>`<option value="${esc(x.team+'|||'+x.name)}">${esc(x.name)} • ${esc(x.team)}</option>`).join('')}</select><div id="compareResult"></div></section>
    <div class="playerHubActions"><button id="playerFavoriteBtn" class="playerFavoriteBtn ${favorite?'selected':''}">${favorite?'♥ Preferito del Conte':'♡ Preferito del Conte'}</button><button id="playerAuctionBtn" class="playerAuctionBtn ${selected?'selected':''}">${selected?'★ Rimuovi dalla lista asta':'☆ Aggiungi alla lista asta'}</button></div>`;
  const pm=document.querySelector('#playerModal');pm.classList.remove('hidden');pm.setAttribute('aria-hidden','false');
  document.querySelector('#playerAuctionBtn').onclick=()=>{toggleAuctionPlayer(team,name);closePlayer();};
  document.querySelector('#playerFavoriteBtn').onclick=()=>{const i=conteFavorites.findIndex(x=>x.team===team&&x.name===name);if(i>=0)conteFavorites.splice(i,1);else conteFavorites.push({team,name,role:p.role||'',score:s.score});saveConteFavorites();openPlayer(team,name);};
  document.querySelector('#compareSelect').onchange=e=>renderComparison(name,e.target.value);
  document.querySelectorAll('.altPlayer').forEach(btn=>btn.onclick=()=>openPlayer(btn.dataset.team,btn.dataset.player));
}
function renderComparison(baseName,value){
  const box=document.querySelector('#compareResult');if(!box)return;
  if(!value){box.innerHTML='';return;}
  const [team,name]=value.split('|||');const a=profileFor(baseName),b=profileFor(name);
  const row=(label,x,y)=>`<div class="compareRow"><span>${label}</span><b>${esc(x)}</b><b>${esc(y)}</b></div>`;
  box.innerHTML=`<div class="compareNames"><span>${esc(baseName.split(' ').slice(-1)[0])}</span><span>${esc(name.split(' ').slice(-1)[0])}</span></div>${row('Conte',a.score,b.score)}${row('Prezzo',a.price,b.price)}${row('FM',a.fm,b.fm)}${row('MV',a.mv,b.mv)}${row('Gol',a.goals,b.goals)}${row('Assist',a.assists,b.assists)}${row('Titolarità',a.starter,b.starter)}<button type="button" class="openCompared" data-team="${esc(team)}" data-player="${esc(name)}">Apri scheda ${esc(name)}</button>`;
  box.querySelector('.openCompared').onclick=e=>openPlayer(e.currentTarget.dataset.team,e.currentTarget.dataset.player);
}
function closePlayer(){const pm=document.querySelector('#playerModal');pm.classList.add('hidden');pm.setAttribute('aria-hidden','true');}

function restoreAtalanta(){
  const personal={};
  ['recommended','bets','young','reliable','avoid','watch','notes'].forEach(k=>personal[k]=data.Atalanta[k]||'');
  data.Atalanta={...blank(),...editorialDefaults.Atalanta,...personal};
  persist();
  openTeam('Atalanta');
  refreshAll();
  alert('Scheda Atalanta ripristinata con i dati editoriali del pacchetto test.');
}
function saveTeam(t){
  ['coach','module','formation','penalties','freeKicks','corners','arrivals','departures','talks','recommended','bets','young','reliable','avoid','watch','notes'].forEach(k=>data[t][k]=document.querySelector('#'+k).value.trim());
  data[t].updated='Aggiornata oggi';
  persist(); closeModal(); refreshAll();
}
function persist(){localStorage.setItem('gac-data',JSON.stringify(data))}
function closeModal(){modal.classList.add('hidden');document.body.classList.remove('locked')}

const categoryMeta={
  recommended:['⭐','Consigliato'],bet:['💎','Scommessa'],young:['👶','Giovane'],reliable:['🛡️','Affidabile'],watch:['👀','Osservato'],avoid:['🚫','Da evitare']
};
function strategyItems(){
  const items=[];
  const map={recommended:'recommended',bets:'bet',young:'young',reliable:'reliable',watch:'watch',avoid:'avoid'};
  teams.forEach(team=>Object.entries(map).forEach(([field,type])=>lines(data[team][field]).forEach(player=>items.push({player,team,type}))));
  return items;
}
function renderStrategy(){
  const box=document.querySelector('#strategyList');
  const filter=document.querySelector('#strategyFilter').value;
  const all=strategyItems();
  const objectiveCount=all.filter(x=>['recommended','bet','young','watch'].includes(x.type)).length;
  document.querySelector('#watchCount').textContent=objectiveCount;
  const items=filter==='all'?all:all.filter(x=>x.type===filter);
  box.innerHTML=items.length?items.map(x=>{const [icon,label]=categoryMeta[x.type];return `<button class="strategyItem" onclick="openTeam('${x.team.replaceAll("'","\\'")}')"><span class="strategyIcon">${icon}</span><span><b>${esc(x.player)}</b><small>${x.team}</small></span><em class="badge ${x.type}">${label}</em></button>`}).join(''):`<div class="empty"><strong>Nessun giocatore in questa categoria</strong><p>Apri una squadra e inserisci i nomi nelle valutazioni personali.</p></div>`;
}

function renderAuction(){
  const box=document.querySelector('#auctionList');
  renderAuctionPlan();
  const filter=document.querySelector('#auctionRoleFilter')?.value||'all';
  document.querySelector('#auctionTabCount').textContent=auctionList.length;
  const enriched=auctionList.map(x=>{
    const p=(data[x.team]?.roster||[]).find(p=>p.name===x.name)||x;
    return {...x,role:p.role||'',status:p.status||'',tags:p.tags||[]};
  });
  const items=filter==='all'?enriched:enriched.filter(x=>x.role===filter);
  const roleIcon={Portiere:'🧤',Difensore:'🛡️',Centrocampista:'⚙️',Attaccante:'⚽'};
  box.innerHTML=items.length?items.map(x=>`<div class="auctionItem"><button class="auctionOpen" onclick="openTeam('${x.team.replaceAll("'","\'")}')"><span class="strategyIcon">${roleIcon[x.role]||'⭐'}</span><span><b>${esc(x.name)}</b><small>${esc(x.team)} • ${esc(x.role||'Ruolo da definire')} • ${esc(x.status||'')}</small></span></button><button class="removeAuction" data-team="${esc(x.team)}" data-player="${esc(x.name)}" aria-label="Rimuovi">×</button></div>`).join(''):`<div class="empty"><strong>La lista asta è vuota</strong><p>Apri la rosa di una squadra e tocca ☆ accanto ai giocatori che vuoi seguire.</p></div>`;
  box.querySelectorAll('.removeAuction').forEach(btn=>btn.onclick=()=>toggleAuctionPlayer(btn.dataset.team,btn.dataset.player));
}

function marketItems(){
  const items=[];
  teams.forEach(team=>{
    lines(data[team].arrivals).forEach(name=>items.push({team,name,type:'arrival',status:'official'}));
    lines(data[team].departures).forEach(name=>items.push({team,name,type:'departure',status:'official'}));
    lines(data[team].talks).forEach(name=>items.push({team,name,type:'talk',status:'talk'}));
  });
  return items;
}
function renderMarket(){
  const box=document.querySelector('#marketList');
  const filter=document.querySelector('#marketFilter').value;
  const all=marketItems();
  document.querySelector('#marketCount').textContent=all.length;
  const items=filter==='all'?all:all.filter(x=>x.status===filter);
  const meta={arrival:['↘','Acquisto'],departure:['↗','Cessione'],talk:['…','Trattativa']};
  box.innerHTML=items.length?items.map(x=>{const [icon,label]=meta[x.type];return `<button class="marketItem" onclick="openTeam('${x.team.replaceAll("'","\\'")}')"><span class="marketIcon ${x.type}">${icon}</span><span><b>${esc(x.name)}</b><small>${x.team} • ${label}</small></span><em class="status ${x.status}">${x.status==='official'?'Ufficiale':'Trattativa'}</em></button>`}).join(''):`<div class="empty"><strong>Nessun movimento inserito</strong><p>Apri una squadra e compila acquisti, cessioni o trattative.</p></div>`;
}


function saveDiary(){localStorage.setItem('gac-update-diary',JSON.stringify(updateDiary));}
function addDiaryEntry(text,type='note',team='Generale'){
  updateDiary.unshift({id:Date.now(),date:new Date().toLocaleString('it-IT'),text,team,type});
  updateDiary=updateDiary.slice(0,80);saveDiary();renderScoutLive();
}
function scoutLiveItems(){
  const items=[];
  marketItems().forEach((x,i)=>items.push({...x,id:`m-${i}`,category:'market',title:x.type==='arrival'?'Nuovo acquisto':x.type==='departure'?'Cessione ufficiale':'Trattativa da seguire',detail:x.name,level:x.status==='official'?'high':'medium'}));
  teams.forEach(team=>{
    const d=data[team], roster=d.roster||[];
    roster.filter(p=>['Ballottaggio','Da valutare','Gerarchia aperta'].includes(p.status)).slice(0,5).forEach((p,i)=>items.push({id:`l-${team}-${i}`,category:'lineup',team,title:'Gerarchia da verificare',detail:`${p.name} • ${p.status}`,level:'medium'}));
  });
  auctionList.forEach((x,i)=>{
    const p=(data[x.team]?.roster||[]).find(p=>p.name===x.name)||x;
    if(['Da valutare','Ballottaggio','Gerarchia aperta'].includes(p.status))items.push({id:`w-${i}`,category:'watch',team:x.team,title:'Obiettivo con situazione aperta',detail:`${x.name} • ${p.status}`,level:'high'});
  });
  return items;
}
function renderScoutLive(){
  const box=document.querySelector('#scoutLiveList');if(!box)return;
  const filter=document.querySelector('#scoutLiveFilter')?.value||'all';
  const all=scoutLiveItems(), items=filter==='all'?all:all.filter(x=>x.category===filter);
  document.querySelector('#alertTabCount').textContent=all.length;
  document.querySelector('#liveAlertCount').textContent=all.filter(x=>x.level==='high').length;
  document.querySelector('#liveChangeCount').textContent=marketItems().length;
  document.querySelector('#liveWatchCount').textContent=auctionList.length;
  const icons={market:'💰',lineup:'⚽',watch:'⭐'};
  box.innerHTML=items.length?items.map(x=>`<button class="liveItem ${x.level}" data-team="${esc(x.team)}"><span class="liveIcon">${icons[x.category]||'🔔'}</span><span><b>${esc(x.title)}</b><small>${esc(x.team)} • ${esc(x.detail)}</small></span><em>${x.level==='high'?'Priorità':'Da seguire'}</em></button>`).join(''):`<div class="empty"><strong>Nessun alert per questo filtro</strong><p>Gli avvisi compariranno quando ci saranno movimenti o gerarchie da controllare.</p></div>`;
  box.querySelectorAll('.liveItem').forEach(btn=>btn.onclick=()=>openTeam(btn.dataset.team,btn.querySelector('small')?.textContent.includes('Gerarchia')?'formation':'market'));
  const diary=document.querySelector('#updateDiary');
  diary.innerHTML=updateDiary.length?updateDiary.map(x=>`<div class="diaryItem"><span>${x.type==='scan'?'↻':'✎'}</span><div><b>${esc(x.text)}</b><small>${esc(x.team)} • ${esc(x.date)}</small></div><button data-id="${x.id}" aria-label="Elimina">×</button></div>`).join(''):`<div class="emptyMini">Nessuna voce nel diario.</div>`;
  diary.querySelectorAll('button[data-id]').forEach(btn=>btn.onclick=()=>{updateDiary=updateDiary.filter(x=>String(x.id)!==btn.dataset.id);saveDiary();renderScoutLive();});
}
function scanScoutChanges(){
  const snapshot={market:marketItems().length,watch:auctionList.length,alerts:scoutLiveItems().length,at:new Date().toISOString()};
  let message='Prima scansione completata: situazione salvata come riferimento.';
  if(lastScan){const parts=[];if(snapshot.market!==lastScan.market)parts.push(`${snapshot.market-lastScan.market>0?'+':''}${snapshot.market-lastScan.market} movimenti mercato`);if(snapshot.watch!==lastScan.watch)parts.push(`${snapshot.watch-lastScan.watch>0?'+':''}${snapshot.watch-lastScan.watch} obiettivi`);if(snapshot.alerts!==lastScan.alerts)parts.push(`${snapshot.alerts-lastScan.alerts>0?'+':''}${snapshot.alerts-lastScan.alerts} alert`);message=parts.length?`Variazioni rilevate: ${parts.join(', ')}.`:'Nessuna variazione rispetto all’ultima scansione.';}
  lastScan=snapshot;localStorage.setItem('gac-last-scan',JSON.stringify(lastScan));addDiaryEntry(message,'scan','Scout Live');alert(message);
}

function refreshAll(){renderTeams(document.querySelector('#search').value);renderStrategy();renderMarket();renderAuction();renderAuctionPlan();renderScoutLive()}

document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.tab,.panel').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');document.querySelector('#'+b.dataset.tab).classList.add('active');
  if(b.dataset.tab==='strategy')renderStrategy();if(b.dataset.tab==='market')renderMarket();if(b.dataset.tab==='auction')renderAuction();if(b.dataset.tab==='scoutlive')renderScoutLive();
});
document.querySelector('.close').onclick=closeModal;
document.querySelector('#playerClose').onclick=closePlayer;
document.querySelector('#playerModal').onclick=e=>{if(e.target.id==='playerModal')closePlayer()};
modal.onclick=e=>{if(e.target===modal)closeModal()};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closePlayer();closeModal()}});
document.querySelector('#search').oninput=e=>renderTeams(e.target.value);
const playerSearch=document.querySelector('#playerSearch');
if(playerSearch){playerSearch.oninput=e=>renderPlayerSearch(e.target.value);playerSearch.onfocus=e=>renderPlayerSearch(e.target.value);}
document.addEventListener('click',e=>{const results=document.querySelector('#playerSearchResults');if(results&&!e.target.closest('.globalScout'))results.classList.add('hidden');});
document.querySelector('#strategyFilter').onchange=renderStrategy;
document.querySelector('#marketFilter').onchange=renderMarket;
const scoutLiveFilter=document.querySelector('#scoutLiveFilter');if(scoutLiveFilter)scoutLiveFilter.onchange=renderScoutLive;
const scanChangesBtn=document.querySelector('#scanChangesBtn');if(scanChangesBtn)scanChangesBtn.onclick=scanScoutChanges;
const addDiaryBtn=document.querySelector('#addDiaryBtn');if(addDiaryBtn)addDiaryBtn.onclick=()=>{const text=prompt('Scrivi la nota da aggiungere al diario aggiornamenti:');if(text?.trim())addDiaryEntry(text.trim(),'note','Nota Conte');};
const clearDiaryBtn=document.querySelector('#clearDiaryBtn');if(clearDiaryBtn)clearDiaryBtn.onclick=()=>{if(confirm('Svuotare tutto il diario aggiornamenti?')){updateDiary=[];saveDiary();renderScoutLive();}};
document.querySelector('#auctionRoleFilter').onchange=renderAuction;
const auctionBudget=document.querySelector('#auctionBudget'),auctionSpent=document.querySelector('#auctionSpent');
if(auctionBudget)auctionBudget.oninput=e=>{auctionPlan.budget=Math.max(0,Number(e.target.value||0));saveAuctionPlan();renderAuctionPlan();};
if(auctionSpent)auctionSpent.oninput=e=>{auctionPlan.spent=Math.max(0,Number(e.target.value||0));saveAuctionPlan();renderAuctionPlan();};
const resetAuctionPlan=document.querySelector('#resetAuctionPlan');if(resetAuctionPlan)resetAuctionPlan.onclick=()=>{if(confirm('Ripristinare budget 500 e slot standard 3-8-8-6?')){auctionPlan={budget:500,spent:0,slots:{Portiere:3,Difensore:8,Centrocampista:8,Attaccante:6}};saveAuctionPlan();renderAuctionPlan();}};

const fi=document.querySelector('#fileInput');
document.querySelector('#refreshBtn').onclick=()=>fi.click();

document.querySelector('#exportBtn').onclick=()=>{
  const payload={app:'Guida Asta Conte',version:'RC13-Scout-Live',exportedAt:new Date().toISOString(),teams:data};
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='Guida-Asta-Conte-backup-RC13.json';a.click();URL.revokeObjectURL(a.href);
};
fi.onchange=async()=>{
  if(!fi.files[0])return;
  try{
    const incoming=JSON.parse(await fi.files[0].text());let changed=0;
    Object.entries(incoming.teams||incoming).forEach(([t,v])=>{
      if(data[t]&&v&&typeof v==='object'){
        const personal={recommended:data[t].recommended,bets:data[t].bets,young:data[t].young,reliable:data[t].reliable,avoid:data[t].avoid,watch:data[t].watch,notes:data[t].notes};
        data[t]={...blank(),...data[t],...v,...personal,updated:'Rosa importata oggi'};changed++;
      }
    });
    persist();refreshAll();alert(`Aggiornate ${changed} squadre. Le tue valutazioni personali sono state conservate.`);
  }catch(e){alert('File non valido. Usa il formato JSON previsto.')}fi.value='';
};

refreshAll();
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
