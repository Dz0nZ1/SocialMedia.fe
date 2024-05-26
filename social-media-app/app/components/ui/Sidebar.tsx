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
  return (
    <div className="leftSection">
      <div className="userProfileWidget">
        <div className="profileImage">
          <img src={"/assets/image/avatar_default.jpg"} alt="" />
        </div>
        <div className="userDetails">
          <Link href={"/Profile"} className="name">
            John Doe
          </Link>
          <div className="username">@johndoe</div>
        </div>
      </div>

      <div className="inSidebar">
        {links.map((link, index) => {
          return (
            <Link href={link.destination}>
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
