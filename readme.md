# Agile Frontend

## Warning

**Only commit/merge to the dev branch**

## Recommended IDEs

Here are a few recommended IDEs to use to edit and run this application in development mode:

- VSCode
- GitHub Codespaces (vs code but in browser and easy setup)
- InteliJ Webstorm

## Setup

1) Install NodeJS version 18 (Latest LTS version)
2) Execute the following command in the code's main directory to install the required dependencies `npm install`
3) Create a new file named `.env.local` in the main directory and have it contain the text located below
4) Start the application by running this command `npm run dev`
5) The application should now be visable with the URL displayed in the console output

### .env.local file

```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyAMkITHwvzXynS_SG4BVyFzaZp4Z9vju1c
VITE_API_URL=http://localhost:3000/
```

## Notes

1) This is just the frontend, so the backend will also have to run (on the API URL defined in the env file) to be able to do stuff which requires account authentication.
2) The code can also be edited and ran though github codespaces.
3) The development branch of the application is running here <https://agile-frontend.pages.dev/> but there is currently no backend running so some features will not work.

Run preview here: https://ct503823grp2-ct5038.uogs.co.uk/