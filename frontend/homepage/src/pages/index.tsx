
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import GradientBG from '../components/GradientBG.js';
import styles from '../styles/Home.module.css';
import type { NextPage } from "next";
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import OurCredentials from '@/components/OurCredentials';
import WhySocialcap from '@/components/WhySocialcap';
import Team from '@/components/Team';
import FAQ from '@/components/FAQ';
import Waitlist from '@/components/Waitlist';
import Footer from '@/components/Footer';
import HowItWorks from '@/components/HowItWorks';
import Communities from '@/components/Communities';
import Aos from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles


const Home: NextPage = () => {

  useEffect(() => {
    Aos.init()
  }, [])

  return (
    <>
      <Head>
        <title>Social Cap</title>
        <meta name="description" content="Credentials to power up your community" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <Layout>
        <Hero />
        <OurCredentials />
        <WhySocialcap />
        <HowItWorks />
        <Team />
        {/* <Communities /> */}
        <FAQ />
        {/* <Waitlist /> */}
        <Footer />
      </Layout>
    </>
  );
}
export default Home;
