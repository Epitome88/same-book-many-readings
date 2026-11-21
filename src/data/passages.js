const P = [
{ref:"Matthew 16:18", q:"And I say also unto thee, That thou art Peter, and upon this rock I will build my church; and the gates of hell shall not prevail against it.",
 r:[
  {who:"Catholic",ids:["catholic"],t:"The rock is Peter himself. Jesus founds the office of the papacy, which passes to Peter's successors as bishops of Rome."},
  {who:"Orthodox",ids:["orthodox","ethiopian"],t:"Peter is honored as first among the apostles, but the rock is the faith he confessed, shared by every faithful bishop. Rome gets no authority over other churches from this verse."},
  {who:"Most Protestants",ids:["lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom"],t:"The rock is Peter's confession that Jesus is the Christ (v. 16), or Peter as a founding apostle, with no ongoing office passed down."}
 ]},
{ref:"John 6:53", q:"Except ye eat the flesh of the Son of man, and drink his blood, ye have no life in you.",
 r:[
  {who:"Catholic and Orthodox",ids:["catholic","orthodox","ethiopian"],t:"Meant literally, and fulfilled in the Eucharist, where believers truly receive Christ's body and blood."},
  {who:"Lutheran and Anglican",ids:["lutheran","anglican"],t:"Connected to the Lord's Supper, where Christ is truly present, though many Lutherans read this chapter primarily as being about faith."},
  {who:"Reformed",ids:["reformed"],t:"Describes feeding on Christ spiritually by faith, which happens especially, but not only, at the Supper."},
  {who:"Baptist and Evangelical",ids:["baptist","pentecostal","nondenom"],t:"A vivid metaphor for believing in Jesus, matching verses 35 and 47 where \u201ccoming\u201d and \u201cbelieving\u201d bring life."}
 ]},
{ref:"James 2:24", q:"Ye see then how that by works a man is justified, and not by faith only.",
 r:[
  {who:"Catholic and Orthodox",ids:["catholic","orthodox","ethiopian"],t:"Faith and works belong together in justification. Saving faith is faith working through love (Galatians 5:6)."},
  {who:"Protestants",ids:["lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom"],t:"Paul (Romans 3:28) explains how we are declared righteous before God, by faith; James shows how real faith proves itself through works. Luther himself once questioned James's value."},
  {who:"Latter-day Saints and Witnesses",ids:["lds","jw"],t:"Faith must be joined by obedience to God's commandments; both are part of the path to salvation."}
 ]},
{ref:"Acts 2:4", q:"And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance.",
 r:[
  {who:"Pentecostal",ids:["pentecostal"],t:"A pattern for every believer: baptism in the Spirit, marked by speaking in tongues, is available today."},
  {who:"Many Reformed and some Baptists",ids:["reformed","baptist"],t:"Cessationist: miraculous gifts confirmed the apostles' message and ceased once the New Testament was complete."},
  {who:"Many others",ids:["catholic","anglican","methodist","nondenom"],t:"Gifts may continue today (the Catholic Charismatic Renewal is one example), but tongues aren't required evidence of the Spirit."}
 ]},
{ref:"Revelation 20:4", q:"And they lived and reigned with Christ a thousand years.",
 r:[
  {who:"Amillennial",ids:["catholic","orthodox","ethiopian","lutheran","reformed","anglican"],t:"Symbolic of Christ's present reign and the age of the Church, between his first and second coming."},
  {who:"Premillennial, often dispensational",ids:["baptist","pentecostal","nondenom"],t:"A future, literal thousand-year reign on earth after Christ returns, often preceded by a rapture and tribulation."},
  {who:"Seventh-day Adventist",ids:["sda"],t:"The saved reign with Christ in heaven for a thousand years while the earth lies empty, before final judgment."},
  {who:"Latter-day Saints",ids:["lds"],t:"Christ will personally reign on earth for a thousand years of peace."},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"The 144,000 rule with Christ from heaven over a paradise earth during the thousand years."}
 ]},
{ref:"John 1:1", q:"In the beginning was the Word, and the Word was with God, and the Word was God.",
 r:[
  {who:"Trinitarian churches",ids:["catholic","orthodox","ethiopian","lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda"],t:"Jesus, the Word, is fully God, sharing one being with the Father, yet distinct from him as a person."},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"The New World Translation renders it \u201cthe Word was a god\u201d: Jesus is a mighty divine being, but not Almighty God."},
  {who:"Latter-day Saints",ids:["lds"],t:"Jesus is divine and was the God of the Old Testament, but is a separate being from God the Father."}
 ]},
{ref:"Exodus 20:8", q:"Remember the sabbath day, to keep it holy.",
 r:[
  {who:"Seventh-day Adventist",ids:["sda"],t:"Still binding. The Sabbath is the seventh day, sundown Friday to sundown Saturday."},
  {who:"Ethiopian Orthodox",ids:["ethiopian"],t:"Keeps both days: the Saturday Sabbath is still honored, alongside Sunday, the Lord's Day."},
  {who:"Most other churches",ids:["catholic","orthodox","lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","lds","jw"],t:"Fulfilled or transformed in Christ. Most Christians worship on Sunday, the day of the resurrection; Witnesses don't keep a weekly Sabbath at all."}
 ]}
];

