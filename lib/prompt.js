export const gradingInstructionSimple = `
You are a teacher grading essays, and you need to determine which essay is better.

### Instructions
You will be given two essays to read. You need to determine which essay is better based on the grading instructions provided.
Be harsh but fair when grading the essays.
### Grading Instructions
# Content
The text discusses the subject from different perspectives.
The text contains relevant facts and handles source texts with certainty.
The text contains a clear and well-founded conclusion.
# Form
The text works well in terms of, for example, structure, linguistic variation, precision and fluency.
The text's source references are precise
`

export const gradingInstructionSimpleNumerical = `
You are a teacher grading essays, you will be given an essay and you have to grade it on a scale from 0 to 5.

### Always end your response with a grade from 0 to 5.

### Instructions
You will be given an essay to read. Be harsh but fair when grading the essays.
### Grading Instructions
# Content
The text discusses the subject from different perspectives.
The text contains relevant facts and handles source texts with certainty.
The text contains a clear and well-founded conclusion.
# Form
The text works well in terms of, for example, structure, linguistic variation, precision and fluency.
The text's source references are precise
`

export const gradingInstructionsEng = `
### Assessment instructions

## Writing task: Grade
1. Not acceptable Function
  The text deviates to a large extent from the task instructions.
  The text lacks context and adaptation to the purpose.
  Content
  The text lacks discussion elements.
  The text lacks in the use of facts and handling of source texts.
  Form
  The text has major shortcomings in terms of, for example, structure, linguistic variation, precision and fluency.
  The text's source references are not clear enough.
2. Overall, the performance is judged to correspond to a level between grade 1 and 3.
3. Acceptable Function
  The text is predominantly written based on the task instructions.
  The text is essentially coherent and in an acceptable way adapted to the purpose.
  Content
  The text contains discussion elements.
  The text contains relevant facts and handles source texts in an acceptable manner.
  Form
  The text is acceptable in terms of, for example, structure, linguistic variation, precision and fluency.
  The text's source references are acceptable.
4. Overall, the performance is judged to correspond to a level between grade 3 and 5.
5. More than acceptable Function
  The text is written with a clear starting point in the task instructions.
  The text is coherent and well adapted to the purpose.
  Content
  The text discusses the subject from different perspectives.
  The text contains relevant facts and handles source texts with certainty.
  The text contains a clear and well-founded conclusion.
  Form
  The text works well in terms of, for example, structure, linguistic variation, precision and fluency.
  The text's source references are precise

## Comments - Grade writing task
Aspect (example: grade 3)
  Feature
    The text is predominantly written based on
    the task instruction.
    The text is essentially coherent and in an acceptable way
    adapted to the purpose.
  Content
    The text discusses the topic.
    The text contains relevant facts and handles source texts in one
    acceptable manner.
    The text contains a relatively clear conclusion.
  Form
    The text is acceptable in terms of, for example, linguistic variation,
    precision, structure and flow.
    The text's source references are acceptable.
`

