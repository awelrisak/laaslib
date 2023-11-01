"use client"

import { toast } from "react-hot-toast"

import FacebookLogoIcon from "@/components/icons/FacebookLogo";

const btnClassName="w-14 h-14 flex items-center justify-center bg-slate-900 rounded-2xl border border-slate-800"

interface IProps {
   className?:string;
   callbackUrl?: string;}
      
export default function SignInWithFacebook({
  className = btnClassName,
  callbackUrl = "api/auth/signin"
}: IProps) {
  
  const handleClick = () => {
    toast('Facebook Coming Soon!', {
        icon: '🛠',
        style: {
            paddin: "16px 8px",
            borderRadius: '15px',
            background: '#1E293B', //slate-800
            color: '#fff',
        },
    });
  }
  return (
    <button 
     className={className}
     onClick={handleClick}
    >
      <FacebookLogoIcon />
    </button>
  );
}
