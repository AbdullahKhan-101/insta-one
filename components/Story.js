const Story = ({ img, username }) => {
  return (
    <div>
      <img
        className="h-16 w-16 rounded-full cursor-pointer p-[1.5px] object-contain border border-red-500
        hover:scale-110 transition-all ease-out hover:border-white duration-200
        "
        src="data:image/jpeg;base64,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"
        alt="image of faker"
      />
      <p className="w-16 text-xs text-center truncate">{username}</p>
    </div>
  );
};

export default Story;