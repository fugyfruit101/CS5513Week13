import Head from 'next/head';
import Layout from '../components/layout';
import { getAllIds, getData } from '../lib/data';

export async function getStaticProps({ params }) {
  const itemData = await getData(params.id);
  // console.log(itemData);
  return {
    props: {
      itemData
    }
  };
}

export async function getStaticPaths() {
  const paths = await getAllIds();
  return {
    paths,
    fallback: false
  };
}

export default function Entry({ itemData }) {
  return (
    <Layout>
      <article className="card col-6">
        <div className="card-body">
          <h5 className="card-title">{itemData.post_title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{itemData.post_ID}</h6>
          <h6 className="card-subtitle mb-2 text-muted">{itemData.user_login}</h6>
          <div className="card-text" dangerouslySetInnerHTML={{__html: itemData.post_content}} />
          <a href={'mailto:' + itemData.email} className="card-link">{itemData.post_date}</a>
        </div>
      </article>
    </Layout>
  ); 
}