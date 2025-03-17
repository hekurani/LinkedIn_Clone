import React, { useEffect, useState } from "react";
import axios from "axios";
import defaultProfile from "../../../assets/profile.png";
import axiosInstance from "../../../axios/axios.tsx";
import PreviewPostImage from "./Modals/PreviewPostImage.jsx";

const PostComponent = ({ user, allPosts = [], setAllPosts = () => {} }) => {
  const [comments, setComments] = useState({});
  const [postButtonForPost, setPostButtonForPost] = useState(null);

  const [imageToPreview, setImageToPreview] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
    <>
      {allPosts.map((postItem, index) => (
        <div
          className="ml-16 mt-8 rounded-md"
          style={{ border: "1px solid black", marginBottom: "20px" }}
        >
          <div key={index} className="mb-4">
            <div className="header m-3 flex">
              <img
                src={
                  postItem.user.imageProfile
                    ? postItem.user.imageProfile
                    : defaultProfile
                }
                style={{ borderRadius: "50%", objectFit: "cover" }}
                className="w-12 h-12 mt-1"
                alt={"userprofile"}
              />
              <div className="profileinfo text-left ml-2">
                <p>
                  {postItem.user.name} {postItem.user.lastname}
                </p>
                <p className="position text-xs">Software Developer</p>
                <p className="time text-xs">
                  {getTimePassed(postItem.publishDate)} •
                </p>
              </div>
              <div className="ml-auto flex">
                <p>•••</p>
                <p className="ml-2">X</p>
              </div>
            </div>

            <div className="description m-4 text-sm max-h-96">
              <p>{postItem.description}</p>
            </div>
            {postItem?.postImages.length > 0 && (
              <div
                className="media flex flex-wrap"
                style={{
                  border: "1px solid black",
                  maxWidth: "555px",
                  height: "400px",
                  maxHeight: "300px",
                  overflow: "hidden",
                }}
              >
                {Array.isArray(postItem?.postImages) ? (
                  postItem?.postImages.map((image, imageIndex) => (
                    <img
                      key={imageIndex}
                      src={`Images/postImages/${image}`}
                      alt={`media-${index}-${imageIndex}`}
                      onClick={() => openModal(image)}            
                      style={{
                        width:
                          postItem?.postImages.length === 1
                            ? "100%"
                            : postItem?.postImages.length === 3 &&
                              imageIndex === 2
                            ? "100%"
                            : "50%",
                        height:
                          postItem?.postImages.length === 3 && imageIndex === 2
                            ? "100%"
                            : "auto",
                        marginBottom:
                          postItem?.postImages.length === 2 ? "5px" : "0",
                      }}
                    />
                  ))
                ) : (
                  <div className="flex justify-center items-center w-full h-full">
                    <p>
                      Sorry, we couldn't fetch some images. Please try again
                      later.
                    </p>
                  </div>
                )}
              </div>
            )}

            <div
              className="socials-feedback h-7 flex"
              style={{ borderBottom: "1px solid black" }}
            >
              <img
                className="reactions-icon social-detail-social-counts__count-icon socia...tions-icon-type-EMPATHY data-test-reactions-icon-theme-light m-1 absolute"
                src={LikeImageUrl}
                alt="like"
              />
              <img
                className="reactions-icon social-detail-social-counts__count-icon socia...tions-icon-type-EMPATHY data-test-reactions-icon-theme-light m-1 absolute"
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
              <button className="flex">
                <svg
                  id="thumbs-up-outline-medium"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  role="none"
                  data-supported-dps="24x24"
                  fill="currentColor"
                >
                  <path d="M19.46 11l-3.91-3.91a7 7 0 01-1.69-2.74l-.49-1.47A2.76 2.76 0 0010.76 1 2.75 2.75 0 008 3.74v1.12a9.19 9.19 0 00.46 2.85L8.89 9H4.12A2.12 2.12 0 002 11.12a2.16 2.16 0 00.92 1.76A2.11 2.11 0 002 14.62a2.14 2.14 0 001.28 2 2 2 0 00-.28 1 2.12 2.12 0 002 2.12v.14A2.12 2.12 0 007.12 22h7.49a8.08 8.08 0 003.58-.84l.31-.16H21V11zM19 19h-1l-.73.37a6.14 6.14 0 01-2.69.63H7.72a1 1 0 01-1-.72l-.25-.87-.85-.41A1 1 0 015 17l.17-1-.76-.74A1 1 0 014.27 14l.66-1.09-.73-1.1a.49.49 0 01.08-.7.48.48 0 01.34-.11h7.05l-1.31-3.92A7 7 0 0110 4.86V3.75a.77.77 0 01.75-.75.75.75 0 01.71.51L12 5a9 9 0 002.13 3.5l4.5 4.5H19z"></path>
                </svg>
                <p>Like</p>
              </button>
              <button>Comment</button>
              <button>Repost</button>
              <button>Send</button>
            </div>

            <div className="comments">
              <div
                className="Image_andImput flex items-center"
                style={{ flexWrap: "wrap" }}
              >
                <img
                  className="ml-3 mt-3 w-10 h-10 mb-2"
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                  src={user.imageProfile}
                  alt={"p"}
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
                      border: "1px solid black",
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
                          alt={"p"}
                        />
                        <div
                          className="ml-2 flex-column w-96 h-auto p-2 pl-3 pr-5"
                          style={{
                            backgroundColor: "#f5f5ef",
                            wordWrap: "break-word",
                          }}
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
      {modalVisible && imageToPreview &&  (
        <PreviewPostImage image={imageToPreview} isOpen={modalVisible} closeModal={closeModal} />
      )}
    </>
  );
};

export default PostComponent;
