import Button from "@material-tailwind/react/Button";
import Image from "next/image";
import { signIn } from "next-auth/client";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
      <img
        src="https://res.cloudinary.com/dycyotaya/image/upload/v1633860160/PinClipart.com_clip-art-for-google_3789173_osywa9.png"
        alt=""
        style={{ width: "200px", height: "200px", margin: 0 }}
      />
      <Button
        className="w-44 mt-10"
        color="blue"
        buttonType="filled"
        ripple="light"
        onClick={signIn}
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
