/* Be Right Back: comeback data.
   Row: [name, role, organisation or country code, category, [out y,m,d], [back y,m,d], reason key, optional year]
   out = date the leader formally left the top office; back = date they formally held it again. */
var BRB = window.BRB = window.BRB || {};
BRB.FEATURED = 'Jensen Huang';
BRB.UPDATED = [2026, 11, 26];
BRB.DATA = [
  /* Companies and organisations */
  ['Sam Altman', 'ceo', 'OpenAI', 'company', [2023,11,17], [2023,11,22], 'boardReversed'],
  ['Jensen Huang', 'ceo', 'NVIDIA', 'company', [2026,11,12], [2026,11,23], 'boardReversed'],
  ['Steve Jobs', 'interimCeo', 'Apple', 'company', [1985,9,17], [1997,9,16], 'acquisition'],
  ['Bob Iger', 'ceo', 'Disney', 'company', [2020,2,25], [2022,11,20], 'boardReplaced'],
  ['Michael Dell', 'ceo', 'Dell', 'company', [2004,7,16], [2007,1,31], 'successorOut'],
  ['Jack Dorsey', 'interimCeo', 'Twitter', 'company', [2008,10,16], [2015,7,1], 'successorOut'],
  ['Howard Schultz', 'ceo', 'Starbucks', 'company', [2000,6,1], [2008,1,7], 'boardReplaced'],
  ['Howard Schultz', 'interimCeo', 'Starbucks', 'company', [2017,4,3], [2022,4,4], 'successorOut'],
  ['Florentino Pérez', 'clubPresident', 'Real Madrid', 'org', [2006,2,27], [2009,6,1], 'successorOut'],
  ['Pedro Sánchez', 'partyLeader', 'PSOE', 'org', [2016,10,1], [2017,5,21], 'partyVote'],
  /* United States and United Kingdom */
  ['Donald J. Trump', 'president', 'US', 'gov', [2021,1,20], [2025,1,20], 'elect', 2024],
  ['Grover Cleveland', 'president', 'US', 'gov', [1889,3,4], [1893,3,4], 'elect', 1892],
  ['Nancy Pelosi', 'speaker', 'USH', 'gov', [2011,1,3], [2019,1,3], 'partyWon', 2018],
  ['Winston Churchill', 'pm', 'UK', 'gov', [1945,7,26], [1951,10,26], 'elect', 1951],
  ['Stanley Baldwin', 'pm', 'UK', 'gov', [1924,1,22], [1924,11,4], 'elect', 1924],
  ['Stanley Baldwin', 'pm', 'UK', 'gov', [1929,6,5], [1935,6,7], 'successorOut'],
  ['Ramsay MacDonald', 'pm', 'UK', 'gov', [1924,11,4], [1929,6,5], 'elect', 1929],
  ['Harold Wilson', 'pm', 'UK', 'gov', [1970,6,19], [1974,3,4], 'elect', 1974],
  ['William Gladstone', 'pm', 'UK', 'gov', [1874,2,17], [1880,4,23], 'elect', 1880],
  ['Benjamin Disraeli', 'pm', 'UK', 'gov', [1868,12,1], [1874,2,20], 'elect', 1874],
  /* Ireland */
  ['Éamon de Valera', 'taoiseach', 'IE', 'gov', [1948,2,18], [1951,6,13], 'elect', 1951],
  ['John A. Costello', 'taoiseach', 'IE', 'gov', [1951,6,13], [1954,6,2], 'elect', 1954],
  ['Charles Haughey', 'taoiseach', 'IE', 'gov', [1981,6,30], [1982,3,9], 'elect', 1982],
  ['Charles Haughey', 'taoiseach', 'IE', 'gov', [1982,12,14], [1987,3,10], 'elect', 1987],
  ['Garret FitzGerald', 'taoiseach', 'IE', 'gov', [1982,3,9], [1982,12,14], 'elect', 1982],
  /* France and Italy */
  ['Napoleon Bonaparte', 'emperor', 'FR', 'gov', [1814,4,6], [1815,3,20], 'exile'],
  ['Charles de Gaulle', 'pm', 'FR', 'gov', [1946,1,20], [1958,6,1], 'crisis', 1958],
  ['Jacques Chirac', 'pm', 'FR', 'gov', [1976,8,25], [1986,3,20], 'elect', 1986],
  ['Silvio Berlusconi', 'pm', 'IT', 'gov', [1995,1,17], [2001,6,11], 'elect', 2001],
  ['Silvio Berlusconi', 'pm', 'IT', 'gov', [2006,5,17], [2008,5,8], 'elect', 2008],
  ['Romano Prodi', 'pm', 'IT', 'gov', [1998,10,21], [2006,5,17], 'elect', 2006],
  /* Central and Eastern Europe */
  ['Viktor Orbán', 'pm', 'HU', 'gov', [2002,5,27], [2010,5,29], 'elect', 2010],
  ['Robert Fico', 'pm', 'SK', 'gov', [2010,7,8], [2012,4,4], 'elect', 2012],
  ['Robert Fico', 'pm', 'SK', 'gov', [2018,3,22], [2023,10,25], 'elect', 2023],
  ['Donald Tusk', 'pm', 'PL', 'gov', [2014,9,22], [2023,12,13], 'coalition'],
  ['Andrej Babiš', 'pm', 'CZ', 'gov', [2021,11,28], [2025,12,9], 'elect', 2025],
  ['Janez Janša', 'pm', 'SI', 'gov', [2013,3,20], [2020,3,13], 'coalition'],
  ['Sebastian Kurz', 'chancellor', 'AT', 'gov', [2019,6,3], [2020,1,7], 'coalition'],
  /* Nordic countries */
  ['Olof Palme', 'pm', 'SE', 'gov', [1976,10,8], [1982,10,8], 'elect', 1982],
  ['Gro Harlem Brundtland', 'pm', 'NO', 'gov', [1981,10,14], [1986,5,9], 'collapse'],
  ['Jens Stoltenberg', 'pm', 'NO', 'gov', [2001,10,19], [2005,10,17], 'elect', 2005],
  /* North America and Oceania */
  ['Pierre Trudeau', 'pm', 'CA', 'gov', [1979,6,4], [1980,3,3], 'elect', 1980],
  ['Mackenzie King', 'pm', 'CA', 'gov', [1926,6,29], [1926,9,25], 'elect', 1926],
  ['Robert Menzies', 'pm', 'AU', 'gov', [1941,8,29], [1949,12,19], 'elect', 1949],
  ['Kevin Rudd', 'pm', 'AU', 'gov', [2010,6,24], [2013,6,27], 'partyVote'],
  /* Middle East and Asia */
  ['Benjamin Netanyahu', 'pm', 'IL', 'gov', [1999,7,6], [2009,3,31], 'elect', 2009],
  ['Benjamin Netanyahu', 'pm', 'IL', 'gov', [2021,6,13], [2022,12,29], 'elect', 2022],
  ['Yitzhak Rabin', 'pm', 'IL', 'gov', [1977,6,20], [1992,7,13], 'elect', 1992],
  ['Shinzo Abe', 'pm', 'JP', 'gov', [2007,9,26], [2012,12,26], 'elect', 2012],
  ['Shigeru Yoshida', 'pm', 'JP', 'gov', [1947,5,24], [1948,10,15], 'collapse'],
  ['Mahathir Mohamad', 'pm', 'MY', 'gov', [2003,10,31], [2018,5,10], 'elect', 2018],
  ['Indira Gandhi', 'pm', 'IN', 'gov', [1977,3,24], [1980,1,14], 'elect', 1980],
  ['Benazir Bhutto', 'pm', 'PK', 'gov', [1990,8,6], [1993,10,19], 'elect', 1993],
  ['Nawaz Sharif', 'pm', 'PK', 'gov', [1993,7,18], [1997,2,17], 'elect', 1997],
  ['Nawaz Sharif', 'pm', 'PK', 'gov', [1999,10,12], [2013,6,5], 'elect', 2013],
  ['Sheikh Hasina', 'pm', 'BD', 'gov', [2001,7,15], [2009,1,6], 'elect', 2008],
  ['Khaleda Zia', 'pm', 'BD', 'gov', [1996,3,30], [2001,10,10], 'elect', 2001],
  ['KP Sharma Oli', 'pm', 'NP', 'gov', [2021,7,13], [2024,7,15], 'coalition'],
  /* Latin America and the Caribbean */
  ['Juan Perón', 'president', 'AR', 'gov', [1955,9,21], [1973,10,12], 'elect', 1973],
  ['Hipólito Yrigoyen', 'president', 'AR', 'gov', [1922,10,12], [1928,10,12], 'elect', 1928],
  ['Alan García', 'president', 'PE', 'gov', [1990,7,28], [2006,7,28], 'runoff', 2006],
  ['Daniel Ortega', 'president', 'NI', 'gov', [1990,4,25], [2007,1,10], 'elect', 2006],
  ['Sebastián Piñera', 'president', 'CL', 'gov', [2014,3,11], [2018,3,11], 'runoff', 2017],
  ['Michelle Bachelet', 'president', 'CL', 'gov', [2010,3,11], [2014,3,11], 'runoff', 2013],
  ['Carlos Ibáñez del Campo', 'president', 'CL', 'gov', [1931,7,26], [1952,11,3], 'elect', 1952],
  ['Óscar Arias', 'president', 'CR', 'gov', [1990,5,8], [2006,5,8], 'elect', 2006],
  ['Leonel Fernández', 'president', 'DO', 'gov', [2000,8,16], [2004,8,16], 'elect', 2004],
  ['Tabaré Vázquez', 'president', 'UY', 'gov', [2010,3,1], [2015,3,1], 'runoff', 2014],
  ['Julio María Sanguinetti', 'president', 'UY', 'gov', [1990,3,1], [1995,3,1], 'elect', 1994],
  ['Carlos Andrés Pérez', 'president', 'VE', 'gov', [1979,3,12], [1989,2,2], 'elect', 1988],
  ['Rafael Caldera', 'president', 'VE', 'gov', [1974,3,11], [1994,2,2], 'elect', 1993],
  ['Hugo Banzer', 'president', 'BO', 'gov', [1978,7,21], [1997,8,6], 'elect', 1997],
  ['Jean-Bertrand Aristide', 'president', 'HT', 'gov', [1991,9,30], [1994,10,15], 'restored'],
  ['Luiz Inácio Lula da Silva', 'president', 'BR', 'gov', [2011,1,1], [2023,1,1], 'runoff', 2022],
  /* Africa */
  ['John Dramani Mahama', 'president', 'GH', 'gov', [2017,1,7], [2025,1,7], 'elect', 2024],
  ['Peter Mutharika', 'president', 'MW', 'gov', [2020,6,28], [2025,10,4], 'elect', 2025],
  ['Mathieu Kérékou', 'president', 'BJ', 'gov', [1991,4,4], [1996,4,4], 'elect', 1996],
  ['Denis Sassou Nguesso', 'president', 'CG', 'gov', [1992,8,31], [1997,10,25], 'civilWar'],
  ['Olusegun Obasanjo', 'president', 'NG', 'gov', [1979,10,1], [1999,5,29], 'elect', 1999],
  ['Muhammadu Buhari', 'president', 'NG', 'gov', [1985,8,27], [2015,5,29], 'elect', 2015]
];
