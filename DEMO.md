# Demoing With Minted <br><br><sup><sup>Running The Project How-To Guide</sup></sup>

The project is deployed and can be demoed on [mintd.vercel.app](https://mintd.vercel.app/).

[mintd.vercel.app](https://mintd.vercel.app/) is run on the same api keys given to you to run locally. Deployed and locally run version will produce the same instance.

<br/>

## Prerequisites 

Have Node.js version >= 18.17.0 installed.

Download Node.js [here](https://nodejs.org/en/download).

<br/>

## Run the project locally

1. Clone the repository

   ```bash
   git clone https://github.com/nam-t24/Senior-CS-Project.git
   ```

2. Go into the project directory

   ```bash
   cd Senior-CS-Project
   ```

3. Create the environment file

   Create a file in the root directory named `.env.local`

   Must be created since we wanted to avoid uploading secret api keys online

4. Populate the environment file

   Copy and paste the template below and add the given API keys into `.env.local`

   ```
   NEXT_PUBLIC_SUPABASE_URL=project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=anon-key
   ```

5. Install packages (requires node version >= 18.17.0)

   ```bash
   npm install
   ```

6. Run project

   ```bash
   npm run dev
   ```
   It should now be running on [localhost:3000](http://localhost:3000/).


<br/>
<br/>

For a better understanding of the repository structure, refer to the [directory navigation](/README.md#directory-navigation).
   
