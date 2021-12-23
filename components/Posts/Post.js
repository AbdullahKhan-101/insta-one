import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
  HeartIconFilled,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Moment from "react-moment";

const Post = ({ id, username, img, userImg, caption }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => (like.id === session?.user?.uid) !== -1)
      ),
    [likes]
  );

  const likepost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="my-6 bg-white rounded-sm">
      {/* header */}
      <div className="flex items-center p-5">
        <img
          className="object-contain w-12 h-12 p-1 mr-3 border rounded-full"
          src={userImg}
          alt=""
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* img */}
      <img src={img} className="object-cover w-full " alt="" />
      {/* buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4 ">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likepost}
                className="text-red-500 btn"
              />
            ) : (
              <HeartIcon onClick={likepost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* captions */}
      <p className="p-5 truncate">
        <span className="mr-1 font-bold">{username} </span>
        {caption}
      </p>
      {/* comments */}

      {comments.length > 0 && (
        <div className="h-20 overflow-y-scroll ml-7 scrollbar-thumb-gray-300 scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center mb-3 space-x-2">
              <img
                className="rounded-full h-7"
                src={comment.data().userImage}
                alt=""
              />
              <p className="flex-1 text-sm">
                <span className="mr-1 font-bold">
                  {comment.data().username}
                </span>{" "}
                {comment.data().comment}
              </p>

              <Moment fromNow className="pr-5 text-xs text-gray-600">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* input box */}
      {session && (
        <form className="flex items-center p-4 bg">
          <EmojiHappyIcon className="h-7" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Add a comment..."
            className="flex-1 mx-2 border-none rounded-md outline-none focus:ring-0 bg-slate-50"
          />
          <button
            type="submit"
            disabled={!comment}
            onClick={sendComment}
            className="font-medium text-blue-500 "
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
