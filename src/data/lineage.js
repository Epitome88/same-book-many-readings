// ---------- Lineage ----------
// p(name, kjvNT, note, extraSearchTerms, flags)
const p=(n,k,note,f,o={})=>({n,k,note,f:f||[],...o});
const W=(n,note,f)=>({n,note,f:f||[]});
const LINE=[
 {type:"one",src:"lk",title:"From Adam to Abraham",sub:"Luke 3:34\u201338, following Genesis 5 and 11",people:[
  p("Adam","","The first man, formed from the dust (Genesis 2:7). Luke ends his list with \u201cAdam, which was the son of God.\u201d",[],{key:1}),
  p("Seth","","Born to Adam and Eve after Abel's death (Genesis 4:25)."),
  p("Enos","","\u201cThen began men to call upon the name of the LORD\u201d (Genesis 4:26).",["Enosh"]),
  p("Cainan","","Son of Enos (Genesis 5:9); called Kenan in many modern translations.",["Kenan"]),
  p("Mahalaleel","Maleleel","Lived 895 years (Genesis 5:17).",[]),
  p("Jared","","Father of Enoch (Genesis 5:18)."),
  p("Enoch","","\u201cWalked with God: and he was not; for God took him\u201d (Genesis 5:24)."),
  p("Methuselah","Mathusala","The longest life recorded in the Bible: 969 years (Genesis 5:27)."),
  p("Lamech","","Father of Noah (Genesis 5:28\u201329)."),
  p("Noah","Noe","Built the ark and survived the Flood with his family (Genesis 6\u20139).",[],{key:1}),
  p("Shem","Sem","Son of Noah, received his father's blessing (Genesis 9:26)."),
  p("Arphaxad","","Born two years after the Flood (Genesis 11:10)."),
  p("Cainan","","Appears in Luke 3:36 and the Greek Septuagint, but not in the Hebrew text of Genesis 11.",[],{odd:1,id:"cainan2"}),
  p("Salah","Sala","Son of Arphaxad (Genesis 11:12)."),
  p("Eber","Heber","Often linked to the name \u201cHebrew\u201d (Genesis 11:14)."),
  p("Peleg","Phalec","\u201cIn his days was the earth divided\u201d (Genesis 10:25)."),
  p("Reu","Ragau","Son of Peleg (Genesis 11:18)."),
  p("Serug","Saruch","Son of Reu (Genesis 11:20)."),
  p("Nahor","Nachor","Grandfather of Abraham (Genesis 11:24)."),
  p("Terah","Thara","Father of Abraham; left Ur of the Chaldees (Genesis 11:31).")
 ]},
 {type:"one",src:"both",title:"Abraham to King David",sub:"Matthew 1:2\u20136 and Luke 3:31\u201334",people:[
  p("Abraham","","God promised that through him all nations would be blessed (Genesis 12:1\u20133). Matthew's list begins here.",["Abram"],{key:1}),
  p("Isaac","","The son of promise, born when Abraham was 100 (Genesis 21:5)."),
  p("Jacob","","Renamed Israel; father of the twelve tribes (Genesis 32:28)."),
  p("Judah","Judas, Juda","Promised that \u201cthe sceptre shall not depart from Judah\u201d (Genesis 49:10).",[],{w:W("Tamar","Judah's daughter-in-law, mother of the twins Perez and Zerah (Genesis 38). The first woman Matthew names.",["Thamar"])}),
  p("Perez","Phares","Twin brother of Zerah (Genesis 38:29).",["Pharez"]),
  p("Hezron","Esrom","Son of Perez (Ruth 4:18)."),
  p("Ram","Aram","Son of Hezron (Ruth 4:19)."),
  p("Amminadab","Aminadab","Father-in-law of Aaron (Exodus 6:23)."),
  p("Nahshon","Naasson","Leader of the tribe of Judah in the wilderness (Numbers 1:7)."),
  p("Salmon","","Father of Boaz (Ruth 4:21).",["Salma"],{w:W("Rahab","Of Jericho; she hid the Israelite spies (Joshua 2). Matthew names her as Boaz's mother.",["Rachab"])}),
  p("Boaz","Booz","Redeemer who married Ruth (Ruth 4).",[],{w:W("Ruth","A Moabite widow who stayed loyal to Naomi and to Israel's God (Ruth 1:16).")}),
  p("Obed","","Son of Boaz and Ruth (Ruth 4:17)."),
  p("Jesse","","Father of David, from Bethlehem (1 Samuel 16)."),
  p("David","","King of Israel; God promised his throne would last forever (2 Samuel 7:16). The lists split after him.",[],{key:1,w:W("Bathsheba","\u201cHer that had been the wife of Urias\u201d (Matthew 1:6). Mother of both Solomon and Nathan (1 Chronicles 3:5).",["Bathshua"])})
 ]},
 {type:"split",title:"David to the Exile",sub:"Matthew 1:6\u201311 and Luke 3:27\u201331",
  mt:{label:"Matthew, through the kings",people:[
   p("Solomon","","Built the temple in Jerusalem (1 Kings 6).",[],{key:1}),
   p("Rehoboam","Roboam","The kingdom split under his rule (1 Kings 12)."),
   p("Abijah","Abia","King of Judah (2 Chronicles 13).",["Abijam"]),
   p("Asa","","Reforming king who removed idols (1 Kings 15:11\u201312)."),
   p("Jehoshaphat","Josaphat","Faithful king of Judah (2 Chronicles 17)."),
   p("Jehoram","Joram","King of Judah (2 Kings 8:16). Matthew skips the next three kings here.",["Joram"]),
   p("Uzziah","Ozias","Also called Azariah; struck with leprosy (2 Chronicles 26).",["Azariah"]),
   p("Jotham","Joatham","King of Judah (2 Kings 15:32)."),
   p("Ahaz","Achaz","Received Isaiah's sign of a virgin's child (Isaiah 7:10\u201314)."),
   p("Hezekiah","Ezekias","Trusted God against Assyria (2 Kings 18\u201319)."),
   p("Manasseh","Manasses","The longest-reigning king of Judah (2 Kings 21:1)."),
   p("Amon","","King of Judah for two years (2 Kings 21:19)."),
   p("Josiah","Josias","Found the book of the law and reformed worship (2 Kings 22\u201323)."),
   p("Jeconiah","Jechonias","Carried to Babylon (2 Kings 24:15). See Jeremiah 22:30.",["Jehoiachin","Coniah"])
  ]},
  lk:{label:"Luke, through Nathan",people:[
   p("Nathan","","Son of David and Bathsheba (1 Chronicles 3:5), not the prophet Nathan.",[],{key:1}),
   p("Mattatha","","Named only in Luke 3:31."),p("Menan","","Named only in Luke 3:31."),p("Melea","","Named only in Luke 3:31."),
   p("Eliakim","","Named only in Luke 3:30."),p("Jonan","","Named only in Luke 3:30."),p("Joseph","","Named only in Luke 3:30."),
   p("Juda","","Named only in Luke 3:30."),p("Simeon","","Named only in Luke 3:30."),p("Levi","","Named only in Luke 3:29."),
   p("Matthat","","Named only in Luke 3:29."),p("Jorim","","Named only in Luke 3:29."),p("Eliezer","","Named only in Luke 3:29."),
   p("Jose","","Named only in Luke 3:29."),p("Er","","Named only in Luke 3:28."),p("Elmodam","","Named only in Luke 3:28."),
   p("Cosam","","Named only in Luke 3:28."),p("Addi","","Named only in Luke 3:28."),p("Melchi","","Named only in Luke 3:28."),
   p("Neri","","Luke names him as Shealtiel's father (Luke 3:27).")
  ]}},
 {type:"one",src:"both",title:"Exile and return",sub:"Matthew 1:12 and Luke 3:27",people:[
  p("Shealtiel","Salathiel","Both lists meet here. Matthew calls him the son of Jeconiah; Luke, the son of Neri.",["Salathiel"]),
  p("Zerubbabel","Zorobabel","Led exiles home from Babylon and rebuilt the temple (Ezra 3; Haggai 2:23).",[],{key:1})
 ]},
 {type:"split",title:"After the exile",sub:"Matthew 1:13\u201316 and Luke 3:23\u201327",
  mt:{label:"Matthew",people:[
   p("Abiud","","Named only in Matthew 1:13."),p("Eliakim","","Named only in Matthew 1:13."),p("Azor","","Named only in Matthew 1:13."),
   p("Zadok","Sadoc","Named in Matthew 1:14."),p("Achim","","Named only in Matthew 1:14."),p("Eliud","","Named only in Matthew 1:14."),
   p("Eleazar","","Named in Matthew 1:15."),p("Matthan","","Named only in Matthew 1:15."),
   p("Jacob","","Matthew names him as Joseph's father (Matthew 1:16).")
  ]},
  lk:{label:"Luke",people:[
   p("Rhesa","","Named only in Luke 3:27."),p("Joanna","","Named only in Luke 3:27."),p("Juda","","Named only in Luke 3:26."),
   p("Joseph","","Named only in Luke 3:26."),p("Semei","","Named only in Luke 3:26."),p("Mattathias","","Named only in Luke 3:26."),
   p("Maath","","Named only in Luke 3:26."),p("Nagge","","Named only in Luke 3:25."),p("Esli","","Named only in Luke 3:25."),
   p("Naum","","Named only in Luke 3:25."),p("Amos","","Named in Luke 3:25; not the prophet."),p("Mattathias","","Named only in Luke 3:25."),
   p("Joseph","","Named only in Luke 3:24."),p("Janna","","Named only in Luke 3:24."),p("Melchi","","Named only in Luke 3:24."),
   p("Levi","","Named only in Luke 3:24."),p("Matthat","","Named only in Luke 3:24."),
   p("Heli","","Luke calls Joseph \u201cthe son of Heli\u201d (Luke 3:23). Many read Heli as Mary's father.")
  ]}},
 {type:"one",src:"both",title:"The birth of Jesus",sub:"Matthew 1:16 and Luke 3:23",people:[
  p("Joseph","","\u201cThe husband of Mary, of whom was born Jesus\u201d (Matthew 1:16). Luke adds that Jesus was \u201cas was supposed\u201d his son.",[],{key:1,w:W("Mary","Mother of Jesus. Both Gospels teach she conceived by the Holy Spirit while a virgin (Matthew 1:18; Luke 1:34\u201335).")}),
  p("Jesus","","\u201cJesus, who is called Christ\u201d (Matthew 1:16). Luke's list begins with him.",["Christ"],{jesus:1})
 ]}
];
