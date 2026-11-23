// Life of Christ tab: a timeline of events in the Gospels, in the usual "harmony" order,
// with every Gospel passage that tells each event.
// Dates are approximate and scholars differ: only the phases carry dates, and each is marked "about".
// refs: "Book chapter:verse-verse" (one chapter per reference). feast: when churches remember the event.
// link: [label, "#address"] to another part of the app.
const LIFE={
  intro:"The events of Jesus' life in the order most Gospel harmonies follow. Swipe or scroll along the line; under each event are the Gospel passages that tell it. Tap a passage to read it.",
  phases:[
    {id:"birth",n:"Birth and childhood",when:"about 6–4 BC",c:"#8A6D1F",events:[
      {id:"word",h:"The Word before all things",d:"John opens his Gospel before creation: the Word was with God and was God.",refs:["John 1:1-18"]},
      {id:"zechariah",h:"An angel visits Zechariah",d:"Gabriel promises the old priest Zechariah a son, John.",refs:["Luke 1:5-25"]},
      {id:"annunciation",h:"The Annunciation",d:"Gabriel tells Mary she will bear the Son of God.",refs:["Luke 1:26-38"],feast:"March 25"},
      {id:"visitation",h:"Mary visits Elizabeth",d:"John leaps in the womb; Mary sings the Magnificat.",refs:["Luke 1:39-56"],feast:"May 31 (Catholic)"},
      {id:"john-born",h:"John the Baptist is born",d:"Zechariah's tongue is loosed and he prophesies.",refs:["Luke 1:57-80"],feast:"June 24"},
      {id:"joseph",h:"Joseph's dream",d:"An angel tells Joseph to take Mary as his wife.",refs:["Matthew 1:18-25"]},
      {id:"genealogy",h:"The family line of Jesus",d:"Matthew traces it from Abraham, Luke back to Adam.",refs:["Matthew 1:1-17","Luke 3:23-38"],link:["See it in the Lineage tab","#lineage"]},
      {id:"nativity",h:"Born in Bethlehem",d:"Jesus is laid in a manger; angels announce him to shepherds.",refs:["Luke 2:1-20"],feast:"December 25 (January 7 in churches that keep the Julian calendar)"},
      {id:"naming",h:"Circumcised and named Jesus",d:"On the eighth day he receives the name the angel gave.",refs:["Luke 2:21"],feast:"January 1 (Orthodox: the Circumcision; Episcopal: the Holy Name; Catholics keep Mary, Mother of God that day and the Holy Name on January 3)"},
      {id:"presentation",h:"Presented in the Temple",d:"Simeon and Anna recognize the child.",refs:["Luke 2:22-38"],feast:"February 2"},
      {id:"magi",h:"The Magi",d:"Wise men from the east follow a star and bring gifts.",refs:["Matthew 2:1-12"],feast:"January 6 (Epiphany)"},
      {id:"egypt",h:"Flight into Egypt",d:"The family escapes; Herod kills the boys of Bethlehem.",refs:["Matthew 2:13-18"],feast:"Holy Innocents: December 28 (Western churches)"},
      {id:"nazareth",h:"Home to Nazareth",d:"After Herod dies the family settles in Nazareth.",refs:["Matthew 2:19-23","Luke 2:39-40"]},
      {id:"temple12",h:"In the Temple at twelve",d:"Found among the teachers: “I must be about my Father's business.”",refs:["Luke 2:41-52"]}
    ]},
    {id:"prep",n:"Preparation",when:"about AD 27–29",c:"#2F7A6B",events:[
      {id:"baptist",h:"John the Baptist preaches",d:"In the wilderness John calls Israel to repent. Luke dates it to Tiberius' fifteenth year.",refs:["Matthew 3:1-12","Mark 1:1-8","Luke 3:1-18","John 1:19-28"]},
      {id:"baptism",h:"Jesus is baptized",d:"The Spirit descends and the Father's voice speaks from heaven.",refs:["Matthew 3:13-17","Mark 1:9-11","Luke 3:21-22","John 1:29-34"],feast:"Theophany, January 6 (Orthodox); Baptism of the Lord, the Sunday after Epiphany (Catholic)"},
      {id:"temptation",h:"Tempted in the wilderness",d:"Forty days of fasting; Jesus answers the devil with Scripture.",refs:["Matthew 4:1-11","Mark 1:12-13","Luke 4:1-13"]},
      {id:"first-disciples",h:"The first disciples",d:"Andrew, Peter, Philip and Nathanael follow him.",refs:["John 1:35-51"]},
      {id:"cana",h:"Water into wine at Cana",d:"His first sign, at a wedding, at his mother's word.",refs:["John 2:1-11"]}
    ]},
    {id:"early",n:"Early ministry in Judea",when:"about AD 28–29",c:"#3E6FA8",events:[
      {id:"temple-john",h:"Clearing the Temple (John)",d:"At the first Passover John records, Jesus drives out the money changers.",refs:["John 2:13-25"]},
      {id:"nicodemus",h:"Nicodemus at night",d:"“Ye must be born again”; “For God so loved the world.”",refs:["John 3:1-21"]},
      {id:"samaritan-woman",h:"The woman at the well",d:"Living water offered to a Samaritan woman; her town believes.",refs:["John 4:1-42"]}
    ]},
    {id:"galilee",n:"Ministry in Galilee",when:"about AD 28–30",c:"#5B5FA8",events:[
      {id:"galilee-begins",h:"Preaching begins in Galilee",d:"“Repent: for the kingdom of heaven is at hand.”",refs:["Matthew 4:12-17","Mark 1:14-15","Luke 4:14-15"]},
      {id:"rejected",h:"Rejected at Nazareth",d:"He reads Isaiah in his home synagogue and is driven out.",refs:["Luke 4:16-30"]},
      {id:"fishers",h:"Fishers of men",d:"Peter, Andrew, James and John leave their nets.",refs:["Matthew 4:18-22","Mark 1:16-20","Luke 5:1-11"]},
      {id:"capernaum",h:"Healing at Capernaum",d:"A demon cast out in the synagogue; Peter's mother-in-law healed.",refs:["Mark 1:21-34","Luke 4:31-41","Matthew 8:14-17"]},
      {id:"paralytic",h:"The paralyzed man through the roof",d:"Jesus forgives his sins, then tells him to walk.",refs:["Matthew 9:1-8","Mark 2:1-12","Luke 5:17-26"]},
      {id:"levi",h:"Matthew the tax collector called",d:"Jesus eats with tax collectors and sinners.",refs:["Matthew 9:9-13","Mark 2:13-17","Luke 5:27-32"]},
      {id:"twelve",h:"The Twelve chosen",d:"After a night of prayer he names the apostles.",refs:["Mark 3:13-19","Luke 6:12-16","Matthew 10:1-4"],link:["The Twelve in the Lineage tab","#lineage"]},
      {id:"sermon",h:"The Sermon on the Mount",d:"The Beatitudes, the Lord's Prayer, the Golden Rule. Luke gives a shorter Sermon on the Plain.",refs:["Matthew 5:1-48","Matthew 6:1-34","Matthew 7:1-29","Luke 6:17-49"]},
      {id:"storm",h:"Calming the storm",d:"“What manner of man is this, that even the winds and the sea obey him!”",refs:["Matthew 8:23-27","Mark 4:35-41","Luke 8:22-25"]},
      {id:"parables",h:"Parables by the sea",d:"The sower, the mustard seed, the hidden treasure.",refs:["Matthew 13:1-52","Mark 4:1-34","Luke 8:4-18"]},
      {id:"jairus",h:"Jairus' daughter raised",d:"On the way, a woman is healed by touching his garment.",refs:["Mark 5:21-43","Matthew 9:18-26","Luke 8:40-56"]},
      {id:"sent",h:"The Twelve sent out",d:"Sent two by two to preach and heal.",refs:["Matthew 10:5-42","Mark 6:7-13","Luke 9:1-6"]},
      {id:"baptist-dies",h:"John the Baptist beheaded",d:"Herod Antipas has John killed at a banquet.",refs:["Matthew 14:1-12","Mark 6:14-29"]},
      {id:"five-thousand",h:"Feeding the five thousand",d:"Apart from the Resurrection, the only miracle all four Gospels tell. John sets it near a Passover.",refs:["Matthew 14:13-21","Mark 6:30-44","Luke 9:10-17","John 6:1-14"]},
      {id:"water",h:"Walking on the water",d:"In Matthew, Peter walks too, then sinks.",refs:["Matthew 14:22-33","Mark 6:45-52","John 6:16-21"]},
      {id:"bread-of-life",h:"“I am the bread of life”",d:"The teaching at Capernaum that many disciples could not accept.",refs:["John 6:22-71"]},
      {id:"confession",h:"Peter's confession",d:"“Thou art the Christ.” In Matthew: “upon this rock I will build my church.”",refs:["Matthew 16:13-20","Mark 8:27-30","Luke 9:18-21"],link:["How churches read Matthew 16:18","#Matthew-16-18"]},
      {id:"prediction",h:"He foretells his death",d:"The Son of Man must suffer, die and rise; whoever would follow must take up his cross.",refs:["Matthew 16:21-28","Mark 8:31-38","Luke 9:22-27"]},
      {id:"transfiguration",h:"The Transfiguration",d:"On the mountain with Moses and Elijah: “This is my beloved Son.”",refs:["Matthew 17:1-13","Mark 9:2-13","Luke 9:28-36"],feast:"August 6"}
    ]},
    {id:"journey",n:"The road to Jerusalem",when:"about AD 29–30",c:"#8A4F8F",events:[
      {id:"face",h:"He sets his face toward Jerusalem",d:"The seventy sent ahead of him.",refs:["Luke 9:51-62","Luke 10:1-24"]},
      {id:"good-samaritan",h:"The Good Samaritan; Martha and Mary",d:"“Who is my neighbour?” Then a visit to Martha's house.",refs:["Luke 10:25-42"]},
      {id:"tabernacles",h:"At the Feast of Tabernacles",d:"“If any man thirst, let him come unto me, and drink.”",refs:["John 7:1-52"],link:["Sukkot in the Jewish Tradition tab","#jewish/feasts"]},
      {id:"blind",h:"The man born blind",d:"Healed on the Sabbath: “I was blind, now I see.”",refs:["John 9:1-41"]},
      {id:"shepherd",h:"The Good Shepherd",d:"Part of it taught in winter, at the Feast of Dedication (Hanukkah).",refs:["John 10:1-42"],link:["Hanukkah in the Jewish Tradition tab","#jewish/feasts"]},
      {id:"lost",h:"Lost sheep, lost coin, lost son",d:"Three parables of what was lost and found.",refs:["Luke 15:1-32"]},
      {id:"lazarus",h:"Lazarus raised",d:"“I am the resurrection, and the life.” Four days dead, Lazarus walks out.",refs:["John 11:1-44"]},
      {id:"children",h:"He blesses the children",d:"“Of such is the kingdom of God.”",refs:["Matthew 19:13-15","Mark 10:13-16","Luke 18:15-17"]},
      {id:"rich-man",h:"The rich young man",d:"“Sell whatsoever thou hast”; the camel and the needle's eye.",refs:["Matthew 19:16-30","Mark 10:17-31","Luke 18:18-30"]},
      {id:"bartimaeus",h:"Blind Bartimaeus at Jericho",d:"“Thou Son of David, have mercy on me.”",refs:["Mark 10:46-52","Matthew 20:29-34","Luke 18:35-43"]},
      {id:"zacchaeus",h:"Zacchaeus",d:"The tax collector in the sycamore tree.",refs:["Luke 19:1-10"]},
      {id:"bethany",h:"Anointed at Bethany",d:"Six days before Passover, Mary pours costly ointment on him.",refs:["John 12:1-8","Matthew 26:6-13","Mark 14:3-9"]}
    ]},
    {id:"passion",n:"Holy Week",when:"a Passover about AD 30 or 33",c:"#A3262E",events:[
      {id:"entry",h:"Entry into Jerusalem",d:"Crowds wave branches: “Hosanna to the Son of David.”",refs:["Matthew 21:1-11","Mark 11:1-11","Luke 19:28-44","John 12:12-19"],feast:"Palm Sunday"},
      {id:"temple",h:"Clearing the Temple",d:"“My house shall be called the house of prayer.”",refs:["Matthew 21:12-17","Mark 11:15-19","Luke 19:45-48"]},
      {id:"olivet",h:"Teaching on the end of the age",d:"On the Mount of Olives he foretells the Temple's fall and his return.",refs:["Matthew 24:1-51","Mark 13:1-37","Luke 21:5-38"]},
      {id:"judas",h:"Judas agrees to betray him",d:"For thirty pieces of silver, in Matthew.",refs:["Matthew 26:14-16","Mark 14:10-11","Luke 22:3-6"]},
      {id:"supper",h:"The Last Supper",d:"“This is my body… this is my blood.” At Passover time.",refs:["Matthew 26:17-30","Mark 14:12-26","Luke 22:7-38","1 Corinthians 11:23-26"],feast:"Holy Thursday",link:["The Four Cups of Passover","#jewish/four-cups"]},
      {id:"feet",h:"He washes their feet",d:"John's account of the night: the new commandment, the farewell, the prayer for unity.",refs:["John 13:1-20","John 14:1-31","John 17:1-26"]},
      {id:"gethsemane",h:"Gethsemane",d:"“Not my will, but thine, be done.”",refs:["Matthew 26:36-46","Mark 14:32-42","Luke 22:39-46"]},
      {id:"arrest",h:"Arrested",d:"Judas betrays him with a kiss.",refs:["Matthew 26:47-56","Mark 14:43-52","Luke 22:47-53","John 18:1-12"]},
      {id:"trial",h:"Before the high priest; Peter's denial",d:"Questioned by night; Peter denies him three times.",refs:["Matthew 26:57-75","Mark 14:53-72","Luke 22:54-71","John 18:13-27"]},
      {id:"pilate",h:"Before Pilate",d:"Pilate finds no fault, then hands him over to be crucified.",refs:["Matthew 27:11-26","Mark 15:1-15","Luke 23:1-25","John 18:28-40","John 19:1-16"]},
      {id:"cross",h:"The Crucifixion",d:"“Father, forgive them.” “It is finished.”",refs:["Matthew 27:32-56","Mark 15:21-41","Luke 23:26-49","John 19:17-37"],feast:"Good Friday"},
      {id:"burial",h:"Buried",d:"Joseph of Arimathea lays him in a new tomb.",refs:["Matthew 27:57-66","Mark 15:42-47","Luke 23:50-56","John 19:38-42"]}
    ]},
    {id:"risen",n:"Resurrection and Ascension",when:"the forty days after Easter",c:"#B07A12",events:[
      {id:"empty-tomb",h:"The empty tomb",d:"“He is not here: for he is risen.”",refs:["Matthew 28:1-10","Mark 16:1-8","Luke 24:1-12","John 20:1-10"],feast:"Easter"},
      {id:"magdalene",h:"He appears to Mary Magdalene",d:"She mistakes him for the gardener until he says her name.",refs:["John 20:11-18","Mark 16:9-11"]},
      {id:"emmaus",h:"The road to Emmaus",d:"Known to two disciples “in breaking of bread.”",refs:["Luke 24:13-35"]},
      {id:"thomas",h:"He appears to the disciples; Thomas",d:"“My Lord and my God.”",refs:["Luke 24:36-49","John 20:19-29"]},
      {id:"galilee-sea",h:"By the Sea of Galilee",d:"A great catch of fish; “Feed my sheep.”",refs:["John 21:1-25"]},
      {id:"commission",h:"The Great Commission",d:"“Go ye therefore, and teach all nations.”",refs:["Matthew 28:16-20"]},
      {id:"ascension",h:"The Ascension",d:"Forty days after Easter he is taken up into heaven.",refs:["Acts 1:1-11","Luke 24:50-53","Mark 16:19-20"],feast:"Forty days after Easter (Ascension Thursday)"},
      {id:"pentecost",h:"Pentecost",d:"The Holy Spirit comes on the disciples: the Church's beginning.",refs:["Acts 2:1-41"],feast:"Fifty days after Easter",link:["Where the church family tree begins","#churches"]}
    ]}
  ],
  about:[
    "The Gospels give few dates, so every year here is approximate and scholars differ. Matthew places Jesus' birth under Herod the Great, who died about 4 BC; Luke dates John the Baptist's preaching to the fifteenth year of Tiberius, about AD 28–29; the crucifixion is most often dated to AD 30 or 33.",
    "John's Gospel mentions three Passovers during the ministry {John 2:13}, {John 6:4} and {John 11:55}, which is why it is often said to have lasted about three years. Read from Matthew, Mark and Luke alone, it could be as short as one.",
    "The order of events follows the common harmony of the Gospels. Each Gospel arranges some events differently, and harmonies disagree in places, so treat the order in the middle of the ministry as a guide rather than a fixed sequence.",
    "Feast days are from the General Roman Calendar unless another church is named. Many churches keep the same days."
  ],
  src:[
    ["Britannica: The life of Jesus (dates of birth, ministry and death)","https://www.britannica.com/topic/biblical-literature/The-life-of-Jesus"],
    ["Catholic Encyclopedia (1910): Jesus Christ, chronology","https://www.newadvent.org/cathen/08377a.htm"],
    ["C. P. E. Nothaft, Dating Jesus' Life: Past and Present Perspectives (Bible and Interpretation, 2012)","https://bibleinterp.arizona.edu/node/2975"],
    ["General Roman Calendar (Liturgy Office, England and Wales)","https://www.liturgyoffice.org.uk/Calendar/Info/General-Roman-Calendar.pdf"],
    ["The Episcopal Church: The Holy Name, January 1","https://www.episcopalchurch.org/lectionary/holy-name/"],
    ["OrthodoxWiki: January 1, the Circumcision of the Lord","https://orthodoxwiki.org/January_1"],
    ["Al Jazeera: Why do 250 million Christians celebrate Christmas on January 7?","https://www.aljazeera.com/news/2026/1/7/why-do-250-million-christians-celebrate-christmas-on-january-7"]
  ]
};
