import $ from "jquery";
import moment from "moment";

let pluginsPromise = null;

/**
 * Load jQuery UI + daterangepicker only after globals are set.
 * Avoids production bundle evaluation order crashes on Netlify.
 */
export function loadJqueryPlugins() {
  if (!pluginsPromise) {
    pluginsPromise = (async () => {
      window.jQuery = window.$ = $;
      window.moment = moment;

      await import("jquery-ui-dist/jquery-ui.css");
      await import("jquery-ui-dist/jquery-ui.js");
      await import("daterangepicker/daterangepicker.css");
      await import("daterangepicker");

      return $;
    })();
  }

  return pluginsPromise;
}

export { $, moment };
