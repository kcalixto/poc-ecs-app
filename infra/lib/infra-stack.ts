import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns";
import * as ssm from "aws-cdk-lib/aws-ssm";

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repositoryName = new cdk.CfnParameter(this, "repositoryName", {
      type: "String",
      description: "Name of the ECR repository to deploy",
    });
    if (repositoryName.valueAsString === "") {
      throw new Error("Repository name must be provided");
    }

    const imageTag = new cdk.CfnParameter(this, "imageTag", {
      type: "String",
      description: "Tag of the Docker image to deploy",
    });
    if (imageTag.valueAsString === "") {
      throw new Error("Image tag must be provided");
    }

    const repository = ecr.Repository.fromRepositoryName(
      this,
      "EcrRepo",
      repositoryName.valueAsString,
    );

    // Import secret from SSM Parameter Store
    const someParameter =
      ssm.StringParameter.fromSecureStringParameterAttributes(
        this,
        "SomeParameter",
        {
          parameterName: "/poc-cdk-go/test",
        },
      );

    const fargateService =
      new ecsPatterns.ApplicationLoadBalancedFargateService(
        this,
        "FargateService",
        {
          cpu: 256,
          memoryLimitMiB: 512,
          desiredCount: 1,
          publicLoadBalancer: true,
          circuitBreaker: {
            enable: true,
            rollback: true,
          },
          taskImageOptions: {
            image: ecs.ContainerImage.fromEcrRepository(
              repository,
              imageTag.valueAsString,
            ),
            containerPort: 8080,
            environment: {
              SERVER_PORT: "8080",
            },
            secrets: {
              API_KEY: ecs.Secret.fromSsmParameter(someParameter),
            },
            enableLogging: true,
          },
        },
      );

    new cdk.CfnOutput(this, "LoadBalancerDNS", {
      description: "DNS of the load balancer",
      value: fargateService.loadBalancer.loadBalancerDnsName,
    });
  }
}
