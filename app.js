const LIST_KEY='fanta-conte-list-v1';
const STATE_KEY='fanta-conte-profile-v1';
const META_KEY='fanta-conte-meta-v1';
const SETUP_KEY='fanta-conte-setup-v2';

let players=JSON.parse(localStorage.getItem(LIST_KEY)||'null')||window.DEFAULT_PLAYERS;
let state=JSON.parse(localStorage.getItem(STATE_KEY)||'{}');
let meta=JSON.parse(localStorage.getItem(META_KEY)||'null')||{label:'Listone test 2025/26',date:''};
let setup=JSON.parse(localStorage.getItem(SETUP_KEY)||'null')||{teamName:'Fanta Conte',budget:500,slots:{P:3,D:8,C:8,A:6}};
let activeRole='TUTTI';
let activePlayer=null;

const $=s=>document.querySelector(s);
const list=$('#list');
const q=$('#q');
const dialog=$('#playerDialog');
const blank=()=>({fav:false,tier:'',maxPrice:'',notes:'',priority:'0',target:false,never:false,bought:false,isMine:false,buyPrice:'',buyOwner:''});
function profile(id){return state[id]||blank()}
function saveState(){localStorage.setItem(STATE_KEY,JSON.stringify(state))}
function saveSetup(){localStorage.setItem(SETUP_KEY,JSON.stringify(setup))}
function norm(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
function ownerIsMine(x){return !!x.isMine || (!!x.bought && norm(x.buyOwner)===norm(setup.teamName))}
function num(v){const n=Number(v);return Number.isFinite(n)?n:0}

function filtered(){
  const term=norm(q.value);
  const team=$('#teamFilter').value;
  const availability=$('#availabilityFilter').value;
  let rows=players.filter(p=>{
    const x=profile(p.id);
    const text=norm(`${p.n} ${p.t}`).includes(term);
    const role=activeRole==='TUTTI'||p.r===activeRole||(activeRole==='PREFERITI'&&x.fav)||(activeRole==='OBIETTIVI'&&x.target);
    const status=availability==='ALL'||(availability==='AVAILABLE'&&!x.bought)||(availability==='BOUGHT'&&x.bought)||(availability==='MINE'&&ownerIsMine(x));
    return text&&role&&status&&(!team||p.t===team);
  });
  const sort=$('#sortBy').value;
  rows.sort((a,b)=>{
    if(sort==='name') return a.n.localeCompare(b.n);
    if(sort==='team') return a.t.localeCompare(b.t)||a.n.localeCompare(b.n);
    if(sort==='fvm-desc') return num(b.fvm)-num(a.fvm)||num(b.qa)-num(a.qa);
    if(sort==='priority-desc') return num(profile(b.id).priority)-num(profile(a.id).priority)||num(b.qa)-num(a.qa);
    return num(b.qa)-num(a.qa)||num(b.fvm)-num(a.fvm);
  });
  return rows;
}

function buildTeams(){
  const select=$('#teamFilter');
  const old=select.value;
  select.innerHTML='<option value="">Tutte le squadre</option>'+[...new Set(players.map(p=>p.t).filter(Boolean))].sort().map(t=>`<option>${t}</option>`).join('');
  if([...select.options].some(o=>o.value===old)) select.value=old;
}

function dashboard(){
  const bought=players.filter(p=>profile(p.id).bought);
  const mine=players.filter(p=>ownerIsMine(profile(p.id)));
  const spent=mine.reduce((sum,p)=>sum+num(profile(p.id).buyPrice),0);
  const available=players.length-bought.length;

  $('#countAvailable').textContent=available;
  $('#countFav').textContent=players.filter(p=>profile(p.id).fav).length;
  $('#countTarget').textContent=players.filter(p=>profile(p.id).target).length;
  $('#countBought').textContent=bought.length;
  $('#budgetDisplay').textContent=setup.budget;
  $('#spentBudget').textContent=spent;
  $('#remainingBudget').textContent=Math.max(0,num(setup.budget)-spent);

  for(const r of ['P','D','C','A']){
    $('#mine'+r).textContent=mine.filter(p=>p.r===r).length;
    $('#slot'+r).textContent=setup.slots[r]??0;
    const cell=$('#mine'+r).closest('div');
    cell.classList.toggle('full',mine.filter(p=>p.r===r).length>=num(setup.slots[r]));
  }
}

function render(){
  const rows=filtered();
  list.innerHTML=rows.length?'':'<div class="empty">Nessun giocatore trovato con questi filtri.</div>';
  const frag=document.createDocumentFragment();

  rows.forEach(p=>{
    const x=profile(p.id);
    const card=document.createElement('article');
    const diff=num(p.diff)>0?`+${p.diff}`:p.diff;
    card.className='card'+(x.bought?' bought':'')+(ownerIsMine(x)?' mine':'')+(x.never?' avoided':'');
    card.innerHTML=`
      <div class="role">${p.r}</div>
      <button class="open-player" type="button">
        <div class="player-name">${p.n}</div>
        <div class="meta">${p.t} · ${p.rm||p.r}</div>
        <div class="official">
          <span class="pill">Qt. ${p.qa}</span>
          <span class="pill">FVM ${p.fvm}</span>
          <span class="pill ${num(p.diff)>0?'up':num(p.diff)<0?'down':''}">${diff}</span>
        </div>
        <div class="tags">
          ${x.tier?`<span class="tag ${x.tier}">${x.tier}</span>`:''}
          ${x.target?'<span class="tag TARGET">🎯 Obiettivo</span>':''}
          ${x.never?'<span class="tag EVITA">❌ Escluso</span>':''}
          ${x.maxPrice!==''?`<span class="tag">Max ${x.maxPrice}</span>`:''}
          ${num(x.priority)>0?`<span class="tag">${'★'.repeat(num(x.priority))}</span>`:''}
          ${x.notes?'<span class="tag">📝</span>':''}
          ${x.bought?`<span class="tag BOUGHT">${ownerIsMine(x)?'🟢 MIO':'✅ Preso'} · ${x.buyPrice||0} · ${x.buyOwner||'Senza nome'}</span>`:''}
        </div>
      </button>
      <button class="star ${x.fav?'on':''}" type="button" aria-label="Preferito">★</button>`;

    card.querySelector('.star').onclick=e=>{
      e.stopPropagation();
      x.fav=!x.fav;
      state[p.id]=x;
      saveState();
      render();
    };
    card.querySelector('.open-player').onclick=()=>openPlayer(p);
    frag.appendChild(card);
  });

  list.appendChild(frag);
  dashboard();
  $('#seasonLabel').textContent=meta.label;
  $('#importInfo').textContent=`${players.length} giocatori caricati${meta.date?' · '+meta.date:''}`;
}

function syncQuickButtons(x){
  const map=[['#quickFav','fav'],['#quickTarget','target'],['#quickNever','never']];
  map.forEach(([sel,key])=>$(sel).classList.toggle('active',!!x[key]));
}

function openPlayer(p){
  activePlayer=p;
  const x=profile(p.id);
  $('#dialogName').textContent=p.n;
  $('#dialogMeta').textContent=`${p.t} · ruolo ${p.r}`;
  $('#dialogQa').textContent=p.qa;
  $('#dialogFvm').textContent=p.fvm;
  $('#dialogRm').textContent=p.rm||'-';
  $('#tier').value=x.tier||'';
  $('#maxPrice').value=x.maxPrice??'';
  $('#notes').value=x.notes||'';
  $('#priority').value=String(x.priority||0);
  $('#bought').checked=!!x.bought;
  $('#isMine').checked=ownerIsMine(x);
  $('#buyPrice').value=x.buyPrice??'';
  $('#buyOwner').value=x.buyOwner||'';
  syncQuickButtons(x);
  dialog.showModal();
}

function toggleProfileFlag(key){
  if(!activePlayer)return;
  const x=profile(activePlayer.id);
  x[key]=!x[key];
  if(key==='never'&&x.never){x.target=false;x.fav=false}
  state[activePlayer.id]=x;
  syncQuickButtons(x);
}

$('#quickFav').addEventListener('click',()=>toggleProfileFlag('fav'));
$('#quickTarget').addEventListener('click',()=>toggleProfileFlag('target'));
$('#quickNever').addEventListener('click',()=>toggleProfileFlag('never'));

$('#isMine').addEventListener('change',()=>{
  if($('#isMine').checked){
    $('#bought').checked=true;
    $('#buyOwner').value=setup.teamName||'Fanta Conte';
  }
});
$('#bought').addEventListener('change',()=>{
  if(!$('#bought').checked){
    $('#isMine').checked=false;
  }
});

$('#playerForm').addEventListener('submit',()=>{
  if(!activePlayer)return;
  const x=profile(activePlayer.id);
  Object.assign(x,{
    tier:$('#tier').value,
    maxPrice:$('#maxPrice').value,
    notes:$('#notes').value.trim(),
    priority:$('#priority').value,
    bought:$('#bought').checked,
    isMine:$('#isMine').checked,
    buyPrice:$('#buyPrice').value,
    buyOwner:$('#buyOwner').value.trim()
  });
  if(x.isMine&&!x.buyOwner)x.buyOwner=setup.teamName;
  if(!x.bought){x.isMine=false;x.buyPrice='';x.buyOwner=''}
  state[activePlayer.id]=x;
  saveState();
  render();
  toast('Scheda giocatore salvata');
});

q.addEventListener('input',render);
$('#teamFilter').addEventListener('change',render);
$('#sortBy').addEventListener('change',render);
$('#availabilityFilter').addEventListener('change',render);
$('#roleTabs').addEventListener('click',e=>{
  const b=e.target.closest('button');
  if(!b)return;
  activeRole=b.dataset.role;
  document.querySelectorAll('#roleTabs button').forEach(x=>x.classList.toggle('active',x===b));
  render();
});

$('#toggleSetup').addEventListener('click',()=>{$('#setupPanel').hidden=!$('#setupPanel').hidden});
function loadSetupForm(){
  $('#myTeamName').value=setup.teamName;
  $('#totalBudget').value=setup.budget;
  for(const r of ['P','D','C','A']) $('#slots'+r).value=setup.slots[r];
}
$('#saveSetup').addEventListener('click',()=>{
  setup={
    teamName:$('#myTeamName').value.trim()||'Fanta Conte',
    budget:Math.max(1,num($('#totalBudget').value)||500),
    slots:{P:num($('#slotsP').value),D:num($('#slotsD').value),C:num($('#slotsC').value),A:num($('#slotsA').value)}
  };
  saveSetup();
  $('#setupPanel').hidden=true;
  render();
  toast('Impostazioni asta salvate');
});

$('#fileInput').addEventListener('change',async e=>{
  const file=e.target.files[0];
  if(!file)return;
  try{
    toast('Importazione in corso…');
    const imported=await FantaExcel.read(file);
    if(imported.length<50) throw new Error('Il file contiene troppo pochi giocatori');
    players=imported;
    localStorage.setItem(LIST_KEY,JSON.stringify(players));
    meta={label:file.name.replace(/\.(xlsx|xls|csv)$/i,''),date:new Date().toLocaleDateString('it-IT')};
    localStorage.setItem(META_KEY,JSON.stringify(meta));
    buildTeams();
    render();
    toast(`Importati ${players.length} giocatori`);
  }catch(err){
    console.error(err);
    toast('Errore: '+err.message,5000);
  }
  e.target.value='';
});

function toast(msg,time=2600){
  const t=$('#toast');
  t.textContent=msg;
  t.hidden=false;
  clearTimeout(window._toast);
  window._toast=setTimeout(()=>t.hidden=true,time);
}

if('serviceWorker'in navigator){
  window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).catch(console.error));
}

loadSetupForm();
buildTeams();
render();
