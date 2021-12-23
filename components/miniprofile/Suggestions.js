import { useEffect, useState } from "react";
import faker from "faker";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);
  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between mb-5 text-sm">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="font-semibold text-gray-600">See All</button>
      </div>
      {suggestions.map((profile) => (
        <div
          className="flex items-center justify-between mt-3"
          key={profile.id}
        >
          <img
            className="w-16 h-16 rounded-full p-[2px] border  "
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS7eo6nZwdGyeqTFHq8MYsNjuM5rFd5QUGlJ1c1AEbtvzoRFEETDXbJ8rIy67sPTX5a8g&usqp=CAU"
          />
          <div className="flex-1 ml-4">
            <h2 className="text-sm font-semibold ">{profile.username}</h2>
            <h3 className="text-xs text-gray-400">
              Works at {profile.company.name}
            </h3>
          </div>
          <button className="text-sm font-bold text-blue-400">Follow</button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
