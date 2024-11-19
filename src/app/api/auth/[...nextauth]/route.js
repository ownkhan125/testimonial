import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from "@/models/user.model";
import { connectDB } from "@/connectDB/connectDB";
import { sendVerificationEmail } from "@/utils/sendEmail";


export const authOptions = {


    providers: [
        CredentialsProvider({
            name: 'Credentials',

            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    await connectDB();
                    const { email, password } = credentials;
                    const user = await User.findOne({ email: email })
                    if (user) {
                        if (password === user.password) {
                            return user;
                        } else {
                            throw new Error('Incorrect password', { status: 401 });
                        }
                    }
                } catch (error) {
                    console.log("catch error", error?.message);
                    return null
                }
            }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    ],

    secret: process.env.NEXTAUTH_SECRET,



    callbacks: {
        async signIn({ user, account, profile }) {
            console.log('check profile', profile);
            await connectDB();
            let existingUser = await User.findOne({ email: user.email })
            if (existingUser) {
                console.log('check provider:::', existingUser);
                user.id = existingUser._id;
                existingUser.authProvider = account.provider;
                existingUser.save();
            }

            if (account.provider === 'google') {
                try {
                    const user = await new User({
                        name: profile.name,
                        email: profile.email,
                        password: profile.at_hash,
                        image: profile.picture,
                        authProvider: account.provider
                    })
                    await user.save();
                } catch (error) {
                    console.log(error.message);
                }
            }
            const { email } = user;
            try {
                await sendVerificationEmail(email, "own khan", "verify",
                    `<div className="font-sans text-gray-800 max-w-lg mx-auto p-5 border border-gray-300 rounded-lg">
            <table role="presentation" className="w-full border-spacing-0">
        <tr>
            <td className="bg-blue-600 p-5 text-center rounded-t-lg">
                <h1 className="text-white m-0">Welcome to Our Service!</h1>
            </td>
        </tr>

        <tr>
            <td className="p-5 bg-white">
                <p>Dear [User],</p>
                <p>We are excited to have you on board. Please verify your email address by clicking the button below.</p>

                <div className="text-center my-5">
                    <a href="https://your-verification-link.com" className="bg-green-600 text-white py-3 px-5 rounded-lg inline-block">Verify Email</a>
                </div>

                <p>If you did not sign up for this service, you can safely ignore this email.</p>

                <img src="https://w0.peakpx.com/wallpaper/979/89/HD-wallpaper-purple-smile-design-eye-smily-profile-pic-face.jpg" alt="Thank You" className="w-full max-w-md rounded-lg block mx-auto my-5" />

                <p>Best regards,<br>Your Company Team</p>
            </td>
        </tr>

        <tr>
            <td className="bg-gray-100 p-5 text-center rounded-b-lg text-gray-500">
                <p className="m-0 text-xs">You received this email because you signed up for our service. If you wish to unsubscribe, <a href="#" className="text-blue-600">click here</a>.</p>
                <p className="m-0 text-xs">&copy; 2024 Your Company. All rights reserved.</p>
            </td>
        </tr>
       </table>
                    </div>`);
                return true;
            } catch (error) {
                console.error("Error sending verification email:", error);
            }
            return existingUser === null ? "/auth/sign-in" : true;
        },
        async redirect({ url, baseUrl }) {
            return "/dashboard";
        },

        async jwt({ token, user }) {
            if (user) {
                token.userId = user.id;
                token.email = user.email;
            }
            return token;
        },

        async session({ session, token }) {
            session.user.userId = token.userId;
            session.user.email = token.email;
            return session;
        },
    }

}




export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
