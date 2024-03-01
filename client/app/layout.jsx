import Nav from "../components/Nav";
import "../styles/globals.css";
export const metadata = {
  title: "Nyseuia",
  description: "Discover Talents",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-slate-900">
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
