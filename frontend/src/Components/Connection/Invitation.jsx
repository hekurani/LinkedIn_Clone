import React, { useEffect, useState } from "react";
import { getRequestSendedToMe } from "../../utilities/friends/getFriends";
import getUser from "../../utilities/user/getUser";

const Invitation = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRequestSendedToMe();
      setData(data);

      const usersData = await Promise.all(
        data.map(async (item) => {
            console.log("Item:", item.senderId);
          const { data } = await getUser(item.senderId);
          return data;
        })
      );
      console.log("Users data:", usersData); 
      setUsers(usersData);
    };

    fetchData();
  }, []);

  return (
    <div style={{ border: "1px solid blue", width: "880px" }} className="mx-auto">
      <div className="header flex items-center">
        <p className="mr-auto m-3">Invitations</p>
        <p className="m-3 font-semibold">See all {!!data && data.length}</p>
      </div>
      <div className="content flex">
        {users.map((user, index) => (
          <div key={index} className="invitation-item flex items-center">
            <img src="" alt="" className="w-12 h-12 rounded-full mr-3" />
            <p className="font-semibold">{user.name} {user.lastname}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Invitation;