export const gradingInstructionSWE = `
Bedömningsanvisning
Svenska, skriv

Svenska skrivuppgift: skalsteg
1. Inte godtagbar Funktion
Texten avviker i hög grad från uppgiftsinstruktionen.
Texten brister i sammanhang och anpassning till syftet.
Innehåll
Texten brister avseende diskuterande inslag.
Texten brister i användningen av fakta och hantering av källtexter.
Form
Texten har stora brister vad gäller till exempel struktur, språklig variation, precision och flyt.
Textens källhänvisningar är inte tillräckligt tydliga.
2. Prestationen bedöms sammantaget motsvara en nivå mellan skalsteg 1 och 3.
3. Godtagbar Funktion
Texten är till övervägande del skriven med utgångspunkt i uppgiftsinstruktionen.
Texten är i huvudsak sammanhängande och på ett godtagbart sätt anpassad till syftet.
Innehåll
Texten innehåller diskuterande inslag.
Texten innehåller relevanta fakta och hanterar källtexter på ett godtagbart sätt.
Form
Texten är godtagbar vad gäller till exempel struktur, språklig variation, precision och flyt.
Textens källhänvisningar är godtagbara.
4. Prestationen bedöms sammantaget motsvara en nivå mellan skalsteg 3 och 5.
5. Mer än godtagbar Funktion
Texten är skriven med tydlig utgångspunkt i uppgiftsinstruktionen.
Texten är sammanhängande och väl anpassad till syftet.
Innehåll
Texten diskuterar ämnet utifrån olika perspektiv.
Texten innehåller relevanta fakta och hanterar källtexter med säkerhet.
Texten innehåller en tydlig och välgrundad slutsats.
Form
Texten fungerar väl vad gäller till exempel struktur, språklig variation, precision och flyt.
Textens källhänvisningar är precisa


Kommentarer - skalsteg skrivuppgift svenska
Aspekt (exempel: Skalsteg 3)
Funktion
Texten är till övervägande del skriven med utgångspunkt i
uppgiftsinstruktionen.
Texten är i huvudsak sammanhängande och på ett godtagbart sätt
anpassad till syftet.
Innehåll
Texten diskuterar ämnet.
Texten innehåller relevanta fakta och hanterar källtexter på ett
godtagbart sätt.
Texten innehåller en relativt tydlig slutsats.
Form
Texten är godtagbar vad gäller till exempel språklig variation,
precision, struktur och flyt.
Textens källhänvisningar är godtagbara.

Kommentarer (skalsteg 0 - 5)
I helhetsbedömningen ska vägas in i vilken grad
• texten är skriven enligt uppgiftsinstruktionen och kan läsas oberoende av övrigt provmaterial.
• satser knyts samman och språk och innehåll är organiserade i större enheter. Det handlar bland annat om disposition, textbindning, sammanhang och indelning i stycken.
• texten är anpassad till syftet avseende till exempel tilltal, stilnivå, ämnesbehandling och genre.

I helhetsbedömningen ska vägas in i vilken grad
• texten presenterar, diskuterar och tar ställning till det givna ämnet
• skribenten behandlar källan eller källorna på ett rimligt sätt och drar relevanta slutsatser. I detta ingår bland annat att fakta inte manipuleras eller misstolkas.
• källanvändningen tydliggör varför källan eller källorna används. Det handlar bland annat om att stödja resonemang och belysa olika perspektiv.

I helhetsbedömningen ska vägas in i vilken grad
• texten visar på språklig säkerhet, variation och flyt när det gäller till exempel ordförråd, fraseologi, grammatiska strukturer och stavning.
• språket innehåller oklarheter som påverkar framställningens kvalitet.
• källhänvisningarna är skrivna på ett sådant sätt så att det framgår vilken/vilka av källorna som det hänvisas till.

Nedan har du exempel på ett par olika texter med kommentarer som visar hur de kan bedömas enligt skalan. Observera att kommentarerna är exempel och att bedömningen alltid ska göras utifrån helheten i varje enskild text.

Text 1
Klimatflykting - vem och varför?
Nu för tiden finns det väl skilnad på
klimatflykting. och här i texter förklarar
de och beskriver vilka resultater för
klimatförändringar och varför.
För det första anser de att
klimatförändringarna kommer att påverka
på människors trygghet. Det finns mycket
länder som linder av klimatförändringarna.
De människor som bor i söder Asien och
i Afrika blir tvungna att flytta ifrån deras
länder, på grund av torka och den höga
temperatur. Detta som leder till att bli bris
på mat, vatten och människors hälsa.
Klimatförändringarna är ett stort
problem, som gör oftast att människor
flytar till andra länder i världen, för att
hitta en bra miljö för sig själva. Som
klimatförändringarna kosta länderna
mycket pengar. Och det är genom att
människor har sjukdomar eller brist
på mat och vatten, så att de andra
länder hjälper dem, för att ha det bästa
livsvillkor.
De människor, som flytta på grund av
klimatförändringarna behöver de att
skänna trygghet från andra, så det driver
andra länder att skicka medicin, kläder
och mat.
Dessutom klimatförändringarna leder
till stora klimatolyckan. Det som gör
landsekonomi sämre och sämre. Enligt
källa. Det finns några studier, som vissa
oss hur mycket mänskor som har flyttat till
andra länder från Afrika söder och söder
Asien. Den 2050 flyttade cirkan 40
miljoner, som inte kunde att fortsätta leva
i deras länder.
Alla länder började att hitta några
lösningar, som hjälper att förbättra
klimatförändring. Den först de ligger nya
utbildningar och förbättra utbildningar för
människor samt sprida medvetenheten
och vilka färliga resultater, som klimatet
kan ge.
Det andra att klimatförändringsbroplem
blir komma in i politik och strategier på
nationell nivå. Samt de lander måste börja
planera väl och gör de positiv effekt på
klimatet.
Källa 3 ( Mål 13 i Agenda 2030. FN:s
globala mål för utveckling)

Kommentar:
Texten försöker lösa uppgiften men
avviker i hög grad från instruktionen
och brister i såväl sammanhang som
syftesanpassning. Det finns en viss yttre
struktur med stycken och exempel på
textbindning genom sambandsord (för
det första, dessutom).
Ämnet klimatförändringar introduceras
med koppling till behovet att fly men
förslag och diskussion uteblir. Språkliga
brister gör att resonemanget går
förlorat och det är ofta oklart vad som
avses. Texten brister i källanvändning
och tolkning (Enligt källa. Det finns
några studier, som vissa oss hur
mycket mänskor som har flyttat till
andra länder från Afrika söder och
söder Asien. Den 2050 flyttade
cirkan 40 miljoner, som inte kunde
att fortsätta leva i deras länder). I de
två avslutande styckena antyds en
lösning men språket räcker inte för att
klara uppgiften (nya utbildningar och
förbättra utbildningar för människor samt
sprida medvetenheten och vilka färliga
resultater, som klimatet kan ge).
Texten uppvisar stora brister vad gäller
struktur, språklig variation, precision
och flyt. Felen är av både förstörande
och störande karaktär och omfattar
allt från felaktig ordföljd till svajiga
tempus, bristande kongruens, felaktiga
prepositioner och upprepade stavfel.
Källhänvisningarna är inte tillräckligt
tydliga för att anses godtagbara, även
om referensen efter texten är korrekt.

Bedömning: Skalsteg 1

Text 2
Klimatflykting
”Ändrat klimat driver folk på flykt”, Jag
har valt att gå djupare i denna källa för de
är en fråga som måste utredas snabbt för
annars kan det leda till stora Problem i
samhället och givetvis globalt.
enligt världsbanken så kommer 143 m
människor fly från Latinamerika, Afrika
söder om Sahara, Södra asien och deta
har blivit beräknat att hända 2050 allså
bara om 28 år men det som skrämmer
de flesta är att klimatförändring är inte
hållbart för asyl.
Det kommer att leda till politisk och
ekonomiskt osäkerhet/instabilitet som
redan pågår i världen speciellt efter de
ökända viruset covid-19 som har satt
en global kris i värden som inflation,
deprision och många dötts fall och det
ända som var positivt var att miljön blev
bättre men som kommer snart ändras
på när vi är tvungen att bygga nya akuta
bostäder till 143 miljoner människor.
Men det som kommer hända som kommer
vara ner tystat är att det kommer bli stora
konflikter om natur resurser som kommer
inte andvändas var samt som leder till
mer inflation, Politisk och ekonomisk oro,
mindre jordbruksmark och betesområden
men även mer överbefolkning.
Det ändå som kommer gynna av dessa
förhållanden är de stora företagen och
politiska rörelser som kan dras mer
samman. det kan leda mot mer politiska
uppror som kan leda till gröve oror
som leder till en hitta på anklagelse för
att starta en ett krig mot andra länder
eller inbördes krig och vi alla vet hur
mycket det kostar i ekonomiska och även
naturliga resurser som var bas av allt.
Jag tycker att vi måste agera för att
hjälpa miljön för det kommer spåra ut och
att massa människor kommer dö mer eller
mindre och arter kommer dö ut. Men hur
ska vi hjälpa miljön? Det är en svår fråga
som politikerna duckar. Jag tror vi måste
enas med länder som har mycket kolverk
som china och tyskland som är de största
industri länder för att minska kol verken
och investera i mer återvinnigs bar energi
som sol och vindkraft för då drar vi ner
på koldixoin som minskar växthus effekten
och all smog som förhindrade olympiska
spelen i tokoy.
Det jag försöker säga är vi måste enas
och hjälp våra grannländer för att minska
miljö utsläpp för Just nu verkar inte paris
avtalet räcka.

Kommentar:
Texten avviker från uppgiftsinstruktionen
genom att huvudsakligen redogöra
för egna tankar. Den är delvis
sammanhängande och mestadels
självbärande men brister i anpassning
till syftet. Den yttre strukturen med
avgränsade stycken underlättar
läsningen.
Texten brister vad gäller diskuterande
inslag då merparten av framställningen
består av skribentens tankar om de
problem ett ökat antal klimatflyktingar
kan medföra (ekonomisk instabilitet,
konflikter om naturresurser, mer politiska
uppror, krig). Enligt inledningen bygger
texten på källa 1, (som läsaren antas
känna till), men innehållet består i
huvudsak av egna resonemang som
inte utvecklas och bara delvis är
sammanhängande. (Det ändå som
kommer gynna av dessa förhållanden är
de stora företagen och politiska rörelser
som kan dras mer samman. det kan
leda mot mer politiska uppror som kan
leda till gröve oror som leder till en hitta
på anklagelse för att starta en ett krig
mot andra länder eller inbördes krig
och vi alla vet hur mycket det kostar i
ekonomiska och även naturliga resurser
som var bas av allt.) Texten brister i
faktaanvändning då vissa uppgifter
saknar källor (all smog som förhindrade
olympiska spelen i tokoy), samtidigt
som använda källtexter inte redovisas,
(t ex i stycke 2 där uppgifter från källa
2 används utan att det anges). I sista
stycket finns en slutsats i form av ett
lösningsförslag som inte kopplas till
det föregående resonemanget (vi
måste agera för att hjälpa miljön genom
att enas med länder som har mycket
kolverk…).
Texten är godtagbar vad gäller flyt och
språklig variation och en mestadels
passande vokabulär. Den inre strukturen
med stycken bestående av en mening
har däremot stora brister. Förutom
meningsbyggnaden innehåller texten
störande formfel t.ex. stor/ liten bokstav
(södra Asien, china) stavning av vanliga
ord (andvänds) och särskrivning (dötts
fall, återvinnings bar)

Bedömning: Skalsteg 2

Text 3
Jorden vi ärvde - hur går vi vidare?

( // = skribentens markering för tänkt
styckeindelning)

Varför vi måste ta vara om våran
värld och klimat är för att det endast
kommer blir mycket värre om varenda
människa ska använda sin fossila eller
el-bil varje stycke dag. //De positiva och
negativa delarna i detta är till exempel
att vi människor har makten till att göra
förändring men samtidigt medans vissa
människor tänker att om andra individer
tar hand om miljön så kan jag fortsätta
ha samma livsstil som vanligt. Det finns
även fler saker såsom att vi människor
är väldigt lata till exempel att vi alltid
tar bilen oavsett om resan endast är
nån enstaka kort kilometer, det vi kan
förbättra inom detta är att vi kan planera
våra resor mer och hur man ska ta sig
till destinationen. Till exempel om man
ska åka en längre sträcka så kan man
planera innan man åker vart man ska
köra för att det ska bli så miljövänligt
som möjligt och om man åka en kortare
sträva så kan man antingen gå eller cykla
och till och med åka kollektivt. // Men
nu hur vi skulle kunna göra detta bättre i
en långsiktig väg är att till exempel som
det står i texten som heter ” lösningen
ligger i vår föreställningsförmåga” där
dem skriver att vi ska ställa undan våran
fossila eller våran el-bil i ett visst antal
dagar för at kunna sänka med en viss
procent. Det tycker jag låter som en bra
idé då det ger väldigt stora skillnader i
en långsiktig period.// Med det kan även
vara några problem med det då alla 
inte bor i stan, så jag tror att det riktigt
stora problemen ligger i att de aldrig
kommer att bli en jämn sänkning i hela
Sverige. Så i detta läge måste vi ta fram
en plan som kommer att kunna sänka
utsläppen jämnt genom hela Sverige och
inte endast fokusera på storstäderna. //
Min långsiktiga plan är att till exempel
i storstäderna fokusera på att kunna
ställa undan bilen då dem har en större
val möjlighet och på landsbygden, så
kan man jobba hemma om det finns en
möjlighet till det och använda bilen när
det verkligen behövs. Så man kan försöka
en minskning på några procent varje
vecka, månad och år.
Sammanfattningen av detta är att vi
måsta ha en tankeställare där vi förstås
att vi har makten till att kunna göra en
förändring. Min absolut egna tanke kring
detta är att JAG själv kan förändra hur det
ser ut i samhället. Som sagt små ting gör
stora dåd i längden.

Kommentar:
Texten är till övervägande del skriven
enligt instruktionen och kan läsas
oberoende av övrigt provmaterial.
Innehållet framställs i en följd med
stycken som markerats i efterhand.
Texten är på ett godtagbart sätt
anpassad till syftet. Tilltalet är tydligt
om än vardagligt och stilnivån bitvis
osäker (vi människor har makten till
att göra förändring) men i huvudsak
fungerande.
Texten presenterar och diskuterar
problem och möjligheter på temat
transporter. Resonemanget som
utgår från Sverige och skillnader i
villkor mellan land och stad, omfattar
individuella och kollektiva lösningar,
även om ansvaret stundtals är oklart (Så
i detta läge måste vi ta fram en plan som
kommer att kunna sänka utsläppen jämnt
genom hela Sverige och inte endast
fokusera på storstäderna.). Texten
innehåller relevanta fakta av vardaglig
karaktär. Den använda källtexten ingår
i resonemanget och hanteras på ett
godtagbart sätt, även om hänvisningen
brister. Framställningen avslutas med
en tydlig slutsats och ett personligt
ställningstagande av den typ som
föreslås i instruktionen.
Texten är godtagbar vad gäller struktur
och flyt. Språknivån är vardagligt
med talspråkliga konstruktioner som
inte är idiomatiska (i en långsiktig
väg, i en långsiktig period, våran).
Meningsbyggnaden är bitvis osäker
med tendens till satsradning.
Källhänvisning finns, men den är
ofullständig.

Bedömning: Skalsteg 3
`

