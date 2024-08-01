import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DesignPageComponent } from './pages/design-page/design-page.component';
import { FunctionalityPageComponent } from './pages/functionality-page/functionality-page.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'design', component: DesignPageComponent },
    { path: 'functionality', component: FunctionalityPageComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
