'use strict';
const SOURCES = [
['AACAP｜指引及實務參數索引','https://www.aacap.org/AACAP/Resources_for_Primary_Care/Practice_Parameters_and_Resource_Centers/Practice-Parameters/CPGs.aspx'],
['AACAP｜兒少焦慮 CPG 2020','https://pubmed.ncbi.nlm.nih.gov/32439401/'],
['AAP｜ADHD 2019','https://publications.aap.org/pediatrics/article/144/4/e20192528/81590/clinical-practice-guideline-for-the-diagnosis'],
['NICE NG87｜ADHD','https://www.nice.org.uk/guidance/ng87/chapter/recommendations'],
['NICE NG134｜兒少憂鬱','https://www.nice.org.uk/guidance/ng134/chapter/Recommendations'],
['NICE CG31｜OCD','https://www.nice.org.uk/guidance/cg31/chapter/Recommendations'],
['NICE CG170｜自閉症照護','https://www.nice.org.uk/guidance/cg170/chapter/Recommendations'],
['NICE NG116｜PTSD','https://www.nice.org.uk/guidance/ng116/chapter/recommendations'],
['NICE NG69｜飲食疾患','https://www.nice.org.uk/guidance/ng69/chapter/recommendations'],
['NICE CG185｜雙相情緒障礙','https://www.nice.org.uk/guidance/cg185/chapter/recommendations'],
['NICE CG155｜兒少精神病','https://www.nice.org.uk/guidance/cg155/chapter/Recommendations'],
['NIMH｜ADHD 診斷概念','https://www.nimh.nih.gov/health/publications/attention-deficit-hyperactivity-disorder-what-you-need-to-know'],
['NIMH｜自閉症評估','https://www.nimh.nih.gov/health/publications/autism-spectrum-disorder'],
['NIMH｜憂鬱症','https://www.nimh.nih.gov/health/publications/depression']];
const D = {
adhd:{name:'注意力不足／過動衝動（ADHD）',min:4,criteria:['持續至少 6 個月，部分症狀在 12 歲前出現','在至少兩個情境出現，並影響功能','已逐項核對注意力與過動衝動：≤16 歲至少一組 6 項，17 歲至少一組 5 項','取得家長、教師及孩子資訊，排除較適切的其他原因'],diff:'區分睡眠不足／呼吸障礙、聽視力、焦慮、憂鬱、創傷與學習／語言障礙。沒有單一檢驗可確診 ADHD。',therapy:'4–5 歲優先實證親職行為訓練與課堂介入。6 歲以上結合行為／親職、學校支持與適當藥物；目標包含課堂、家庭及人際功能。',drug:'6 歲以上經確診且環境調整後仍明顯受損，可討論 methylphenidate；無效或不耐受時由專科依既往試用及仿單考慮 atomoxetine 或 guanfacine。4–5 歲僅在行為介入不足且持續中重度受損時，由具兒少經驗醫師審慎考慮 methylphenidate。',monitor:'基線身高體重、生長曲線、血壓心率、心血管與家族猝死史、食慾、睡眠、抽動。每次調量檢查療效副作用及血壓心率；後者至少每 6 月。身高每 6 月；≤10 歲體重每 3 月，>10 歲在第 3、6 月後每 6 月。ECG 依臨床風險。',review:'調量時可每週聯繫；穩定後依需要回診，至少每年檢視持續用藥必要性。',scale:'ADHD-RS',sources:[2,3,11]},
anxiety:{name:'焦慮／分離焦慮／拒學',min:6,criteria:['擔憂、恐懼或逃避超過發展階段可解釋範圍','已釐清焦慮類型及個別持續時間準則','已確認功能受損，詢問霸凌、學習及家庭因素','排除身體疾病、藥物／物質及其他較適切解釋'],diff:'拒學是表現而非單一診斷。區分分離焦慮、社交焦慮、GAD、恐慌及憂鬱。兒童分離焦慮通常至少 4 週，GAD／社交焦慮通常至少 6 個月；不共用單一時間門檻。',therapy:'適齡 CBT、漸進暴露、家長參與及返校合作計畫為核心，減少持續協助逃避。中重度或單一介入不足可討論合併治療。',drug:'6–18 歲焦慮可由醫師考慮 SSRI，如 sertraline 或 fluoxetine；取決於類型、共病及所在地仿單。低劑量慢調，查活化、睡眠、胃腸不適及自傷意念。不以 benzodiazepine 作常規長期治療。',monitor:'每次問自傷／自殺意念、躁期線索、焦慮逃避、睡眠食慾、到校及家庭功能。藥物開始或調量需早期聯繫。',review:'工具建議約 4–6 週看趨勢，8–12 週結合足量足療程、CBT 參與度複評；依焦慮類型與風險個別調整。',scale:'SCARED',sources:[0,1]},
depression:{name:'情緒低落／易怒／失去興趣',min:5,criteria:['低落或易怒，或明顯失去興趣，持續至少 2 週','已逐項確認完整憂鬱症候群、頻率及功能受損','已直接詢問自傷意念、計畫、工具與保護因子','已問躁／輕躁期，排除物質、身體疾病等原因'],diff:'易怒可能是兒少憂鬱表現。區分哀傷、適應障礙、雙相、焦慮、創傷與身體疾病。量表不獨立確診。',therapy:'輕度以支持、心理治療及家庭／學校介入優先。中重度轉兒少專科，選擇 CBT、IPT-A 或適齡家庭治療，必要時合併藥物。功能下拉選項不等於疾病嚴重度。',drug:'NICE 中重度合適個案可考慮 fluoxetine 合併心理治療。12–17 歲可討論起始合併；5–11 歲通常需特定心理治療 4–6 次後多專業複評，證據較有限。醫師參考：10 mg 每日，必要時 1 週後至 20 mg；低體重可更低起始。<8 歲在 NICE 英國情境為仿單外，不能推定台灣核准。',monitor:'查新發或惡化自傷意念、敵意、躁動、失眠與躁化；開始抗憂鬱藥前問躁期。前 4 週可每週接觸孩子與照顧者，依風險個別安排。',review:'心理治療 4–6 次後複評。NICE 建議 fluoxetine 有效者，在症狀消失且完整功能至少 8 週後，再維持至少 6 個月，由醫師規劃漸減。',scale:'PHQ-A',sources:[4,13]},
ocd:{name:'強迫思考／重複儀式行為',min:5,criteria:['有侵入性強迫思考與／或重複強迫行為','耗時或造成痛苦／受損；已問每日耗時與家人配合儀式','區分發展性儀式、自閉症重複行為、抽動與精神病','已評估共病憂鬱、自傷風險與洞察'],diff:'正常發展儀式不等於 OCD。了解行為是否為減輕焦慮、侵入思考及家庭配合程度；用 CY-BOCS 輔助專業評估。',therapy:'包含暴露與反應預防（ERP）的 CBT 為核心，納入家長並減少配合儀式；依年齡與嚴重度決定強度。',drug:'完整 CBT／ERP 約 12 週反應不足先多專業複評；8–11 歲可審慎考慮、12–17 歲應討論加 SSRI（如 sertraline／fluvoxamine）並持續 ERP，由兒少精神專科調整。更小年齡不套用一般加藥流程。',monitor:'CY-BOCS、儀式耗時、家人配合、到校、睡眠。SSRI 早期密切問活化、自傷意念及副作用，不只依分數加量。',review:'約 12 週完整 ERP 後複評；先查依從性、ERP 品質、共病及診斷，再討論加藥。',scale:'CY-BOCS',sources:[0,5]},
autism:{name:'社交溝通／發展與重複行為',min:2,criteria:['有社交溝通互動困難，並有侷限興趣／重複行為特徵','回顧早期發展、感覺特徵、語言及適應功能','整合家長、學校及直接觀察，評估支持需求','已評估聽力、語言／智能／學習及共病'],diff:'轉發展兒科／兒少專科多專業評估。語言遲緩不等於自閉症；發展倒退需及時排除神經及身體原因。',therapy:'依優勢與需求安排社交溝通、語言、職能、親職及學校支持，處理睡眠、疼痛、便祕與環境壓力。',drug:'無治療自閉症核心特徵的常規藥物。嚴重挑戰行為先找誘因、心理社會介入；不足或無法介入時，專科才討論針對目標行為的 risperidone／aripiprazole 等，依仿單及年齡評估。',monitor:'若用抗精神病藥，基線生長／BMI、腰圍、血壓心率、血糖／HbA1c、血脂、泌乳素及動作副作用；明訂目標行為頻率與嚴重度。',review:'挑戰行為用藥 3–4 週看效益／副作用；6 週無臨床重要反應由醫師停用。定期複評核心功能及支持。',scale:'自訂困擾',sources:[6,12,10]},
ptsd:{name:'創傷後重現／逃避／警覺',min:5,criteria:['已確認創傷暴露與目前是否仍有危險','評估重現、逃避、認知情緒改變、警覺與功能','依年齡確認完整症候群及持續時間，區分急性壓力反應','已問虐待、解離、自傷、睡眠與家庭支持'],diff:'不強迫重述創傷。幼兒可能以遊戲重演表現；先確保安全與連結保護體系。',therapy:'採適齡創傷焦點 CBT，適當納入照顧者。急性期支持與主動追蹤。7–17 歲於適當情境且 CBT 無反應／難參與時專科可考慮 EMDR；不採強制單次心理解說。',drug:'NICE 不建議未滿 18 歲用藥物預防或治療 PTSD。若有獨立共病另依其兒少指引評估，不套用成人 PTSD 藥單。',monitor:'安全、再暴露、惡夢、解離、自傷意念、睡眠與返校情形。',review:'依安全及症狀安排早期複診；完成心理治療後複評症狀、功能與家庭安全。',scale:'自訂困擾',sources:[7]},
eating:{name:'限制飲食／暴食催吐／體重改變',min:5,criteria:['問限制飲食、暴食、補償行為與體型看法','取得生長曲線、近期體重變化，未只看 BMI','檢查生命徵象、姿勢性變化、脫水及電解質','評估 ARFID、身體疾病、自傷與共病'],diff:'正常體重仍可能有嚴重飲食疾患；區分厭食、暴食症、暴食疾患及 ARFID。',therapy:'及早轉兒少飲食疾患團隊，提供診斷相符的家庭取向治療、營養復原及身體監測；先穩定嚴重身體風險。',drug:'不以藥物單獨治療神經性厭食。其他診斷用藥需專科個別評估；脫水、低鉀或 QT 風險時不走一般門診選藥。',monitor:'體重變化速率、生長、脈搏血壓／姿勢性變化、體溫、ECG 與鉀磷鎂依風險評估；注意再餵食症候群。',review:'依身體風險頻繁監測；暈厥、心律異常、明顯脫水／電解質異常需立即醫療評估。不以單一 BMI 門檻決定住院。',scale:'自訂困擾',sources:[8]},
bipolar:{name:'週期性亢奮／睡少仍精力旺盛',min:2,criteria:['有與平時不同的發作性情緒及活動量改變','問睡眠需求減少、誇大、語速、冒險行為','建立時間軸與照顧者資訊，區分持續性 ADHD／易怒','已安排兒少專科縱向觀察及完整診斷'],diff:'單純易怒、家族史或憂鬱不足以診斷雙相。NICE 兒少準則較嚴格，其他系統定義可能不同，需專科整合；不用問卷替代診斷。',therapy:'疑躁期快速專科評估，建立睡眠、風險及家庭照護計畫；危險行為或失控先急症處理。',drug:'不自動選藥。專科依躁期診斷及核准年齡可考慮 aripiprazole 等。Lithium 需腎功能、甲狀腺、血鈣、藥物濃度及交互作用監測。疑雙相不啟動抗憂鬱藥單方建議；valproate 需嚴格生殖安全評估。',monitor:'睡眠需求、躁症狀、衝動／自傷風險、物質與功能；抗精神病藥需代謝監測。',review:'密切專科縱向觀察；急性期依風險快速複評，建立復發徵兆與家庭應變計畫。',scale:'自訂困擾',sources:[9,10]},
psychosis:{name:'幻覺／妄想／思考行為混亂',min:2,criteria:['釐清知覺經驗、妄想、思考混亂及功能變化','問命令性幻覺、自他傷與照護能力','排除譫妄、癲癇、物質／藥物及身體原因','已安排兒少專科／早期精神病評估'],diff:'鑑別兒童想像、入睡前經驗、創傷及發展問題。新發混亂合併發燒、抽搐或意識改變立即急診。',therapy:'及早轉專科，提供家庭介入與心理治療；完整評估持續明確精神病症狀。',drug:'專科以個別試用方式共同選擇抗精神病藥，考量代謝、動作、泌乳素及 QT 風險。僅短暫／未達診斷的症狀，不常規為預防精神病而開抗精神病藥。',monitor:'基線體重／BMI、生長、腰圍、血壓心率、血糖／HbA1c、血脂、泌乳素、動作副作用；ECG 依風險。體重前 6 週每週、第 12 週及其後每 6 月；血糖血脂等第 12 週及每 6 月，依臨床調整。',review:'早期專科追蹤並記錄效益及副作用；嚴重危險先急症處理。',scale:'自訂困擾',sources:[10]}
};
const RISKS=[['intent','有自殺計畫／意圖、可取得工具、近期企圖或無法維持安全'],['thought','有自傷／自殺想法或行為（即使沒有計畫）'],['violence','嚴重攻擊、命令性幻聽、嚴重躁動或無法安全照護'],['medical','意識改變、抽搐、暈厥、明顯脫水或疑身體不穩定'],['abuse','疑虐待、性暴力、家暴或目前環境不安全']];
const SCALES={'PHQ-A':27,'SCARED':82,'CY-BOCS':40,'ADHD-RS':54,'自訂困擾':10};
const defaults=()=>({age:12,topic:'depression',weeks:4,impair:'moderate',report:'partial',risk:Object.fromEntries(RISKS.map(([k])=>[k,'unknown'])),checks:[],confirmed:false,manic:false,medical:false,ssri:false,goal:''});
function urgency(a){if(['intent','violence','medical'].some(k=>a.risk[k]==='yes'))return 'emergency';if(['thought','abuse'].some(k=>a.risk[k]==='yes'))return 'urgent';if(RISKS.some(([k])=>!['yes','no'].includes(a.risk[k])))return 'unknown';return 'routine'}
function result(a){let u=urgency(a),d=D[a.topic];if(u==='emergency')return {level:u,title:'立即安排急診／緊急專業處置',text:'由可信任成人陪同並確保環境安全，不讓有即時危險的孩子獨處。移開危險物品，先安排急診及身體穩定處置。一般門診路徑暫停。'};if(u==='urgent')return {level:u,title:'今日優先完成安全與保護評估',text:'直接會談釐清自傷意念、行為或不安全環境，建立安全計畫與保護措施；無法維持安全立即急診。若照顧者可能是加害者，聯繫其他安全成人與保護體系。'};if(u==='unknown')return {level:u,title:'安全資訊未完整',text:'尚有未評估項目；不能視為沒有風險。請先完成直接詢問，再討論常規治療。'};if(a.age<d.min)return {level:'specialist',title:'需要較低年齡的專科／發展評估',text:`本模組一般流程自 ${d.min} 歲起；目前年齡不套用一般用藥路徑，請轉發展兒科／兒少專科。`};if(a.manic&&['depression','anxiety','ocd'].includes(a.topic))return {level:'specialist',title:'先排除躁期／雙相情緒障礙',text:'發作性亢奮或睡少不累需專科釐清，暫停一般 SSRI 建議，先建立時間軸。'};if(a.medical)return {level:'specialist',title:'先釐清身體、物質及藥物因素',text:'依病史、檢查與適應性檢驗確認可逆原因及用藥風險；不穩定時走急症流程。'};if(['bipolar','psychosis','eating'].includes(a.topic))return {level:'specialist',title:'優先轉兒少專科／跨專業團隊',text:'需要完整專科及身體評估，下方僅供團隊討論，不產生個人處方。'};if(a.impair==='none')return {level:'assessment',title:'先確認痛苦與功能受損',text:'目前無明顯功能影響，需確認主觀痛苦、情境及診斷條件，先提供支持與觀察。'};if(a.topic==='adhd'&&a.report!=='both')return {level:'assessment',title:'補齊 ADHD 跨情境資訊',text:'取得安全可行的家長、教師與孩子資訊，再確認診斷及療程。'};if(!a.confirmed||a.checks.length!==d.criteria.length)return {level:'assessment',title:'目前為待確認的診斷方向',text:'未完成全部核對或醫師完整確認，先補資料、會談與鑑別診斷。下方不是確診結果。'};if(a.topic==='adhd'&&a.weeks<26)return {level:'assessment',title:'ADHD 持續時間尚不足',text:'填寫少於約 6 個月，需釐清核對內容與觀察期間，不啟動 ADHD 用藥路徑。'};if(a.topic==='depression'&&a.weeks<2)return {level:'assessment',title:'憂鬱發作時間資訊不足',text:'目前少於 2 週，需進一步觀察及評估其他原因；嚴重症狀仍應立即處理。'};if(a.topic==='anxiety'&&a.weeks<4)return {level:'assessment',title:'焦慮持續時間尚待釐清',text:'少於 4 週，未達分離焦慮最短時間；GAD／社交焦慮通常需約 6 個月。先支持、觀察並釐清類型，嚴重受損仍應及早介入。'};if(a.topic==='ptsd'&&a.weeks<4)return {level:'assessment',title:'仍在急性壓力反應期',text:'創傷後未滿約 1 個月，先確保安全、支持與主動追蹤；持續或惡化再評估 PTSD 症候群。'};return {level:'plan',title:'進入共同決策與個別化照護',text:'依完整診斷、功能、家庭偏好及治療可及性選擇療程，持續複評鑑別與共病。'}}
function tier(a,r){if(r.level!=='plan')return '先完成上列評估；提供適齡支持、家庭教育及學校合作。';if(a.topic==='adhd')return a.age<6?'學齡前：親職／課堂行為介入優先，持續中重度受損才進入專科藥物討論。':'學齡期／青少年：行為、親職及學校支持，結合診斷相符藥物討論。';if(a.topic==='depression')return a.impair==='mild'?'輕度功能影響：先確認疾病嚴重度，以支持與心理／家庭／學校介入優先，不常規立即給抗憂鬱藥。':'功能影響明顯：專科確認疾病嚴重度，討論心理治療及符合年齡的合併藥物。';if(a.topic==='anxiety')return a.impair==='mild'?'以 CBT、漸進暴露及家庭／學校合作優先。':'討論足強度 CBT，依嚴重度及既往反應考慮合併 SSRI。';if(a.topic==='ocd')return a.age<8?'8 歲以下：以家庭參與 CBT／ERP 為主，不套用一般加藥流程。':'家庭參與 CBT／ERP 為主；約 12 週完整 ERP 反應不足再多專業複評是否加 SSRI。';if(a.topic==='autism')return '依支持需求安排多專業介入；藥物只針對特定目標行為，非核心特徵。';if(a.topic==='ptsd')return '確認安全後採創傷焦點 CBT 並納入照顧者；未滿 18 歲不以藥物治療 PTSD。';return '專科／跨專業團隊主導。';}
const NO_RISK=()=>Object.fromEntries(RISKS.map(([k])=>[k,'no']));
/* 示範病例：preset 載入評估表；risk 未給時保持「尚未評估」，示範必須重新詢問。expect 為引擎應得結果（verify.cjs 檢查）。 */
const CASES=[
{title:'5 歲：坐不住',tag:'ADHD',preset:{topic:'adhd',age:5,weeks:32,impair:'moderate',report:'partial'},story:'家庭及學校均受影響，尚未接受親職訓練。',key:'確認跨情境診斷及睡眠／發展；學齡前優先行為介入。',expect:'unknown'},
{title:'9 歲：拒學腹痛',tag:'焦慮',preset:{topic:'anxiety',age:9,weeks:8,impair:'moderate',report:'partial'},story:'上學前腹痛，擔心家人出事，假日緩解。',key:'排除身體原因與霸凌，CBT／暴露結合返校計畫。',expect:'unknown'},
{title:'15 歲：退縮失去興趣',tag:'憂鬱',preset:{topic:'depression',age:15,weeks:5,impair:'moderate',report:'partial'},story:'睡眠改變、成績下降，尚未問自傷。',key:'直接安全會談及躁期鑑別，中重度轉專科。',expect:'unknown'},
{title:'12 歲：洗手兩小時',tag:'OCD',preset:{topic:'ocd',age:12,weeks:30,impair:'moderate',report:'both'},story:'家人被要求配合儀式，影響上學。',key:'家庭參與 ERP，追蹤 CY-BOCS 與功能。',expect:'unknown'},
{title:'3 歲：發展與溝通',tag:'自閉症',preset:{topic:'autism',age:3,weeks:52,impair:'moderate',report:'partial'},story:'互動及語言發展有疑慮，固著流程。',key:'多專業發展、聽力及語言評估，及早支持。',expect:'unknown'},
{title:'13 歲：事故後惡夢',tag:'PTSD',preset:{topic:'ptsd',age:13,weeks:10,impair:'moderate',report:'partial'},story:'反覆惡夢、逃避搭車，需評估症候群。',key:'安全與創傷焦點治療，不套成人藥單。',expect:'unknown'},
{title:'16 歲：減重伴暈厥',tag:'飲食',preset:{topic:'eating',age:16,weeks:8,impair:'severe',report:'partial',risk:{medical:'yes'}},story:'限制飲食、快速減重後暈厥。',key:'立即身體評估，正常 BMI 不排除高風險。',expect:'emergency'},
{title:'16 歲：睡少仍亢奮',tag:'雙相',preset:{topic:'bipolar',age:16,weeks:2,impair:'severe',report:'partial'},story:'睡兩小時仍精力旺盛，冒險、話多。',key:'專科時間軸與風險評估，不給抗憂鬱藥單方。',expect:'unknown'},
{title:'14 歲：手臂割傷與網路霸凌',tag:'憂鬱＋自傷',isNew:true,preset:{topic:'depression',age:14,weeks:6,impair:'moderate',report:'partial',risk:{...NO_RISK(),thought:'yes'},checks:'all'},
 story:'國二女生，6 週來易怒、退出社團、睡到中午，班級群組被排擠。校護發現前臂多道淺割痕；她說「割了會比較平靜」，近兩週常想「不要醒來就好」，否認具體計畫。家中有父親的安眠藥。',
 ask:[['割傷沒有自殺意圖，可以排一般門診嗎？','不行。非自殺性自傷合併被動死亡意念是自殺風險因子，今日直接詢問意圖、計畫、頻率、工具與保護因子。'],['第一個具體措施？','與照顧者移除或上鎖藥物、刀具（限制致命工具），訂書面安全計畫與求助管道，並與學校處理霸凌。'],['何時討論 fluoxetine？','專科確認中重度憂鬱並提供心理治療；12–17 歲可討論合併 fluoxetine。用藥前問躁期與家族史，前 4 週可每週接觸。']],
 key:'易怒是兒少憂鬱常見表現；分數再低也不能取代直接安全詢問。',expect:'urgent'},
{title:'8 歲：上課離座合併眨眼抽動',tag:'ADHD＋抽動',isNew:true,preset:{topic:'adhd',age:8,weeks:104,impair:'moderate',report:'both',risk:NO_RISK(),checks:'all',confirmed:true,goal:'每節課能完成一段作業'},
 story:'小二男生，幼兒園起即坐不住、遺失物品，家長與教師評量均達門檻。近一年間歇眨眼、清喉嚨。睡眠正常、聽視力正常，無心臟病或家族猝死史。',
 ask:[['抽動是 methylphenidate 的絕對禁忌嗎？','不是。開始後監測抽動；若抽動與藥物相關且影響大於效益，由醫師考慮減量、停藥或改非興奮劑。'],['開藥前基線？','身高、體重、生長曲線、血壓心率、心血管病史及家族猝死史；ECG 依臨床風險。'],['非藥物部分？','親職行為訓練、課堂調整（座位、分段作業、即時回饋）與學習評估，目標放在課堂與家庭功能。']],
 key:'ADHD 常合併抽動、學習與焦慮問題；共病不等於不能治療，而是要更仔細監測。',expect:'plan'},
{title:'17 歲：用 SSRI 兩週後睡少話多',tag:'憂鬱→躁化',isNew:true,preset:{topic:'depression',age:17,weeks:10,impair:'severe',report:'both',risk:NO_RISK(),checks:'all',confirmed:true,ssri:true,manic:true},
 story:'高三男生中重度憂鬱，2 週前開始 fluoxetine 10 mg 並接受 CBT。近 4 天每晚睡 3 小時仍不累、話多、網購花掉存款、計畫休學創業。母親有雙相情緒障礙病史，初診未問到。',
 ask:[['只是 SSRI 活化副作用嗎？','需鑑別。焦躁失眠可為活化，但睡少不累、目標導向活動與花費增加，加上家族史，需當天聯絡醫師評估躁／輕躁期。'],['藥物怎麼處理？','由醫師評估是否停用抗憂鬱藥並轉專科；不可自行加量，也不在疑雙相時用抗憂鬱藥單方。'],['可預防的環節？','開始抗憂鬱藥前詢問躁期與家族雙相病史，並告知家屬躁化警訊。']],
 key:'抗憂鬱藥起始後的追蹤不只看自殺意念，也要看躁化。',expect:'specialist'},
{title:'11 歲：噎到後只吃三種食物',tag:'ARFID',isNew:true,preset:{topic:'eating',age:11,weeks:20,impair:'moderate',report:'both',risk:NO_RISK(),checks:[0,1]},
 story:'一年前被魚刺噎到後，只肯吃白飯、布丁與某牌優酪乳。沒有怕胖或體型擔憂。5 個月內體重從第 50 百分位落至第 15 百分位，心率 62、無暈厥。',
 ask:[['神經性厭食還是 ARFID？','沒有體型或怕胖認知，限制來自噎到恐懼與感官特性，較符合 ARFID；仍需完整評估。'],['為何要看生長曲線？','兒少要看百分位跨越與變化速率；BMI 尚在正常範圍不能排除營養不良。'],['介入方向？','轉兒少飲食疾患團隊：營養復原、以暴露為主的行為介入、處理焦慮，並依風險做身體監測。']],
 key:'ARFID 沒有體型扭曲，但可能同樣有營養及身體風險。',expect:'specialist'},
{title:'15 歲：大麻後聽到聲音',tag:'精神病＋物質',isNew:true,preset:{topic:'psychosis',age:15,weeks:3,impair:'severe',report:'partial',risk:NO_RISK(),checks:[0,1],medical:true},
 story:'高一男生，近 3 週聽到同學議論他，認為手機被監控而拒上學。過去半年週末使用大麻電子菸。意識清楚、無發燒。否認命令性幻聽與自他傷念頭。',
 ask:[['第一步？','身體與物質鑑別：生命徵象、意識、神經學檢查、尿液藥物篩檢，排除譫妄與其他身體原因。'],['可以直接診斷思覺失調症嗎？','不行。物質誘發與原發精神病需縱向觀察；停用物質並及早轉早期精神病服務。'],['若專科開始抗精神病藥？','基線體重／BMI、腰圍、血壓心率、血糖、血脂、泌乳素、動作副作用；體重前 6 週每週量。']],
 key:'命令性幻聽、自他傷或照護能力不足時，改走急診路徑。',expect:'specialist'},
{title:'7 歲：目睹家暴後尿床退化',tag:'創傷＋保護',isNew:true,preset:{topic:'ptsd',age:7,weeks:8,impair:'moderate',report:'unsafe',risk:{...NO_RISK(),abuse:'yes'}},
 story:'小一女生，2 個月前目睹父親毆打母親後再度尿床、黏著母親、夜驚，遊戲時反覆演出打架。父親仍同住，母親不敢讓父親知道就醫。',
 ask:[['第一優先？','安全與保護。環境仍不安全；台灣醫事人員知悉兒少遭受或目睹家暴，依法於 24 小時內通報，並與非加害照顧者討論安全計畫。'],['要孩子詳細說出經過嗎？','不強迫重述。幼兒常以遊戲重演、退化行為表現創傷反應。'],['治療？','安全確立後採創傷焦點 CBT，納入非加害照顧者；未滿 18 歲不以藥物治療 PTSD。']],
 key:'家長參與有安全顧慮時，資訊與聯繫方式要保護孩子與非加害照顧者。',expect:'urgent'}
];
/* 測驗：level 基礎／高階；a 為正確選項索引（顯示時打亂）；src 為 SOURCES 索引。 */
const QUIZ=[
{lv:'基礎',q:'安全評估中某項標示「尚未評估／不確定」，正確處理是？',o:['未完成，不能視為陰性，先直接詢問','孩子沒主動提，可視為無風險','若量表分數低即可略過','留待下次回診再問'],a:0,why:'未知不等於陰性；任何量表分數都不能排除危險。',src:[4]},
{lv:'基礎',q:'4–5 歲疑似 ADHD 的第一線處置是？',o:['實證親職行為訓練與課堂介入','立即開始 methylphenidate','先開 atomoxetine','先觀察到上小學'],a:0,why:'AAP 2019：學齡前以親職／課堂行為介入優先，持續中重度受損才考慮 methylphenidate。',src:[2]},
{lv:'基礎',q:'ADHD 診斷要求症狀在至少幾個情境出現並影響功能？',o:['兩個','一個','三個','不需要情境要求'],a:0,why:'需跨至少兩個情境（如家庭、學校），因此要整合家長與教師資訊。',src:[2,11]},
{lv:'基礎',q:'對「拒學」最恰當的理解是？',o:['是一種表現，需釐清焦慮類型、霸凌、憂鬱等原因','就是分離焦慮症的同義詞','屬於品行問題，以處罰為主','只要轉學即可解決'],a:0,why:'拒學不是單一診斷；需評估焦慮類型、學校因素、霸凌與憂鬱。',src:[1]},
{lv:'基礎',q:'兒少憂鬱症除了情緒低落，核心情緒也可以表現為？',o:['易怒','欣快','情緒平穩','好動'],a:0,why:'兒少憂鬱常以易怒呈現，容易被誤認為行為問題。',src:[4,13]},
{lv:'基礎',q:'兒少 OCD 第一線心理治療是？',o:['包含暴露與反應預防（ERP）並納入家庭的 CBT','一般支持性會談','單獨放鬆訓練','要求家人配合儀式以降低焦慮'],a:0,why:'CBT／ERP 為核心，並減少家人配合儀式。',src:[5]},
{lv:'基礎',q:'關於自閉症核心特徵的藥物治療，正確的是？',o:['沒有治療核心特徵的常規藥物','risperidone 可改善核心社交溝通','SSRI 為第一線','所有個案都需用藥'],a:0,why:'NICE CG170：不以藥物治療核心特徵；抗精神病藥僅限特定挑戰行為。',src:[6]},
{lv:'基礎',q:'NICE NG116 對未滿 18 歲 PTSD 藥物的建議是？',o:['不建議用藥物預防或治療 PTSD','首選 sertraline','首選 prazosin','急性期給 benzodiazepine'],a:0,why:'兒少 PTSD 以創傷焦點心理治療為主；共病另依其指引評估。',src:[7]},
{lv:'基礎',q:'飲食疾患青少年 BMI 在正常範圍，代表？',o:['不能排除高風險，需看體重變化速率、生命徵象與電解質','可排除住院需要','不是飲食疾患','只需營養衛教'],a:0,why:'NICE NG69：不以單一 BMI 決定風險或住院；正常體重仍可能嚴重。',src:[8]},
{lv:'基礎',q:'追蹤量表分數時的正確做法是？',o:['同一工具、同一填答者比較，並結合功能與會談','不同量表分數直接相加比較','分數改善即可不問安全','家長與孩子分數取平均'],a:0,why:'不同工具或填答者不能混比；安全警訊不因分數改善而排除。',src:[0]},
{lv:'高階',q:'15 歲中重度憂鬱，心理治療後仍需藥物，NICE 建議首選？',o:['fluoxetine 合併心理治療','paroxetine 單方','venlafaxine','三環抗憂鬱藥'],a:0,why:'NG134：兒少憂鬱以 fluoxetine 為首選，並合併心理治療。',src:[4]},
{lv:'高階',q:'開始兒少抗憂鬱藥前，除自殺風險外最需要詢問？',o:['躁／輕躁期病史與家族雙相史','過敏史即可','學業成績','是否喜歡運動'],a:0,why:'疑雙相時抗憂鬱藥單方可能誘發躁化，應先鑑別。',src:[4,9]},
{lv:'高階',q:'對 fluoxetine 有反應的兒少，NICE 建議維持多久？',o:['緩解（無症狀且完整功能至少 8 週）後再至少 6 個月','症狀改善即停','固定 4 週','終身服藥'],a:0,why:'NG134：緩解後至少持續 6 個月，再由醫師規劃漸減。',src:[4]},
{lv:'高階',q:'12 歲 OCD 接受約 12 週完整 CBT／ERP 仍反應不足，下一步？',o:['多專業複評後討論加 SSRI 並持續 ERP','停止心理治療改單用 SSRI','加 benzodiazepine','直接加抗精神病藥'],a:0,why:'先查依從性與 ERP 品質；12–17 歲應討論加 SSRI 並持續 ERP。',src:[5]},
{lv:'高階',q:'ADHD 藥物治療中，血壓與心率至少多久檢查一次？',o:['每次調量後，且至少每 6 個月','每年一次','只在開藥前量一次','只有出現胸痛才量'],a:0,why:'NICE NG87：調量後及至少每 6 個月監測血壓心率；身高每 6 個月。',src:[3]},
{lv:'高階',q:'自閉症嚴重挑戰行為使用抗精神病藥，6 週無臨床重要反應時？',o:['停用','加倍劑量','再加一種抗精神病藥','繼續觀察 6 個月'],a:0,why:'NICE CG170：3–4 週檢視，6 週無臨床重要反應應停用。',src:[6]},
{lv:'高階',q:'兒少精神病開始抗精神病藥後，體重監測頻率為？',o:['前 6 週每週，第 12 週，之後每 6 個月','每年一次','只量基線','每 3 個月一次'],a:0,why:'NICE CG155：體重前 6 週每週、12 週，之後每 6 個月。',src:[10]},
{lv:'高階',q:'疑雙相情緒障礙兒少出現憂鬱發作，應避免？',o:['抗憂鬱藥單方','專科縱向評估','建立睡眠與復發徵兆計畫','家庭心理教育'],a:0,why:'可能誘發躁化；應由專科整合處置。',src:[9]},
{lv:'高階',q:'焦慮拒學個案，家長每天讓孩子在家以減輕焦慮，原則是？',o:['減少協助逃避，漸進暴露並與學校合作返校','持續在家直到焦慮消失','改為長期在家自學','先用 benzodiazepine 讓孩子上學'],a:0,why:'家庭配合逃避會維持焦慮；CBT 漸進暴露與返校計畫為核心。',src:[1]},
{lv:'高階',q:'嚴重營養不良的飲食疾患青少年開始營養復原，需特別監測？',o:['再餵食症候群：磷、鉀、鎂與心臟狀況','只需每月量體重','肝炎抗體','視力'],a:0,why:'NICE NG69：注意再餵食症候群，依風險監測電解質與 ECG。',src:[8]}
];
/* 心智圖：分支 → 葉節點 */
const MAP=[
['安全分流',['急診：計畫／意圖、可取得工具、近期企圖','急診：嚴重攻擊、命令性幻聽、無法安全照護','急診：意識改變、抽搐、暈厥、脫水','今日：自傷意念或行為（即使無計畫）','今日：虐待、家暴、性暴力；台灣 24 小時內通報','未評估 ≠ 陰性；分數不能排除危險']],
['評估原則',['依年齡與發展階段理解症狀','孩子個別會談＋照顧者＋學校資訊','說明保密範圍與安全例外','排除睡眠、聽視力、身體、物質與藥物因素','以到校、人際、家庭、自理功能為目標']],
['ADHD',['≥6 個月、12 歲前出現、≥2 情境','4–5 歲：親職／課堂行為介入優先','≥6 歲：行為＋學校＋methylphenidate 討論','監測身高體重、血壓心率、食慾睡眠、抽動']],
['焦慮／拒學',['拒學是表現，非單一診斷','分離焦慮 ≥4 週；GAD／社交焦慮約 6 個月','CBT、漸進暴露、減少家庭配合逃避','中重度可討論 sertraline／fluoxetine']],
['憂鬱',['低落或易怒 ≥2 週','用藥前問躁期與家族史','輕度：支持與心理介入；中重度：專科','fluoxetine＋心理治療；前 4 週每週接觸','緩解後再維持至少 6 個月']],
['OCD',['區分發展性儀式、自閉重複行為、抽動','家庭參與 CBT／ERP','約 12 週反應不足 → 複評、討論 SSRI','追蹤 CY-BOCS 與儀式耗時']],
['自閉症',['多專業發展、聽力、語言評估','依優勢與需求安排支持','無核心特徵常規藥物','挑戰行為用藥：3–4 週檢視、6 週無效停用']],
['PTSD',['先確保安全，勿強迫重述','未滿 1 個月：急性壓力反應期','創傷焦點 CBT＋照顧者','<18 歲不以藥物治療 PTSD']],
['飲食疾患',['看生長曲線與變化速率，不只 BMI','生命徵象、姿勢性變化、電解質、ECG','AN／BN／BED／ARFID 鑑別','家庭取向治療；注意再餵食症候群']],
['疑雙相',['易怒或家族史不足以診斷','睡少不累、誇大、冒險 → 專科時間軸','避免抗憂鬱藥單方','lithium／抗精神病藥需專科監測']],
['精神病症狀',['排除譫妄、癲癇、物質、身體原因','命令性幻聽或自他傷 → 急診','早期精神病服務＋家庭介入','代謝監測：體重前 6 週每週']],
['追蹤與共同決策',['同工具、同填答者比較','SSRI 起始／調量：自傷意念與躁化','反應不足先查診斷、共病、依從、療程品質','國外指引 ≠ 台灣仿單或健保給付','規劃維持、復發預防與成年轉銜']]
];
