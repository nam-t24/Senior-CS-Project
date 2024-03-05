# Minted <br><br><sup><sup>Senior Design Project by the Shadow Wizard Money Gang</sup></sup><br>[![Made with Supabase](https://supabase.com/badge-made-with-supabase-dark.svg)](https://supabase.com)

#### Bridging the gap between non-profits and donors to fund projects.

## Tech Stack
### Front End
- Next.js 14
- TypeScript
- Tailwind CSS

### Database and Auth
- Supabase

### Deployment
- Vercel

## Initialization
### Connecting to Supabase Database

1. Get Project Keys

   Go to Project API section in the Supabase Database and find the Project URL and API Key

2. Create env File

   Create `.env.local` file and populate url and key, get template from `.env.example`

   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
   Don't populate in .env.example and upload online lol

### Running the Project

3. Install Packages (requires node version >= 18.17.0) 

   ```bash
   npm install
   ```
4. Run Project

   ```bash
   npm run dev
   ```
   It should now be running on [localhost:3000](http://localhost:3000/).

## Theming

Use tailwind theme extensions under `tailwind.config.js`

```javascript
theme: {
   extend: {
     colors: {
         background: "#FFFBFB", //near white

         darkmaroon: "#590D24",
         //Color palette from figma
         maroon: "#944E63",
         lightmaroon: "#B47B84",
         brown: "CAA6A6",
         peach: "#FFE7E7",

         //Text colors
         primary: "#FFFBFB", //near white, use as substitute to white text
         heading: "#262626", //dark gray, use for big texts and headings
         body: "#737373", //light gray, use for small texts and body
     },
   },
},
```

Use Material UI icons found [here](https://mui.com/material-ui/material-icons/) for any svg icons

Minted uses [shadcn/ui](https://ui.shadcn.com/) for UI components

## Directory Navigation

### Page navigation
`/app/dashboard`  
Contains pages split by the sidenav menu options

`app/login`  
Contains only the login page

`/app/auth/callback`  
Handles user auth control from email or google sign in

### API calls
`/utils/scripts`  
Contains all API calls and queries to the Supabase database. Calls are separated by the table/functionality it is associated with.

### Shadcn components
`/components/ui`  
Reserved for all component files downloaded from shadcn

### Database types
`/database.types.ts`  
Created and updated using Supabase CLI type generation. Makes it easier to recognize data from Supabase queries.  
I just run the CLI command everytime we expand the database lol

