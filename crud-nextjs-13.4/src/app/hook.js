import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { privateRequest } from "../app/tokenCheck";

export default function hook() {
  const router = useRouter();

  //Chck authentication when authentication is failed.Redirect in login page
  useEffect(() => {
    privateRequest
      .get("/auth-user")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        // redirect to login
        router.push("/");
      });
  }, []);
}
