"use client"

import GoogleLogoIcon from "@/components/icons/GoogleLogo"
import { toast } from "react-hot-toast"
const btnClassName="w-14 h-14 flex items-center justify-center bg-slate-900 rounded-2xl border border-slate-800"

interface IProps {
   className?:string;
   callbackUrl?: string;}
   
   
export default function SignInWithGoogle({
  className = btnClassName,
  callbackUrl = "api/auth/signin"
}: IProps) {
  
  const handleClick = () => {
    toast('Google Coming Soon!', {
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
        onClick={handleClick}
        className={className}
       > 
         <GoogleLogoIcon />
      </button>
  );
}