'use client';

import { Amplify } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { onCreateNote } from '@/graphql/subscriptions';

Amplify.configure({
  // @ts-ignore
  aws_appsync_graphqlEndpoint: 'https://px7ttklborgf3nmnrxe3welowu.appsync-api.eu-central-1.amazonaws.com/graphql',
  aws_appsync_region: 'eu-central-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-3cugyvlerjcsbp6vknt2xmy7ga'
});

export default function Page() {
  const client = generateClient();

  const [entries, setEntries] = useState<Array<string>>(['test']);

  useEffect(() => {
    console.log(123); 
    const subscription = client
      .graphql({
        query: onCreateNote
      })
      .subscribe({
        next: ({ data }) => {
          console.log(data);
          setEntries((prevState) => [...prevState, data.onCreateNote.name]);
        },
        error: (error) => console.warn(error)
      });
    const subscription2 = client
      .graphql({
        query: onCreateNote
      })
      .subscribe({
        next: ({ data }) => {
          console.log(data);
          setEntries((prevState) => [...prevState, data.onCreateNote.name]);
        },
        error: (error) => console.warn(error)
      });
    return () => {
      subscription.unsubscribe()
      subscription2.unsubscribe()
    }
  }, [])

  return (
    <div className='flex h-[100dvh] w-full flex-col justify-center text-center'>
      <div>Waiter Page with AppSync Subscription</div>
      {entries.map((value, index) => (
        <div key={index}>{value}</div>
      ))}
    </div>
  );
}
