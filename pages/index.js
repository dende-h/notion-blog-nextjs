
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "../components/Text";
import styles from "./index.module.css";
import Menu from "../components/menu";
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
       pagePath="https://notion-novel-blog-dende.vercel.app/"
        pageImg="/meta.jpg"
      />

      <main className={styles.container}>
        <header className={styles.header}>
          <Menu />
          <h1>On and on N and I</h1>
          <p>
          のんびり趣味で綴っているノベル＆イラスト公開サイトです。山梨県でSEをしながらのんびり不定期で更新中。ノベルは短編中心で書いています。<br/>
          小説書いている方やイラストを公開している方との交流などを増やしていければと思っております。<br/>
          コメント機能などは実装されていませんので、交流はTwitterでお願いします。<br/>
          twitter→
            <a href="https://twitter.com/dendeiriamaka1">dende趣味Twitter</a><br/>

          このサイトの作成はこちらの
            <a href="https://github.com/samuelkraft/notion-blog-nextjs">
              notion-blog-nextjs
            </a>
            を使わせて頂いています。それにしてもNotionで執筆できるのがとても快適です。ありがとうございます。
          </p>
          <p>
            エンジニアに興味がある人はコチラ→
            <a href="https://twitter.com/dendeiriamaka1">学習記録Twitter</a>
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
    
  };
};
