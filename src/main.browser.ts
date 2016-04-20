/*
 * Providers provided by Angular
 */
import {bootstrap} from 'angular2/platform/browser';

/*
* App Component
* our top level component that holds all of our components
*/
import {App, APP_PROVIDERS} from './app';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main(initialHmrState?: any): Promise<any> {

  return bootstrap(App, [
    ...APP_PROVIDERS
  ])
  .catch(err => console.error(err));
}

/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */
if ('development' === ENV && HMR === true) {
  // activate hot module reload
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  // bootstrap when documetn is ready
  document.addEventListener('DOMContentLoaded', () => main());
}
