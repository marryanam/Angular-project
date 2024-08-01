import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCp04FdqTjbQrjg_E2wwxfy80BJpXHTfWY",
  authDomain: "angular-project-a88c0.firebaseapp.com",
  projectId: "angular-project-a88c0",
  storageBucket: "angular-project-a88c0.appspot.com",
  messagingSenderId: "757818492875",
  appId: "1:757818492875:web:45616c4b01cc9aa13b184e",
  measurementId: "G-Z40756LCHB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