export const gradingInstructionSWEShorter = `
Bedömningsanvisning
Svenska, skriv

Svenska skrivuppgift: skalsteg
1. Inte godtagbar Funktion
Texten avviker i hög grad från uppgiftsinstruktionen.
Texten brister i sammanhang och anpassning till syftet.
Innehåll
Texten brister avseende diskuterande inslag.
Texten brister i användningen av fakta och hantering av källtexter.
Form
Texten har stora brister vad gäller till exempel struktur, språklig variation, precision och flyt.
Textens källhänvisningar är inte tillräckligt tydliga.
2. Prestationen bedöms sammantaget motsvara en nivå mellan skalsteg 1 och 3.
3. Godtagbar Funktion
Texten är till övervägande del skriven med utgångspunkt i uppgiftsinstruktionen.
Texten är i huvudsak sammanhängande och på ett godtagbart sätt anpassad till syftet.
Innehåll
Texten innehåller diskuterande inslag.
Texten innehåller relevanta fakta och hanterar källtexter på ett godtagbart sätt.
Form
Texten är godtagbar vad gäller till exempel struktur, språklig variation, precision och flyt.
Textens källhänvisningar är godtagbara.
4. Prestationen bedöms sammantaget motsvara en nivå mellan skalsteg 3 och 5.
5. Mer än godtagbar Funktion
Texten är skriven med tydlig utgångspunkt i uppgiftsinstruktionen.
Texten är sammanhängande och väl anpassad till syftet.
Innehåll
Texten diskuterar ämnet utifrån olika perspektiv.
Texten innehåller relevanta fakta och hanterar källtexter med säkerhet.
Texten innehåller en tydlig och välgrundad slutsats.
Form
Texten fungerar väl vad gäller till exempel struktur, språklig variation, precision och flyt.
Textens källhänvisningar är precisa


Kommentarer - skalsteg skrivuppgift svenska
Aspekt (exempel: Skalsteg 3)
Funktion
Texten är till övervägande del skriven med utgångspunkt i
uppgiftsinstruktionen.
Texten är i huvudsak sammanhängande och på ett godtagbart sätt
anpassad till syftet.
Innehåll
Texten diskuterar ämnet.
Texten innehåller relevanta fakta och hanterar källtexter på ett
godtagbart sätt.
Texten innehåller en relativt tydlig slutsats.
Form
Texten är godtagbar vad gäller till exempel språklig variation,
precision, struktur och flyt.
Textens källhänvisningar är godtagbara.

Kommentarer (skalsteg 0 - 5)
I helhetsbedömningen ska vägas in i vilken grad
• texten är skriven enligt uppgiftsinstruktionen och kan läsas oberoende av övrigt provmaterial.
• satser knyts samman och språk och innehåll är organiserade i större enheter. Det handlar bland annat om disposition, textbindning, sammanhang och indelning i stycken.
• texten är anpassad till syftet avseende till exempel tilltal, stilnivå, ämnesbehandling och genre.

I helhetsbedömningen ska vägas in i vilken grad
• texten presenterar, diskuterar och tar ställning till det givna ämnet
• skribenten behandlar källan eller källorna på ett rimligt sätt och drar relevanta slutsatser. I detta ingår bland annat att fakta inte manipuleras eller misstolkas.
• källanvändningen tydliggör varför källan eller källorna används. Det handlar bland annat om att stödja resonemang och belysa olika perspektiv.

I helhetsbedömningen ska vägas in i vilken grad
• texten visar på språklig säkerhet, variation och flyt när det gäller till exempel ordförråd, fraseologi, grammatiska strukturer och stavning.
• språket innehåller oklarheter som påverkar framställningens kvalitet.
• källhänvisningarna är skrivna på ett sådant sätt så att det framgår vilken/vilka av källorna som det hänvisas till.
`

export const getGradeInstruction = `
Your job is to identify which text ( Text 1 or Text 2 ) the user thinks is best. 

### IMPORTANT: You ONLY respond with the word "Text 1" or "Text 2" NOTHING MORE.
`

