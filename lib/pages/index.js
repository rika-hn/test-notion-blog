import { getDatabase } from '../lib/notion';

export async function getStaticProps() {
  const database = await getDatabase();
  return {
    props: {
      posts: database,
    },
  };
}

export default function Home({ posts }) {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={`/posts/${post.id}`}>{post.properties.Title.title[0].text.content}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
