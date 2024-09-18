import { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";

export default function Home() {
  async function getPosts() {
    const res = await fetch("/api/subjects");
    const data = await res.json();
    console.log(data);
  }

  const { name } = useContext(AppContext);

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      <h1 className="title">Student {name}</h1>
    </>
  );
}
