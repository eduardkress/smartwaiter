import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { Table } from 'sst/node/table';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { GetCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));

  const get = new GetCommand({
    TableName: Table.Users.tableName,
    Key: {
      email: 'demo@smartwaiter.app',
    },
  });
  const results = await db.send(get);
  // let count = results.Item ? results.Item.tally : 0;

  console.log(results.Item == null ? 'Kein Wert gefunden' : 'y');

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
      }}
    >
      <div>
        <h1>Server Session</h1>
        <pre>{JSON.stringify(session)}</pre>
        <div>{JSON.stringify(results)}</div>
      </div>
    </main>
  );
}
