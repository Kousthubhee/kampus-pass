// Inside `cities` object — add new entries

const cities = {
  ...,
  'rouen': {
    name: 'Rouen',
    description: 'Historic Normandy city and home to top-tier business schools',
    schools: [
      {
        id: 'neoma-rouen',
        name: 'NEOMA Business School - Rouen Campus',
        description: 'Innovative curriculum and strong industry links',
        location: 'Rouen',
        ranking: '#6 in France',
        programs: ['Grande École', 'MSc in Business Analytics', 'Executive MBA'],
        tuition: '€32,000 - €62,000',
        image: '🏫'
      },
      {
        id: 'inseec-rouen',
        name: 'INSEEC Business School - Rouen',
        description: 'Dynamic programs with international mobility',
        location: 'Rouen',
        ranking: '#14 in France',
        programs: ['Bachelor', 'Master in Management'],
        tuition: '€18,000 - €35,000',
        image: '🏛️'
      }
    ]
  },
  'nice': {
    name: 'Nice',
    description: 'Mediterranean city with international business programs',
    schools: [
      {
        id: 'ipag-nice',
        name: 'IPAG Business School',
        description: 'Global business outlook with focus on innovation',
        location: 'Nice',
        ranking: '#15 in France',
        programs: ['BBA', 'MSc', 'DBA'],
        tuition: '€20,000 - €45,000',
        image: '🌞'
      }
    ]
  },
  'toulouse': {
    name: 'Toulouse',
    description: 'Aerospace hub with elite business education options',
    schools: [
      {
        id: 'tbs',
        name: 'Toulouse Business School',
        description: 'Triple-accredited school with global recognition',
        location: 'Toulouse',
        ranking: '#8 in France',
        programs: ['Grande École', 'MSc', 'Global MBA'],
        tuition: '€30,000 - €58,000',
        image: '🚀'
      }
    ]
  }
};
