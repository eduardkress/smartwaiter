import { SSTConfig } from 'sst';
import { Table, Config, NextjsSite } from 'sst/constructs';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';

const appName = 'demo';
const domainCertArn =
  'arn:aws:acm:us-east-1:984009409855:certificate/0fe9ca89-945d-427b-8b38-7f81060092d6';

export default {
  config(_input) {
    return {
      name: appName + '-smartwaiter',
      region: 'eu-central-1'
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      // Remove all resources on dev stages (otherwise s3 buckets, databases etc. are not deleted)
      if (app.stage === 'dev') {
        app.setDefaultRemovalPolicy('destroy');
      }
      //Add Secrets. Be sure to add them to AWS with: npx sst secrets set --stage prod SECRET_KEY value
      // const NEXTAUTH_URL = new Config.Secret(stack, "NEXTAUTH_URL");
      //const NEXTAUTH_SECRET = new Config.Secret(stack, "NEXTAUTH_SECRET");
      //const SALT = new Config.Secret(stack, "SALT");

      //Add Tables to App Stack
      const usersTable = new Table(stack, 'Users', {
        fields: {
          email: 'string',
          name: 'string',
          password: 'string',
          role: 'string'
        },
        primaryIndex: { partitionKey: 'email' }
      });
      const categoriesTable = new Table(stack, 'Categories', {
        fields: {
          id: 'string'
        },
        primaryIndex: { partitionKey: 'id' }
      });
      const productsTable = new Table(stack, 'Products', {
        fields: {
          id: 'string'
        },
        primaryIndex: { partitionKey: 'id' }
      });
      const variantsTable = new Table(stack, 'Variants', {
        fields: {
          id: 'string'
        },
        primaryIndex: { partitionKey: 'id' }
      });
      const optionsGroupsTable = new Table(stack, 'OptionsGroup', {
        fields: {
          id: 'string'
        },
        primaryIndex: { partitionKey: 'id' }
      });
      const optionsTable = new Table(stack, 'Options', {
        fields: {
          id: 'string'
        },
        primaryIndex: { partitionKey: 'id' }
      });

      // app.addDefaultFunctionEnv({
      //   TEST: 'TEST ENV' ,
      //   StringParameter.valueFromLookup(stack, "my_api_key")
      // });

      console.log(app);
      const site = new NextjsSite(stack, 'site', {
        environment: {
          NEXTAUTH_URL:
            app.stage === 'dev'
              ? 'http://localhost:3000'
              : 'https://' + appName + '.smartwaiter.app',
          NEXTAUTH_SECRET: '33jr9jfH5CLwSqsArC2uugxFXFW7vZhF',
          SALT: 'EjW8grHa5Ohg7xGVpxVDxq08wSZZxJiw'
        },
        customDomain: {
          isExternalDomain: true,
          domainName: appName + '.smartwaiter.app',
          cdk: {
            certificate: Certificate.fromCertificateArn(
              stack,
              appName + '-certificate',
              domainCertArn
            )
          }
        },
        bind: [
          usersTable,
          categoriesTable,
          productsTable,
          variantsTable,
          optionsGroupsTable,
          optionsTable
        ]
      });

      stack.addOutputs({
        SiteUrl: site.url
      });
    });
  }
} satisfies SSTConfig;
