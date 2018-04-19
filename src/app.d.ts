//Type Definition file 

declare module App {
  interface Service {
    name: string;
    url: string;
  }

  export interface Configuration {
    isDevelopment: boolean,
    isStaging: boolean,
    isProduction: boolean,
    urls: Object;
    services: Object;
  }
}


declare var AppConfig: App.Configuration;
