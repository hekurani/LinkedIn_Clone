import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import cover from "../../../assets/cover.jpg";
import profile from "../../../assets/default.png";
import ChatPage from "../../../Components/User/Chat/ChatComponent";
import ShowAlert from "../../../utilities/alert/showAlert";
import { createChat } from "../../../utilities/chat/getChat";
import {
  getFriends,
  requestAddFriend,
} from "../../../utilities/friends/getFriends";
import getMe from "../../../utilities/user/getMe";
import CommingSoon from "../../NotFound/CommingSoon";

const ProfileInfo = ({ foreignUser = {}, user = {} }) => {
  const [status, setStatus] = useState("Connect");
  const [alreadyFriends, setAllReadyFriends] = useState(false);
  const [showChatPage, setShowPage] = useState(false);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [comingSoon, setComingSoon] = useState(false);
  const handleHover = (e) => {
    e.target.style.color = "blue";
  };
  const getMyFriends = async () => {
    const data = await getFriends();
    const existingFriend = data?.filter(
      (friend) => friend?.id === foreignUser?.id
    );
    console.log({ existingFriend });
    setAllReadyFriends(
      Array.isArray(existingFriend) && existingFriend.length > 0 ? 1 : 0
    );
  };
  useEffect(() => {
    getMyFriends();
  }, [alreadyFriends]);

  const handleHoverOut = (e) => {
    e.target.style.color = "#0a66c2";
  };
  const addFriend = async () => {
    try {
      await requestAddFriend(foreignUser.id);
      setStatus("Pending");
      ShowAlert({ text: "Friend request sent", color: "blue" });
    } catch (err) {
      console.log(err);
    }
  };
  const createChatRoom = async () => {
    try {
      setShowPage(true);
      const me = await getMe();
      await createChat(me.id, foreignUser.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="mx-auto mt-7 bg-white  left-3 rounded-md"
      style={{ width: "804px", border: "1px solid #D3D3D3" }}
    >
      <div
        className="header  rounded-md"
        style={{ width: "804px", height: "201px", position: "relative" }}
      >
        <img
          src={cover}
          className="rounded-md"
          style={{ position: "absolute" }}
          alt={"coveri"}
        />
        <img
          src={foreignUser.imageProfile}
          style={{
            width: "152px",
            height: "152px",
            objectFit: "cover",
            position: "absolute",
            borderRadius: "50%",
            border: "4px solid white",
            padding: "0px",
            boxSizing: "border-box",
          }}
          className="mt-28 ml-6"
          alt={"profile"}
        />
        <div>
          <FontAwesomeIcon
            className="m-5 p-2"
            onFocus={{ color: "blue" }}
            style={{
              marginBottom: "40px",
              right: "0",
              position: "absolute",
              border: "1px solid white",
              backgroundColor: "white",
              color: "#0a66c2",
              borderRadius: "50%",
            }}
            icon={faPencil}
            onMouseOver={handleHover}
            onMouseOut={handleHoverOut}
          />
        </div>
      </div>
      <div className="profileInfo flex mt-16 mb-5 ">
        <div className="personalInfo text-left ml-7">
          <p className="font-semibold text-2xl">
            {foreignUser.name} {foreignUser.lastname}
          </p>
          <p>Software Developer</p>
          <p className="location mt-1 text-sm " style={{ color: "grey" }}>
            {" "}
            Pristina, District of Pristina, Kosovo Contact info{" "}
          </p>
          <p
            className="connection font-semibold text-sm mt-1"
            style={{ color: "#0a66c2" }}
          >
            {" "}
            500+ connections{" "}
          </p>
          <div className="mutal-connections flex relative mt-1">
            <img
              src={profile}
              alt={"mutalfriend"}
              className="relative"
              style={{ width: "30px", height: "30px" }}
            />
            <img
              src={profile}
              alt={"mutalfriend"}
              className="absolute ml-4"
              style={{ width: "30px", height: "30px" }}
            />
            <p
              style={{ color: "grey" }}
              className="mutal-connection ml-7 text-sm mt-1"
            >
              {" "}
              <span className="font-semibold " style={{ color: "grey" }}>
                Flori Vula, Ajete Krasniqi,
              </span>{" "}
              and 64 other mutual connections
            </p>
          </div>

          <div className="mt-2">
            <button
              onClick={() => addFriend()}
              className="rounded-full w-28 p-1 px-3 font-semibold"
              style={{ color: "white", backgroundColor: "#0a66c2" }}
            >
              {alreadyFriends ? "Connected" : status}
            </button>
            <button
              className="rounded-full ml-2 pb-1 pt-1 pl-3 pr-3 font-semibold"
              style={{
                color: "#0a66c2",
                border: " 1px solid #0a66c2",
                borderTop: "1.5px solid #0a66c2",
              }}
              onClick={() => createChatRoom()}
            >
              Message
            </button>
            <button
              className="rounded-full ml-2
                         pb-1 pt-1 pl-3 pr-3 font-semibold"
              onClick={() => setComingSoon(true)}
              style={{
                color: "grey",
                border: " 1px solid black",
                borderTop: "1.5px solid black",
              }}
            >
              More
            </button>
          </div>
        </div>
        <ul className="experience ml-auto mr-40 ">
          <li className="flex">
            <img
              src={profile}
              style={{ width: "32px", height: "32px" }}
              className="CompanyImg "
              alt={"profile"}
            />
            <p className="ml-4 text-center justify-center align-center">UBT</p>
          </li>
          <li className="flex mt-2">
            <img
              src={profile}
              style={{ width: "32px", height: "32px" }}
              className="CompanyImg "
              alt={"profile"}
            />
            <p className="ml-4 text-center justify-center align-center">UBT</p>
          </li>
        </ul>
      </div>
      <CommingSoon isOpen={comingSoon} setIsOpen={setComingSoon} />

      {showChatPage && (
        <ChatPage
          user={foreignUser}
          otherUser={user}
          // otherUser={otherUser}
          chatRoomId={chatRoomId}
          setChatRoomId={setChatRoomId}
          onCloseChat={() => setShowPage(false)}
        />
      )}
    </div>
  );
};

export default ProfileInfo;
