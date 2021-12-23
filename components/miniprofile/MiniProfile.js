import { useSession, signOut, signIn } from "next-auth/react";

const MiniProfile = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between ml-10 mt-14">
      <img
        className="w-14 h-14 p-[2px] border rounded-full"
        // src="https://gametapstudios.com/assets/img/azad%20chaiwala.jpg"
        alt=""
        src={session?.user?.image}
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">{session?.user?.name}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>
      <button
        className="text-sm font-semibold text-blue-400"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default MiniProfile;
