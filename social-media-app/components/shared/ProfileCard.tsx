import React, { useState } from 'react'
import Image from "next/image"
import { HiOutlineBookmark, HiOutlineChatBubbleOvalLeftEllipsis, HiOutlineHeart} from 'react-icons/hi2'
import PostForm from './PostForm'
import { FaEllipsisH } from 'react-icons/fa'
import { motion } from 'framer-motion'

type ProfileCardProps = {
  content: string,
  imageUrl : string,
  username : string,
  postId : string
}

const ProfileCard = ({content, imageUrl, username, postId} : ProfileCardProps) => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <div className="postWrapper md:w-[500px] lg:w-[400px] xl:w-[350px] h-[600px] flex flex-col justify-between">
        <div className="header">
          <div className="left">
          </div>
          <div className="right">
            <div className="option">
              <FaEllipsisH />
            </div>
          </div>
        </div>
        <div className="mainPostContent w-full h-[300px]">
          <motion.img src={imageUrl}  alt="" className="postImage object-cover" onClick={() => setOpen(!open)} animate={{ scale: open ? 2 : 1 }} />
        </div>
        <div className="px-4 py-4">
       {/* <div className="font-bold text-xl mb-2">The Coldest Sunset</div> */}
       <p className="text-gray-700 tx-sm text-base lg:text-sm text-left">
         <span className='text-black font-semibold'>{username}</span>:
         {" " + content}
      </p>
     </div>
        <div className="postFooter">
          <div className="postActions">
            <div className="left">
              <div className="likeBtn">
                <HiOutlineHeart />
              </div>
              <div className="commentBtn">
                <HiOutlineChatBubbleOvalLeftEllipsis />
              </div>
              <div className="shareBtn">
           <PostForm isUpdate={true} selectedPostId={postId}/>
            </div>
            </div>
            <div className="right">
              <div className="saveBtn">
                <HiOutlineBookmark />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  // <>
  //   <div className="max-w-sm rounded overflow-hidden mb-5 shadow-lg w-[500px] h-[500px] flex flex-col justify-between">
  // <div>
  //   <div style={{ height: "300px", overflow: "hidden" }}> {/* Set a fixed height */}    
  //     <div className='flex justify-end my-1'>
  //     <FaEllipsisH />
  //     </div>
  //     <Image
  //       className="w-full h-full object-cover"
  //       src={imageUrl}
  //       alt="Sunset in the mountains"
  //       width={500} // Set the width of the image to match the card's width
  //       height={300} // Set the height of the image to match the card's height
  //     />
  //   </div>
  //   <div className="px-4 py-4">
  //     {/* <div className="font-bold text-xl mb-2">The Coldest Sunset</div> */}
  //     <p className="text-gray-700 tx-sm text-base lg:text-sm text-left">
  //       <span className='text-black font-semibold'>{username}</span>:
  //       {" " + content}
  //     </p>
  //   </div>
  // </div>
  // <div className="postFooter px-1">
  //   <div className="postActions">
  //     <div className="left">
  //       <div className="likeBtn">
  //         <HiOutlineHeart />
  //       </div>
  //       <div className="commentBtn">
  //         <HiOutlineChatBubbleOvalLeftEllipsis />
  //       </div>
  //       <div className="shareBtn">
  //         <PostForm isUpdate={true} selectedPostId={postId}/>
  //       </div>
  //     </div>
  //     <div className="right">
  //       <div className="saveBtn">
  //         <HiOutlineBookmark></HiOutlineBookmark>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  //  {/* <div className="px-6 pt-4 pb-2">
  //     <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
  //     <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
  //     <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
  //   </div> */}
// </div>
  // </>
  )
}


export default ProfileCard