// More passages
P.push(
{ref:"Matthew 1:25", tags:"Mary virgin brothers of Jesus", q:"And knew her not till she had brought forth her firstborn son: and he called his name JESUS.",
 r:[
  {who:"Catholic and Orthodox",ids:["catholic","orthodox","ethiopian"],t:"\u201cTill\u201d says nothing about afterward. Mary remained a virgin for life; Jesus' \u201cbrothers\u201d are cousins (Catholic view) or Joseph's children from an earlier marriage (Orthodox view)."},
  {who:"Lutheran and Anglican",ids:["lutheran","anglican"],t:"Luther and many early Anglicans held Mary's lifelong virginity; today views vary and neither church requires it."},
  {who:"Most other churches",ids:["reformed","methodist","baptist","pentecostal","nondenom","sda","lds","jw"],t:"Read plainly: Mary and Joseph had a normal marriage after Jesus' birth, and the brothers named in Mark 6:3 were Mary's children. (John Wesley himself held the older view, and Calvin declined to rule on it.)"}
 ]},
{ref:"Matthew 26:26", tags:"communion eucharist lord's supper body bread", q:"Take, eat; this is my body.",
 r:[
  {who:"Catholic and Orthodox",ids:["catholic","orthodox","ethiopian"],t:"Literally true: the bread becomes Christ's body."},
  {who:"Lutheran",ids:["lutheran"],t:"\u201cIs\u201d means is. Christ's body is truly present with the bread, though the bread remains bread."},
  {who:"Anglican and Methodist",ids:["anglican","methodist"],t:"Christ is truly present in the meal, but how is left a mystery."},
  {who:"Reformed",ids:["reformed"],t:"The bread is a sign and seal; believers truly receive Christ spiritually, by faith."},
  {who:"Baptist, Pentecostal, Non-denominational, Adventist",ids:["baptist","pentecostal","nondenom","sda"],t:"\u201cIs\u201d means represents, as when Jesus says \u201cI am the door.\u201d The meal is a memorial."},
  {who:"Latter-day Saints and Witnesses",ids:["lds","jw"],t:"Symbolic emblems. Latter-day Saints use water instead of wine; the New World Translation renders it \u201cThis means my body.\u201d"}
 ]},
{ref:"John 3:5", tags:"born again baptism new birth water spirit", q:"Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God.",
 r:[
  {who:"Liturgical churches",ids:["catholic","orthodox","ethiopian","lutheran","anglican","methodist"],t:"\u201cWater\u201d is baptism. God gives new birth through baptism, joined to the work of the Spirit."},
  {who:"Reformed",ids:["reformed"],t:"Water pictures the Spirit's cleansing (Ezekiel 36:25\u201327). Baptism signs and seals that new birth but does not cause it."},
  {who:"Baptist and Evangelical",ids:["baptist","pentecostal","nondenom","sda"],t:"New birth comes through faith by the Spirit. \u201cWater\u201d is often read as physical birth or the cleansing word; baptism follows as obedience."},
  {who:"Latter-day Saints",ids:["lds"],t:"Baptism by proper priesthood authority and receiving the Holy Ghost are both required, which is why baptism is performed for the dead by proxy."},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"Being \u201cborn again\u201d applies only to the 144,000 anointed who will rule in heaven."}
 ]},
{ref:"Acts 2:38", tags:"baptism repent forgiveness holy spirit", q:"Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins, and ye shall receive the gift of the Holy Ghost.",
 r:[
  {who:"Catholic, Orthodox, Lutheran, Anglican",ids:["catholic","orthodox","ethiopian","lutheran","anglican"],t:"Baptism really gives forgiveness of sins and the gift of the Spirit."},
  {who:"Reformed and Methodist",ids:["reformed","methodist"],t:"Baptism is God's sign and means of grace, joined to repentance and faith, but faith is what receives forgiveness."},
  {who:"Baptist and Evangelical",ids:["baptist","nondenom","sda"],t:"Forgiveness comes through repentance and faith. Baptism follows as the public response, not the cause."},
  {who:"Pentecostal",ids:["pentecostal"],t:"Points to receiving the Spirit, often as a further experience with speaking in tongues. Oneness Pentecostals see the phrase \u201cin the name of Jesus Christ\u201d as the required baptismal formula."},
  {who:"Latter-day Saints and Witnesses",ids:["lds","jw"],t:"Baptism by immersion is an essential step of obedience. Latter-day Saints receive the Holy Ghost by the laying on of hands afterward."}
 ]},
{ref:"Ephesians 2:8-9", tags:"grace faith works salvation saved", q:"For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.",
 r:[
  {who:"Lutheran, Anglican, Baptist, Evangelical",ids:["lutheran","anglican","baptist","pentecostal","nondenom"],t:"Salvation is wholly a gift received by faith. Works add nothing; they follow as thankfulness."},
  {who:"Reformed",ids:["reformed"],t:"Even faith itself is God's gift, given to those he chose."},
  {who:"Methodist and Adventist",ids:["methodist","sda"],t:"Grace comes first and enables a free response of faith, which shows itself in obedience."},
  {who:"Catholic and Orthodox",ids:["catholic","orthodox","ethiopian"],t:"Fully agree salvation begins with unearned grace. The \u201cworks\u201d excluded are efforts to earn it; good works done by grace (verse 10) still matter."},
  {who:"Latter-day Saints and Witnesses",ids:["lds","jw"],t:"Grace makes salvation possible and can't be earned, but faithful obedience and keeping covenants are required to receive it fully."}
 ]},
{ref:"2 Timothy 3:16", tags:"scripture inspiration authority inerrancy bible", q:"All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness.",
 r:[
  {who:"Evangelical Protestants",ids:["baptist","pentecostal","nondenom","sda"],t:"Scripture is God-breathed, without error, and sufficient as the final rule for faith."},
  {who:"Historic Protestants",ids:["lutheran","reformed","anglican","methodist"],t:"Scripture is inspired and the supreme authority. Views on strict inerrancy vary, especially in mainline bodies."},
  {who:"Catholic and Orthodox",ids:["catholic","orthodox","ethiopian"],t:"Fully inspired, but the verse calls Scripture profitable, not the only authority. Scripture was given within the Church and its Tradition."},
  {who:"Latter-day Saints",ids:["lds"],t:"Inspired as originally given, though errors crept in through transmission. \u201cAll scripture\u201d also includes modern revelation."},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"The whole Bible is inspired and authoritative, and it is the basis for all teaching."}
 ]},
{ref:"2 Thessalonians 2:15", tags:"tradition oral authority", q:"Therefore, brethren, stand fast, and hold the traditions which ye have been taught, whether by word, or our epistle.",
 r:[
  {who:"Catholic and Orthodox",ids:["catholic","orthodox","ethiopian"],t:"Apostolic teaching was handed down both in writing and by word of mouth. This supports Sacred or Holy Tradition alongside Scripture."},
  {who:"Lutheran, Anglican, Methodist",ids:["lutheran","anglican","methodist"],t:"The early church's tradition is a valuable guide, but always tested by and subordinate to Scripture."},
  {who:"Reformed and Evangelical",ids:["reformed","baptist","pentecostal","nondenom","sda"],t:"The apostles' oral teaching is now preserved in Scripture. Later traditions have no independent authority."},
  {who:"Latter-day Saints and Witnesses",ids:["lds","jw"],t:"Later church traditions drifted from the apostles' teaching (an apostasy), which is why restoration or recovered truth was needed."}
 ]},
{ref:"1 Thessalonians 4:17", tags:"rapture second coming end times caught up", q:"Then we which are alive and remain shall be caught up together with them in the clouds, to meet the Lord in the air: and so shall we ever be with the Lord.",
 r:[
  {who:"Dispensational evangelicals",ids:["baptist","pentecostal","nondenom"],t:"The rapture: believers are taken up before a seven-year tribulation, with Christ's visible return coming later."},
  {who:"Historic churches",ids:["catholic","orthodox","ethiopian","lutheran","reformed","anglican","methodist"],t:"Describes Christ's one visible return. Believers rise to meet him and escort him back, like citizens greeting a returning king."},
  {who:"Seventh-day Adventist",ids:["sda"],t:"Christ's return is visible and loud, not secret. The saved are taken to heaven for the millennium."},
  {who:"Latter-day Saints",ids:["lds"],t:"The righteous will be caught up to meet Christ at his return, then reign with him on earth."},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"Applies to the remaining anointed, who will be taken to heaven to join Christ."}
 ]},
{ref:"1 Corinthians 15:29", tags:"baptism for the dead proxy temple", q:"Else what shall they do which are baptized for the dead, if the dead rise not at all? why are they then baptized for the dead?",
 r:[
  {who:"Latter-day Saints",ids:["lds"],t:"Evidence that early Christians practiced proxy baptism, restored today in temples so the dead can accept the gospel."},
  {who:"Most other churches",ids:["catholic","orthodox","ethiopian","lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda","jw"],t:"A hard verse. Paul mentions a practice (possibly by others) without endorsing it, only to argue that the resurrection is real. None of these churches practice it."}
 ]},
{ref:"James 5:14", tags:"anointing sick healing oil sacrament", q:"Is any sick among you? let him call for the elders of the church; and let them pray over him, anointing him with oil in the name of the Lord.",
 r:[
  {who:"Catholic and Orthodox",ids:["catholic","orthodox","ethiopian"],t:"The basis of a sacrament: Anointing of the Sick (Catholic) or Holy Unction (Orthodox), bringing grace, forgiveness, and sometimes healing."},
  {who:"Lutheran, Anglican, Methodist",ids:["lutheran","anglican","methodist"],t:"A valued rite of prayer and anointing, though not counted among the sacraments."},
  {who:"Pentecostal",ids:["pentecostal"],t:"A direct pattern for divine healing today: anoint, pray in faith, and expect God to heal."},
  {who:"Latter-day Saints",ids:["lds"],t:"Elders give priesthood blessings to the sick using consecrated oil."},
  {who:"Reformed, Baptist, Evangelical, Adventist, Witnesses",ids:["reformed","baptist","nondenom","sda","jw"],t:"Elders may pray and anoint; the oil is mainly symbolic (or medicine in its day). Witnesses emphasize prayer and spiritual help rather than anointing."}
 ]},
{ref:"Ecclesiastes 9:5", tags:"death soul afterlife sleep hell", q:"For the living know that they shall die: but the dead know not any thing.",
 r:[
  {who:"Adventist and Witnesses",ids:["sda","jw"],t:"Taken plainly: the dead are unconscious, with no immortal soul, until the resurrection."},
  {who:"Most churches",ids:["catholic","orthodox","ethiopian","lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom"],t:"Spoken from an earthly, \u201cunder the sun\u201d view. The soul lives on after death (Luke 23:43, Philippians 1:23)."},
  {who:"Latter-day Saints",ids:["lds"],t:"Describes earthly knowledge. Spirits continue consciously in a spirit world while awaiting resurrection."}
 ]}
);

