# supabase-client

# Web client, which connects to [Supabase](https://supabase.io/) and uses authentication and data saving and loading via REST.


<!-- https://supabase.io/docs/gotrue/server/about -->

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)
* [volta.sh](https://volta.sh/)

## Installation

* `git clone <repository-url>` this repository
* `cd supabase-client`
* `npm install`
* Create a project at [Supabase](https://supabase.io/)
* `cp .env-example .env-development && cp .env-example .env-production`
* Enter your supabase apiKey and URL in the '.env-development' and '.env-production'

## Usage
* Add your local dev server to supabase AUTH settings
  - Site URL: http://localhost:4200
  - Additional Redirect URLs: http://localhost:4200
* Invite as user via email in the Auth tab at [Supabase](https://supabase.io/)
* The link in your email will automatically log you in and ask you for a password
* You can also send "magic links" via the auth dashboard

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Start your tests with `ember s -e test` and visit [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint`
* `npm run lint:fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
