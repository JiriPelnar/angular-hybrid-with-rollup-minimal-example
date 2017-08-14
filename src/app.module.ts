import { Component, NgModule } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { BrowserModule } from '@angular/platform-browser';
import { UIRouterModule } from '@uirouter/angular';

import { UIRouterUpgradeModule } from "@uirouter/angular-hybrid"; 

// An Angular component
@Component({
    selector: 'ng2-component',
    template: `
      <h1>ng2 component</h1>
      <a uiSref="app">Back to app</a>
      <ui-view></ui-view>
    `
}) export class Ng2Component {
    protected a(): void {

    }
}

// The root Angular module
@NgModule({
  imports: [
    BrowserModule,
    // Provide Angular upgrade capabilities
    UpgradeModule,
    UIRouterUpgradeModule,
    // Provides the @uirouter/angular directives
    UIRouterModule,
  ],
  declarations: [Ng2Component],
  entryComponents: [Ng2Component],
}) export class RootModule {
  ngDoBootstrap() {
    /* no body: this disables normal (non-hybrid) Angular bootstrapping */
  }
}