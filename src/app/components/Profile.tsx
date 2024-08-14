import { Session } from "next-auth";
import React from "react";
import { signOut } from "next-auth/react";

function Profile() {
  return (
    <div className='absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20'>
      <button className='text-lg' onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
