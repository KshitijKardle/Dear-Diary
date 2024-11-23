import Navbar from "./components/Navbar";
import Card from "./components/Card";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <div className="display flex flex-wrap justify-between px-6 mt-4 ">
        <Card
          title="This is a title"
          content="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.
          lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas 
          lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas"
        ></Card>
        <Card
          title="This is a title"
          content="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas."
        ></Card>
        <Card
          title="This is a title"
          content="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas"
        ></Card>
        <Card
          title="This is a title"
          content="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas"
        ></Card>
      </div>
    </>
  );
}
