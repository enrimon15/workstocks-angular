export const environment = {
  production: true,
  baseUrl: 'http://localhost:9100/workstocks/rest/v1',
  login: 'auth/login',
  register: 'auth/register',
  home: {
    popularCompanies: 'companies/popular',
    popularJobOffers: 'job-offers/popular',
    applicationsCount: 'applications/count',
    applicantsCount: 'applicants/count',
    companiesCount: 'companies/count',
    jobOffersCount: 'job-offers/count'
  },
  applicant: {
    search: 'applicants/search',
    get: 'applicants',
    checkUniqueEmail: 'applicants/email-unique',
    email: 'email'
  },
  onlineCv: {
    skills: 'skills',
    qualifications: 'qualifications',
    certifications: 'certifications',
    experiences: 'experiences',
    cv: 'cv',
    password: 'password'
  },
  company: {
    search: 'companies/search',
    get: 'companies',
    review: 'reviews',
    jobAlert: 'job-alerts'
  },
  jobOffer: {
    search: 'job-offers/search',
    get: 'job-offers'
  },
  favourites: {
    get: 'favourites'
  },
  application: {
    get: 'applications'
  },
  dashboard: {
    photo: 'photo'
  },
  news: {
    get: 'news',
    likes: 'likes'
  }
};
