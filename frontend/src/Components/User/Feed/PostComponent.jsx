import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { TfiCommentAlt } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../../../assets/default.png";
import axiosInstance from "../../../axios/axios.tsx";
import PreviewPostImage from "./Modals/PreviewPostImage.jsx";

const PostComponent = ({
  user,
  allPosts = [],
  setAllPosts = () => {},
  setShowCommingSoonConfirm,
}) => {
  const [comments, setComments] = useState({});
  const [postButtonForPost, setPostButtonForPost] = useState(null);
  const [failedImagesCount, setFailedImagesCount] = useState({});

  const [imageToPreview, setImageToPreview] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const openModal = (image) => {
    setImageToPreview(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalVisible(false);
  };

  const LoveImageUrl =
    "https://static.licdn.com/aero-v1/sc/h/cpho5fghnpme8epox8rdcds22";
  const LikeImageUrl =
    "https://static.licdn.com/aero-v1/sc/h/8ekq8gho1ruaf8i7f86vd1ftt";

  const handleCommentSubmit = async (postId) => {
    try {
      const commentText = comments[postId].trim();

      if (!commentText) {
        console.error("Comment cannot be empty");
        return;
      }
      const info = {
        userId: user.id,
        text: comments[postId] || "",
        postId: postId,
      };

      await axiosInstance.post(`/comments`, info);
      setAllPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [
                  ...(post.comments || []),
                  {
                    user: user,
                    text: comments[postId],
                    publishDate: new Date().toISOString(),
                  },
                ],
              }
            : post
        )
      );

      setComments({ ...comments, [postId]: "" });
      setPostButtonForPost(null);
    } catch (error) {
      console.error("Error posting:", error);
    }
  };
  const getTimePassed = (publishDate) => {
    const currentDate = new Date();
    const postDate = publishDate ? new Date(publishDate) : currentDate;
    const timeDifference = currentDate - postDate;

    const seconds = Math.floor(timeDifference / 1000);

    if (seconds < 60) {
      return `${seconds} s`;
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours} h`;
    }

    const days = Math.floor(hours / 24);

    if (days < 7) {
      return `${days} d`;
    }

    const weeks = Math.floor(days / 7);

    if (weeks < 4) {
      return `${weeks} w`;
    }

    const months = Math.floor(days / 30);

    if (months < 12) {
      return `${months} mo`;
    }

    const years = Math.floor(days / 365);

    return `${years} y`;
  };

  return (
    <div className="mx-auto flex-1 w-[655px] px-2">
      {allPosts.map((postItem, index) => (
        <div
          key={index}
          className="ml-16 mt-8 rounded-md"
          style={{
            border: "1px solid #D3D3D3",
            background: "white",
            marginBottom: "20px",
          }}
        >
          <div className="mb-4">
            {/* User Info */}
            <div className="m-3 flex">
              <img
                onClick={() => navigate(`/${postItem?.user?.id}/profile`)}
                src={postItem?.user?.imageProfile || defaultProfile}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = defaultProfile;
                }}
                style={{ borderRadius: "50%", objectFit: "cover" }}
                className="w-12 h-12 mt-1"
                alt="userprofile"
              />
              <div className="profileinfo text-left ml-2">
                <p>
                  {postItem?.user?.name} {postItem?.user?.lastname}
                </p>
                <p className="position text-xs">
                  {postItem?.user?.profession?.name}
                </p>
                <p className="time text-xs">
                  {getTimePassed(postItem?.publishDate)} •
                </p>
              </div>
              <div
                className="ml-auto flex cursor-pointer"
                onClick={() => setShowCommingSoonConfirm(true)}
              >
                <p>•••</p>
                <p className="ml-2">X</p>
              </div>
            </div>

            <div className="description m-4 text-sm break-words whitespace-pre-wrap max-h-96">
              <p>{postItem.description}</p>
            </div>

            {postItem?.postImages?.length > 0 && (
              <div
                className="media flex flex-wrap justify-center items-center"
                style={{
                  border: "1px solid #D3D3D3",
                  height: "400px",
                  maxHeight: "300px",
                  overflow: "hidden",
                }}
              >
                {postItem.postImages.map((image, imageIndex) => {
                  const failedCount = failedImagesCount[postItem.id] || 0;
                  return (
                    <img
                      key={imageIndex}
                      src={`Images/postImages/${image}`}
                      alt={`media-${index}-${imageIndex}`}
                      onClick={() => openModal(image)}
                      onError={() => {
                        setFailedImagesCount((prev) => ({
                          ...prev,
                          [postItem.id]: (prev[postItem.id] || 0) + 1,
                        }));
                      }}
                      style={{
                        width:
                          postItem.postImages.length === 1
                            ? "100%"
                            : postItem.postImages.length === 3 &&
                              imageIndex === 2
                            ? "100%"
                            : "50%",
                        height:
                          postItem.postImages.length === 3 && imageIndex === 2
                            ? "100%"
                            : "auto",
                        marginBottom:
                          postItem.postImages.length === 2 ? "5px" : "0",
                        display:
                          failedCount >= postItem.postImages.length
                            ? "none"
                            : "block",
                      }}
                    />
                  );
                })}

                {failedImagesCount[postItem.id] ===
                  postItem.postImages.length && (
                  <div className="flex justify-center items-center w-full h-full">
                    <p>Could not load post media</p>
                  </div>
                )}
              </div>
            )}

            <div
              className="socials-feedback h-7 flex"
              style={{ borderBottom: "1px solid #D3D3D3" }}
            >
              <img
                className="reactions-icon m-1 absolute"
                src={LikeImageUrl}
                alt="like"
              />
              <img
                className="reactions-icon m-1 absolute"
                src={LoveImageUrl}
                style={{ marginLeft: "15px" }}
                alt="love"
              />
              <p className="ml-10 mt-0.5 text-sm" style={{ color: "gray" }}>
                26
              </p>
              <p className="ml-auto text-sm" style={{ color: "grey" }}>
                1 comment
              </p>
              <p className="ml-2 mr-3 text-sm" style={{ color: "grey" }}>
                • 5 reposts
              </p>
            </div>

            <div className="Reaction flex justify-around m-3">
              <div
                className="flex items-center justify-between"
                onClick={() => setShowCommingSoonConfirm(true)}
              >
                <AiOutlineLike className="m-1 mx-2" />
                <button className="flex">Like</button>
              </div>

              <div
                className="flex items-center justify-between"
                onClick={() => setShowCommingSoonConfirm(true)}
              >
                <TfiCommentAlt color="black" className="m-1 mx-2" height={16} />

                <button className="flex">Comment</button>
              </div>

              <div
                className="flex items-center justify-between"
                onClick={() => setShowCommingSoonConfirm(true)}
              >
                <BiRepost color="black" className="m-1" height={20} />

                <button className="flex">Repost</button>
              </div>

              <div
                className="flex items-center justify-between"
                onClick={() => setShowCommingSoonConfirm(true)}
              >
                <FiSend color="black" className="m-1" height={20} />

                <button className="flex">Send</button>
              </div>
            </div>

            <div className="comments">
              <div
                className="Image_andImput flex items-center"
                style={{ flexWrap: "wrap" }}
              >
                <img
                  className="ml-3 mt-3 w-10 h-10 mb-2"
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                  src={defaultProfile || user.imageProfile}
                  alt="p"
                />
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={comments[postItem?.id] || ""}
                    onClick={() => setPostButtonForPost(postItem?.id)}
                    onChange={(e) =>
                      setComments({
                        ...comments,
                        [postItem?.id]: e.target.value,
                      })
                    }
                    style={{
                      backgroundColor: "transparent",
                      width: "475px",
                      border: "1px solid #D3D3D3",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      color: "grey",
                      marginRight: "8px",
                    }}
                    className="text-sm h-10 font-semibold ml-2 rounded-full pl-4 focus:outline-none"
                  />
                </div>
              </div>

              {postButtonForPost === postItem?.id && (
                <div className="comment-input-container">
                  <button
                    className="ml-14 rounded-full"
                    onClick={() => handleCommentSubmit(postItem?.id)}
                    style={{
                      backgroundColor: "#0a66c2",
                      color: "white",
                      marginBottom: "10px",
                      padding: "2px 12px",
                    }}
                  >
                    Post
                  </button>
                </div>
              )}

              <div className="AllCommnets mt-2 mb-10">
                {postItem?.comments &&
                  postItem?.comments
                    .slice()
                    .sort(
                      (a, b) =>
                        new Date(b.publishDate) - new Date(a.publishDate)
                    )
                    .map((comment, commentIndex) => (
                      <div
                        key={commentIndex}
                        className="flex mt-7"
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          maxHeight: "1000px",
                        }}
                      >
                        <img
                          className="ml-3 mt-3 w-10 h-10 mb-2"
                          style={{ borderRadius: "50%", objectFit: "cover" }}
                          src={comment?.user?.imageProfile}
                          alt="p"
                        />
                        <div
                          className="ml-2 flex-column w-96 h-auto p-2 pl-3 pr-5"
                          style={{ wordWrap: "break-word" }}
                        >
                          <div className="flex">
                            <p className="font-semibold">
                              {comment?.user?.name} {comment?.user?.lastname}
                            </p>
                            <p className="text-xs mt-2 ml-auto">
                              {getTimePassed(comment?.publishDate)}
                            </p>
                          </div>
                          <p className="mt-3">{comment?.text}</p>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      {modalVisible && imageToPreview && (
        <PreviewPostImage
          image={imageToPreview}
          isOpen={modalVisible}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default PostComponent;
