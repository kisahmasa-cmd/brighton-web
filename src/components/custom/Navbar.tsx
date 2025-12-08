import { NavItem } from "@/services/nav-service";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { removeBaseUrl } from "../../../utils/removeBaseUrl";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {Button} from "@/components/ui/button";

import { getServerToken } from "@/actions/token-action";

import NavbarUserMenu from "./NavbarUserMenu";

interface HomeHeaderProps {
  nav?: {
    TopNav: NavItem[];
    MainNav: NavItem[];
  };
}

export default async function Navbar({ nav }: HomeHeaderProps) {
  const isLoggedIn = !!(await getServerToken());

  const topNavItems = nav?.TopNav;
  const navItems = nav?.MainNav;

  const topNavItemsMenu = topNavItems?.map((item) => {
    if (item.Subs.length > 0) {
      return (
        <DropdownMenu key={item.Sort}>
          <DropdownMenuTrigger asChild>
            <Link
              href={removeBaseUrl(item.Url)}
              className="relative text-gray-700 hover:text-gray-900 transition-colors duration-300
         after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-primary
         after:transition-all after:duration-300 hover:after:w-full"
              aria-label={`Menu ${item.Title}`}
            >
              {item.Title}
            </Link>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {item.Subs.map((subItem, subIndex) => (
              <DropdownMenuItem key={subIndex} asChild className="cursor-pointer">
                <Link href={removeBaseUrl(subItem.Url)}>{subItem.Title}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else {
      return (
        <Link
          key={item.Sort}
          href={removeBaseUrl(item.Url)}
          className="relative text-gray-700 hover:text-gray-900 transition-colors duration-300
     after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-primary
     after:transition-all after:duration-300 hover:after:w-full"
          aria-label={`Menu ${item.Title}`}
        >
          {item.Title}
        </Link>
      );
    }
  });

  return (
    <>
      {/* Top Bar - Desktop Only */}
      <div className="hidden lg:block bg-gray-100 border-b border-gray-200">
        <div className="mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"ghost"} className="p-0 text-gray-700 cursor-pointer font-normal">
                  Download <span className="font-semibold">BrightonApp</span> Sekarang!
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-2">
                <div className="flex gap-2">
                  <Link href="https://itunes.apple.com/id/app/brighton-real-estate-agents/id1203280367?l=id&mt=8" target="_blank" rel="noopener noreferrer" aria-label="Link Social Download">
                    <Image src="/app-store-download.svg" alt="App Store Download" width={0} height={0} sizes="100vw" className="w-auto h-11" />
                  </Link>
                  <Link href="https://play.google.com/store/apps/details?id=com.brightoncorporation&hl=en" target="_blank" rel="noopener noreferrer" aria-label="Link Social Download">
                    <Image src="/google-play-download.svg" alt="Google Play Download" width={0} height={0} sizes="100vw" className="w-auto h-11" />
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
            <div className="flex items-center gap-6">{topNavItemsMenu}</div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button Sidebar */}
            <SidebarMenu navItems={navItems} topNavItems={topNavItems} />
            <input type="checkbox" id="mobile-menu-toggle" className="peer hidden" />
            <input type="checkbox" id="login-modal-toggle" className="peer/login hidden" />

            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center" aria-label="Home">
                <Image src="/logo_full.svg" alt="logo" width={150} height={36} />
              </Link>
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-6">
                {navItems?.map((item) => (
                  <Link
                    key={item.Sort}
                    href={removeBaseUrl(item.Url)}
                    className="relative text-gray-700 text-sm font-bold transition-colors duration-300 hover:text-primary
                 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-primary
                 after:transition-all after:duration-300 hover:after:w-full"
                    aria-label={`Menu ${item.Title}`}
                  >
                    {item.Title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-3">
              {/* User Icon */}
              <NavbarUserMenu isLoggedIn={isLoggedIn} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

function SidebarMenu({ navItems, topNavItems }: { navItems?: NavItem[]; topNavItems?: NavItem[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button aria-label="Button Menu" variant={"ghost"} className="!px-2 lg:hidden text-gray-700 hover:text-gray-900 cursor-pointer">
          <Menu className="!w-6 !h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-primary flex flex-col gap-0">
        <VisuallyHidden>
          <SheetTitle>Hidden Title for Accessibility</SheetTitle>
        </VisuallyHidden>

        <div className="flex-1 pt-8 px-4 pb-4 flex flex-col gap-1 overflow-auto">
          <SheetClose asChild>
            <Link href="/" className="py-1 hover:underline block font-semibold" aria-label="Menu Beranda">
              Beranda
            </Link>
          </SheetClose>

          {navItems?.map((item, index) => (
            <SheetClose asChild key={index}>
              <Link href={removeBaseUrl(item.Url)} className="py-1 hover:underline block font-semibold" aria-label={`Menu ${item.Title}`}>
                {item.Title}
              </Link>
            </SheetClose>
          ))}

          <hr className="border border-black my-1" />

          {topNavItems?.map((item, index) =>
            item.Subs?.length > 0 ? (
              <Accordion key={index} type="single" collapsible>
                <AccordionItem value={item.Title}>
                  <AccordionTrigger className="py-1 hover:underline font-semibold text-base cursor-pointer">{item.Title}</AccordionTrigger>
                  <AccordionContent className="px-4 py-0 flex flex-col gap-1">
                    {item.Subs.map((subItem, subIndex) => (
                      <SheetClose asChild key={subIndex}>
                        <Link href={removeBaseUrl(subItem.Url)} className="py-1 hover:underline block font-semibold" aria-label={`Menu ${subItem.Title}`}>
                          {subItem.Title}
                        </Link>
                      </SheetClose>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <SheetClose asChild key={index}>
                <Link href={removeBaseUrl(item.Url)} className="py-1 hover:underline block font-semibold" aria-label={`Menu ${item.Title}`}>
                  {item.Title}
                </Link>
              </SheetClose>
            )
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
