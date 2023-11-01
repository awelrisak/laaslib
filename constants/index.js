import colors from "tailwindcss/colors"

import Home from "@/components/icons/Home"
import Book from "@/components/icons/Book"
import Create from "@/components/icons/Create"
import Notification from "@/components/icons/Bell"
import Community from "@/components/icons/Community"


export const bottomBar = [
  {
    IconComponent: Home,
    route: "/",
    label: "Home",
  },
  {
    IconComponent: Book,
    route: "/books",
    label: "Books",
  },
  {
    IconComponent: Create,
    route: "/create-blog",
    label: "Create Blog",
  },
  {
    IconComponent: Notification,
    route: "/notifications",
    label: "Notifications",
  },
  {
    IconComponent: Community,
    route: "/communities",
    label: "Communities",
  },
  
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const bookGenres = [
  "Fiction",
  "Science fiction",
  "Historical Fiction",
  "Romance",
  "War",
  "Economy",
  "Fantasy",
  "Mystery",
  "Psychology",
  "History",
];

export const verificationBadgeColors = {
    0: colors.red[500],
    1: colors.red[500],
    2: colors.blue[500],
    3: colors.yellow[500],
    4: colors.green[500]
    
}