import { isDevMode } from '@angular/core';


export let GlobalConfig = {
    baseUrl: {
      server: isDevMode ? 'https://localhost:44335/' : '',
      apiUrl: 'api/overview/'
    }
  };
