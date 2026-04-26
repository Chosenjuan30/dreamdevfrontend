export const ELECTIONS = [
  {
    id: 1,
    title: "Student Union Presidential Election 2025",
    status: "open",
    closes: "Apr 30, 2025",
    candidates: [
      { id: "c1", name: "Adaeze Okonkwo",   party: "Progressive Students Alliance", initials: "AO", color: "#ffd65a", votes: 794 },
      { id: "c2", name: "Emeka Mensah",     party: "United Students Front",          initials: "EM", color: "#4ecb8d", votes: 359 },
      { id: "c3", name: "Fatima Diallo",    party: "Students First Movement",        initials: "FD", color: "#e8665a", votes: 128 },
    ],
  },
  {
    id: 2,
    title: "Faculty of Engineering Representative",
    status: "open",
    closes: "May 5, 2025",
    candidates: [
      { id: "c4", name: "Oluwaseun Adeyemi",    party: "Tech Forward",      initials: "OA", color: "#ffd65a", votes: 211 },
      { id: "c5", name: "Kwame Nkrumah-Asante", party: "Engineers United",  initials: "KN", color: "#4ecb8d", votes: 157 },
      { id: "c6", name: "Amara Sesay",           party: "Progress Alliance", initials: "AS", color: "#5a9fe8", votes: 81  },
    ],
  },
  {
    id: 3,
    title: "Sports Committee Chairperson",
    status: "upcoming",
    opens: "May 10, 2025",
    candidates: [
      { id: "c7", name: "Chidi Okeke",  party: "Active Campus",     initials: "CO", color: "#ffd65a", votes: 0 },
      { id: "c8", name: "Zara Boateng", party: "Sports & Wellness",  initials: "ZB", color: "#4ecb8d", votes: 0 },
    ],
  },
  {
    id: 4,
    title: "Arts Council Secretary 2024",
    status: "closed",
    closes: "Jan 15, 2025",
    candidates: [
      { id: "c9",  name: "Nkechi Adama",    party: "Creative Arts", initials: "NA", color: "#ffd65a", votes: 320 },
      { id: "c10", name: "Seun Oladele",    party: "Arts Forward",  initials: "SO", color: "#4ecb8d", votes: 210 },
      { id: "c11", name: "Mercy Akintunde", party: "United Arts",   initials: "MA", color: "#5a9fe8", votes: 142 },
    ],
  },
];

export const VOTERS = [
  { id: "V-00482", name: "Adaeze Okonkwo",  election: "Student Union Pres.", time: "09:14" },
  { id: "V-00391", name: "Emeka Chukwu",    election: "Engineering Rep.",    time: "09:03" },
  { id: "V-00517", name: "Ngozi Eze",       election: "Student Union Pres.", time: "08:58" },
  { id: "V-00284", name: "Kwame Asante",    election: "Student Union Pres.", time: "08:44" },
  { id: "V-00156", name: "Fatima Camara",   election: "Engineering Rep.",    time: "08:29" },
];
