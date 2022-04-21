export const SERVER = {
  // URL: 'http://localhost:4000',
  // URL: 'http://54.193.52.160:4000'
  URL: 'http://54.177.141.105:4000'
};

export const REDUCER = {
  SIGNEDIN: 'isSignedIn',
  ISADMIN: 'isAdmin',
  ERR_MSG: 'errMsg',
  TOKEN: 'token',
};

export const ACTION = {
  CUSTOMER_SIGIN: 'CUSTOMER',
  ADMIN_SIGIN: 'ADMIN',
  RESET: 'RESET',
  SHOWERROR: 'ERROR',
  BOOKING: 'BOOKING',
  BOOKING_CLEAR: 'BOOKING_CLEAR',
};

export const BOOKING = {
  SEATS: 'seats',
};

export const AIRPORTS = [
  { key: 'SFO', value: 'San Francisco International Airport (SFO)' },
  { key: 'JFK', value: 'John F. Kennedy International Airport (JFK)' },
  { key: 'ORD', value: "O'Hare International Airport (ORD)" },
  { key: 'SJC', value: 'San Jose International Airport (SJC)' },
  { key: 'EWR', value: 'Newark Liberty International Airport (EWR)' },
  { key: 'LGA', value: 'LaGuardia Airport (LGA)' },
  { key: 'SEA', value: 'Seattle-Tacoma International Airport (SEA)' },
  { key: 'DFW', value: 'Dallas/Fort Worth International Airport (DFW)' },
  { key: 'OAK', value: 'Oakland International Airport (OAK)' },
];