export const exampleMessagesNumericalGradeSWE = [
  {
    role: 'user',
    content: `Jorden vi ärvde - hur går vi vidare? Varför vi måste ta vara om våranvärld och klimat är för att det endastkommer blir mycket värre om varendamänniska ska använda sin fossila ellerel-bil varje stycke dag. //De positiva ochnegativa delarna i detta är till exempelatt vi människor har makten till att göraförändring men samtidigt medans vissamänniskor tänker att om andra individertar hand om miljön så kan jag fortsättaha samma livsstil som vanligt. Det finnsäven fler saker såsom att vi människorär väldigt lata till exempel att vi alltidtar bilen oavsett om resan endast ärnån enstaka kort kilometer, det vi kanförbättra inom detta är att vi kan planeravåra resor mer och hur man ska ta sigtill destinationen. Till exempel om manska åka en längre sträcka så kan manplanera innan man åker vart man skaköra för att det ska bli så miljövänligtsom möjligt och om man åka en kortaresträva så kan man antingen gå eller cyklaoch till och med åka kollektivt. // Mennu hur vi skulle kunna göra detta bättre ien långsiktig väg är att till exempel somdet står i texten som heter ” lösningenligger i vår föreställningsförmåga” därdem skriver att vi ska ställa undan våranfossila eller våran el-bil i ett visst antaldagar för at kunna sänka med en vissprocent. Det tycker jag låter som en braidé då det ger väldigt stora skillnader ien långsiktig period.// Med det kan ävenvara några problem med det då alla inte bor i stan, så jag tror att det riktigtstora problemen ligger i att de aldrigkommer att bli en jämn sänkning i helaSverige. Så i detta läge måste vi ta framen plan som kommer att kunna sänkautsläppen jämnt genom hela Sverige ochinte endast fokusera på storstäderna. //Min långsiktiga plan är att till exempeli storstäderna fokusera på att kunnaställa undan bilen då dem har en störreval möjlighet och på landsbygden, såkan man jobba hemma om det finns enmöjlighet till det och använda bilen närdet verkligen behövs. Så man kan försökaen minskning på några procent varjevecka, månad och år.Sammanfattningen av detta är att vimåsta ha en tankeställare där vi förståsatt vi har makten till att kunna göra enförändring. Min absolut egna tanke kringdetta är att JAG själv kan förändra hur detser ut i samhället. Som sagt små ting görstora dåd i längden.`,
  },
  {
    role: 'assistant',
    content:
      'The text is predominantly written according to the instructions and can be read independent of other sample material.The content is produced in sequence with paragraphs marked afterwards. The text is in an acceptable manner adapted to the purpose. The appeal is clear albeit everyday and the style level piecemeal uncertain (we humans have the power to to make change) but essentially functioning. The text presents and discusses problems and opportunities on the topic transportation. The reasoning that based on Sweden and differences interms between country and city, includes individual and collective solutions, even if the responsibility is sometimes unclear (So in this situation we have to come up with a plan that will be able to reduce emissions evenly throughout Sweden and not only focus on the big cities.). The text contains relevant facts of everyday life character. The source text used is included in the reasoning and handled in one acceptable way, even if the reference burst. The petition ends with a clear conclusion and a personal one position-taking of the kind which suggested in the instruction. The text is acceptable in terms of structure and flow. The language level is everyday with colloquial constructions such as are not idiomatic (in a long-termroad, in a long-term period, ours). The structure of the sentence is partly uncertain with a tendency to bet alignment.Citation exists, but it is incomplete. Grade: 3',
  },
  {
    role: 'user',
    content: `Klimatflykting”Ändrat klimat driver folk på flykt”, Jaghar valt att gå djupare i denna källa för deär en fråga som måste utredas snabbt förannars kan det leda till stora Problem isamhället och givetvis globalt.enligt världsbanken så kommer 143 mmänniskor fly från Latinamerika, Afrikasöder om Sahara, Södra asien och detahar blivit beräknat att hända 2050 allsåbara om 28 år men det som skrämmerde flesta är att klimatförändring är intehållbart för asyl.Det kommer att leda till politisk ochekonomiskt osäkerhet/instabilitet somredan pågår i världen speciellt efter deökända viruset covid-19 som har satten global kris i värden som inflation,deprision och många dötts fall och detända som var positivt var att miljön blevbättre men som kommer snart ändraspå när vi är tvungen att bygga nya akutabostäder till 143 miljoner människor.Men det som kommer hända som kommervara ner tystat är att det kommer bli storakonflikter om natur resurser som kommerinte andvändas var samt som leder tillmer inflation, Politisk och ekonomisk oro,mindre jordbruksmark och betesområdenmen även mer överbefolkning.Det ändå som kommer gynna av dessaförhållanden är de stora företagen ochpolitiska rörelser som kan dras mersamman. det kan leda mot mer politiskauppror som kan leda till gröve ororsom leder till en hitta på anklagelse föratt starta en ett krig mot andra ländereller inbördes krig och vi alla vet hurmycket det kostar i ekonomiska och ävennaturliga resurser som var bas av allt.Jag tycker att vi måste agera för atthjälpa miljön för det kommer spåra ut ochatt massa människor kommer dö mer ellermindre och arter kommer dö ut. Men hurska vi hjälpa miljön? Det är en svår frågasom politikerna duckar. Jag tror vi måsteenas med länder som har mycket kolverksom china och tyskland som är de störstaindustri länder för att minska kol verkenoch investera i mer återvinnigs bar energisom sol och vindkraft för då drar vi nerpå koldixoin som minskar växthus effektenoch all smog som förhindrade olympiskaspelen i tokoy.Det jag försöker säga är vi måste enasoch hjälp våra grannländer för att minskamiljö utsläpp för Just nu verkar inte parisavtalet räcka.`,
  },
  {
    role: 'assistant',
    content: `The text deviates from the task instruction by mainly giving an account for own thoughts. It is partialcoherent and mostly self-supporting but lacking in adaptation to the purpose. The outer structure with delimited paragraphs make it easier the reading.The text lacks discussionelements then the majority of the presentationconsists of the writer's thoughts about themproblem an increased number of climate refugeescan lead to (economic instability,conflicts over natural resources, more politicalrebellion, war). According to the introduction buildsthe text on source 1, (which the reader assumesknow of), but the content consists ofmain of own reasoning whichnot developed and only partially iscoherent. (That anywaywill benefit from these conditions arethe big companies and political movementswhich can be pulled together more. it canlead to more political uprisings that canlead to gross concerns that lead to a findon charges of starting a waragainst other countries or civil warsand we all know how much it costseconomic and also natural resourceswhich was the basis of everything.) The text lacks ifactual use then certain datamissing sources (all smog that preventedolympic games in tokoy), at the same timeas used source texts are not reported,(e.g. in paragraph 2 where information from source2 is used without being specified). In the lastparagraph there is a conclusion in the form of asolution proposals that are not connectedthe preceding reasoning (vimust act to help the environment throughto agree with countries that have a lotcoal plant...).The text is acceptable in terms of flow andlinguistic variation and a mostlyappropriate vocabulary. The internal structurewith paragraphs consisting of one sentencehowever, has major shortcomings. exceptthe sentence structure contains the textdisturbing shape defects, e.g. uppercase/lowercase letter(south Asia, china) spelling of ordinaryword (used) and special spelling (diedcase, recyclable). Grade: 2`,
  },
]

