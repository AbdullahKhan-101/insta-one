// import { useSession, signIn, signOut } from "next-auth/react";

// export default function signin() {
//   const { data: session } = useSession();
//   // if (loadingSession) {
//   //   return <p>Loading...</p>;
//   // }
//   return (
//     <div>
//       {!session && (
//         <>
//           <h1>I am the signin page</h1>
//           <button onClick={() => signIn()}>Sign in karo</button>
//         </>
//       )}

//       {session &&
//         (console.log(session),
//         (
//           <>
//             <h4>You are logged in as: {session.user.name}</h4>
//             <div>
//               <h4>Email: {session.user.email}</h4>
//               <br />
//               {session.user.image && (
//                 <span>
//                   <img src={session.user.image} alt={session.user.name} />
//                 </span>
//               )}
//             </div>
//             <br />
//             <br />
//             <button onClick={() => signOut()}>Sign out</button>
//           </>
//         ))}
//     </div>
//   );
// }
import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import Header from "../../components/Header";

const signIn = ({ providers }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 px-14 text-center -mt-24">
        <img
          className="w-80"
          src="https://boardgamersanonymous.com/wp-content/uploads/2021/05/ig-logo.png"
          alt=""
        />
        <p className="italic">
          This is not a REAL app, it is built for showing skills only.{" "}
        </p>
        <div className="mt-16">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-500 text-white rounded-lg"
                onClick={() =>
                  SignIntoProvider(provider.id, { callbackUrl: "/" })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default signIn;
