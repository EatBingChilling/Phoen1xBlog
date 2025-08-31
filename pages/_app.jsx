// pages/_app.jsx
import Head from 'next/head';
import Link from 'next/link';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const toggleTheme = () => {
    if (typeof window !== 'undefined') {
      const body = document.body;
      if (body.classList.contains('mdui-theme-dark')) {
        body.classList.remove('mdui-theme-dark');
      } else {
        body.classList.add('mdui-theme-dark');
      }
    }
  };

  return (
    <>
      <Head>
        <title>我的 MDUI 博客</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* 从 CDN 加载 MDUI CSS */}
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/mdui@2/mdui.css" 
        />
        
        {/* 从 CDN 加载 MDUI JavaScript */}
        <script 
          src="https://unpkg.com/mdui@2/mdui.global.js"
          defer
        ></script>
      </Head>

      <mdui-top-app-bar>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <mdui-button>我的博客</mdui-button>
        </Link>
        <div style={{ flexGrow: 1 }}></div>
        <mdui-button-icon onClick={toggleTheme}>
          <mdui-icon name="light_mode" class="light-icon"></mdui-icon>
          <mdui-icon name="dark_mode" class="dark-icon"></mdui-icon>
        </mdui-button-icon>
      </mdui-top-app-bar>

      <main className="main-container">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;