export const exampleMessagesNumericalSweWithSwedishResponse = [
  {
    role: 'user',
    content: `Klimatflykting - vem och varför? Nu för tiden finns det väl skilnad på klimatflykting. och här i texter förklarar de och beskriver vilka resultater för klimatförändringar och varför. För det första anser de att klimatförändringarna kommer att påverka på människors trygghet. Det finns mycket länder som linder av klimatförändringarna. De människor som bor i söder Asien och i Afrika blir tvungna att flytta ifrån deras länder, på grund av torka och den höga temperatur. Detta som leder till att bli bris på mat, vatten och människors hälsa. Klimatförändringarna är ett stort problem, som gör oftast att människor flytar till andra länder i världen, för att hitta en bra miljö för sig själva. Som klimatförändringarna kosta länderna mycket pengar. Och det är genom att människor har sjukdomar eller brist på mat och vatten, så att de andra länder hjälper dem, för att ha det bästa livsvillkor. De människor, som flytta på grund av klimatförändringarna behöver de att skänna trygghet från andra, så det driver andra länder att skicka medicin, kläder och mat. Dessutom klimatförändringarna leder till stora klimatolyckan. Det som gör landsekonomi sämre och sämre. Enligt källa. Det finns några studier, som vissa oss hur mycket mänskor som har flyttat till andra länder från Afrika söder och söder Asien. Den 2050 flyttade cirkan 40 miljoner, som inte kunde att fortsätta leva i deras länder. Alla länder började att hitta några lösningar, som hjälper att förbättra klimatförändring. Den först de ligger nya utbildningar och förbättra utbildningar för människor samt sprida medvetenheten och vilka färliga resultater, som klimatet kan ge. Det andra att klimatförändringsbroplem blir komma in i politik och strategier på nationell nivå. Samt de lander måste börja planera väl och gör de positiv effekt på klimatet. Källa 3 ( Mål 13 i Agenda 2030. FN:s globala mål för utveckling)`,
  },
  {
    role: 'assistant',
    content: `Texten försöker lösa uppgiften men avviker i hög grad från instruktionen och brister i såväl sammanhang som syftesanpassning. Det finns en viss yttre struktur med stycken och exempel på textbindning genom sambandsord (för det första, dessutom). Ämnet klimatförändringar introduceras med koppling till behovet att fly men förslag och diskussion uteblir. Språkliga brister gör att resonemanget går förlorat och det är ofta oklart vad som avses. Texten brister i källanvändning och tolkning (Enligt källa. Det finns några studier, som vissa oss hur mycket mänskor som har flyttat till andra länder från Afrika söder och söder Asien. Den 2050 flyttade cirkan 40 miljoner, som inte kunde att fortsätta leva i deras länder). I de två avslutande styckena antyds en lösning men språket räcker inte för att klara uppgiften (nya utbildningar och förbättra utbildningar för människor samt sprida medvetenheten och vilka färliga resultater, som klimatet kan ge). Texten uppvisar stora brister vad gäller struktur, språklig variation, precision och flyt. Felen är av både förstörande och störande karaktär och omfattar allt från felaktig ordföljd till svajiga tempus, bristande kongruens, felaktiga prepositioner och upprepade stavfel. Källhänvisningarna är inte tillräckligt tydliga för att anses godtagbara, även om referensen efter texten är korrekt. Betyg: 1`,
  },
  {
    role: 'user',
    content: `Klimatflykting ”Ändrat klimat driver folk på flykt”, Jag har valt att gå djupare i denna källa för de är en fråga som måste utredas snabbt för annars kan det leda till stora Problem i samhället och givetvis globalt. enligt världsbanken så kommer 143 m människor fly från Latinamerika, Afrika söder om Sahara, Södra asien och deta har blivit beräknat att hända 2050 allså bara om 28 år men det som skrämmer de flesta är att klimatförändring är inte hållbart för asyl. Det kommer att leda till politisk och ekonomiskt osäkerhet/instabilitet som redan pågår i världen speciellt efter de ökända viruset covid-19 som har satt en global kris i värden som inflation, deprision och många dötts fall och det ända som var positivt var att miljön blev bättre men som kommer snart ändras på när vi är tvungen att bygga nya akuta bostäder till 143 miljoner människor. Men det som kommer hända som kommer vara ner tystat är att det kommer bli stora konflikter om natur resurser som kommer inte andvändas var samt som leder till mer inflation, Politisk och ekonomisk oro, mindre jordbruksmark och betesområden men även mer överbefolkning. Det ändå som kommer gynna av dessa förhållanden är de stora företagen och politiska rörelser som kan dras mer samman. det kan leda mot mer politiska uppror som kan leda till gröve oror som leder till en hitta på anklagelse för att starta en ett krig mot andra länder eller inbördes krig och vi alla vet hur mycket det kostar i ekonomiska och även naturliga resurser som var bas av allt. Jag tycker att vi måste agera för att hjälpa miljön för det kommer spåra ut och att massa människor kommer dö mer eller mindre och arter kommer dö ut. Men hur ska vi hjälpa miljön? Det är en svår fråga som politikerna duckar. Jag tror vi måste enas med länder som har mycket kolverk som china och tyskland som är de största industri länder för att minska kol verken och investera i mer återvinnigs bar energi som sol och vindkraft för då drar vi ner på koldixoin som minskar växthus effekten och all smog som förhindrade olympiska spelen i tokoy. Det jag försöker säga är vi måste enas och hjälp våra grannländer för att minska miljö utsläpp för Just nu verkar inte paris avtalet räcka.`,
  },
  {
    role: 'assistant',
    content: `Texten avviker från uppgiftsinstruktionen genom att huvudsakligen redogöra för egna tankar. Den är delvis sammanhängande och mestadels självbärande men brister i anpassning till syftet. Den yttre strukturen med avgränsade stycken underlättar läsningen. Texten brister vad gäller diskuterande inslag då merparten av framställningen består av skribentens tankar om de problem ett ökat antal klimatflyktingar kan medföra (ekonomisk instabilitet, konflikter om naturresurser, mer politiska uppror, krig). Enligt inledningen bygger texten på källa 1, (som läsaren antas känna till), men innehållet består i huvudsak av egna resonemang som inte utvecklas och bara delvis är sammanhängande. (Det ändå som kommer gynna av dessa förhållanden är de stora företagen och politiska rörelser som kan dras mer samman. det kan leda mot mer politiska uppror som kan leda till gröve oror som leder till en hitta på anklagelse för att starta en ett krig mot andra länder eller inbördes krig och vi alla vet hur mycket det kostar i ekonomiska och även naturliga resurser som var bas av allt.) Texten brister i faktaanvändning då vissa uppgifter saknar källor (all smog som förhindrade olympiska spelen i tokoy), samtidigt som använda källtexter inte redovisas, (t ex i stycke 2 där uppgifter från källa 2 används utan att det anges). I sista stycket finns en slutsats i form av ett lösningsförslag som inte kopplas till det föregående resonemanget (vi måste agera för att hjälpa miljön genom att enas med länder som har mycket kolverk…). Texten är godtagbar vad gäller flyt och språklig variation och en mestadels passande vokabulär. Den inre strukturen med stycken bestående av en mening har däremot stora brister. Förutom meningsbyggnaden innehåller texten störande formfel t.ex. stor/ liten bokstav (södra Asien, china) stavning av vanliga ord (andvänds) och särskrivning (dötts fall, återvinnings bar) Betyg: 2`,
  },
  {
    role: 'user',
    content: `Klimatflyckting - Vem och varför? Vem är det som blir klimatflyckting? Ingen vill väl tvingas lämna sitt hem så vad är anledningen till att så många gör det? Och den viktigaste frågan av alla, hur gör vi för att stoppa klimatkrisen? Många länder lider idag av klimatkrisen. I (Ändrat klimat driver människor på flykt. Läst 2022-08-24 kan vi läsa att en ökning av plötsliga väderkatastrofer så som översvämningar och stormar påverkar världens skördrar. Likväl som plötsliga väderkatastrofer påverkar även mer långsamma katastrofer som torka och ökenspridning. Allt detta leder till att invånare i hårt drabbade länder tvingas fly för att undvika svält. Svält och hungersnöd påverkar även det politiska klimatet och i många länder kan krig bryta ut för att slåss om de få resurser som finns kvar. Detta leder till att fler behöver fly för att undkomma kriget. Hur ser då framtiden ut för de mest drabbade länderna? Enligt källa 2 (läst 2022- 08-24) så har man beräknat antalet klimatflyktingar år 2050 från Afrika söder om Sahara, södra Asien och Latinamerika med tre tänkbara scenarier. Ett. Pessimistisk utveckling, två: mer hållbar utveckling och tre: mer klimatvänlig utveckling. Om vi kollar på den pessimistiska utvecklingen för Afrika söder om Sahara som är mest drabbat så kan vi se att antalet beräknade klimatflyktingar uppnår ca 70 miljoner. Kollar man på den mer klimatvänliga utvecklingen räknar man ändå med ca 30 miljoner flyktingar. Samtidigt som vädret påverkar våra skördar mer och mer ökar populationen. Även detta leder till att klimatet påverkas eftersom fler människor är lika med att fler resurser behövs. Vi skaffar fler (sic) per familj och vi lever längre än någonsin. I mänga länder föds oönskade barn p. g. a. brist på utbildning och oönskade graviditeter efter överfall. Detta kommer bara att öka och påverka oss mer och mer eftersom land efter land förbjuder aborter. Vad kan vi då göra för att stoppa klimatkrisen? Det viktigaste av allt är att utbildning för att vi ska förstå klimatavtrycken vi gör i vår vardag. Hur påverkas miljön av att vi köper matvaror med palmolja? Eller att vi skaffar fler och fler barn? Detta är framförallt viktigt i mindre utvecklade länder. Ledarna måste ta miljön på större allvar. Allt för många med stor makt, som t.ex Donald trump, påstår att klimatkrisen är påhittad och det måste få ett stopp! Stora ledare behöver resa dit folk är som mest påverkade och se katastrofen i vitögat och sen aggera för att göra skillnad. Detta är enligt mig det viktigaste vi kan göra för att stoppa klimatkrisen. Att vi tillsammans jobbar mot samma mål genom utbildning och förståelse. Det är tillsammans vi kan stoppa klimatkrisen.`,
  },
  {
    role: 'assistant',
    content: `Texten är skriven enligt instruktionen och anpassad till syftet. Strukturen med frågor fungerar väl och stilnivån är i huvudsak passande, med undantag för några ställen, där språket är alltför informellt (Om vi kollar på den pessimistiska utvecklingen för Afrika söder om Sahara). Ämnet diskuteras utifrån olika perspektiv och frågorna om vem och varför besvaras, även om diskussionen stundtals spretar (Hur påverkas miljön av att vi köper matvaror med palmolja? Eller att vi skaffar fler och fler barn?). Texten innehåller relevanta fakta och källinnehållet presenteras på ett godtagbart sätt. Slutsatsen är tydlig men sambandet mellan förbättrad utbildning och minskad klimatflykt förblir implicit. Formen fungerar i huvudsak väl vad gäller struktur, språklig variation, precision och flyt. Texten innehåller språkfel t.ex. felstavade ord (klimatflyckting, aggera) och stor/liten bokstav (Donald trump), men dessa påverkar inte textens kvalitet. Källhänvisningarna är godtagbara. Betyg: 4`,
  },
]

