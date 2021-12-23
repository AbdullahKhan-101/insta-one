import { useEffect, useState } from "react";
import faker from "faker";
import Story from "./Story";
import { useSession } from "next-auth/react";
const Stories = () => {
  const [suggestions, setSuggestions] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
    console.log(suggestions);
  }, []);

  return (
    <div className="flex p-6 mt-6 space-x-2 overflow-x-scroll bg-white border border-gray-200 md:mt-8 md:space-x-3 scrollbar-thin scrollbar-thumb-gray-300">
      {session && (
        <Story img={session.user.image} username={session.user.username} />
      )}

      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
};

export default Stories;
