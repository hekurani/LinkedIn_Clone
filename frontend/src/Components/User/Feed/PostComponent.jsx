import React from 'react'
import profile from "../../../assets/profile.png";
import post from "../../../assets/LinkedIn-logo.png";

const PostComponent = ({user}) => {
    const LoveImageUrl = "https://static.licdn.com/aero-v1/sc/h/cpho5fghnpme8epox8rdcds22"
    const  LikeImageUrl ="https://static.licdn.com/aero-v1/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
  return (
    <div  className=' ml-16 mt-8 rounded-md'style={{border:'1px solid black'}}>
        <div className='header m-3 flex' >
            <img src={user.imageProfile} style={{borderRadius:'50%',objectFit:'cover'}} className='w-12 h-12 mt-1' alt={'userprofile'} />
            <div className=' profileinfo text-left ml-2'>
            <p>Ferat Gashi</p>
            <p className='position text-xs'>Software Developer</p>
            <p className='time text-xs'>7m •</p>
            </div>
            
            <div className='ml-auto flex'>
            <p>•••</p>
            <p className='ml-2'>X</p>
            </div>
           

        </div>

        <div className='description m-4 text-sm max-h-96'>
            <p>Description</p>      
        </div>

        <div className='media'  style={{width:'555px',height:'444px',border:'1px solid black'}}>
            <img src={post} alt={'media'} />
        </div>
        <div className='socials-feedback h-7 flex ' style={{borderBottom:'1px solid black'}}>
    <img className="reactions-icon social-detail-social-counts__count-icon socia...tions-icon-type-EMPATHY data-test-reactions-icon-theme-light m-1 absolute" src={LikeImageUrl} alt="like" />
    <img className="reactions-icon social-detail-social-counts__count-icon socia...tions-icon-type-EMPATHY data-test-reactions-icon-theme-light m-1  absolute" src={LoveImageUrl} style={{marginLeft:'15px'}}alt="love" />
    <p className='ml-10 mt-0.5 text-sm' style={{color:'gray'}}>26</p>
    <p className='ml-auto text-sm' style={{color:'grey'}}>1 comment</p>
    <p className='ml-2 mr-3 text-sm' style={{color:'grey'}}>• 5 reposts</p>
        </div>

        <div className='Reaction flex justify-around m-3'>
          
                  <button className='flex'> <svg id="thumbs-up-outline-medium" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  role="none" data-supported-dps="24x24" fill="currentColor"> <path d="M19.46 11l-3.91-3.91a7 7 0 01-1.69-2.74l-.49-1.47A2.76 2.76 0 0010.76 1 2.75 2.75 0 008 3.74v1.12a9.19 9.19 0 00.46 2.85L8.89 9H4.12A2.12 2.12 0 002 11.12a2.16 2.16 0 00.92 1.76A2.11 2.11 0 002 14.62a2.14 2.14 0 001.28 2 2 2 0 00-.28 1 2.12 2.12 0 002 2.12v.14A2.12 2.12 0 007.12 22h7.49a8.08 8.08 0 003.58-.84l.31-.16H21V11zM19 19h-1l-.73.37a6.14 6.14 0 01-2.69.63H7.72a1 1 0 01-1-.72l-.25-.87-.85-.41A1 1 0 015 17l.17-1-.76-.74A1 1 0 014.27 14l.66-1.09-.73-1.1a.49.49 0 01.08-.7.48.48 0 01.34-.11h7.05l-1.31-3.92A7 7 0 0110 4.86V3.75a.77.77 0 01.75-.75.75.75 0 01.71.51L12 5a9 9 0 002.13 3.5l4.5 4.5H19z"></path>  </svg>    <p>Like</p></button>
           

        <button>Comment</button>
        <button>Repost</button>
        <button>Send</button>
        </div>
    </div>
  )
}

export default PostComponent