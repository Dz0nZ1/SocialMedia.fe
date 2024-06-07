import React from "react";
import { MdSettings } from "react-icons/md";
import {
  FaBell,
  FaBookmark,
  FaBrush,
  FaCompass,
  FaEnvelope,
  FaHome,
} from "react-icons/fa";
import Link from "next/link";
import { useGetUser } from "@/hooks/UserHooks";
import { data } from "autoprefixer";
import { log } from "console";
import { useSession } from "next-auth/react";

const links = [
  {
    name: "Home",
    icon: <FaHome />,
    destination: "/Home"
  },
  {
    name: "Explore",
    icon: <FaCompass />,
    destination: "/Explore"
  },
  {
    name: "Notifications",
    icon: <FaBell />,
    destination: "/Notifications"
  },
  {
    name: "Messages",
    icon: <FaEnvelope />,
    destination: "/Messages"
  },
  {
    name: "Bookmarks",
    icon: <FaBookmark />,
    destination: "/Bookmarks"
  },
  {
    name: "Theme",
    icon: <FaBrush />,
    destination: "/Theme"
  },
  {
    name: "Settings",
    icon: <MdSettings />,
    destination: "/Settings"
  },
];

const Sidebar = () => {

  const {data: session} = useSession();

  return (
    <div className="leftSection">
      <div className="userProfileWidget">
        <div className="profileImage">
          <img src={"/assets/image/avatar_default.jpg"} alt="" />
        </div>
        <div className="userDetails">
          {session != undefined && <>
            <Link href={"/Profile"} className="name">
            {session.user.firstName  + " " + session.user.lastName}
          </Link>
          <div className="username">@{session.user.username}</div>
          </>}
        </div>
      </div>

      <div className="inSidebar">
        {links.map((link, index) => {
          return (
            <Link key={index} href={link.destination}>
            <div className="link" key={index}>
              <div className="icon">{link.icon}</div>
              <h3>{link.name}</h3>
            </div>
            </Link>
          );
        })}
      </div>

      <label htmlFor="createNewPost" className="inBtn sidebarCreateBtn">
        Create Post
      </label>
    </div>
  );
};

export default Sidebar;
