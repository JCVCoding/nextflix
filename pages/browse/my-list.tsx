import SectionCards from "@/components/card/section-cards";
import NavBar from "@/components/nav/navbar";
import Head from "next/head";

import styles from "../../styles/my-list.module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import redirectUser from "@/utils/redirectUser";
import { getMyList } from "@/lib/videos";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { userId, token } = await redirectUser(context);
  if (!userId || !token) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const videos = await getMyList(userId, token);
  return {
    props: {
      myListVideos: videos,
    },
  };
}

const MyList = ({
  myListVideos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <Head>
        <title>My List</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title={"My List"}
            videos={myListVideos}
            size={"small"}
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </div>
  );
};

export default MyList;
