#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { PocECSAppStack } from "../lib/infra-stack";

const app = new cdk.App();
new PocECSAppStack(app, "PocECSAppStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