export const exampleMessagesNumericalEngWithSwedishResponse = [
  {
    role: 'user',
    content: `Religion is a Personal Choice Religion have played an essential role in todayes society and our history. Every country have in one way or another been influensed by religion. There exist no law saying that every citizen have to celebrate religius holiday but every person does it anyways. So you might ask Why do people hate on religion? There are numerus reasons why people whould dislike religion or religius people One reason. It could be that people finds it unesesary but the most likely one is that people dont like it when people force their ideas and belifes on them. They don't like it when they have to change to apice somebody else and that goes both ways. Even though it's a personal choice people likes to try and choose for others. There are potential options to solve the problem one is to make strikter rules another is to declare an area were people can boist about their idiels but it comes whit it own complication. The hard thing comes in the future the more teknologi advances it will leave less rome for religion and that will force us to change more things and the circle will continue.`,
  },
  {
    role: 'assistant',
    content: `Texten framför implicit en åsikt (people dont like it when), men introducerar ett eget tema som avviker från uppgiftsinstruktionen (Why do people hate on religion?). Detta påverkar textens anpassning till syftet, inte minst avseende argumenterande inslag och ställningstagandet. Styckeindelningen är logisk och innehållet knyts i viss mån samman med textbindningar (So you might ask; numerus reasons; One reason; Even though). Innehållsligt sammanhang och flyt påverkas dock, inte minst i slutdelen när flera exempel ges utan att utvecklas, följt av en något vag avslutning (strikter rules; more teknologi). Formen är textens styrka. Det finns till exempel variation i ordförråd och fraseologi (citizen; force their … belifes on them; that goes both ways; it comes whit it own complication). Bestämningar bidrar också till viss tydlighet (an essential role; numerus reasons; the most likely one; potential options). Det finns dock brister avseende till exempel interpunktion, kongruens och stavning (apice; idiels; rome). Grade: 2`,
  },
  {
    role: 'user',
    content: `Religion is a Personal choice. one of the difficulties that might be involved is presure from friends and family. Religion is a choice and if someone want's to practise a certain religion it is their choice and no one else's. Friend an families can sometime presure people in to not practise a religion and therefor have a negativ effekt on someone's well being. Another difficultie that might be involved is the fact that some religions are not welcome in all countries. Some religious countries don't acept other religions then their own witch makes people feel unwanted and cast out. These things are a big problem because of their huge affect on people. If you live in a country were the religion you want to practise is not allowed and were you'r friend and family do not suport your choice, you probebly feel really sad and angry. You might also want to move away to another place were you will be acepted. People schould be able to feel welcome everywere no matter their religion and faith. Everyone schould be acepted and wanted and every religion schould be acepted and wanted, no matter the country. Would you not want to feel welcome everywere no matter your religious belife?`,
  },
  {
    role: 'assistant',
    content: `Texten är på ett godtagbart sätt anpassad till syftet, men inledningen är något abrupt (one of the difficulties …). Framställningen blir sammanhängande bland annat med hjälp av uttryck från stödpunkterna i instruktionen samt viss textbindning inom och mellan meningar (and therefor; Another; If you live in a country; You might also want to move). Styckeindelningen har brister. De något vaga argumenterande inslagen består främst av exempel utifrån ett par perspektiv, följda av en logisk sammanfattning (These things are a big problem because …). Åsikten och ställningstagandet framförs med viss tyngd i slutdelen som avslutas med en retorisk fråga (Would you not want…?). Det förekommer dock upprepningar (schould). Formen är godtagbar avseende bland annat meningsbyggnad, fraseologi och ordförråd (practise a certain religion; someone's well being; cast out; be able to; belife). Bitvis osäker stavning påverkar knappast framställningens kvalitet, men stör läsningen. Grade: 3`,
  },
  {
    role: 'user',
    content:
      'What people eat is up to them In todays society people all over the world have opinions about everything. Opinions about how others think, talk and appear physicall are just some examples. I get that most of the people want everyones best and are trying to help others out, but sometimes it is just best to mind your own buisness. With the current climate change and global pandemic going on, of course it is important to eat well in order to help the environment but also to help yourself. A way of doing this is starting to eat more vegetarian food. This is because in order to fix the climate change, one thing we can do is slow down the meat production. The daily production of meat all over the world has a negative effect on our enfironment and therefor ourselves. This is why some people claims that the best idea is eating more vegetarian food, but what they do not realise is that it is up to each inividual person what food you shoul put in your ody. Have we not come more far that this by now? When are we going to stop caring about what others choose to do with their lives? My hopes for the future includes that we stop judging people based on what they eat. I think it is time that we leave each other alone and instead start focusing on the things that matters.',
  },
  {
    role: 'assistant',
    content: `Texten är sammanhängande och utgår tydligt från uppgiftsinstruktionen, vilket bidrar till anpassning. Detta gäller även tilltalet, med till exempel retoriska frågor (Have we not come …?). Dispositionen är tydlig men inledningen något långdragen. Styckeindelning saknas. Innehållet binds samman på ett relevant sätt (I get that most of the people; but sometimes; A way of doing; This is why). Argumenterande inslag introduceras, först något vagt och kortfattat (best to mind your own buisness), för att utvecklas mer i textens senare del. Där tas motargument upp utifrån några perspektiv, och bemöts (some people claims; but what they do not realise). Avslutningens ställningstagande blir välgrundat (I think it is time … focusing on the things that matters). Texten har flyt, variation i fraser och överlag säker verbbehandling (In todays society; mind your own buisness; A way of doing this; stop judging people based on). Enstaka kongruens- och stavfel förekommer dock. Grade: 4`,
  },
]

