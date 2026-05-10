
CREATE TABLE IF NOT EXISTS tournaments (
  id TEXT PRIMARY KEY,
  titleFr TEXT NOT NULL,
  titleAr TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  gameType TEXT NOT NULL,
  maxParticipants INTEGER NOT NULL,
  entryFee INTEGER NOT NULL,
  prizePool TEXT NOT NULL,
  status TEXT NOT NULL,
  createdAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS participants (
  id TEXT PRIMARY KEY,
  tournamentId TEXT NOT NULL,
  fullName TEXT NOT NULL,
  phone TEXT NOT NULL,
  level TEXT NOT NULL,
  status TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  wins INTEGER NOT NULL DEFAULT 0,
  createdAt TEXT NOT NULL,
  FOREIGN KEY (tournamentId) REFERENCES tournaments(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS rewards (
  id TEXT PRIMARY KEY,
  tournamentId TEXT NOT NULL,
  position INTEGER NOT NULL,
  titleFr TEXT NOT NULL,
  titleAr TEXT NOT NULL,
  amount INTEGER NOT NULL,
  descriptionFr TEXT NOT NULL,
  descriptionAr TEXT NOT NULL,
  FOREIGN KEY (tournamentId) REFERENCES tournaments(id) ON DELETE CASCADE
);
