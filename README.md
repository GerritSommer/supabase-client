# supabase-client

## Web client, which connects to [Supabase](https://supabase.io/) using the REST API. Includes authentication, data querying/saving and file uploads.


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
* Add the following SQL Queries/Snippets:
  ```
    -- inserts a row into public.users
    create or replace function public.handle_new_user()
    returns trigger
    language plpgsql
    security definer
    --search_path = public
    as $$
    begin
      insert into public.users (id, email)
      values (new.id, new.email);
      return new;
    end;
    $$;


    DROP TRIGGER IF EXISTS on_auth_user_created on auth.users;
    create trigger on_auth_user_created
      after insert on auth.users
      for each row execute procedure public.handle_new_user();
  ```

  ```
    -- Create a table for Public Profiles
    create table users (
      id uuid references auth.users on delete cascade not null,

      updated_at timestamp with time zone,
      name text,
      avatar text,
      email text,

      primary key (id),
      unique(email),
      constraint name_length check (char_length(name) >= 2)
    );

    alter table users enable row level security;

    create policy "Public users are viewable by logged in users."
      on users for select
      using ( auth.role() = 'authenticated' );

    create policy "Users can insert their own profile."
      on users for insert
      with check ( auth.uid() = id );

    create policy "Users can update own profile."
      on users for update
      using ( auth.uid() = id );

    -- Set up Realtime!
    begin;
      drop publication if exists supabase_realtime;
      create publication supabase_realtime;
    commit;
    alter publication supabase_realtime add table users;

    -- Set up Storage!
    insert into storage.buckets (id, name)
    values ('avatars', 'avatars');

    create policy "Avatar images are publicly accessible."
      on storage.objects for select
      using ( bucket_id = 'avatars' );

    create policy "Anyone can upload an avatar."
      on storage.objects for insert
      with check ( bucket_id = 'avatars' );

    create policy "Anyone can update an avatar."
      on storage.objects for update
      with check ( bucket_id = 'avatars' );
  ```
* Invite s user via email in the Auth tab at [Supabase](https://supabase.io/)
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
