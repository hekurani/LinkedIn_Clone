import React, { useEffect, useState } from "react";
import { acceptRequest, cancelRequest, getRequestSendedToMe } from "../../utilities/friends/getFriends";
import defaultImage from "../../assets/default.png";
import { Link } from "react-router-dom";
const Invitation = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRequestSendedToMe();
      setData(data);
    };
    fetchData();
  }, []);

  const cancelFriendRequest = async (id) => {
      await cancelRequest(id);
      const data = await getRequestSendedToMe();
      setData(data); //to improve
  }
  const acceptFriendRequest = async (id) => {
    await acceptRequest(id);
    const data = await getRequestSendedToMe();
    setData(data); //to improve
}

  return (
    <div
      style={{ border: "1px solid #d3d3d3 ", width: "880px",borderRadius:'7px' }}
      className="mx-auto p-5 mt-3"
    >
      <div className="header flex items-center mb-3">
        <p className="mr-auto m-1">Invitations</p>
        <p className="m-3 font-semibold">{!!data && data.length > 0 ? `See all ${data.length}` : ''}</p>
      </div>
      <div className="content flex">
      {data.map((request) => (
          <>
          <Link to={`/${request.sender.id}/profile`}>
         
            <div key={request.id} className="invitation-item grid grid-cols-3 ml-2">
              <img
                src={request.sender.imageProfile || defaultImage}
                alt={`${request.sender.name}`}
                className="w-12 h-12 rounded-full"
              />
              <p className="font-semibold mt-2">
                {request.sender.name} {request.sender.lastname}
              </p>
            </div>
            </Link>
            <div className="flex  ml-auto mr-3">
              <button onClick={(() => cancelFriendRequest(request.id))} className="mr-3">Ignore</button>
              <button
              onClick={(() => acceptFriendRequest(request.id))}
                style={{ color:'#0a66c2',border:'1px solid #0a66c2',borderRadius:'10px' }}
                className="h-12 w-20 font-semibold"
              >
                Accept
                </button>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Invitation;
