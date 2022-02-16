// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:9100/workstocks/rest',
  home: {
    popularCompanies: 'v1/companies/popular',
    popularJobOffers: 'v1/job-offers/popular',
    applicationsCount: 'v1/applications/count',
    applicantsCount: 'v1/applicants/count',
    companiesCount: 'v1/companies/count',
    jobOffersCount: 'v1/job-offers/count'
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
