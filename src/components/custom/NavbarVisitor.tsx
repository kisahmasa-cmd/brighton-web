"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Lock, LogOut, Menu, X } from 'lucide-react';
import LogoutWrapper from "@/components/custom/LogoutWrapper";

export default function NavbarVisitor() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      href: '/visitor'
    },
    {
      id: 'edit-profile',
      label: 'Edit Profile',
      icon: User,
      href: '/visitor/edit-profile'
    },
    {
      id: 'change-password',
      label: 'Change Password',
      icon: Lock,
      href: '/visitor/change-password'
    },
    // {
    //   id: 'logout',
    //   label: 'Logout',
    //   icon: LogOut,
    //   href: '/visitor/logout'
    // }
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-50">
        <h2 className="text-xl font-bold text-gray-700">Visitor Area</h2>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex flex-col w-64 min-h-screen bg-white shadow-lg fixed left-0 top-0">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-700">Visitor Area</h2>
        </div>
        <nav className="flex-1 flex flex-col p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                  isActive(item.href)
                    ? 'bg-primary shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}

          <LogoutWrapper>
            <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all text-gray-700 hover:bg-gray-100 cursor-pointer">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Log Out</span>
            </div>
          </LogoutWrapper>

          <Link
            href={"/"}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mt-auto transition-all text-gray-700 hover:bg-gray-200 bg-gray-100`}
          >
            <span className="font-medium">Kembali Ke Brighton</span>
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div
          className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 bg-white w-64 min-h-screen shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="min-h-screen flex flex-col p-4 pt-22">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                    isActive(item.href)
                      ? 'bg-primary shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}

            <LogoutWrapper>
              <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all text-gray-700 hover:bg-gray-100 cursor-pointer">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Log Out</span>
              </div>
            </LogoutWrapper>

            <Link
              href={"/"}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mt-auto transition-all text-gray-700 hover:bg-gray-200 bg-gray-100`}
            >
              <span className="font-medium">Kembali Ke Brighton</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Spacer for desktop sidebar */}
      <div className="hidden lg:block w-64" />
    </>
  );
}
