//import { Document } from "mongoose"

declare type Document = import("mongoose").Document;
 
namespace models {
  interface User extends Document, IUser { }
}
