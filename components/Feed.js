import MiniProfile from "./miniprofile/MiniProfile";
import Suggestions from "./miniprofile/Suggestions";
import Posts from "./Posts/Posts";
import Stories from "./Stories";
import { useSession } from "next-auth/react";

const Feed = () => {
  const { data: session } = useSession();

  return (
    <main
      className={`grid max-w-6xl grid-cols-1 mx-auto md:grid-cols-2 xl:grid-cols-3 xl:mx-auto md:mx-7 md:max-w-3xl xl:max-w-6xl ${
        !session && "!grid-cols-1 !max-w-3xl"
      }`}
    >
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>

      {session && (
        <section className="hidden xl:inline-grid md:col-span-1">
          <div className="fixed top-20">
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  );
};

export default Feed;
