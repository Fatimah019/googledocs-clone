import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import { useSession, getSession, signOut } from "next-auth/client";

function Header() {
  const [session] = useSession()
  return (
    <header className="flex items-center shadow-md bg-white px-4 p-2 sticky top-0">
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="md:inline-flex h-20 w-20 border-0 "
      >
        <Icon name="menu" size="3xl" />
      </Button>
      <Icon name="description" size="5xl" color="blue" />
      <h1 className="md:inline-flex ml-2 text-gray-700 text-2xl">Docs</h1>
      <div className="flex flex-grow items-center px-5 py-2 ml-5 bg-gray-100 text-gray-600 rounded-lg">
        <Icon name="search" size="3xl" color="gray" />
        <input
          type="text"
          placeholder="Search"
          className="flex-grow px-5 text-base bg-transparent outline-none"
        />
      </div>
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="hidden ml-5 md:ml-20 md:!inline-flex h-20 w-20 border-0"
      >
        <Icon name="apps" size="3xl" color="gray" />
      </Button>
      <img
        src={session?.user?.image}
        alt=""
        loading="lazy"
        className="cursor-pointer h-12 w-12 rounded-full ml-2"
        onClick={signOut}
      />
    </header>
  );
}

export default Header;
