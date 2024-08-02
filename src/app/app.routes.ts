import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DesignPageComponent } from './pages/design-page/design-page.component';
import { FunctionalityPageComponent } from './pages/functionality-page/functionality-page.component';
import { NgModule } from '@angular/core';
import { FrontPageComponent } from './pages/front-page/front-page.component';

export const routes: Routes = [
    { path: '', component: FrontPageComponent },
    { path: 'design', component: DesignPageComponent },
    { path: 'functionality', component: FunctionalityPageComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
