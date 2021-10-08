import Head from "next/head";
import Header from "./components/Header";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Image from "next/image";
import { getSession, useSession } from "next-auth/client";
import Login from "./components/Login";
import Modal from "@material-tailwind/react/Modal"
import ModalBody from "@material-tailwind/react/ModalBody"
import ModalFooter from "@material-tailwind/react/ModalFooter"
import {db} from "../firebase"
import firebase from "firebase";
import { useState } from "react";
import { useCollectionOnce } from "react-firebase-hooks/firestore"
import DocumentRow from "./components/DocumentRow";

export default function Home() {
  const [session] = useSession();
  if (!session) return <Login />;

  const [showModal, setShowModal] = useState(false)
  const [input, setInput] = useState("")
  const [snapshot] = useCollectionOnce(db.collection('googledocUsers').doc(session.user.email).collection('docs').orderBy('timestamp', 'desc'))

  const createDocument=()=>{
    if (!input) return 

    db.collection('googledocUsers')
    .doc(session.user.email)
    .collection('docs')
    .add({
      fileName: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput(input)
    setShowModal(false)
    // window.location.reload(false)
  }

  const modal = (
    <Modal
      size="sm"
      active={showModal}
      toggler={()=> setShowModal(false)}
    >
      <ModalBody>
        <input 
          type="text"
          placeholder="Enter name of document..."
          value={input}
          onChange={(e)=> setInput(e.target.value)}
          onKeyDown={(e)=> e.key === "Enter" && createDocument()}
          style={{outline: "none", width: "100%"}}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          onClick={(e)=>setShowModal(false)}
          ripple="dark"
        >
        Cancel
        </Button>
        <Button onClick={()=> createDocument()}>Create</Button>
      </ModalFooter>
    </Modal>
  )

  return (
    <div className="">
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {modal}
      <section className="bg-[#F8F9FA] pb-18 px-10">
        <div className="max-w-3xl mx-auto" onClick={()=> setShowModal(true)}>
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
            <Button
              color="gray"
              buttonType="outline"
              iconOnly={true}
              ripple="dark"
              className="border-0 "
            >
              <Icon name="more_vert" size="3xl" color="gray" />
            </Button>
          </div>
          <div>
            <div className="relative h-52 w-40 cursor-pointer hover:border-blue-400">
              <Image src="https://links.papareact.com/pju" layout="fill" />
            </div>
            <p>Blank</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My Docments</h2>
            <p className="mr-12">Date Created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>

          {
            snapshot?.docs?.map((doc)=>(
              <DocumentRow
                key={doc?.id}
                id={doc?.id}
                fileName={doc?.data()?.fileName}
                date={doc?.data()?.timestamp}
              />
            ))
          }
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context){
  const session = await getSession(context)
  return {
    props: {
      session
    }
  }
}