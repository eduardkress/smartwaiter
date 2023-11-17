import { Queue } from 'sst/node/queue';
import { NextResponse } from 'next/server';
// import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

// const sqs = new SQSClient({});

export async function GET(request: Request) {
  //   const command = new SendMessageCommand({
  //     QueueUrl: Queue.queue.queueUrl,
  //     MessageBody: "Hello from Next.js!",
  //   });
  //   await sqs.send(command);
  return NextResponse.json({ data: 'Hello From Order API!' });
}
