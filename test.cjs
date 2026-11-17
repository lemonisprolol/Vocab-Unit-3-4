const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const script=html.match(/<script>([\s\S]*)<\/script>/)[1];
const memory=new Map(),els=new Map();
const el=()=>({innerHTML:'',textContent:'',value:'',classList:{add(){},remove(){}},click(){}});
const context={console,Date,Math,JSON,Set,Map,Object,Array,String,Number,Blob,URL,setTimeout,clearTimeout,confirm:()=>true,localStorage:{getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)},document:{querySelector:s=>{if(!els.has(s))els.set(s,el());return els.get(s)},querySelectorAll:()=>[],addEventListener(){},createElement:el},window:{scrollTo(){},addEventListener(){}}};
vm.createContext(context);vm.runInContext(script,context);
const run=s=>vm.runInContext(s,context);
run(`assert=undefined`);
assert.equal(run('DATA.length'),48);
assert.equal(run('CLOZE.length'),4);
assert.equal(run('DATA.every(e=>e.contexts.length===3&&e.contexts.every(t=>t.includes("___"))&&new Set([e.answer,...e.distractors]).size===4)'),true);
assert.equal(run('DATA.every(e=>new Set([e.meaning,...question(e,3).options]).size===4)'),true);
run("start('practice',3)");assert.equal(run('state.active.queue.length'),10);assert.equal(run('validActive(state.active)'),true);
run('answer(current().options.indexOf(current().answer))');assert.equal(run('state.xp'),10);run('answer(0)');assert.equal(run('state.xp'),10);
assert.equal(run('JSON.parse(localStorage.getItem(KEY)).active.queue[0].choice!==null'),true);
run('next();current().hinted=true;answer(current().options.indexOf(current().answer))');assert.equal(run('state.xp'),13);assert.equal(run('stat(current().id).contexts.length'),0);
run('next();answer(current().options.findIndex(x=>x!==current().answer))');assert.equal(run('stat(current().id).streak'),0);assert.equal(run('dueEntries().some(e=>e.id===current().id)'),true);
run("while(state.active){if(current().choice===null)answer(current().options.indexOf(current().answer));next()}");assert.equal(run('state.history.length'),1);assert.equal(run('valid(state)'),true);
run("start('boss',0)");assert.equal(run('state.active.queue.length'),20);assert.equal(run('state.active.queue.filter(q=>q.cloze).length'),6);assert.equal(run('new Set(state.active.queue.map(q=>q.id)).size'),20);
const before=run('state.xp');run('answer(current().options.indexOf(current().answer))');assert.equal(run('state.xp'),before);
run('while(state.active){if(current().choice===null)answer(current().options.indexOf(current().answer));next()}');assert.equal(run('state.xp'),before+200);assert.equal(run('lastResult.correct'),20);
for(const u of [3,4]){run(`start('boss',${u})`);assert.equal(run(`state.active.queue.every(q=>byId[q.id].unit===${u})`),true);assert.equal(run('validActive(state.active)'),true)}
assert.equal(run('valid({...state,coins:-1})'),false);assert.equal(run('validActive({...state.active,index:999})'),false);
run(`state.stats[DATA[0].id]={seen:3,correct:3,streak:3,due:Date.now(),contexts:[0,1,2],dates:['2026-11-16','2026-11-17']}`);assert.equal(run('level(DATA[0].id)'),3);
run(`state.stats[DATA[0].id].dates=['2026-11-17']`);assert.equal(run('level(DATA[0].id)'),2);
// Simulated reload using actual serialized state, with DOM-only stubs.
run('save()');const prior=run('state.xp');vm.runInContext(script,vm.createContext({...context}));assert.equal(JSON.parse(memory.get('vocab-quest-v1')).xp,prior);
console.log('PASS: 48 concepts / 204 questions; unique answers; learning, hints, mistakes, resume, delayed boss scoring, cloze, validation and mastery.');
