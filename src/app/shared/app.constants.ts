import { isDevMode } from '@angular/core';


export let GlobalConfig = {
    baseUrl: {
      server: isDevMode ? 'http://localhost/' : 'http://production.cbn74jkkbv.eu-west-1.elasticbeanstalk.com/',
      apiUrl: 'api/overview/'
    }
  };
