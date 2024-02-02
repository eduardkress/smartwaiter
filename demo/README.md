## Getting Started

First, deploy a dev stage. The stage will be named using the currents user login name:

```bash
npm run dev:local1
```

After that run the local dev server and bind to the deployed dev stage:

```bash
npm run dev:local2
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy to AWS with SST

Production:
Deploy to AWS with:

```bash
npm run deploy:prod
# or
npx sst deploy --stage prod
```

Possible errors:

1. Resource handler returned message: "Resource of type 'AWS::DynamoDB::Table' with identifier 'XXXX' already exists.
   Please delete the ressource by hand in AWS Console
2. Resource handler returned message: "Invalid request provided: AWS::CloudFront::Distribution: One or more aliases specified for the distribution includes an incorrectly configured DNS record that points to another CloudFront distribution 
   Please remove old CNAME from your Domain provider (eg. Namecheap). After deploymend you need to set CNAME to the new correct URL.

## Currently the best way to create a new company json

First create a JSON schema using typescript-json-schema. 

```bash
npx typescript-json-schema src/types/restaurant2.ts Restaurant --strictNullChecks --required --propOrder
```

Copy the schema from the console and go to [this online json schema editor](https://rjsf-team.github.io/react-jsonschema-form/), select "Blank" on the top left, paste the copied schema into JSONSchema and start creating the new company schema.