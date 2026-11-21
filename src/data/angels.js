// ---------- Angels and demons ----------
const ANG_RANKS=[
 {sphere:"First sphere: before God's throne"},
 {n:"Seraphim",r:"Burning ones who cry \u201cHoly, holy, holy\u201d",note:"Six-winged beings above God's throne in Isaiah's vision. One touches Isaiah's lips with a live coal. Isaiah 6 is the only place they're named.",refs:["Isaiah 6:2-3","Isaiah 6:6-7"],f:["seraphims"]},
 {n:"Cherubim",r:"Guardians of God's presence",note:"Guard the way to the tree of life, spread their wings over the ark's mercy seat, and appear as living creatures in Ezekiel's visions.",refs:["Genesis 3:24","Exodus 25:20","Ezekiel 10:20"],f:["cherubims","cherub"]},
 {n:"Thrones",r:"Bearers of God's justice",note:"Named in Paul's list of created powers. The tradition sees them as seats of divine judgment.",refs:["Colossians 1:16"]},
 {sphere:"Second sphere: governors of creation"},
 {n:"Dominions",r:"Rule over lower angels",note:"Called \u201cdominions\u201d in Colossians and \u201cdominion\u201d in Ephesians; tradition gives them authority over the ranks below.",refs:["Colossians 1:16","Ephesians 1:21"]},
 {n:"Virtues",r:"Workers of miracles",note:"From the Greek dynamis, translated \u201cmight\u201d in Ephesians 1:21. Tradition links them with signs and wonders.",refs:["Ephesians 1:21","1 Peter 3:22"]},
 {n:"Powers",r:"Guards against evil",note:"Named among the heavenly powers subject to Christ. The same word describes evil powers in other passages.",refs:["Ephesians 3:10","1 Peter 3:22"]},
 {sphere:"Third sphere: messengers to people"},
 {n:"Principalities",r:"Overseers of nations",note:"Paul names principalities in heavenly places. Daniel describes angelic \u201cprinces\u201d over nations.",refs:["Ephesians 3:10","Daniel 10:13"]},
 {n:"Archangels",r:"Chief messengers",note:"\u201cArchangel\u201d appears only twice in the Bible: the archangel's voice at Christ's return, and Michael the archangel in Jude.",refs:["1 Thessalonians 4:16","Jude 1:9"],f:["archangel"]},
 {n:"Angels",r:"Ministering spirits and guardians",note:"Sent to serve those who will inherit salvation. Jesus speaks of children's angels who see the Father's face, the basis for belief in guardian angels.",refs:["Hebrews 1:14","Psalms 91:11","Matthew 18:10"],f:["angels"]}
];
const ANG_NAMED=[
 {n:"Michael",r:"The archangel; prince who fights for God's people",tag:"Named in the Bible",note:"Contends with the devil over Moses' body, stands for Israel in Daniel, and leads the angels against the dragon in Revelation.",refs:["Daniel 10:13","Daniel 12:1","Jude 1:9","Revelation 12:7"]},
 {n:"Gabriel",r:"Messenger who announces God's plans",tag:"Named in the Bible",note:"Explains Daniel's visions and announces the births of John the Baptist and Jesus. He says, \u201cI am Gabriel, that stand in the presence of God.\u201d",refs:["Daniel 8:16","Daniel 9:21","Luke 1:19","Luke 1:26-27"]},
 {n:"Raphael",r:"Healer and guide",tag:"Tobit (Catholic and Orthodox)",note:"Travels with Tobias and heals Tobit's blindness, calling himself one of the seven holy angels. Tobit is Scripture for Catholics and Orthodox, not most Protestants.",refs:["Tobit 12:15"],f:[]},
 {n:"Uriel",r:"Angel of wisdom",tag:"2 Esdras (Orthodox tradition)",note:"Answers Ezra's questions in 2 Esdras, a book in some Orthodox Bibles and the Protestant Apocrypha but not the Catholic canon.",refs:["2 Esdras 4:1"]},
 {n:"The Angel of the LORD",r:"Speaks as God himself",tag:"Named in the Bible",note:"Appears to Hagar, to Moses in the burning bush, and to Gideon. Many Christians see some of these appearances as the pre-incarnate Christ.",refs:["Genesis 16:7","Exodus 3:2","Judges 6:12"],f:["angel of the LORD"]},
 {n:"The four living creatures",r:"Worship around the throne",tag:"Revelation",note:"Full of eyes, with faces like a lion, calf, man, and eagle, they never stop saying \u201cHoly, holy, holy.\u201d The KJV calls them \u201cbeasts.\u201d",refs:["Revelation 4:6-8"]}
];
const DEM_RANKS=[
 {n:"Satan",r:"The adversary; prince of this world",note:"Accuses Job before God, tempts Jesus in the wilderness, and is called \u201cthat old serpent, called the Devil, and Satan.\u201d",refs:["Job 1:6","Matthew 4:10","John 12:31","Revelation 12:9"],f:["Satan","devil"]},
 {n:"Principalities",r:"Rulers in the spiritual realm",note:"First in Paul's list of the forces believers wrestle against.",refs:["Ephesians 6:12","Colossians 2:15"]},
 {n:"Powers",r:"Authorities of evil",note:"Christ disarmed them at the cross and \u201cmade a shew of them openly.\u201d",refs:["Ephesians 6:12","Colossians 2:15"]},
 {n:"Rulers of the darkness of this world",r:"Spiritual forces over the world",note:"Daniel's \u201cprince of Persia\u201d and \u201cprince of Grecia\u201d are often read as examples of evil powers over nations.",refs:["Ephesians 6:12","Daniel 10:20"]},
 {n:"Spiritual wickedness in high places",r:"Evil in the heavenly realms",note:"The last of Paul's four. Some read these as the highest-ranking evil spirits.",refs:["Ephesians 6:12"]},
 {n:"Fallen angels",r:"Angels who rebelled",note:"Angels who \u201ckept not their first estate\u201d are held in chains for judgment. Revelation pictures the dragon's tail sweeping a third of the stars from heaven.",refs:["Jude 1:6","2 Peter 2:4","Revelation 12:4"]},
 {n:"Demons and unclean spirits",r:"Spirits Jesus casts out",note:"The KJV usually calls them \u201cdevils\u201d or \u201cunclean spirits.\u201d Jesus casts them out throughout the Gospels.",refs:["Mark 1:23-26","Matthew 8:16","Luke 8:2"],f:["devils","unclean spirit","unclean spirits"]}
];
const DEM_NAMED=[
 {n:"Lucifer",r:"\u201cSon of the morning\u201d who fell from heaven",tag:"Isaiah 14",note:"The KJV's name for the fallen \u201cday star\u201d of Isaiah 14:12, traditionally identified with Satan. Ezekiel 28 describes \u201cthe anointed cherub\u201d cast out of God's mountain. Both passages are also read as being about earthly kings.",refs:["Isaiah 14:12","Ezekiel 28:14-16"]},
 {n:"Beelzebub",r:"\u201cPrince of the devils\u201d",tag:"Gospels",note:"Jesus' opponents accuse him of casting out demons by Beelzebub. The name comes from Baal-zebub, the god of Ekron.",refs:["2 Kings 1:2","Matthew 12:24"],f:["Baal-zebub"]},
 {n:"Belial",r:"Worthlessness, opposed to Christ",tag:"2 Corinthians",note:"Paul asks, \u201cWhat concord hath Christ with Belial?\u201d In the Old Testament, \u201csons of Belial\u201d means worthless men.",refs:["2 Corinthians 6:15"]},
 {n:"Abaddon (Apollyon)",r:"Angel of the bottomless pit",tag:"Revelation",note:"King over the locusts from the pit. Both names mean \u201cdestroyer,\u201d in Hebrew and Greek.",refs:["Revelation 9:11"],f:["Abaddon","Apollyon"]},
 {n:"Legion",r:"\u201cFor we are many\u201d",tag:"Gospels",note:"The name given by the demons Jesus cast out of a man in the Gadarenes and sent into a herd of swine.",refs:["Mark 5:9","Luke 8:30"],f:["Legion"]},
 {n:"Azazel",r:"The scapegoat of the Day of Atonement",tag:"Leviticus 16",note:"The KJV translates the Hebrew azazel as \u201cscapegoat.\u201d Later Jewish writings such as 1 Enoch made Azazel a fallen angel.",refs:["Leviticus 16:8"],f:["scapegoat"]},
 {n:"Prince of Persia",r:"Opposed Michael for 21 days",tag:"Daniel 10",note:"A spiritual power who withstood the angel sent to Daniel until Michael came to help.",refs:["Daniel 10:13"],f:["prince of Persia"]}
];
const SATAN_TITLES=["the devil","the tempter","Beelzebub","the accuser","the dragon","the old serpent","the god of this world","the prince of the power of the air","the father of lies"];
