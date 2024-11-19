import Head from "next/head";
import Nav from "../components/Nav";
import "../styles/globals.css";

export const metadata = {
  title: "Nyeusi",
  description: "Discover Talents",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* CookieYes Script */}
        <script
          id="cookieyes"
          type="text/javascript"
          src="https://cdn-cookieyes.com/client_data/1d49d24a351c1ae4e422796e/script.js"
          async
        ></script>
      </Head>
      <body className="bg-black">
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