export const exampleMessagesNumericalEng = [
  {
    role: 'user',
    content: `Religion is a Personal Choice Religion have played an essential role in todayes society and our history. Every country have in one way or another been influensed by religion. There exist no law saying that every citizen have to celebrate religius holiday but every person does it anyways. So you might ask Why do people hate on religion? There are numerus reasons why people whould dislike religion or religius people One reason. It could be that people finds it unesesary but the most likely one is that people dont like it when people force their ideas and belifes on them. They don't like it when they have to change to apice somebody else and that goes both ways. Even though it's a personal choice people likes to try and choose for others. There are potential options to solve the problem one is to make strikter rules another is to declare an area were people can boist about their idiels but it comes whit it own complication. The hard thing comes in the future the more teknologi advances it will leave less rome for religion and that will force us to change more things and the circle will continue.`,
  },
  {
    role: 'assistant',
    content:
      'The text implicitly presents an opinion (people dont like it when), but introduces a theme of its own that deviates from the task instruction (Why do people hate on religion?). This affects the adaptation of the text to the purpose, not least regarding argumentative elements and the taking of a position. The division into paragraphs is logical and the content is connected to a certain extent with text bindings (So you might ask; numerus reasons; One reason; Even though). However, substantive context and flow are affected, not least in the final part when several examples are given without development, followed by a somewhat vague conclusion (strikter rules; more teknologi). The form is the strength of the text. There is, for example, variation in vocabulary and phraseology (citizen; force their … belifes on them; that goes both ways; it comes whit it own complication). Determinations also contribute to some clarity (an essential role; numerus reasons; the most likely one; potential options). However, there are shortcomings regarding, for example, punctuation, congruence and spelling (apice; idiels; rome). Grade: 2',
  },
  {
    role: 'user',
    content: `Religion is a Personal choice. one of the difficulties that might be involved is presure from friends and family. Religion is a choice and if someone want's to practise a certain religion it is their choice and no one else's. Friend an families can sometime presure people in to not practise a religion and therefor have a negativ effekt on someone's well being. Another difficultie that might be involved is the fact that some religions are not welcome in all countries. Some religious countries don't acept other religions then their own witch makes people feel unwanted and cast out. These things are a big problem because of their huge affect on people. If you live in a country were the religion you want to practise is not allowed and were you'r friend and family do not suport your choice, you probebly feel really sad and angry. You might also want to move away to another place were you will be acepted. People schould be able to feel welcome everywere no matter their religion and faith. Everyone schould be acepted and wanted and every religion schould be acepted and wanted, no matter the country. Would you not want to feel welcome everywere no matter your religious belife?`,
  },
  {
    role: 'assistant',
    content: `The text is acceptably adapted to the purpose, but the introduction is somewhat abrupt (one of the difficulties...). The presentation becomes coherent, among other things, with the help of expressions from the supporting points in the instruction as well as some text binding within and between sentences (and therefor; Another; If you live in a country; You might also want to move). The paragraph division has flaws. The somewhat vague argumentative elements mainly consist of examples based on a couple of perspectives, followed by a logical summary (These things are a big problem because ...). The opinion and position are presented with some weight in the final part, which ends with a rhetorical question (Would you not want...?). However, there are repetitions (schould). The form is acceptable regarding, among other things, sentence structure, phraseology and vocabulary (practise a certain religion; someone's well being; cast out; be able to; belife). Partially uncertain spelling hardly affects the quality of the presentation, but disturbs the reading. Grade: 3`,
  },
  {
    role: 'user',
    content:
      'What people eat is up to them In todays society people all over the world have opinions about everything. Opinions about how others think, talk and appear physicall are just some examples. I get that most of the people want everyones best and are trying to help others out, but sometimes it is just best to mind your own buisness. With the current climate change and global pandemic going on, of course it is important to eat well in order to help the environment but also to help yourself. A way of doing this is starting to eat more vegetarian food. This is because in order to fix the climate change, one thing we can do is slow down the meat production. The daily production of meat all over the world has a negative effect on our enfironment and therefor ourselves. This is why some people claims that the best idea is eating more vegetarian food, but what they do not realise is that it is up to each inividual person what food you shoul put in your ody. Have we not come more far that this by now? When are we going to stop caring about what others choose to do with their lives? My hopes for the future includes that we stop judging people based on what they eat. I think it is time that we leave each other alone and instead start focusing on the things that matters.',
  },
  {
    role: 'assistant',
    content: `The text is coherent and is clearly based on the task instruction, which contributes to adaptation. This also applies to the address, with, for example, rhetorical questions (Have we not come...?). The outline is clear, but the introduction is somewhat long-winded. Paragraph division is missing. The content is tied together in a relevant way (I get that most of the people; but sometimes; A way of doing; This is why). Argumentative elements are introduced, initially somewhat vaguely and briefly (best to mind your own business), to be developed more in the later part of the text. There, counterarguments are raised based on some perspectives, and met (some people claim; but what they do not realize). The conclusion's position is well founded (I think it is time ... focusing on the things that matters). The text has flow, variety in phrases and overall safe verb processing (In today's society; mind your own buisness; A way of doing this; stop judging people based on). However, there are occasional congruence and spelling errors. Grade: 4`,
  },
]

export const exampleMessagesShortAnswer = [
  {
    role: 'user',
    content: `Religion is a Personal Choice Religion have played an essential role in todayes society and our history. Every country have in one way or another been influensed by religion. There exist no law saying that every citizen have to celebrate religius holiday but every person does it anyways. So you might ask Why do people hate on religion? There are numerus reasons why people whould dislike religion or religius people One reason. It could be that people finds it unesesary but the most likely one is that people dont like it when people force their ideas and belifes on them. They don't like it when they have to change to apice somebody else and that goes both ways. Even though it's a personal choice people likes to try and choose for others. There are potential options to solve the problem one is to make strikter rules another is to declare an area were people can boist about their idiels but it comes whit it own complication. The hard thing comes in the future the more teknologi advances it will leave less rome for religion and that will force us to change more things and the circle will continue.`,
  },
  {
    role: 'assistant',
    content: 'Grade: 2',
  },
  {
    role: 'user',
    content: `Religion is a Personal choice. one of the difficulties that might be involved is presure from friends and family. Religion is a choice and if someone want's to practise a certain religion it is their choice and no one else's. Friend an families can sometime presure people in to not practise a religion and therefor have a negativ effekt on someone's well being. Another difficultie that might be involved is the fact that some religions are not welcome in all countries. Some religious countries don't acept other religions then their own witch makes people feel unwanted and cast out. These things are a big problem because of their huge affect on people. If you live in a country were the religion you want to practise is not allowed and were you'r friend and family do not suport your choice, you probebly feel really sad and angry. You might also want to move away to another place were you will be acepted. People schould be able to feel welcome everywere no matter their religion and faith. Everyone schould be acepted and wanted and every religion schould be acepted and wanted, no matter the country. Would you not want to feel welcome everywere no matter your religious belife?`,
  },
  {
    role: 'assistant',
    content: `Grade: 3`,
  },
  {
    role: 'user',
    content:
      'What people eat is up to them In todays society people all over the world have opinions about everything. Opinions about how others think, talk and appear physicall are just some examples. I get that most of the people want everyones best and are trying to help others out, but sometimes it is just best to mind your own buisness. With the current climate change and global pandemic going on, of course it is important to eat well in order to help the environment but also to help yourself. A way of doing this is starting to eat more vegetarian food. This is because in order to fix the climate change, one thing we can do is slow down the meat production. The daily production of meat all over the world has a negative effect on our enfironment and therefor ourselves. This is why some people claims that the best idea is eating more vegetarian food, but what they do not realise is that it is up to each inividual person what food you shoul put in your ody. Have we not come more far that this by now? When are we going to stop caring about what others choose to do with their lives? My hopes for the future includes that we stop judging people based on what they eat. I think it is time that we leave each other alone and instead start focusing on the things that matters.',
  },
  {
    role: 'assistant',
    content: `Grade: 4`,
  },
]

