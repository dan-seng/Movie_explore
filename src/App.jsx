
import Navbar from "./components/Navbar";
import AppRoutes from "./AppRoutes";
import {HeroUIProvider} from "@heroui/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import Footer from "./components/Footer";

function App() {
  return (
    <>
     <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
     <Navbar/>
     <AppRoutes/>
     <Footer/>
    </NextThemesProvider>
    </HeroUIProvider>
    </>
  );
}

export default App;

