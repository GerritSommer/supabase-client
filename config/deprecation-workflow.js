/**
 * [silence] - Keeps this deprecation from spewing all over the console
 * [log] Normal deprecation behavior runs for this deprecation and messages are logged to the console
 * [throw] The error is thrown instead of allowing the deprecated behavior to run.
 * WARNING: APPLICATION MAY GO 💥
 */

/* Allow the global window object */
/* eslint-env browser */
window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "implicit-injections" }
  ]
};
