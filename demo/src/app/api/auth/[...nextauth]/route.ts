import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";

const handler = NextAuth({
  pages: {
    signIn: "/pos/login",
  },
  providers: [
    CredentialsProvider({
      //https://github.com/vahid-nejad/next-auth-fullstack/blob/main/src/app/api/auth/%5B...nextauth%5D/route.ts
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // const res = await fetch("http://localhost:3000/api/login", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     username: credentials?.username,
        //     password: credentials?.password,
        //   }),
        // });

        // const user = await res.json();
        console.log(credentials);
        const user = {
          id: "1",
          name: "Demo",
          email: "demo@smartwaiter.app",
          password:
            "$2b$04$Uxme1ICgBgkz6K1bEYDjDeMIt/9TO43TrbJhcRYNsNtFaNtuhIYKy", //topSecret -> console.log("hash", bcrypt.hashSync(user.password, 4));
        };

        // const user = await prisma.user.findUnique({
        //   where: {
        //     email: credentials.email,
        //   },
        // });

        // if (!user || !(await compare(credentials.password, user.password))) {
        //   return null;
        // }

        if (
          user &&
          (await bcrypt.compare(credentials?.password ?? "", user.password))
        ) {
          // Any object returned will be saved in `user` property of the JWT
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
