import Header from "@/components/layout/Header";
import NewPostForm from "@/components/post/NewPostForm";

export default function Home() {
  return (
    <>
      <Header>
        <h1>Home</h1>
      </Header>
      <NewPostForm />
    </>
  );
}
