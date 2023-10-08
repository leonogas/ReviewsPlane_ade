"use client";
import menu from "@/config/menu.json";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-theme-light dark:bg-darkmode-theme-light">
      
        <div className="items-center py-10">
          <div className="mb-8 lg:col-6 lg:mb-0">
            <ul>
              {menu.footer.map((menu) => (
                <li className="m-3 inline-block" key={menu.name}>
                  <Link href={menu.url}>{menu.name}</Link>
                </li>
              ))}
            </ul>
          </div>
      </div>

    </footer>
  );
};

export default Footer;
