import Header from "@/components/layout/Header";
import NewPostForm from "@/components/post/NewPostForm";
import Post from "@/components/post/Post";
import { getServerUserId } from "@/lib/auth/getServerUserId";
import { getPostDetails } from "@/lib/data/posts/getPostDetails";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: {
    postId: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const userId = await getServerUserId();
  const { post, replies } = await getPostDetails(params.postId);
  if (!post) {
    notFound();
  }
  return (
    <div>
      <Header hasBackButton>Posts</Header>
      <Post {...post} commentCount={replies.length} />
      <NewPostForm parentId={params.postId} />
      {replies.map((reply) => (
        <Post {...reply} key={reply.postId} hasLink />
      ))}
    </div>
  );
}
