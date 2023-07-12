import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { FieldValues } from "react-hook-form";
import { user_exists } from "@/server/schemas/auth/auth.error";

const user_created = "User has been created Sucessfully";

export async function register_user(input: FieldValues) {
  try {
    const { data } = await axios.post("/api/register", input);

    if (data.status === user_created) {
      toast.success("User Created Successfully");
    } else if (data.status === user_exists) {
      toast.error("A user with this email already exists");
    } else {
      toast.error("Unknown Error");
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.message);
    } else {
      toast.error("Unknow Error");
    }
  }
}
