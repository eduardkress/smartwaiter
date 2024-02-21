import { SSTConfig } from "sst";
import { Table, NextjsSite, AppSyncApi } from "sst/constructs";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import * as cdk from "aws-cdk-lib";
import * as appsync from "aws-cdk-lib/aws-appsync";

const appName = "ariana";
const domainCertArn =
  "arn:aws:acm:us-east-1:984009409855:certificate/41a6b51b-8f7d-4935-af78-b03f06eff2bf";

export default {
  config(_input) {
    return {
      name: appName + "-smartwaiter",
      region: "eu-central-1",
      profile: "smartwaiter",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      // Remove all resources on dev stages (otherwise s3 buckets, databases etc. are not deleted)
      if (app.stage !== "prod") {
        app.setDefaultRemovalPolicy("destroy");
      }
      //Add Secrets. Be sure to add them to AWS with: npx sst secrets set --stage prod SECRET_KEY value
      // const NEXTAUTH_URL = new Config.Secret(stack, "NEXTAUTH_URL");
      //const NEXTAUTH_SECRET = new Config.Secret(stack, "NEXTAUTH_SECRET");
      //const SALT = new Config.Secret(stack, "SALT");

      //Add Tables to App Stack
      const usersTable = new Table(stack, "Users", {
        fields: {
          email: "string",
        },
        primaryIndex: { partitionKey: "email" },
      });

      const desksTable = new Table(stack, "Desks", {
        fields: {
          id: "string",
        },
        primaryIndex: { partitionKey: "id" },
      });

      const orderCodesTable = new Table(stack, "OrderCodes", {
        fields: {
          id: "string",
        },
        primaryIndex: { partitionKey: "id" },
      });

      const ordersTable = new Table(stack, "Orders", {
        fields: {
          id: "string",
        },
        primaryIndex: { partitionKey: "id" },
      });

      // app.addDefaultFunctionEnv({
      //   TEST: 'TEST ENV' ,
      //   StringParameter.valueFromLookup(stack, "my_api_key")
      // });

      console.log(app);

      // Create the AppSync GraphQL API
      const api = new AppSyncApi(stack, "AppSyncApi", {
        schema: "src/appSync/graphql/schema.graphql",
        cdk: {
          graphqlApi: {
            authorizationConfig: {
              defaultAuthorization: {
                authorizationType: appsync.AuthorizationType.API_KEY,
                apiKeyConfig: {
                  expires: cdk.Expiration.after(cdk.Duration.days(365)),
                },
              },
            },
          },
        },
        defaults: {
          function: {
            // Bind the table name to the function
            bind: [ordersTable, orderCodesTable],
          },
        },
        dataSources: {
          order: "src/appSync/graphql/order/main.handler",
          orderCode: "src/appSync/graphql/orderCode/main.handler",
        },
        resolvers: {
          "Query listOrders": "order",
          "Mutation createOrder": "order",
          "Mutation updateOrder": "order",
          "Mutation deleteOrder": "order",
          "Query listActiveOrderCodes": "orderCode",
          "Query getOrderCodeById": "orderCode",
          "Mutation createOrderCode": "orderCode",
        },
      });

      const site = new NextjsSite(stack, "site", {
        environment: {
          NEXTAUTH_URL:
            app.stage === "prod"
              ? "https://" + appName + ".smartwaiter.app"
              : "http://localhost:3000",
          NEXTAUTH_SECRET: "33jr9jfH5CLwSqsArC2uugxFXFW7vZhF",
          SALT: "EjW8grHa5Ohg7xGVpxVDxq08wSZZxJiw",
          NEXT_PUBLIC_APP_URL:
            app.stage === "prod"
              ? "https://" + appName + ".smartwaiter.app"
              : "http://localhost:3000",
        },
        customDomain: {
          isExternalDomain: true,
          domainName: appName + ".smartwaiter.app",
          cdk: {
            certificate: Certificate.fromCertificateArn(
              stack,
              appName + "-certificate",
              domainCertArn
            ),
          },
        },
        bind: [usersTable, desksTable, api],
      });

      stack.addOutputs({
        SiteUrl: site.url,
        ApiId: api.apiId,
        APiUrl: api.url,
        ApiKey: api.cdk.graphqlApi.apiKey || "",
      });
    });
  },
} satisfies SSTConfig;
