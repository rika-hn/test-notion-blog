import { getPage, getBlocks } from '../../lib/notion';

export async function getStaticPaths() {
  const database = await getDatabase();
  return {
    paths: database.map((post) => ({ params: { id: post.id } })),
    fallback: true,
  };
}

export async function getStaticProps({ params: { id } }) {
  const page = await getPage(id);
  const blocks = await getBlocks(id);
  return {
    props: {
      page,
      blocks,
    },
  };
}

export default function Post({ page, blocks }) {
  if (!page || !blocks) return <div>Loading...</div>;

  return (
    <div>
      <h1>{page.properties.Title.title[0].text.content}</h1>
      <p>{page.properties.Date.date.start}</p>
      <div>
        {blocks.map((block) => (
          <p key={block.id}>{block.paragraph.text[0].text.content}</p>
        ))}
      </div>
    </div>
  );
}
