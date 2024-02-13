import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Table } from 'sst/node/table';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { GetCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/pos/login',
  },
  providers: [
    CredentialsProvider({
      //https://github.com/vahid-nejad/next-auth-fullstack/blob/main/src/app/api/auth/%5B...nextauth%5D/route.ts
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Return null if no credentials are provided
        if (!credentials) return null;

        // Find user with email in DynamoDB table Users
        const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));
        const get = new GetCommand({
          TableName: Table.Users.tableName,
          Key: {
            email: credentials.email,
          },
        });
        const result = await db.send(get);
        const user = result.Item;
        console.log('Result from DB:', user);

        if (user && (await bcrypt.compare(credentials?.password ?? '', user.password))) {
          // Any object returned will be saved in `user` property of the JWT
          console.log('Login successful', credentials);
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } else {
          // If no user with email was found in DynamoDB table Users or hashed password did not match return null
          console.log('No user was found in DB that match credentials');
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};
