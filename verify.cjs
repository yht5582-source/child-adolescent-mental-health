// 臨床邏輯檢查。Node：node verify.cjs；macOS 無 Node：
// /System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc verify.cjs
const isNode=typeof require==='function';
let run,parse;
if(isNode){const fs=require('node:fs'),vm=require('node:vm'),ctx=vm.createContext({console});vm.runInContext(fs.readFileSync('clinical.js','utf8'),ctx);run=s=>vm.runInContext(s,ctx);parse=f=>new vm.Script(fs.readFileSync(f,'utf8'))}
else{load('clinical.js');run=s=>(0,eval)(s);parse=f=>new Function(readFile(f))}
const log=typeof console!=='undefined'?console.log:print;
let count=0,fail=0;
function test(name,expr,want){let got=run(expr);if(got===want){count++}else{fail++;log('FAIL '+name+': got '+JSON.stringify(got)+' want '+JSON.stringify(want))}}
run("var sample=defaults();sample.risk=Object.fromEntries(RISKS.map(([k])=>[k,'no']));sample.confirmed=true;sample.checks=[0,1,2,3];sample.report='both'");
test('Unknown safety blocks treatment','result(defaults()).level','unknown');
for(const k of ['intent','violence','medical'])test('Emergency '+k,`result({...sample,risk:{...sample.risk,${k}:'yes'}}).level`,'emergency');
for(const k of ['thought','abuse'])test('Urgent '+k,`result({...sample,risk:{...sample.risk,${k}:'yes'}}).level`,'urgent');
test('Confirmed routine depression','result(sample).level','plan');
test('Incomplete diagnosis',"result({...sample,confirmed:false}).level",'assessment');
test('Incomplete criteria',"result({...sample,checks:[0]}).level",'assessment');
test('Short depression duration',"result({...sample,weeks:1}).level",'assessment');
test('Short anxiety duration',"result({...sample,topic:'anxiety',weeks:2}).level",'assessment');
test('Anxiety 8 weeks plan',"result({...sample,topic:'anxiety',weeks:8}).level",'plan');
test('Acute stress window',"result({...sample,topic:'ptsd',weeks:2}).level",'assessment');
test('PTSD 10 weeks plan',"result({...sample,topic:'ptsd',weeks:10}).level",'plan');
test('Mania override',"result({...sample,manic:true}).level",'specialist');
test('Medical override',"result({...sample,medical:true}).level",'specialist');
test('No impairment clarification',"result({...sample,impair:'none'}).level",'assessment');
test('Underage route',"result({...sample,age:4}).level",'specialist');
test('ADHD duration',"result({...sample,topic:'adhd',weeks:8}).level",'assessment');
test('ADHD informants',"result({...sample,topic:'adhd',weeks:30,report:'partial'}).level",'assessment');
test('Confirmed ADHD',"result({...sample,topic:'adhd',weeks:30}).level",'plan');
test('Preschool behavior first',"tier({...sample,topic:'adhd',age:5},{level:'plan'}).includes('親職')",true);
test('Mild anxiety CBT',"tier({...sample,topic:'anxiety',impair:'mild'},{level:'plan'}).includes('CBT')",true);
test('PTSD tier no drug',"tier({...sample,topic:'ptsd'},{level:'plan'}).includes('不以藥物')",true);
test('OCD young tier',"tier({...sample,topic:'ocd',age:7},{level:'plan'}).includes('8 歲以下')",true);
for(const topic of ['bipolar','psychosis','eating'])test('Specialist '+topic,`result({...sample,topic:'${topic}'}).level`,'specialist');
test('14 cases','CASES.length',14);test('6 new cases','CASES.filter(c=>c.isNew).length',6);test('9 clinical modules','Object.keys(D).length',9);
// 每例的預填結果需與標註的 expect 一致（caseState 與 app.js 相同邏輯）
run("var cs=c=>{let p=c.preset,a={...defaults(),...p,risk:{...defaults().risk,...(p.risk||{})}};a.checks=p.checks==='all'?D[p.topic].criteria.map((_,i)=>i):(p.checks||[]);return a}");
const nCase=run('CASES.length');for(let i=0;i<nCase;i++)test('Case '+i+' expect',`result(cs(CASES[${i}])).level===CASES[${i}].expect`,true);
test('New cases have 3 Q&A','CASES.filter(c=>c.isNew).every(c=>c.ask.length===3)',true);
test('Case topics valid','CASES.every(c=>!!D[c.preset.topic])',true);
test('20 quiz items','QUIZ.length',20);
test('10 basic / 10 advanced',"QUIZ.filter(q=>q.lv==='基礎').length===10&&QUIZ.filter(q=>q.lv==='高階').length===10",true);
test('Quiz well-formed','QUIZ.every(q=>q.o.length===4&&q.a>=0&&q.a<4&&new Set(q.o).size===4&&q.why&&q.src.length&&q.src.every(i=>SOURCES[i]))',true);
test('Mind map 12 branches','MAP.length',12);
test('Mind map leaves non-empty','MAP.every(([b,l])=>b&&l.length>=4)',true);
for(const file of ['clinical.js','app.js'])parse(file);
log(`${count} checks passed, ${fail} failed; both scripts parsed.`);
if(fail&&isNode)process.exit(1);
