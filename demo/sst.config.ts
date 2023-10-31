import { SSTConfig } from "sst";
import { Table, Config, NextjsSite } from "sst/constructs";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
//import { Config as UseConfig } from "sst/node/config";

const appName = "demo";
const domainCertArn =
  "arn:aws:acm:us-east-1:984009409855:certificate/0fe9ca89-945d-427b-8b38-7f81060092d6";

export default {
  config(_input) {
    return {
      name: appName + "-smartwaiter",
      region: "eu-central-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      //Add Secrets. Be sure to add them to AWS with: npx sst secrets set --stage prod SECRET_KEY value
      // const NEXTAUTH_URL = new Config.Secret(stack, "NEXTAUTH_URL");
      // const NEXTAUTH_SECRET = new Config.Secret(stack, "NEXTAUTH_SECRET");
      // const SALT = new Config.Secret(stack, "SALT");

      //Add Table to App Stack
      const table = new Table(stack, "counter", {
        fields: {
          counter: "string",
        },
        primaryIndex: { partitionKey: "counter" },
      });

      const site = new NextjsSite(stack, "site", {
        environment: {
          NEXTAUTH_URL: "https://demo.smartwaiter.app",
          NEXTAUTH_SECRET: "33jr9jfH5CLwSqsArC2uugxFXFW7vZhF",
          SALT: "EjW8grHa5Ohg7xGVpxVDxq08wSZZxJiw",
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
        bind: [table],
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