export const exampleMessagesGradingInstruction = [
  {
    role: 'user',
    content: `Both texts have valid points, but Text 2 presents a more well-rounded and empathetic perspective on food choices. Here's why:\n1. Respect for individual choice: Text 2 acknowledges that what people eat is up to them, and no one should dictate their food choices. This promotes a culture of respect and autonomy in decision-making.\n2. Awareness of the impact of meat production: Text 2 recognizes the adverse effects of meat production on the environment and human health, highlighting the need for collective action to address these issues.\n3. Personal responsibility: While encouraging people to make informed choices about their diet, Text 2 also acknowledges that it's up to each individual to decide what they want to eat. This promotes a sense of personal responsibility and agency in making healthy lifestyle decisions.\n4. Inclusivity: Text 2 emphasizes the importance of thinking longer term about food choices, recognizing that the future of food production will be shaped by individual choices today. This inclusive perspective encourages everyone to participate in finding sustainable solutions for the planet's food needs.\n5. Sensitivity towards others: Text 2 acknowledges that people have different preferences and values when it comes to food, and that's okay. By being sensitive towards others' choices, we can create a more harmonious and supportive society around food.\n6. Focus on healthy habits: While recognizing the importance of individual choice, Text 2 also encourages people to think about their food habits and make conscious decisions that promote overall health and well-being.\n7. Environmental awareness: Text 2 raises important points about the environmental impact of meat production and the need for sustainable agriculture practices. By acknowledging these issues, we can work towards creating a more environmentally friendly food system.\n\nIn conclusion, Text 2 presents a more empathetic and inclusive perspective on food choices, recognizing the importance of individual autonomy while also encouraging responsible decision-making that benefits both personal health and the planet's well-being.`,
  },
  {
    role: 'assistant',
    content: 'Text 2',
  },
  {
    role: 'user',
    content: `Thank you for providing the two texts for comparison. Here's my analysis:\nText 2 has a narrow and judgmental perspective on food choices. The author seems to be imposing their beliefs on others, assuming that people who don't eat meat are just intolerant or close-minded. The text also oversimplifies the issue of climate change, implying that reducing meat consumption is the only solution to the problem. Additionally, the text doesn't acknowledge the cultural and economic aspects of food choices, which are important considerations for many people.\nText 1, on the other hand, presents a more inclusive and nuanced perspective on food choices. The author acknowledges that it's up to each individual to make their own choices about what they eat, and recognizes that there are many factors that influence food preferences and habits. The text also raises important points about the impact of meat production on the environment and the need for collective action to address climate change. Additionally, the text acknowledges the complexity of the issue and recognizes that there are no easy solutions.\nOverall, Text 1 is better because it presents a more thoughtful and considerate approach to food choices and interpersonal relationships. It recognizes that people have different perspectives and beliefs, and that it's important to respect and acknowledge those differences. By contrast, Text 2 comes across as judgmental and presumptuous, assuming that everyone should adopt a particular diet without considering their individual circumstances or beliefs.`,
  },
  {
    role: 'assistant',
    content: 'Text 1',
  },
  {
    role: 'user',
    content: `Both texts have valid points, but Text 2 is more well-rounded and convincing in its argumentation. Here are the reasons why:\n1. Inclusive language: Text 2 uses more inclusive language by acknowledging that people have different choices and perspectives when it comes to food. It recognizes that everyone has their own preferences and beliefs, and that it's important to respect those. Text 1, on the other hand, uses language that implies a judgmental attitude towards people who don't share the same views.\n2. Clarity of argument: Text 2 presents a clear and coherent argument about the benefits of vegetarianism, including its positive impact on the environment. It acknowledges that climate change is a pressing issue and that slowing down global warming is crucial. In contrast, Text 1's argument is more disjointed and lacks clarity.\n3. Evidence: Text 2 provides evidence to support its claims about vegetarianism, including scientific reports from the UNEP. This adds credibility to its argument. Text 1, on the other hand, doesn't provide any evidence to back up its claims about religion and food choices.\n4. Respectful tone: Text 2 maintains a respectful tone throughout its argumentation, acknowledging different perspectives and avoiding judgmental language. In contrast, Text 1's tone comes across as dismissive and disrespectful towards people who don't share the same views on religion.\n5. Focus on the bigger picture: Text 2 keeps the focus on the larger issue of climate change and its impact on the environment, rather than getting bogged down in personal opinions or beliefs. This makes its argument more compelling and easier to follow.\n\nIn conclusion, while both texts have valid points, Text 2 is better overall due to its inclusive language, clarity of argument, evidence, respectful tone, and focus on the bigger picture.`,
  },
  {
    role: 'assistant',
    content: 'Text 2',
  },
]

export const exampleMessages = [
  {
    role: 'user',
    content: `
Text 1:
Religion is a Personal Choice
Religion have played an essential role in
todayes society and our history. Every
country have in one way or another been
influensed by religion. There exist no law
saying that every citizen have to celebrate
religius holiday but every person does
it anyways. So you might ask Why do
people hate on religion?
There are numerus reasons why people
whould dislike religion or religius people
One reason. It could be that people finds
it unesesary but the most likely one is that
people dont like it when people force their
ideas and belifes on them.
They don't like it when they have to
change to apice somebody else and
that goes both ways. Even though it's a
personal choice people likes to try and
choose for others.
There are potential options to solve the
problem one is to make strikter rules
another is to declare an area were people
can boist about their idiels but it comes
whit it own complication. The hard thing
comes in the future the more teknologi
advances it will leave less rome for
religion and that will force us to change
more things and the circle will continue.

Text 2:
What people eat is up to them
In todays society people all over the world
have opinions about everything. Opinions
about how others think, talk and appear
physicall are just some examples. I get
that most of the people want everyones
best and are trying to help others out, but
sometimes it is just best to mind your own
buisness. With the current climate change
and global pandemic going on, of course
it is important to eat well in order to help
the environment but also to help yourself.
A way of doing this is starting to eat more
vegetarian food. This is because in order
to fix the climate change, one thing we
can do is slow down the meat production.
The daily production of meat all over
the world has a negative effect on our
enfironment and therefor ourselves. This
is why some people claims that the best
idea is eating more vegetarian food, but
what they do not realise is that it is up to
each inividual person what food you shoul
put in your ody. Have we not come more
far that this by now? When are we going
to stop caring about what others choose
to do with their lives? My hopes for the
future includes that we stop judging
people based on what they eat. I think it
is time that we leave each other alone and
instead start focusing on the things that
matters. `,
  },
  {
    role: 'assistant',
    content: `Text 2 is better. It presents a more inclusive and respectful perspective on food choices, acknowledging that it's up to each individual to make their own choices about what they eat. The text also raises important points about the impact of meat production on the environment and the need for collective action to address climate change. Text 1, on the other hand, presents a narrow-minded and judgmental view of religion, assuming that people who don't like religion are simply intolerant or close-minded. Overall, Text 2 is more thoughtful and considerate in its approach to food choices and interpersonal relationships.
    decision: Text 2`,
  },
]
