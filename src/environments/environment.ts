// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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
    cv: 'cv'
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
