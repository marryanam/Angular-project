import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DesignPageComponent } from './pages/design-page/design-page.component';
import { FunctionalityPageComponent } from './pages/functionality-page/functionality-page.component';
import { NgModule } from '@angular/core';
import { FrontPageComponent } from './pages/front-page/front-page.component';

export const routes: Routes = [
    { path: '', component: FrontPageComponent },
    { path: 'design', component: DesignPageComponent, children: [
        { path: 'page-1', component: DesignPageComponent },
        { path: 'page-2', component: DesignPageComponent },
        { path: 'page-3', component: DesignPageComponent }
    ]},
    { path: 'functionality', component: FunctionalityPageComponent, children: [
        { path: 'page-1', component: FunctionalityPageComponent },
        { path: 'page-2', component: FunctionalityPageComponent },
        { path: 'page-3', component: FunctionalityPageComponent }
    ]},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
