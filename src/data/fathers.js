// Early Christian writers on the debated passages, quoted word for word from public-domain translations
// (Ante-Nicene and Nicene and Post-Nicene Fathers, 1885–1893). Keys are passage refs in passages.js.
const FATHERS={
"Matthew 26:26":[
 {who:"Justin Martyr",when:"about AD 155",work:"First Apology 66",tr:"Roberts and Donaldson",url:"https://logoslibrary.org/justin/apology1/66.html",
  q:"For not as common bread and common drink do we receive these; but in like manner as Jesus Christ our Saviour, having been made flesh by the Word of God, had both flesh and blood for our salvation, so likewise have we been taught that the food which is blessed by the prayer of His word, and from which our blood and flesh by transmutation are nourished, is the flesh and blood of that Jesus who was made flesh."},
 {who:"Ignatius of Antioch",when:"about AD 110",work:"Letter to the Smyrnaeans 7",tr:"Roberts and Donaldson",url:"https://www.newadvent.org/fathers/0109.htm",
  q:"They abstain from the Eucharist and from prayer, because they confess not the Eucharist to be the flesh of our Saviour Jesus Christ, which suffered for our sins, and which the Father, of His goodness, raised up again."}],
"John 6:53":[
 {who:"Ignatius of Antioch",when:"about AD 110",work:"Letter to the Smyrnaeans 7",tr:"Roberts and Donaldson",url:"https://www.newadvent.org/fathers/0109.htm",
  q:"They abstain from the Eucharist and from prayer, because they confess not the Eucharist to be the flesh of our Saviour Jesus Christ, which suffered for our sins, and which the Father, of His goodness, raised up again."}],
"John 3:5":[
 {who:"Justin Martyr",when:"about AD 155",work:"First Apology 61",tr:"Roberts and Donaldson",url:"https://www.ewtn.com/catholicism/library/first-apology-9066",
  q:"Then they are brought by us where there is water, and are regenerated…"}],
"Mark 10:14":[
 {who:"Irenaeus of Lyons",when:"about AD 180",work:"Against Heresies II.22.4",tr:"Roberts and Rambaut",url:"https://www.newadvent.org/fathers/0103222.htm",
  q:"For He came to save all through means of Himself — all, I say, who through Him are born again to God — infants, and children, and boys, and youths, and old men.",
  note:"Often cited for infant baptism, though readers disagree about whether “born again” here means baptism."}],
"Acts 20:7":[
 {who:"Justin Martyr",when:"about AD 155",work:"First Apology 67",tr:"Roberts and Donaldson",url:"https://www.ewtn.com/catholicism/library/first-apology-9066",
  q:"And on the day called Sunday, all who live in cities or in the country gather together to one place."}],
"2 Maccabees 12:46":[
 {who:"Tertullian",when:"about AD 211",work:"The Chaplet (De Corona) 3",tr:"S. Thelwall",url:"https://www.newadvent.org/fathers/0304.htm",
  q:"As often as the anniversary comes round, we make offerings for the dead as birthday honours."}],
"Romans 3:28":[
 {who:"Clement of Rome",when:"about AD 96",work:"First Letter to the Corinthians 32–33",tr:"John Keith",url:"https://www.newadvent.org/fathers/1010.htm",
  q:"And we, too, being called by His will in Christ Jesus, are not justified by ourselves, nor by our own wisdom, or understanding, or godliness, or works which we have wrought in holiness of heart; but by that faith through which, from the beginning, Almighty God has justified all men… What shall we do, then, brethren? Shall we become slothful in well-doing, and cease from the practice of love?",
  note:"Protestants often cite the first sentence; Catholics and Orthodox point to the question that follows it."}],
"Matthew 1:25":[
 {who:"Jerome",when:"about AD 383",work:"Against Helvidius 6",tr:"Fremantle, Lewis and Martley",url:"https://www.newadvent.org/fathers/3007.htm",
  q:"The words knew and till in the language of Holy Scripture are capable of a double meaning."}],
"Revelation 20:4":[
 {who:"Justin Martyr",when:"about AD 160",work:"Dialogue with Trypho 80",tr:"Roberts and Donaldson",url:"https://logoslibrary.org/justin/trypho/080.html",
  q:"But I and others, who are right-minded Christians on all points, are assured that there will be a resurrection of the dead, and a thousand years in Jerusalem, which will then be built, adorned, and enlarged…",
  note:"In the same chapter Justin grants that “many who belong to the pure and pious faith, and are true Christians, think otherwise.”"},
 {who:"Augustine of Hippo",when:"about AD 425",work:"City of God XX.7",tr:"Marcus Dods",url:"https://www.logoslibrary.org/augustine/city/2007.html",
  q:"Now the thousand years may be understood in two ways, so far as occurs to me…",
  note:"Augustine says he once held the millennial view himself. The second of his two readings takes the thousand years as \u201can equivalent for the whole duration of this world.\u201d"}]
};
