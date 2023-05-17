
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "../components/Text";
import styles from "./index.module.css";
import { useState } from "react";
import Seo from "../components/Seo";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  const [selectValue, setSelectValue] = useState("All Posts");
  const [allPostFlag,setAllPostFlag] = useState(true);

  const AllPosts = posts.filter((post) => {return post.properties.Published.checkbox === true})

  const changeTag = (e) => {
    setSelectValue(e.target.value)
    if(e.target.value !== "All Posts"){
      setAllPostFlag(false)
    } else {
      setAllPostFlag(true)
    }
  }
  const Tags = AllPosts.map((post) => post.properties.Tags.multi_select[0].name);
  const selectTagPosts = AllPosts.filter((post)=> {return post.properties.Tags.multi_select[0].name === selectValue})
  const set = new Set(Tags);
  const setSelectOption = [...set];
  return (
    <>
       <Seo
       pagePath="https://notion-blog-nextjs-nine.vercel.app/"
        pageImg="/meta.jpg"
      />

      <main className={styles.container}>
        <header className={styles.header}>
          <h1>ChatGTPと考える小説創作</h1>
          <p>
          主に小説執筆のための情報を発信しています<br/>
          自身でも執筆と公開のためのサービスを開発しました<br/>
          <a href="https://next-novel-editor.vercel.app/">短編小説執筆用Webアプリ【Re:terature】</a><br/>
          <a href="https://next-novel-site.vercel.app/"> 短編小説閲覧Webサイト【Lit:Bite】</a>
          </p>
          <p>
          当ブログ紹介記事→
            <a href="https://notion-blog-nextjs-dende-h.vercel.app/1cbf85d5-edf8-4211-880c-dec597f9483b">当ブログについて</a><br/>
          管理人twitter→
            <a href="https://twitter.com/dendeiriamaka1">管理人Twitter</a><br/>
          テックブログはこちら→
            <a href="https://tech-blog-efcg.vercel.app/">tech-blog</a>
          </p>
        </header>
        <div className={`${styles.cp_ipselect} ${styles.cp_sl02}`}>
          <select required onChange={(e)=>changeTag(e)} className="test">
            <option value="All Posts">
              All Posts
            </option>
            {setSelectOption.map((tag,i) => {
              return <option key={i} value={tag}>{tag}</option>;
            })}
          </select>
        </div>
        <h2 className={styles.heading}>{selectValue}</h2>
        <ol className={styles.posts}>
          {allPostFlag ?(AllPosts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );
            return (
              <li key={post.id} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/${post.id}`}>
                    <a>
                      <Text text={post.properties.Name.title} />
                    </a>
                  </Link>
                </h3>
                <p className={styles.postDescription}>{date} 【{post.properties.Tags.multi_select[0].name}】</p>
                <Link href={`/${post.id}`}>
                  <a> Read post →</a>
                </Link>
              </li>
            );
          })):(selectTagPosts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );
            return (
              <li key={post.id} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/${post.id}`}>
                    <a>
                      <Text text={post.properties.Name.title} />
                    </a>
                  </Link>
                </h3>

                <p className={styles.postDescription}>{date} 【{post.properties.Tags.multi_select[0].name}】</p>
                <Link href={`/${post.id}`}>
                  <a> Read post →</a>
                </Link>
              </li>
            );
          })) }
        </ol>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
