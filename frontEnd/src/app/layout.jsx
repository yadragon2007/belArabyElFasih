import BootStrap from "components/bootStrap.js";
import "./style.css"
import "bootstrap/dist/css/bootstrap.css";

export const metadata = {
  title: "Bel Araby El Fasi7",
}


export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className="bg-dark text-light text-capitalize">{children}</body>
      <BootStrap />
    </html>
  )
}