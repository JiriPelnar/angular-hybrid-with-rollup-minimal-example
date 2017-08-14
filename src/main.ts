import * as angular from 'angular';
import { platformBrowser } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { UrlService } from '@uirouter/core';

import { upgradeModule } from "@uirouter/angular-hybrid";

import uiRouter from "@uirouter/angularjs";

import { RootModuleNgFactory } from "../aot/src/app.module.ngfactory";



import { Ng2Component } from "./app.module";


var app = angular.module('minimal', [uiRouter, upgradeModule.name]);

app.run(($stateRegistry, $urlService) => {
  $urlService.rules.initial({state: 'app'});

  $stateRegistry.register({
      url: '',
      name: 'app',
      template: `
        <a ui-sref=".ng1" ui-sref-active-eq="active">app.ng1</a>
        <a ui-sref=".ng1.ng2" ui-sref-active-eq="active">app.ng1.ng2</a>
        <a ui-sref=".ng2" ui-sref-active-eq="active">app.ng2</a>
        <a ui-sref=".ng2.ng2" ui-sref-active-eq="active">app.ng2.ng2</a>
        <ui-view></ui-view>
      `
  });

  // route to ng1 component
  $stateRegistry.register({
      url: '/ng1',
      name: 'app.ng1',
      component: 'ng1Component',
  });

  // nested route to ng2 component
  $stateRegistry.register({
      url: '/ng2',
      name: 'app.ng1.ng2',
      component: Ng2Component,
  });

  // route to ng2 component
  $stateRegistry.register({
      url: '/ng2',
      name: 'app.ng2',
      component: Ng2Component,
  });

  // nested route to ng2 component
  $stateRegistry.register({
      url: '/ng2',
      name: 'app.ng2.ng2',
      component: Ng2Component,
  });
});



// An AngularJS component
app.component('ng1Component',
{
    template: `
  <h1>ng1 component</h1>
  <a ui-sref="app">Back to app</a>
  <ui-view></ui-view>
`
});

// Using AngularJS config block, call `deferIntercept()`.
// This tells UI-Router to delay the initial URL sync (until all bootstrapping is complete)
app.config([ '$urlServiceProvider', $urlService => $urlService.deferIntercept() ]);

// Manually bootstrap the Angular app
platformBrowser().bootstrapModuleFactory(RootModuleNgFactory).then(platformRef => {
  const injector = platformRef.injector;
  const upgrade = injector.get(UpgradeModule) as UpgradeModule;
  
  // The DOM must be already be available
  upgrade.bootstrap(document.body, [app.name]);

  // Intialize the Angular Module (get() any UIRouter service from DI to initialize it)
  const url = injector.get(UrlService);

  // Instruct UIRouter to listen to URL changes
  url.listen();
  url.sync();
});
