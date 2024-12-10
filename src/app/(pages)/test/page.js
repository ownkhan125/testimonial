// // Import necessary dependencies and modules
// import { connectDb } from "@/db/ConnectDb";
// import userModel from "@/model/user.model";
// import NextAuth from "next-auth";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import { clientPromise } from "./authAdapter";
// import { clearStaleToken } from "./actions/clearStaleTokens";
// import { authProviders } from "./authProviders";
// import { handleCredentialSignIn } from "./actions/handleCredentialSignIn";
// import { createOrUpdateUser } from "./actions/createOrUpdateUser";
// import { generateDefaultUsername } from "./utils/generateDefaultUsername";
// import { handleEmailOnlySignIn } from "./actions/handleEmailOnlySignIn";

// // Define constants for reusability and easy configuration
// const SESSION_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

// // Main configuration object for NextAuth
// export const authOptions = {
//   trustHost: true,
//   adapter: MongoDBAdapter(clientPromise),
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//     maxAge: SESSION_MAX_AGE,
//   },
//   pages: {
//     signIn: "/auth/sign-in",
//     verifyRequest: "/auth/auth-success",

//     error: "/auth/auth-error",
//   },
//   providers: authProviders,
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       let result;

//       await connectDb();
//       const existingUser = await userModel.findOne({ email: user.email });

//       try {
//         switch (account.provider) {
//           case "credentials":
//             const authSignInResponse = await handleCredentialSignIn(
//               user,
//               existingUser
//             );
//             result = authSignInResponse;
//             break;

//           case "emailOnly":
//             const authEmailResponse = await handleEmailOnlySignIn(
//               user,
//               existingUser
//             );
//             result = authEmailResponse;
//             break;

//           default:
//             const authSocialResponse = await createOrUpdateUser(
//               user.email,
//               account.provider,
//               profile,
//               existingUser
//             );
//             result = authSocialResponse;
//         }

//         user.id = result._id;
        
//         return true;
//       } catch (error) {
//         console.log(
//           `${account.provider} - error : `.bgRed.white + error?.message
//         );
//         throw new Error(error?.message);
//       }
//     },
//     async jwt({ token, user, account }) {
//       if (user) {
//         await clearStaleToken();
//         token.id = user.id;
//         token.provider = account?.provider;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.userId = token.id;
//       session.user.provider = token.provider;
//       return session;
//     },
//   },
//   events: {
//     async signIn({ user, account, isNewUser }) {
//       if (account.provider === "email" && isNewUser) {
//         const updateData = {
//           email: user.email,
//           authProvider: "email",
//           emailVerified: true,
//           username: generateDefaultUsername(),
//           profile: {
//             avatar: null,
//             firstName: null,
//             lastName: null,
//           },
//           createdAt: new Date(),
//         };

//         await connectDb();
//         await userModel.findOneAndUpdate({ email: user.email }, updateData, {
//           upsert: true,
//           new: true,
//         });
//       }
//     },
//   },
// };

// const handlers = NextAuth(authOptions);

// export default handlers;