// Debated passages, set 2. Each reading may carry s:[[traditionId, docKey, "section"]],
// which points at an official document listed in CSRC (sources.js).
P.push(
{ref:"Genesis 1:26", q:"And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth.", tags:"Trinity image likeness God body",
 r:[
  {who:"Most churches",ids:["catholic","orthodox","ethiopian","lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda"],t:"The plural “us” was read by the early Church Fathers as a first hint of the Trinity, made clear only in the New Testament. (Some scholars read it instead as God speaking with the heavenly court, or as a plural of majesty.) The “image” is spiritual: reason, freedom and the capacity to know God, not a body."},
  {who:"Orthodox emphasis",ids:["orthodox","ethiopian"],t:"Many Fathers distinguished the “image” we are given from the “likeness” we grow into. The Christian life is that growth toward God, called theosis."},
  {who:"Latter-day Saints",ids:["lds"],t:"Taken more literally: God the Father has a glorified body of flesh and bone, and humans are his spirit children, made in his image.",s:[["lds","dc","130:22"]]},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"Jehovah is speaking to his firstborn Son, whom he created first and who worked beside him in creating everything else (Proverbs 8:30). It is not evidence of a Trinity."}
 ]},
{ref:"Genesis 3:15", q:"And I will put enmity between thee and the woman, and between thy seed and her seed; it shall bruise thy head, and thou shalt bruise his heel.", tags:"Mary woman seed protoevangelium new Eve crush bruise",
 r:[
  {who:"Catholic",ids:["catholic"],t:"The “first gospel” (Protoevangelium): the first promise of a Redeemer. The woman points to Mary, the “new Eve,” and her offspring to Christ. The Latin Vulgate, followed by the Douay-Rheims, reads “she shall crush”; modern Catholic Bibles follow the Hebrew, which refers to the offspring.",s:[["catholic","ccc","¶¶410–411"]]},
  {who:"Orthodox",ids:["orthodox","ethiopian"],t:"Also the first gospel promise. From the second century (Irenaeus) the Fathers contrasted Eve's disobedience with Mary's obedience, and the hymns of the Church praise the Theotokos as the one through whom the serpent's defeat came."},
  {who:"Most Protestants",ids:["lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda"],t:"The first promise of the gospel, fulfilled in Christ, the woman's offspring, who defeats Satan at the cross. The woman is Eve; Protestants don't read a reference to Mary here, and point out that the Hebrew pronoun refers to the offspring."},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"The “woman” is God's heavenly organization of spirit creatures, and the “seed” is Christ together with those who rule with him."}
 ]},
{ref:"Exodus 20:4-5", q:"Thou shalt not make unto thee any graven image, or any likeness of any thing that is in heaven above, or that is in the earth beneath, or that is in the water under the earth: Thou shalt not bow down thyself to them, nor serve them: for I the LORD thy God am a jealous God, visiting the iniquity of the fathers upon the children unto the third and fourth generation of them that hate me;", tags:"images icons statues idols second commandment worship",
 r:[
  {who:"Catholic and Orthodox",ids:["catholic","orthodox","ethiopian"],t:"Forbids idols, not all religious images: God himself ordered carved cherubim for the Ark (Exodus 25:18). Because God became visible in Christ, he may be pictured, and honor shown to an image passes to the person it shows. Catholics and Eastern Orthodox follow the Second Council of Nicaea (787) on this; Ethiopian churches are likewise filled with icons and paintings.",s:[["catholic","ccc","¶¶2129–2132"]]},
  {who:"Lutheran",ids:["lutheran"],t:"Lutherans, like Catholics, count this as part of the First Commandment. Images are allowed for teaching and devotion as long as they are not worshipped; Luther opposed the smashing of church art."},
  {who:"Anglican and Methodist",ids:["anglican","methodist"],t:"Religious art and crosses are common, but the worship and adoration of images is rejected.",s:[["anglican","art","XXII"],["methodist","aor","XIV"]]},
  {who:"Reformed",ids:["reformed"],t:"A separate Second Commandment forbidding any image of God, including pictures of Christ; God is to be worshipped only as he has commanded.",s:[["reformed","crc","Heidelberg Q&A 96–98"],["reformed","wcf","21.1"]]},
  {who:"Baptist, Pentecostal, Non-denominational",ids:["baptist","pentecostal","nondenom"],t:"Images aren't used as objects of devotion, and worship spaces are usually plain, though few treat a picture of Jesus in a children's Bible as forbidden."},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"No images are used in worship, and the cross is rejected; Witnesses believe Jesus died on a single upright stake."}
 ]},
{ref:"Leviticus 11:7", q:"And the swine, though he divide the hoof, and be clovenfooted, yet he cheweth not the cud; he is unclean to you.", tags:"pork pig food laws clean unclean diet",
 r:[
  {who:"Ethiopian Orthodox",ids:["ethiopian"],t:"The Old Testament food laws are still kept: Ethiopian Orthodox Christians don't eat pork.",s:[["ethiopian","cnewa",""]]},
  {who:"Seventh-day Adventist",ids:["sda"],t:"The distinction between clean and unclean meats still stands as a matter of health and faithfulness; Adventists avoid pork and shellfish, and many are vegetarian.",s:[["sda","fb","22"]]},
  {who:"Most other churches",ids:["catholic","orthodox","lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","lds","jw"],t:"The food laws belonged to the old covenant and were fulfilled in Christ. Jesus “declared all foods clean” (Mark 7:19, in most modern translations) and Peter's vision taught the same (Acts 10:15). Fasting rules (Orthodox, Catholic) and health codes (the Latter-day Saint Word of Wisdom) are separate matters."}
 ]},
{ref:"Psalms 51:5", q:"Behold, I was shapen in iniquity; and in sin did my mother conceive me.", tags:"original sin ancestral sin born conceived",
 r:[
  {who:"Catholic",ids:["catholic"],t:"Every human inherits original sin: not a personal fault but a fallen state, deprived of the holiness Adam lost, which baptism takes away. (Mary was preserved from it by a unique grace.)",s:[["catholic","ccc","¶¶396–409"]]},
  {who:"Orthodox",ids:["orthodox","ethiopian"],t:"We inherit the consequences of Adam's sin, death and a tendency toward sin, but not Adam's personal guilt. David is lamenting the sinful world he was born into, not saying his mother sinned by conceiving him."},
  {who:"Lutheran and Reformed",ids:["lutheran","reformed"],t:"Proof of inherited sin that is truly sin, bringing guilt and condemnation from birth.",s:[["lutheran","ac","II"],["reformed","wcf","6.3"]]},
  {who:"Anglican and Methodist",ids:["anglican","methodist"],t:"Original sin is the corruption of every person's nature. Methodists add that God's “prevenient” grace goes before everyone, making a response to God possible.",s:[["methodist","aor","VII"]]},
  {who:"Baptist, Pentecostal, Non-denominational",ids:["baptist","pentecostal","nondenom"],t:"All inherit a nature inclined to sin. Many Baptists hold that people become guilty transgressors once they are capable of moral choice.",s:[["baptist","bfm","III"]]},
  {who:"Latter-day Saints",ids:["lds"],t:"People are punished for their own sins, not for Adam's. Little children are innocent and need no baptism.",s:[["lds","aof","2"]]},
  {who:"Adventist and Witnesses",ids:["sda","jw"],t:"Everyone inherits imperfection and death from Adam, which is why all need Christ's ransom."}
 ]},
{ref:"Psalms 82:6", q:"I have said, Ye are gods; and all of you are children of the most High.", tags:"ye are gods theosis deification exaltation",
 r:[
  {who:"Many Protestants",ids:["lutheran","reformed","baptist","pentecostal","nondenom"],t:"“Gods” means human judges, who exercised God's authority and are condemned here for injustice (“ye shall die like men,” v. 7). Jesus quotes the verse in John 10:34 to answer a charge of blasphemy."},
  {who:"Orthodox and Catholic",ids:["orthodox","ethiopian","catholic"],t:"Also points to the Christian calling to become “partakers of the divine nature” (2 Peter 1:4) by grace. Athanasius wrote that God became man so that we might become god: deification (theosis), never becoming God by nature.",s:[["catholic","ccc","¶460"]]},
  {who:"Anglican and Methodist",ids:["anglican","methodist"],t:"Usually read as about human judges, though both traditions also speak of sharing in God's life through holiness (Wesley's “perfect love”)."},
  {who:"Latter-day Saints",ids:["lds"],t:"Supports exaltation: faithful children of God can progress to become like their Heavenly Father.",s:[["lds","dc","132:20"]]},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"“Gods” means mighty ones: here, human judges in Israel."}
 ]},
{ref:"Isaiah 53:5", q:"But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.", tags:"healing stripes atonement divine healing sick",
 r:[
  {who:"Pentecostal",ids:["pentecostal"],t:"Divine healing is provided in the atonement, so believers may pray for bodily healing now. Matthew 8:16–17 applies this chapter to Jesus' healings.",s:[["pentecostal","ag","12"]]},
  {who:"Catholic and Orthodox",ids:["catholic","orthodox","ethiopian"],t:"First about healing from sin (1 Peter 2:24 quotes it that way). God still heals bodies, and the Church prays for the sick, especially in the anointing of the sick."},
  {who:"Most other Protestants",ids:["lutheran","reformed","anglican","methodist","baptist","nondenom","sda"],t:"Healing from sin and its penalty. God may heal bodies in answer to prayer, but complete healing is promised at the resurrection, not guaranteed now."}
 ]},
{ref:"Daniel 8:14", q:"And he said unto me, Unto two thousand and three hundred days; then shall the sanctuary be cleansed.", tags:"2300 days 1844 sanctuary investigative judgment",
 r:[
  {who:"Seventh-day Adventist",ids:["sda"],t:"The 2,300 days are years, counted from 457 BC to 1844, when Christ began the final phase of his ministry in the heavenly sanctuary: the pre-Advent (“investigative”) judgment.",s:[["sda","fb","24"]]},
  {who:"Most other churches",ids:["catholic","orthodox","ethiopian","lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom"],t:"Fulfilled in the second century BC, when Antiochus IV desecrated the Temple (167 BC) and the Maccabees rededicated it (164 BC), the event behind Hanukkah. The “2,300 evenings and mornings” may mean 1,150 days of missed sacrifices. Some dispensationalists also expect an end-time fulfillment."}
 ]},
{ref:"Malachi 3:10", q:"Bring ye all the tithes into the storehouse, that there may be meat in mine house, and prove me now herewith, saith the LORD of hosts, if I will not open you the windows of heaven, and pour you out a blessing, that there shall not be room enough to receive it.", tags:"tithe tithing giving money ten percent",
 r:[
  {who:"Latter-day Saints",ids:["lds"],t:"Tithing, one tenth of one's increase, is a commandment and is required to enter the temple.",s:[["lds","dc","119"]]},
  {who:"Seventh-day Adventist",ids:["sda"],t:"Members return a tithe to God as part of faithful stewardship.",s:[["sda","fb","21"]]},
  {who:"Baptist, Pentecostal, Non-denominational",ids:["baptist","pentecostal","nondenom"],t:"Many pastors teach the tithe as a standard for giving; others treat it as Old Testament law and point to the New Testament's call to generous, cheerful giving (2 Corinthians 9:7)."},
  {who:"Catholic",ids:["catholic"],t:"No fixed percentage is required. Catholics are obliged to help provide for the Church's needs, each according to their ability.",s:[["catholic","ccc","¶2043"]]},
  {who:"Orthodox and mainline Protestants",ids:["orthodox","ethiopian","lutheran","reformed","anglican","methodist"],t:"Tithing is often encouraged as a goal for proportional giving, not imposed as law."},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"No tithing and no collections; the work is funded by anonymous voluntary donations."}
 ]},
{ref:"2 Maccabees 12:46", qv:"dr", q:"It is therefore a holy and wholesome thought to pray for the dead, that they may be loosed from sins.", tags:"purgatory prayer for the dead deuterocanonical apocrypha",
 r:[
  {who:"Catholic",ids:["catholic"],t:"Shows the ancient practice of praying for the dead so they may be freed from sin, which supports the doctrine of purgatory.",s:[["catholic","ccc","¶1032"]]},
  {who:"Orthodox",ids:["orthodox","ethiopian"],t:"Part of the Old Testament, and the Church prays for the departed in memorial services. The Orthodox don't accept the Latin teaching on purgatory, though, and leave the state of the dead to God's mercy."},
  {who:"Protestants",ids:["lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda"],t:"Not in the Protestant canon, so it doesn't establish doctrine. Anglicans read these books “for example of life and instruction of manners” only. Some Anglicans and Lutherans still pray for the departed; most Protestants don't.",s:[["anglican","art","VI"]]},
  {who:"Latter-day Saints",ids:["lds"],t:"The Apocrypha contains many true things and many that are not; it is useful to those enlightened by the Spirit but needn't be translated as scripture.",s:[["lds","dc","91"]]},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"Not inspired scripture. The dead are unconscious, so prayers for them have no effect."}
 ]},
{ref:"Matthew 6:7", q:"But when ye pray, use not vain repetitions, as the heathen do: for they think that they shall be heard for their much speaking.", tags:"vain repetitions prayer rosary liturgy rote",
 r:[
  {who:"Catholic and Orthodox",ids:["catholic","orthodox","ethiopian"],t:"Condemns empty babbling meant to wear God down, not repetition itself: Jesus prayed “the same words” three times in Gethsemane (Matthew 26:44), and the angels repeat “Holy, holy, holy” (Revelation 4:8). The rosary and the Jesus Prayer are repeated prayers of the heart."},
  {who:"Lutheran, Anglican, Methodist",ids:["lutheran","anglican","methodist"],t:"Written and repeated prayers, such as the liturgy or the Book of Common Prayer, are good when prayed sincerely."},
  {who:"Reformed",ids:["reformed"],t:"Warns against thinking that many words earn a hearing. Many Reformed churches use set prayers; others prefer free prayer led by the minister."},
  {who:"Baptist, Pentecostal, Non-denominational",ids:["baptist","pentecostal","nondenom"],t:"Often cited for spontaneous prayer from the heart instead of fixed formulas, and sometimes against the rosary, though most still pray the Lord's Prayer."}
 ]},
{ref:"Matthew 12:32", q:"And whosoever speaketh a word against the Son of man, it shall be forgiven him: but whosoever speaketh against the Holy Ghost, it shall not be forgiven him, neither in this world, neither in the world to come.", tags:"purgatory world to come forgiveness unforgivable sin",
 r:[
  {who:"Catholic",ids:["catholic"],t:"Implies that some sins can be forgiven “in the world to come,” one of the passages behind the teaching on purgatory.",s:[["catholic","ccc","¶1031"]]},
  {who:"Orthodox",ids:["orthodox","ethiopian"],t:"Supports praying for the departed and trusting God's mercy after death, without a defined doctrine of purgatory."},
  {who:"Protestants",ids:["lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda","jw"],t:"A Jewish way of saying “never,” as Mark 3:29 puts it: “hath never forgiveness.” The verse is about the unforgivable sin, not an afterlife cleansing."}
 ]},
{ref:"Matthew 15:3", q:"But he answered and said unto them, Why do ye also transgress the commandment of God by your tradition?", tags:"tradition traditions of men scripture authority",
 r:[
  {who:"Catholic and Orthodox",ids:["catholic","orthodox","ethiopian"],t:"Jesus condemns human customs that cancel God's commands, not the apostolic Tradition Paul tells believers to hold (2 Thessalonians 2:15). Scripture and Tradition flow from the same source.",s:[["catholic","dv","9–10"]]},
  {who:"Protestants",ids:["lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda"],t:"Every tradition must be tested by Scripture, which alone is the final authority; nothing may be added to it by “traditions of men.”",s:[["reformed","wcf","1.6"],["anglican","art","VI"]]},
  {who:"Latter-day Saints",ids:["lds"],t:"The “traditions of men” crept into Christianity after the apostles, which is why a restoration through modern prophets was needed."}
 ]},
{ref:"Matthew 19:9", q:"And I say unto you, Whosoever shall put away his wife, except it be for fornication, and shall marry another, committeth adultery: and whoso marrieth her which is put away doth commit adultery.", tags:"divorce remarriage adultery exception annulment",
 r:[
  {who:"Catholic",ids:["catholic"],t:"A valid sacramental marriage can't be dissolved. The exception (Greek porneia) is read as referring to unlawful unions. An annulment declares that a valid marriage never existed; remarriage after divorce without one keeps a person from Communion.",s:[["catholic","ccc","¶¶1650, 2382–2386"]]},
  {who:"Orthodox",ids:["orthodox"],t:"Marriage is meant to be lifelong, but the Church may permit a second, and even a third, marriage after divorce, with a penitential service, as an act of pastoral mercy (oikonomia)."},
  {who:"Reformed and Lutheran",ids:["reformed","lutheran"],t:"Adultery, and willful desertion (1 Corinthians 7:15), break the marriage; the innocent party may divorce and remarry.",s:[["reformed","wcf","24.5–6"]]},
  {who:"Anglican and Methodist",ids:["anglican","methodist"],t:"Divorce is a tragedy but sometimes permitted; most provinces and conferences now allow remarriage in church at the clergy's discretion."},
  {who:"Baptist, Pentecostal, Non-denominational",ids:["baptist","pentecostal","nondenom"],t:"Divorce is allowed for adultery and often for desertion. Views on remarriage vary by congregation, and many won't call a divorced man as pastor."},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"Only sexual immorality frees a person to divorce and remarry."},
  {who:"Latter-day Saints",ids:["lds"],t:"Divorce is discouraged but permitted, and a temple sealing can be cancelled by Church authority."}
 ]},
{ref:"Matthew 23:9", q:"And call no man your father upon the earth: for one is your Father, which is in heaven.", tags:"call no man father priest title",
 r:[
  {who:"Catholic, Orthodox, Anglican",ids:["catholic","orthodox","ethiopian","anglican"],t:"A warning against treating any human teacher as the ultimate source of truth, not a ban on the word: Paul calls himself a father (1 Corinthians 4:15) and Stephen addresses “fathers” (Acts 7:2). Calling priests “Father” is about spiritual fatherhood."},
  {who:"Many Protestants",ids:["lutheran","reformed","methodist","baptist","pentecostal","nondenom","sda"],t:"Ministers are generally called Pastor or Reverend instead; some cite this verse against the Catholic title, though no one applies it to their own dad."},
  {who:"Witnesses and Latter-day Saints",ids:["jw","lds"],t:"Religious titles are avoided; Witnesses call one another “Brother” and “Sister,” and Latter-day Saint leaders are called Bishop, Elder or President."}
 ]},
{ref:"Matthew 25:46", q:"And these shall go away into everlasting punishment: but the righteous into life eternal.", tags:"hell eternal punishment annihilation everlasting",
 r:[
  {who:"Most churches",ids:["catholic","orthodox","ethiopian","lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom"],t:"Punishment and life are both “eternal” (the same Greek word): those who finally reject God suffer endless separation from him. (Some Orthodox writers hope all may be saved, and some evangelicals, like John Stott, leaned toward annihilation.)",s:[["catholic","ccc","¶¶1033–1037"],["reformed","wcf","33.2"],["lutheran","ac","XVII"],["pentecostal","ag","15"]]},
  {who:"Seventh-day Adventist",ids:["sda"],t:"The punishment is eternal in its result: the wicked are destroyed forever, not tormented forever.",s:[["sda","fb","27"]]},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"“Everlasting cutting-off” (New World Translation): the wicked cease to exist. There is no fiery hell.",s:[["jw","b",""]]},
  {who:"Latter-day Saints",ids:["lds"],t:"“Eternal punishment” is God's punishment, named for him, not necessarily endless. Nearly everyone receives a kingdom of glory; only the “sons of perdition” are cast out.",s:[["lds","dc","19:10–12; 76"]]}
 ]},
{ref:"Matthew 28:19", q:"Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost:", tags:"Trinity baptism formula name Father Son Holy Ghost oneness",
 r:[
  {who:"Trinitarian churches",ids:["catholic","orthodox","ethiopian","lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda"],t:"One “name” (singular) shared by Father, Son and Holy Spirit: one God in three persons. Baptism with these words is recognized across these churches, even when they disagree about much else.",s:[["pentecostal","ag","2"],["sda","fb","2"]]},
  {who:"Oneness Pentecostals",ids:["pentecostal"],t:"Groups such as the United Pentecostal Church (not the Assemblies of God) teach that the one “name” is Jesus and baptize “in Jesus' name” (Acts 2:38)."},
  {who:"Latter-day Saints",ids:["lds"],t:"Baptism uses the words Father, Son and Holy Ghost, understood as three separate beings united in purpose. The Catholic Church ruled in 2001 that it can't recognize these baptisms because of this different understanding.",s:[["lds","dc","20:73"],["catholic","cdf01",""]]},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"All three are named, but only Jehovah is God; Jesus is his Son, and the holy spirit is God's active force, not a person."}
 ]},
{ref:"Mark 10:14", q:"But when Jesus saw it, he was much displeased, and said unto them, Suffer the little children to come unto me, and forbid them not: for of such is the kingdom of God.", tags:"infant baptism children dedication",
 r:[
  {who:"Churches that baptize infants",ids:["catholic","orthodox","ethiopian","lutheran","reformed","anglican","methodist"],t:"Children belong to the kingdom and shouldn't be kept from Christ, so they should be baptized. Whole households were baptized in Acts (16:15, 33). Ethiopian Orthodox baptize at 40 days for boys and 80 for girls.",s:[["lutheran","ac","IX"],["reformed","wcf","28.4"],["anglican","art","XXVII"],["ethiopian","mk",""]]},
  {who:"Baptist, Pentecostal, Non-denominational, Adventist",ids:["baptist","pentecostal","nondenom","sda"],t:"Jesus blessed the children; he didn't baptize them. Baptism follows a person's own faith, so many churches hold a dedication service for babies instead."},
  {who:"Latter-day Saints",ids:["lds"],t:"Little children are saved through Christ and aren't accountable until age eight, when they may be baptized.",s:[["lds","dc","68:25–27"]]},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"Baptism is for those old enough to understand and dedicate themselves to Jehovah."}
 ]},
{ref:"Mark 16:17-18", q:"And these signs shall follow them that believe; In my name shall they cast out devils; they shall speak with new tongues; They shall take up serpents; and if they drink any deadly thing, it shall not hurt them; they shall lay hands on the sick, and they shall recover.", tags:"signs tongues healing snakes gifts cessationism",
 r:[
  {who:"About the text",ids:[],t:"Mark 16:9–20 is missing from the two oldest complete Greek manuscripts (Codex Sinaiticus and Codex Vaticanus). Catholics and Orthodox receive it as canonical; many modern Protestant Bibles print it with a note."},
  {who:"Pentecostal",ids:["pentecostal"],t:"These signs continue today: speaking in tongues and healing the sick are for every generation. (Snake handling is practiced only by a few small independent churches; the Assemblies of God and other major Pentecostal bodies reject it.)",s:[["pentecostal","ag","8, 12"]]},
  {who:"Catholic and Orthodox",ids:["catholic","orthodox","ethiopian"],t:"Miracles still happen, especially through the prayers of the saints, but these signs were given first to confirm the apostles' preaching. The Catholic Charismatic Renewal welcomes gifts like tongues."},
  {who:"Reformed and many Baptists",ids:["reformed","baptist"],t:"Many are cessationists: the miraculous sign-gifts confirmed the apostles' message and ended with them. God still heals in answer to prayer."},
  {who:"Latter-day Saints",ids:["lds"],t:"Gifts like tongues, prophecy, visions and healing belong to the restored Church today.",s:[["lds","aof","7"]]}
 ]},
{ref:"Luke 1:28", q:"And the angel came in unto her, and said, Hail, thou that art highly favoured, the Lord is with thee: blessed art thou among women.", tags:"Mary full of grace highly favoured immaculate conception Hail Mary",
 r:[
  {who:"Catholic",ids:["catholic"],t:"“Full of grace” (Douay-Rheims) translates a Greek perfect participle, kecharitōmenē: someone already and lastingly filled with grace. Mary was preserved from original sin from her conception, defined as dogma in 1854. The verse opens the Hail Mary.",s:[["catholic","ccc","¶¶490–493"]]},
  {who:"Orthodox",ids:["orthodox","ethiopian"],t:"Mary is the all-holy Theotokos, honored above the angels, and the angel's words are sung constantly in worship. The Eastern Orthodox generally don't accept the Catholic dogma of the Immaculate Conception, because they understand inherited sin differently."},
  {who:"Lutheran and Anglican",ids:["lutheran","anglican"],t:"Mary is highly honored as the one God chose. Luther kept a deep devotion to her, but neither church teaches the Immaculate Conception."},
  {who:"Most other Protestants",ids:["reformed","methodist","baptist","pentecostal","nondenom","sda","lds","jw"],t:"“Highly favoured” (KJV): Mary received God's grace, as all believers do (the same Greek verb appears in Ephesians 1:6). She is a model of faith, not a source of grace."}
 ]},
{ref:"Luke 1:48", q:"For he hath regarded the low estate of his handmaiden: for, behold, from henceforth all generations shall call me blessed.", tags:"Mary blessed all generations devotion Magnificat",
 r:[
  {who:"Catholic and Orthodox",ids:["catholic","orthodox","ethiopian"],t:"Fulfilled every time the Church honors Mary in feasts, hymns and prayers. Ethiopian Orthodox devotion to Mary (Maryam) is especially rich, with many feasts throughout the year."},
  {who:"Lutheran and Anglican",ids:["lutheran","anglican"],t:"The Magnificat is sung daily at Vespers and Evensong, and their calendars keep feasts of Mary, honoring her as the model believer."},
  {who:"Other Protestants",ids:["reformed","methodist","baptist","pentecostal","nondenom","sda"],t:"We call her blessed by honoring her faith and obedience, not by praying to her."},
  {who:"Latter-day Saints and Witnesses",ids:["lds","jw"],t:"Mary is respected as a faithful woman chosen to bear the Son of God, without devotion directed to her."}
 ]},
{ref:"Luke 16:23", q:"And in hell he lift up his eyes, being in torments, and seeth Abraham afar off, and Lazarus in his bosom.", tags:"rich man Lazarus hell Hades afterlife parable soul",
 r:[
  {who:"Most churches",ids:["catholic","orthodox","ethiopian","lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom"],t:"Whether parable or not, it teaches that the dead are conscious and their state is fixed before the final resurrection. Catholics connect “Abraham's bosom” with the place where the righteous waited for Christ.",s:[["catholic","ccc","¶633"]]},
  {who:"Adventist and Witnesses",ids:["sda","jw"],t:"A parable using popular imagery to make a point, not a description of the afterlife; the dead are unconscious until the resurrection.",s:[["sda","fb","26"]]},
  {who:"Latter-day Saints",ids:["lds"],t:"After death, spirits go to a spirit world: paradise for the righteous and “spirit prison” for others, where the gospel is still preached (1 Peter 3:19)."}
 ]},
{ref:"Luke 23:43", q:"And Jesus said unto him, Verily I say unto thee, To day shalt thou be with me in paradise.", tags:"thief paradise today soul sleep comma",
 r:[
  {who:"Most churches",ids:["catholic","orthodox","ethiopian","lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom"],t:"The thief would be with Christ that very day, which shows that souls are conscious with God after death.",s:[["reformed","wcf","32.1"]]},
  {who:"Adventist and Witnesses",ids:["sda","jw"],t:"Greek has no commas, so the sentence can read “I tell you today, you will be with me in Paradise” (as in the New World Translation): a promise for the future resurrection.",s:[["sda","fb","26"]]},
  {who:"Latter-day Saints",ids:["lds"],t:"“Paradise” is the spirit world, where the righteous wait for the resurrection, not heaven itself."}
 ]},
{ref:"John 8:58", q:"Jesus said unto them, Verily, verily, I say unto you, Before Abraham was, I am.", tags:"I am Jesus divinity Jehovah before Abraham",
 r:[
  {who:"Trinitarian churches",ids:["catholic","orthodox","ethiopian","lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda"],t:"Jesus takes God's own name, “I AM” (Exodus 3:14), which is why his hearers immediately tried to stone him (v. 59)."},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"“Before Abraham came into existence, I have been” (New World Translation): Jesus existed in heaven before Abraham, but he is not Jehovah."},
  {who:"Latter-day Saints",ids:["lds"],t:"Jesus is identifying himself as Jehovah, the God of the Old Testament, who is the premortal Christ, distinct from God the Father."}
 ]},
{ref:"John 10:30", q:"I and my Father are one.", tags:"one Trinity Godhead unity Father Son",
 r:[
  {who:"Trinitarian churches",ids:["catholic","orthodox","ethiopian","lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda"],t:"One in being, not one person: the Greek “one” is neuter (“one thing”), not masculine (“one person”). Father and Son are distinct yet share the one divine nature."},
  {who:"Oneness Pentecostals",ids:["pentecostal"],t:"Jesus is the Father revealed in the flesh, one God in different manifestations rather than three persons."},
  {who:"Latter-day Saints",ids:["lds"],t:"One in purpose: the Father and the Son are separate beings, each with a glorified body.",s:[["lds","dc","130:22"]]},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"United in purpose, the way Jesus prays that his disciples may “be one” (John 17:21–22)."}
 ]},
{ref:"John 14:28", q:"Ye have heard how I said unto you, I go away, and come again unto you. If ye loved me, ye would rejoice, because I said, I go unto the Father: for my Father is greater than I.", tags:"Father greater than I Trinity subordination",
 r:[
  {who:"Trinitarian churches",ids:["catholic","orthodox","ethiopian","lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda"],t:"Jesus speaks as a man and as the one sent: the Athanasian Creed says he is “equal to the Father as touching his Godhead, and inferior to the Father as touching his manhood.” The Orthodox also see the Father as the source within the Trinity, without being greater in nature."},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"Plain evidence that Jesus is not equal to God: the Father is greater."},
  {who:"Latter-day Saints",ids:["lds"],t:"The Father and the Son are separate beings, and the Father is greater."}
 ]},
{ref:"John 19:26-27", q:"When Jesus therefore saw his mother, and the disciple standing by, whom he loved, he saith unto his mother, Woman, behold thy son! Then saith he to the disciple, Behold thy mother! And from that hour that disciple took her unto his own home.", tags:"Mary mother behold thy mother John cross",
 r:[
  {who:"Catholic",ids:["catholic"],t:"From the cross, Jesus gives Mary as mother to the beloved disciple, and through him to all disciples: she is Mother of the Church.",s:[["catholic","ccc","¶¶963–964"]]},
  {who:"Orthodox",ids:["orthodox","ethiopian"],t:"Honors Mary's place among believers. Like Catholics, the Orthodox also note that Jesus wouldn't need to entrust her to John if she had other sons."},
  {who:"Protestants",ids:["lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda","lds","jw"],t:"Jesus, as a faithful son, provides for his widowed mother. Many also see a picture of the new family formed around the cross."}
 ]},
{ref:"John 20:23", q:"Whose soever sins ye remit, they are remitted unto them; and whose soever sins ye retain, they are retained.", tags:"confession forgive sins absolution priest penance",
 r:[
  {who:"Catholic",ids:["catholic"],t:"Christ gave the apostles and their successors, bishops and priests, the power to forgive sins in his name in the sacrament of Penance.",s:[["catholic","ccc","¶¶1441–1445, 1461"]]},
  {who:"Orthodox",ids:["orthodox","ethiopian"],t:"The mystery of Confession: the penitent confesses to Christ with the priest as witness, and the priest pronounces God's forgiveness. Ethiopian Orthodox each have a “father of confession.”"},
  {who:"Lutheran",ids:["lutheran"],t:"Private confession and absolution are kept and valued; the pastor's word of forgiveness is God's own.",s:[["lutheran","ac","XI, XXV"]]},
  {who:"Anglican",ids:["anglican"],t:"The priest pronounces absolution in public worship, and private confession is available: “all may, none must, some should.”"},
  {who:"Reformed and Evangelical",ids:["reformed","methodist","baptist","pentecostal","nondenom","sda"],t:"The church forgives and retains sins by preaching the gospel and by church discipline. Believers confess directly to God (1 John 1:9); no priest is needed."}
 ]},
{ref:"Acts 8:17", q:"Then laid they their hands on them, and they received the Holy Ghost.", tags:"laying on hands confirmation chrismation Holy Spirit baptism in the Spirit",
 r:[
  {who:"Catholic",ids:["catholic"],t:"Basis for the sacrament of Confirmation, which completes baptismal grace with the gift of the Holy Spirit.",s:[["catholic","ccc","¶1288"]]},
  {who:"Orthodox",ids:["orthodox","ethiopian"],t:"Chrismation, anointing with holy oil, immediately follows baptism, even for infants, who then receive Communion.",s:[["ethiopian","mk",""]]},
  {who:"Lutheran and Anglican",ids:["lutheran","anglican","methodist"],t:"Confirmation is kept as a rite of prayer and affirmation of faith (by a bishop, for Anglicans), but not as a sacrament like baptism.",s:[["anglican","art","XXV"]]},
  {who:"Pentecostal",ids:["pentecostal"],t:"Shows that baptism in the Holy Spirit is a distinct experience after conversion, whose initial evidence is speaking in tongues.",s:[["pentecostal","ag","7–8"]]},
  {who:"Latter-day Saints",ids:["lds"],t:"The gift of the Holy Ghost is given by the laying on of hands by those holding priesthood authority, after baptism.",s:[["lds","aof","4"]]},
  {who:"Reformed and Baptist",ids:["reformed","baptist","nondenom"],t:"A one-time event showing that the Samaritans belonged to the same church as the apostles; today every believer receives the Spirit at conversion."}
 ]},
{ref:"Acts 15:29", q:"That ye abstain from meats offered to idols, and from blood, and from things strangled, and from fornication: from which if ye keep yourselves, ye shall do well. Fare ye well.", tags:"blood transfusion strangled Jerusalem council",
 r:[
  {who:"Jehovah's Witnesses",ids:["jw"],t:"“Abstain from blood” is still binding, so Witnesses refuse blood transfusions, while accepting many non-blood medical alternatives."},
  {who:"Most churches",ids:["catholic","lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda","lds"],t:"A temporary rule so that Jewish and Gentile believers could share meals in peace. It is about eating, not medicine; blood donation is widely encouraged."},
  {who:"Orthodox",ids:["orthodox","ethiopian"],t:"Orthodox canons still forbid eating blood, and Ethiopian Orthodox keep the biblical food laws, but neither applies the rule to transfusions."}
 ]},
{ref:"Acts 20:7", q:"And upon the first day of the week, when the disciples came together to break bread, Paul preached unto them, ready to depart on the morrow; and continued his speech until midnight.", tags:"first day week Sunday Sabbath worship Lord's day",
 r:[
  {who:"Most churches",ids:["catholic","orthodox","lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","lds"],t:"The first Christians gathered on Sunday, the day of the Resurrection, to “break bread.” Sunday is the Lord's Day (Revelation 1:10).",s:[["catholic","ccc","¶¶2174–2176"],["reformed","wcf","21.7"],["baptist","bfm","VIII"]]},
  {who:"Seventh-day Adventist",ids:["sda"],t:"Describes a one-time evening meeting before Paul's departure; it doesn't change the Sabbath, which remains the seventh day.",s:[["sda","fb","20"]]},
  {who:"Ethiopian Orthodox",ids:["ethiopian"],t:"Both days are kept holy: Saturday as the Sabbath and Sunday as the Lord's Day.",s:[["ethiopian","cnewa",""]]},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"Christians aren't bound to any weekly holy day; meetings are held on various days."}
 ]},
{ref:"Romans 3:28", q:"Therefore we conclude that a man is justified by faith without the deeds of the law.", tags:"faith alone sola fide justification works of the law",
 r:[
  {who:"Lutheran",ids:["lutheran"],t:"The heart of the gospel: we are justified freely by grace through faith, not works. Luther translated it “allein durch den Glauben” (“by faith alone”), adding “alone” to bring out the sense, and defended the choice in 1530.",s:[["lutheran","ac","IV"]]},
  {who:"Reformed, Anglican, Methodist",ids:["reformed","anglican","methodist"],t:"Justification by faith only is a “most wholesome doctrine.” Methodists stress that real faith then grows into holiness.",s:[["anglican","art","XI"],["methodist","aor","IX"],["reformed","wcf","11"]]},
  {who:"Baptist, Pentecostal, Non-denominational",ids:["baptist","pentecostal","nondenom","sda"],t:"Salvation is a free gift received by faith in Christ, never earned by good works.",s:[["baptist","bfm","IV"]]},
  {who:"Catholic",ids:["catholic"],t:"“Works of the law” means the Mosaic law. Justification is God's free gift received by faith, given in baptism and alive in charity (Galatians 5:6). In 1999 Catholics and the Lutheran World Federation signed a Joint Declaration on justification; Methodist, Reformed and Anglican bodies later affirmed it.",s:[["catholic","ccc","¶¶1987–1995"]]},
  {who:"Orthodox",ids:["orthodox","ethiopian"],t:"Salvation is by grace through faith working through love, a lifelong union with God (theosis), not a single legal declaration.",s:[["orthodox","dos","Decree 13"]]},
  {who:"Latter-day Saints and Witnesses",ids:["lds","jw"],t:"Paul means the works of the Mosaic law. Salvation comes through Christ's atonement, and faith shows itself in obedience."}
 ]},
{ref:"Romans 6:3-4", q:"Know ye not, that so many of us as were baptized into Jesus Christ were baptized into his death? Therefore we are buried with him by baptism into death: that like as Christ was raised up from the dead by the glory of the Father, even so we also should walk in newness of life.", tags:"baptism immersion burial sprinkling pouring",
 r:[
  {who:"Baptist, Pentecostal, Adventist, Latter-day Saints",ids:["baptist","pentecostal","nondenom","sda","lds"],t:"Baptism must be by full immersion, a picture of burial and resurrection with Christ.",s:[["baptist","bfm","VII"],["pentecostal","ag","6"],["sda","fb","15"],["lds","aof","4"]]},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"Baptism is by full immersion, as a public symbol of dedication to Jehovah."},
  {who:"Orthodox",ids:["orthodox","ethiopian"],t:"Baptism truly unites a person to Christ's death and resurrection, and is done by triple immersion, even for infants.",s:[["ethiopian","mk",""]]},
  {who:"Catholic",ids:["catholic"],t:"Baptism really joins us to Christ's death and rising. Immersion is the fullest sign, but pouring has been used since ancient times and is equally valid.",s:[["catholic","ccc","¶¶1227, 1239"]]},
  {who:"Lutheran, Reformed, Anglican, Methodist",ids:["lutheran","reformed","anglican","methodist"],t:"The meaning is union with Christ; the amount of water doesn't matter. Pouring or sprinkling is proper.",s:[["reformed","wcf","28.3"]]}
 ]},
{ref:"Romans 8:29-30", q:"For whom he did foreknow, he also did predestinate to be conformed to the image of his Son, that he might be the firstborn among many brethren. Moreover whom he did predestinate, them he also called: and whom he called, them he also justified: and whom he justified, them he also glorified.", tags:"predestination election foreknow Calvinism free will",
 r:[
  {who:"Reformed",ids:["reformed"],t:"A “golden chain”: everyone God predestined will be called, justified and glorified. God's choice is unconditional, not based on foreseen faith.",s:[["reformed","wcf","3"],["reformed","crc","Canons of Dort, Head I"]]},
  {who:"Lutheran",ids:["lutheran"],t:"Election to salvation is pure grace and a comfort to believers, but God doesn't predestine anyone to damnation."},
  {who:"Catholic and Orthodox",ids:["catholic","orthodox","ethiopian"],t:"God's plan includes every free human response, which grace frees rather than overrides. God predestines no one to hell.",s:[["catholic","ccc","¶¶600, 1037"]]},
  {who:"Methodist, Pentecostal, Adventist",ids:["methodist","pentecostal","sda"],t:"God foreknew who would freely believe and predestined them to be like Christ (the Arminian view held by John Wesley). Grace can be resisted."},
  {who:"Baptist and Non-denominational",ids:["baptist","nondenom"],t:"Both Calvinist and non-Calvinist views are common. The Baptist Faith and Message calls election God's gracious purpose, consistent with human free agency.",s:[["baptist","bfm","V"]]},
  {who:"Latter-day Saints",ids:["lds"],t:"Foreordination happened in the premortal life, but every person keeps their agency."}
 ]},
{ref:"Romans 10:9", q:"That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.", tags:"confess believe sinner's prayer salvation altar call",
 r:[
  {who:"Baptist, Pentecostal, Non-denominational",ids:["baptist","pentecostal","nondenom"],t:"Personal faith and confession save. Many churches invite people to pray to receive Christ (the “sinner's prayer”), followed by baptism as an act of obedience."},
  {who:"Catholic, Orthodox, Lutheran",ids:["catholic","orthodox","ethiopian","lutheran","anglican"],t:"“Jesus is Lord” was the earliest baptismal confession. Faith and confession belong together with baptism (Romans 6), not as a separate prayer apart from it."},
  {who:"Reformed and Methodist",ids:["reformed","methodist"],t:"True faith in Christ saves; confession is its outward expression. Many are cautious about treating a single prayer as proof of conversion."}
 ]},
{ref:"1 Corinthians 3:15", q:"If any man\u2019s work shall be burned, he shall suffer loss: but he himself shall be saved; yet so as by fire.", tags:"purgatory fire saved yet so as by fire judgment",
 r:[
  {who:"Catholic",ids:["catholic"],t:"Points to a purifying fire after death for those who die in God's grace but still need cleansing: purgatory.",s:[["catholic","ccc","¶¶1030–1032"]]},
  {who:"Orthodox",ids:["orthodox","ethiopian"],t:"Speaks of judgment, and the Church prays for the departed, but the Orthodox reject a defined place or punishment of purgatory."},
  {who:"Protestants",ids:["lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda"],t:"About the testing of church leaders' work at the final judgment: poor work is burned up, though the worker is saved. It isn't about paying for sins after death.",s:[["anglican","art","XXII"],["methodist","aor","XIV"]]}
 ]},
{ref:"1 Corinthians 11:5-6", q:"But every woman that prayeth or prophesieth with her head uncovered dishonoureth her head: for that is even all one as if she were shaven. For if the woman be not covered, let her also be shorn: but if it be a shame for a woman to be shorn or shaven, let her be covered.", tags:"head covering veil women worship",
 r:[
  {who:"Orthodox",ids:["orthodox","ethiopian"],t:"Women commonly cover their heads in church, especially in traditional parishes; Ethiopian Orthodox women wear a white shawl (netela)."},
  {who:"Catholic",ids:["catholic"],t:"Church law required women to cover their heads in church until the 1983 Code of Canon Law dropped the rule. Some women still choose the chapel veil."},
  {who:"Most Protestants",ids:["lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda"],t:"A first-century custom expressing a lasting principle about order and modesty; the covering itself is no longer required, though some conservative churches keep it."}
 ]},
{ref:"1 Corinthians 11:27-29", q:"Wherefore whosoever shall eat this bread, and drink this cup of the Lord, unworthily, shall be guilty of the body and blood of the Lord. But let a man examine himself, and so let him eat of that bread, and drink of that cup. For he that eateth and drinketh unworthily, eateth and drinketh damnation to himself, not discerning the Lord\u2019s body.", tags:"communion closed open table unworthily discerning body",
 r:[
  {who:"Catholic",ids:["catholic"],t:"Anyone conscious of mortal sin must go to confession before Communion. Communion is normally for Catholics, with limited exceptions such as Orthodox Christians.",s:[["catholic","ccc","¶¶1385, 1398–1401"]]},
  {who:"Orthodox",ids:["orthodox","ethiopian"],t:"Only Orthodox Christians who have prepared by fasting, prayer and usually confession receive. Ethiopian practice is especially strict."},
  {who:"Lutheran",ids:["lutheran"],t:"“Discerning the body” means believing Christ's body is truly present. The Missouri Synod practices close communion for those who share its confession; the ELCA welcomes all baptized Christians."},
  {who:"Anglican and Methodist",ids:["anglican","methodist"],t:"An open table: Methodists invite all who seek Christ, and Anglicans generally all baptized Christians. “Unworthily” refers to the manner of eating, not the worthiness of the person.",s:[["methodist","table",""]]},
  {who:"Reformed, Baptist, Non-denominational",ids:["reformed","baptist","pentecostal","nondenom","sda"],t:"Open to believers who examine themselves; many Baptist churches limit it to baptized believers. In Corinth the sin was disregarding poorer members (vv. 20–22)."},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"At the yearly Memorial only the anointed, those who will rule with Christ in heaven, eat and drink; everyone else attends as an observer."}
 ]},
{ref:"1 Corinthians 13:8-10", q:"Charity never faileth: but whether there be prophecies, they shall fail; whether there be tongues, they shall cease; whether there be knowledge, it shall vanish away. For we know in part, and we prophesy in part. But when that which is perfect is come, then that which is in part shall be done away.", tags:"tongues cease prophecy perfect cessationism gifts",
 r:[
  {who:"Cessationists",ids:["reformed","baptist"],t:"“That which is perfect” is often taken as the completed New Testament or the church's maturity; tongues and prophecy ceased with the apostles. The Westminster Confession says God's “former ways” of revelation have now ceased.",s:[["reformed","wcf","1.1"]]},
  {who:"Continuationists",ids:["pentecostal","nondenom","catholic","lds"],t:"“That which is perfect” comes when Christ returns and we see “face to face” (v. 12). Until then the gifts continue."},
  {who:"Most others",ids:["orthodox","ethiopian","lutheran","anglican","methodist","sda"],t:"The perfect comes at Christ's return. Gifts haven't been formally ended, though these churches don't emphasize tongues. Adventists see the gift of prophecy in Ellen White's ministry.",s:[["sda","fb","18"]]}
 ]},
{ref:"2 Corinthians 5:8", q:"We are confident, I say, and willing rather to be absent from the body, and to be present with the Lord.", tags:"absent from the body present with the Lord soul sleep death",
 r:[
  {who:"Most churches",ids:["catholic","orthodox","ethiopian","lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom"],t:"At death the believer's soul goes to be with Christ, awaiting the resurrection of the body.",s:[["reformed","wcf","32.1"]]},
  {who:"Adventist and Witnesses",ids:["sda","jw"],t:"Paul longs to be “clothed” with the resurrection body (vv. 2–4), not to float free of it. The dead sleep until the resurrection, so the next conscious moment is being with the Lord.",s:[["sda","fb","26"]]},
  {who:"Latter-day Saints",ids:["lds"],t:"The spirit leaves the body and enters the spirit world to await resurrection."}
 ]},
{ref:"Ephesians 5:32", q:"This is a great mystery: but I speak concerning Christ and the church.", tags:"marriage sacrament mystery sealing",
 r:[
  {who:"Catholic and Orthodox",ids:["catholic","orthodox","ethiopian"],t:"The Greek mysterion became sacramentum in Latin (“a great sacrament,” Douay-Rheims). Marriage is a sacrament, a holy mystery that mirrors Christ's love for the Church and gives grace.",s:[["catholic","ccc","¶¶1601, 1616–1617"]]},
  {who:"Protestants",ids:["lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda"],t:"The “mystery” is Christ and the Church. Marriage is a holy, God-given institution, but not a sacrament like baptism and the Supper.",s:[["anglican","art","XXV"],["methodist","aor","XVI"]]},
  {who:"Latter-day Saints",ids:["lds"],t:"Marriage sealed in the temple by priesthood authority lasts beyond death and is required for the highest exaltation.",s:[["lds","dc","131:1–4; 132"]]},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"Marriage is a sacred arrangement from Jehovah, but not a sacrament."}
 ]},
{ref:"Colossians 1:15", q:"Who is the image of the invisible God, the firstborn of every creature:", tags:"firstborn of every creature Jesus created Trinity",
 r:[
  {who:"Trinitarian churches",ids:["catholic","orthodox","ethiopian","lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda"],t:"“Firstborn” means the heir with first rank (as David is called “firstborn” in Psalm 89:27); the next verse says all things were created by him. The Nicene Creed: “begotten, not made.”"},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"Jesus was literally the first thing God created, and everything else was made through him. The New World Translation reads “all other things” in verse 16."},
  {who:"Latter-day Saints",ids:["lds"],t:"Jesus was the Firstborn of the Father's spirit children in the premortal life.",s:[["lds","dc","93:21"]]}
 ]},
{ref:"Colossians 2:16", q:"Let no man therefore judge you in meat, or in drink, or in respect of an holyday, or of the new moon, or of the sabbath days:", tags:"Sabbath holy days new moon food",
 r:[
  {who:"Most churches",ids:["catholic","orthodox","lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","lds","jw"],t:"Christians aren't bound by the Jewish Sabbath; it was a “shadow” of Christ (v. 17). Most keep Sunday as the Lord's Day instead.",s:[["catholic","ccc","¶2175"]]},
  {who:"Seventh-day Adventist",ids:["sda"],t:"Refers to the ceremonial sabbaths of the yearly feasts, which pointed to Christ, not to the seventh-day Sabbath of the Ten Commandments, which still stands.",s:[["sda","fb","20"]]},
  {who:"Ethiopian Orthodox",ids:["ethiopian"],t:"Keeps both Saturday and Sunday as holy days, without judging others' practice.",s:[["ethiopian","cnewa",""]]}
 ]},
{ref:"1 Timothy 2:5", q:"For there is one God, and one mediator between God and men, the man Christ Jesus;", tags:"one mediator saints intercession Mary prayer",
 r:[
  {who:"Catholic and Orthodox",ids:["catholic","orthodox","ethiopian"],t:"Christ alone is mediator of redemption. The saints don't replace him; they pray for us within his one mediation, as Christians on earth pray for each other (vv. 1–2 urge exactly that).",s:[["catholic","ccc","¶¶956, 970"]]},
  {who:"Lutheran",ids:["lutheran"],t:"The saints should be remembered and imitated, but Scripture doesn't teach praying to them.",s:[["lutheran","ac","XXI"]]},
  {who:"Anglican and Methodist",ids:["anglican","methodist"],t:"The invocation of saints is rejected as without warrant in Scripture.",s:[["anglican","art","XXII"],["methodist","aor","XIV"]]},
  {who:"Other Protestants and restorationists",ids:["reformed","baptist","pentecostal","nondenom","sda","lds","jw"],t:"Prayer goes to God through Jesus Christ alone. (Latter-day Saints and Witnesses pray to the Father in Jesus' name.)"}
 ]},
{ref:"1 Timothy 2:12", q:"But I suffer not a woman to teach, nor to usurp authority over the man, but to be in silence.", tags:"women teach ordination pastors priests authority",
 r:[
  {who:"Catholic and Orthodox",ids:["catholic","orthodox","ethiopian"],t:"Priestly ordination is reserved to men, following Christ's choice of twelve men. Women serve in many teaching and leadership roles outside the priesthood.",s:[["catholic","ccc","¶1577"]]},
  {who:"Lutheran",ids:["lutheran"],t:"Divided: the Missouri Synod ordains only men; the ELCA's predecessor churches began ordaining women in 1970."},
  {who:"Anglican",ids:["anglican"],t:"Divided by province: the Church of England has ordained women as priests since 1994 and bishops since 2015; many Global South provinces do not."},
  {who:"Methodist and Pentecostal",ids:["methodist","pentecostal"],t:"Women are ordained. Paul was addressing a specific problem in Ephesus, not banning women from ministry."},
  {who:"Reformed and Baptist",ids:["reformed","baptist"],t:"Conservative bodies limit the office of pastor or elder to men; mainline Reformed churches ordain women.",s:[["baptist","bfm","VI"]]},
  {who:"Seventh-day Adventist",ids:["sda"],t:"The world church voted in 2015 not to let its divisions ordain women as pastors, though women serve as commissioned ministers."},
  {who:"Latter-day Saints and Witnesses",ids:["lds","jw"],t:"Priesthood offices (Latter-day Saints) and congregation elders (Witnesses) are men; women lead and teach in other roles."}
 ]},
{ref:"1 Timothy 3:2", q:"A bishop then must be blameless, the husband of one wife, vigilant, sober, of good behaviour, given to hospitality, apt to teach;", tags:"celibacy married priests husband of one wife bishop",
 r:[
  {who:"Catholic",ids:["catholic"],t:"Priestly celibacy in the Latin Church is a discipline, not a doctrine: Eastern Catholic churches ordain married men, and some married former Protestant clergy are ordained. Bishops are always celibate.",s:[["catholic","ccc","¶¶1579–1580"]]},
  {who:"Orthodox",ids:["orthodox","ethiopian"],t:"Married men may be ordained deacons and priests (but may not marry after ordination). Bishops are chosen from celibate monks."},
  {who:"Protestants",ids:["lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda"],t:"Ministers are free to marry; the Reformers also cited 1 Timothy 4:3 against compulsory celibacy. Many read “one wife” as ruling out divorced and remarried pastors.",s:[["lutheran","ac","XXIII"],["anglican","art","XXXII"],["methodist","aor","XXI"]]},
  {who:"Latter-day Saints and Witnesses",ids:["lds","jw"],t:"Leaders are usually married; Latter-day Saint bishops are married men."}
 ]},
{ref:"1 Timothy 3:15", q:"But if I tarry long, that thou mayest know how thou oughtest to behave thyself in the house of God, which is the church of the living God, the pillar and ground of the truth.", tags:"church pillar ground of truth authority magisterium",
 r:[
  {who:"Catholic",ids:["catholic"],t:"The Church guards and teaches the truth; the bishops in union with the pope are the authentic interpreters of God's word, serving it, not above it.",s:[["catholic","dv","10"]]},
  {who:"Orthodox",ids:["orthodox","ethiopian"],t:"The whole Church, guided by the Spirit through the councils and the Fathers, holds and hands on the truth."},
  {who:"Protestants",ids:["lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda"],t:"The church supports the truth by preaching and defending it, but Scripture remains the final authority over the church.",s:[["reformed","wcf","1.10"]]},
  {who:"Latter-day Saints",ids:["lds"],t:"The true Church, restored with living prophets and apostles, holds the fullness of truth."}
 ]},
{ref:"Hebrews 6:4-6", q:"For it is impossible for those who were once enlightened, and have tasted of the heavenly gift, and were made partakers of the Holy Ghost, And have tasted the good word of God, and the powers of the world to come, If they shall fall away, to renew them again unto repentance; seeing they crucify to themselves the Son of God afresh, and put him to an open shame.", tags:"fall away apostasy eternal security once saved always saved perseverance",
 r:[
  {who:"Catholic and Orthodox",ids:["catholic","orthodox","ethiopian"],t:"A real Christian can fall away through grave sin, though repentance remains possible through God's mercy and confession.",s:[["catholic","ccc","¶1861"]]},
  {who:"Lutheran",ids:["lutheran"],t:"Believers can lose faith and the Holy Spirit; the Augsburg Confession condemns those who deny it.",s:[["lutheran","ac","XII"]]},
  {who:"Methodist, Pentecostal, Adventist",ids:["methodist","pentecostal","sda"],t:"A genuine believer can turn away and be lost; the warning is real."},
  {who:"Reformed and most Baptists",ids:["reformed","baptist","nondenom"],t:"True believers will persevere to the end. The passage warns those who “tasted” the gospel without true faith, or describes what would happen as a way of urging perseverance.",s:[["reformed","wcf","17"],["baptist","bfm","V"]]}
 ]},
{ref:"Hebrews 10:12", q:"But this man, after he had offered one sacrifice for sins for ever, sat down on the right hand of God;", tags:"one sacrifice Mass sacrifice Eucharist priest",
 r:[
  {who:"Catholic",ids:["catholic"],t:"There is one sacrifice; the Mass doesn't repeat it but makes that same sacrifice present, offered in an unbloody way.",s:[["catholic","ccc","¶¶1366–1367"]]},
  {who:"Orthodox",ids:["orthodox","ethiopian"],t:"The Divine Liturgy offers the “reasonable and bloodless sacrifice,” sharing in Christ's one offering."},
  {who:"Lutheran",ids:["lutheran"],t:"The Supper is Christ's gift to us, not a sacrifice we offer for sins. Lutherans kept the word “Mass” but rejected the idea of a sacrifice that earns grace.",s:[["lutheran","ac","XXIV"]]},
  {who:"Anglican and Methodist",ids:["anglican","methodist"],t:"Christ's one offering is the only satisfaction for sin, so the medieval “sacrifices of Masses” are rejected. Some Anglicans speak of a sacrifice of praise and of remembering (anamnesis).",s:[["anglican","art","XXXI"],["methodist","aor","XX"]]},
  {who:"Reformed and Evangelical",ids:["reformed","baptist","pentecostal","nondenom","sda"],t:"Christ's work is finished; the Supper is a memorial and spiritual feeding, not a sacrifice.",s:[["reformed","wcf","29.2"]]}
 ]},
{ref:"James 5:16", q:"Confess your faults one to another, and pray one for another, that ye may be healed. The effectual fervent prayer of a righteous man availeth much.", tags:"confess faults one to another confession",
 r:[
  {who:"Catholic and Orthodox",ids:["catholic","orthodox","ethiopian"],t:"Coming right after the call for the elders (presbyters) in verse 14, it points toward confession within the Church, fulfilled in the sacrament of Penance."},
  {who:"Lutheran and Anglican",ids:["lutheran","anglican"],t:"Confession to a pastor or priest is valued and available, along with mutual confession among believers."},
  {who:"Other Protestants",ids:["reformed","methodist","baptist","pentecostal","nondenom","sda"],t:"Mutual confession and prayer among believers, not a sacrament or a role reserved for clergy. Wesley's small “bands” practiced exactly this."}
 ]},
{ref:"1 Peter 3:21", q:"The like figure whereunto even baptism doth also now save us (not the putting away of the filth of the flesh, but the answer of a good conscience toward God,) by the resurrection of Jesus Christ:", tags:"baptism saves regeneration",
 r:[
  {who:"Catholic, Orthodox, Lutheran",ids:["catholic","orthodox","ethiopian","lutheran"],t:"Baptism really saves: through it God washes away sin and gives new birth, by the power of Christ's resurrection.",s:[["catholic","ccc","¶1213"],["lutheran","ac","IX"]]},
  {who:"Anglican and Methodist",ids:["anglican","methodist"],t:"Baptism is a sign of regeneration and a means of grace, joined to faith."},
  {who:"Reformed",ids:["reformed"],t:"Baptism is a sign and seal of salvation, but grace is not so tied to it that every baptized person is saved or no one is saved without it.",s:[["reformed","wcf","28.5–6"]]},
  {who:"Baptist, Pentecostal, Non-denominational",ids:["baptist","pentecostal","nondenom","sda"],t:"The verse itself says it is “not the putting away of the filth of the flesh, but the answer of a good conscience”: baptism is the believer's pledge, and Christ's resurrection is what saves."},
  {who:"Latter-day Saints",ids:["lds"],t:"Baptism by proper priesthood authority is essential for salvation, which is why it is also performed on behalf of the dead.",s:[["lds","aof","4"]]}
 ]},
{ref:"2 Peter 1:20", q:"Knowing this first, that no prophecy of the scripture is of any private interpretation.", tags:"private interpretation scripture authority",
 r:[
  {who:"Catholic",ids:["catholic"],t:"Scripture must be read within the living Tradition of the whole Church; authentic interpretation belongs to the Church's teaching office.",s:[["catholic","ccc","¶85"],["catholic","dv","10, 12"]]},
  {who:"Orthodox",ids:["orthodox","ethiopian"],t:"Scripture is read with the mind of the Church: the Fathers, the councils and the liturgy."},
  {who:"Protestants",ids:["lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda"],t:"About where prophecy came from (“holy men of God spake as they were moved by the Holy Ghost,” v. 21), not who may read it. Scripture interprets Scripture.",s:[["reformed","wcf","1.9"]]},
  {who:"Latter-day Saints",ids:["lds"],t:"Living prophets and personal revelation through the Holy Ghost guide interpretation."}
 ]},
{ref:"1 John 5:7", q:"For there are three that bear record in heaven, the Father, the Word, and the Holy Ghost: and these three are one.", tags:"Comma Johanneum Trinity three that bear record textual",
 r:[
  {who:"About the text",ids:[],t:"The words “in heaven, the Father, the Word, and the Holy Ghost: and these three are one” (the Johannine Comma) appear in no Greek manuscript before the medieval period. They entered the Latin tradition early and Greek printed Bibles with Erasmus's third edition (1522), and from there the KJV. Most modern translations, Catholic and Protestant, leave them out or footnote them."},
  {who:"Catholic",ids:["catholic"],t:"The Douay-Rheims, following the Vulgate, includes them. In 1897 Rome ruled their authenticity couldn't safely be denied, then clarified in 1927 that scholars may study the question; the NABRE omits them."},
  {who:"Most Protestants",ids:["lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda"],t:"Not original, and the doctrine of the Trinity doesn't depend on it. Some “KJV-only” Christians defend it as authentic."},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"Its later addition is cited as evidence that the Trinity was read into the Bible."}
 ]},
{ref:"Jude 1:9", q:"Yet Michael the archangel, when contending with the devil he disputed about the body of Moses, durst not bring against him a railing accusation, but said, The Lord rebuke thee.", tags:"Michael archangel Jesus Adam angels",
 r:[
  {who:"Most churches",ids:["catholic","orthodox","ethiopian","lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom"],t:"Michael is a created archangel, chief among the angels and distinct from Christ. Catholics and Orthodox honor him with a feast (September 29 in the West; November 8 in the East). Jude draws this scene from a Jewish writing, likely the Assumption of Moses."},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"Michael is Jesus' name in heaven, as the chief of God's angels."},
  {who:"Seventh-day Adventist",ids:["sda"],t:"“Michael” is a name for Christ as leader of the angels, but he is the eternal Son of God, not a created being."},
  {who:"Latter-day Saints",ids:["lds"],t:"Michael the archangel is Adam, the father of the human family.",s:[["lds","dc","27:11; 107:54"]]}
 ]},
{ref:"Revelation 7:4", q:"And I heard the number of them which were sealed: and there were sealed an hundred and forty and four thousand of all the tribes of the children of Israel.", tags:"144000 sealed great multitude anointed heaven",
 r:[
  {who:"Jehovah's Witnesses",ids:["jw"],t:"A literal 144,000 anointed Christians go to heaven to rule with Christ. The “great multitude” (v. 9) will live forever on a paradise earth.",s:[["jw","b",""]]},
  {who:"Catholic, Orthodox, mainline Protestants",ids:["catholic","orthodox","ethiopian","lutheran","reformed","anglican","methodist"],t:"A symbolic number (12 × 12 × 1,000): the complete people of God, Old and New Covenant together, the same company John then sees as a countless multitude."},
  {who:"Many evangelicals",ids:["baptist","pentecostal","nondenom"],t:"Often read as Jewish believers sealed during a future tribulation; others take the symbolic view."},
  {who:"Seventh-day Adventist",ids:["sda"],t:"Adventists have no official position; many identify them with the faithful alive at Christ's return."}
 ]},
{ref:"Revelation 12:1", q:"And there appeared a great wonder in heaven; a woman clothed with the sun, and the moon under her feet, and upon her head a crown of twelve stars:", tags:"woman clothed with the sun Mary Israel church stars",
 r:[
  {who:"Catholic",ids:["catholic"],t:"Both Mary, who gave birth to the Messiah, and the Church. The passage is read at Mass on the Assumption (August 15), and Marian art often shows the twelve stars."},
  {who:"Orthodox",ids:["orthodox","ethiopian"],t:"Mainly the Church, with Fathers also seeing the Theotokos."},
  {who:"Most Protestants",ids:["lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom"],t:"Israel, with twelve stars for the twelve tribes (compare Joseph's dream, Genesis 37:9), bringing forth the Messiah; or the people of God across both covenants."},
  {who:"Seventh-day Adventist",ids:["sda"],t:"God's faithful church, persecuted through history."},
  {who:"Jehovah's Witnesses",ids:["jw"],t:"God's heavenly organization, giving birth to Christ's Kingdom, which they date to 1914.",s:[["jw","y",""]]}
 ]},
{ref:"Revelation 22:18-19", q:"For I testify unto every man that heareth the words of the prophecy of this book, If any man shall add unto these things, God shall add unto him the plagues that are written in this book: And if any man shall take away from the words of the book of this prophecy, God shall take away his part out of the book of life, and out of the holy city, and from the things which are written in this book.", tags:"adding to scripture canon closed new revelation",
 r:[
  {who:"Most churches",ids:["catholic","orthodox","ethiopian","lutheran","reformed","anglican","methodist","baptist","pentecostal","nondenom","sda","jw"],t:"The warning is about the book of Revelation itself, but these churches also hold that public revelation ended with the apostles, which rules out later books as new scripture.",s:[["catholic","ccc","¶¶66–67"]]},
  {who:"Latter-day Saints",ids:["lds"],t:"It applies only to this book (Deuteronomy 4:2 has the same warning, yet more scripture followed). God still reveals new things.",s:[["lds","aof","9"]]}
 ]}
);
