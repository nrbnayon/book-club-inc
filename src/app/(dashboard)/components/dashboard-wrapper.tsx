// src/app/(dashboard)/components/dashboard-wrapper.tsx
"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  CloudUpload,
  LogOut,
  PanelLeftOpen,
  PanelRightOpen,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Lordicon from "@/components/lordicon/lordicon-wrapper";
import Link from "next/link";

interface SubLink {
  label: string;
  href: string;
}

interface LinkType {
  label: string;
  href: string;
  iconSrc: string | React.ComponentType<any>;
  subLinks?: SubLink[];
}

interface DashboardWrapperProps {
  children: React.ReactNode;
}

export default function DashboardWrapper({ children }: DashboardWrapperProps) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(220);
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const [, setUserResizedWidth] = useState<number | null>(null);
  const [manualToggle, setManualToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const minWidth = 72;
  const maxWidth = 400;

  // Memoize links array to prevent unnecessary re-renders
  const links: LinkType[] = useMemo(
    () => [
      {
        label: "Home",
        href: "/overview",
        iconSrc: "https://cdn.lordicon.com/jeuxydnh.json",
      },
      {
        label: "Users",
        href: "/manage-users",
        iconSrc: "https://cdn.lordicon.com/fqbvgezn.json",
        // subLinks: [{ label: "User details", href: "/manage-users/details" }],
      },
      {
        label: "Orders",
        href: "/orders",
        iconSrc: "https://cdn.lordicon.com/uisoczqi.json",
        // subLinks: [{ label: "Order details", href: "/orders/details" }],
      },
      {
        label: "Payment",
        href: "/payment",
        iconSrc: "https://cdn.lordicon.com/ytklkgsc.json",
      },
      {
        label: "Subscribe",
        href: "/subscribe",
        iconSrc: "https://cdn.lordicon.com/lyjuidpq.json",
      },
      {
        label: "Upload",
        href: "/upload",
        iconSrc: CloudUpload,
      },
      {
        label: "Banner",
        href: "/banner",
        iconSrc: "https://cdn.lordicon.com/ijsqrapz.json",
      },
      {
        label: "Settings",
        href: "/settings",
        iconSrc: "https://cdn.lordicon.com/asyunleq.json",
      },
    ],
    []
  );

  // Define color schemes
  const getIconColors = useCallback((isActive: boolean, isDark: boolean) => {
    if (isActive) {
      return {
        primary: isDark ? "#FFFF00" : "#4693D9",
        secondary: isDark ? "#FFFF00" : "#4693D9",
      };
    }
    return {
      primary: isDark ? "#FFFF00" : "#4693D9",
      secondary: isDark ? "#FFFF00" : "#4693D9",
    };
  }, []);

  // Filter links based on search query
  const filteredLinks = useMemo(() => {
    if (!searchQuery.trim()) return links;

    return links.filter((link) => {
      // Check main link
      const mainMatch = link.label
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Check sublinks
      const subMatch = link.subLinks?.some((subLink) =>
        subLink.label.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return mainMatch || subMatch;
    });
  }, [searchQuery, links]);

  // Check if current path matches link or its sublinks
  const isLinkActive = useCallback(
    (link: LinkType) => {
      if (pathname === link.href) return true;
      if (link.subLinks) {
        return link.subLinks.some((subLink) => pathname === subLink.href);
      }
      return false;
    },
    [pathname]
  );

  // Toggle expanded state for items with sublinks
  const toggleExpanded = useCallback((label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  }, []);

  // Auto-expand items if their sublink is active
  useEffect(() => {
    links.forEach((link) => {
      if (
        link.subLinks &&
        link.subLinks.some((subLink) => pathname === subLink.href)
      ) {
        if (!expandedItems.includes(link.label)) {
          setExpandedItems((prev) => [...prev, link.label]);
        }
      }
    });
  }, [pathname, links, expandedItems]);

  // Auto-expand items when search matches sublinks
  useEffect(() => {
    if (searchQuery.trim()) {
      const itemsToExpand: string[] = [];
      links.forEach((link) => {
        if (link.subLinks) {
          const hasMatchingSubLink = link.subLinks.some((subLink) =>
            subLink.label.toLowerCase().includes(searchQuery.toLowerCase())
          );
          if (hasMatchingSubLink) {
            itemsToExpand.push(link.label);
          }
        }
      });
      setExpandedItems((prev) => [...new Set([...prev, ...itemsToExpand])]);
    }
  }, [searchQuery, links]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    setStartX(e.clientX);
    setStartWidth(sidebarWidth);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const deltaX = e.clientX - startX;
      const newWidth = Math.min(
        Math.max(startWidth + deltaX, minWidth),
        maxWidth
      );

      setSidebarWidth(newWidth);
      setUserResizedWidth(newWidth);

      if (newWidth <= minWidth + 20) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, startX, startWidth]);

  useEffect(() => {
    if (!isResizing && manualToggle) {
      if (open) {
        setSidebarWidth(220);
        setUserResizedWidth(220);
      } else {
        setSidebarWidth(minWidth);
      }
      setManualToggle(false);
    }
  }, [open, isResizing, manualToggle, minWidth]);

  const handleToggleClick = () => {
    setManualToggle(true);
    setOpen(!open);
  };

  // Render icon based on type
  const renderIcon = useCallback(
    (
      iconSrc: string | React.ComponentType<any>,
      isActive: boolean,
      isDark: boolean
    ) => {
      if (typeof iconSrc === "string") {
        // Lordicon
        return (
          <Lordicon
            src={iconSrc}
            trigger='hover'
            stroke={3}
            colors={getIconColors(isActive, isDark)}
            size={24}
          />
        );
      } else {
        // Lucide icon
        const IconComponent = iconSrc;
        return (
          <IconComponent
            className={cn(
              "h-6 w-6 flex-shrink-0",
              isActive
                ? isDark
                  ? "text-yellow-400"
                  : "text-blue-500"
                : isDark
                ? "text-yellow-400"
                : "text-blue-500"
            )}
          />
        );
      }
    },
    [getIconColors]
  );

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-background dark:bg-primary-dark w-full flex-1 mx-auto",
        "h-screen overflow-hidden relative"
      )}
    >
      <div className='relative overflow-visible flex'>
        <Sidebar
          open={open}
          setOpen={setOpen}
          animate={true}
          width={sidebarWidth}
        >
          <SidebarBody
            className={cn(
              "justify-between gap-10 border-r border-gray-300",
              "bg-background text-foreground",
              "dark:bg-primary-dark dark:bg-dark"
            )}
          >
            <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
              <div className='flex items-center justify-center my-6 '>
                <Logo open={open} />
              </div>

              {/* search bar */}
              <motion.div
                animate={{
                  opacity: open ? 1 : 0,
                  height: open ? "auto" : "0px",
                }}
                className='mb-4 overflow-hidden'
              >
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                  <input
                    type='text'
                    placeholder='Search'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='w-full pl-10 pr-4 py-3 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-gray-300'
                  />
                </div>
              </motion.div>

              <div className='flex flex-col gap-2'>
                {filteredLinks.map((link, idx) => {
                  const isActive = isLinkActive(link);
                  const isDark = theme === "dark";
                  const hasSubLinks = link.subLinks && link.subLinks.length > 0;
                  const isExpanded = expandedItems.includes(link.label);
                  const isHovered = hoveredItem === link.label;

                  // Filter sublinks based on search query
                  const filteredSubLinks = link.subLinks?.filter(
                    (subLink) =>
                      !searchQuery.trim() ||
                      subLink.label
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      link.label
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  );

                  const shouldShowSublinks =
                    hasSubLinks &&
                    (isExpanded || (isHovered && !searchQuery.trim())) &&
                    open &&
                    filteredSubLinks &&
                    filteredSubLinks.length > 0;

                  return (
                    <div
                      key={idx}
                      className='relative'
                      onMouseEnter={() => {
                        if (hasSubLinks) {
                          setHoveredItem(link.label);
                        }
                      }}
                      onMouseLeave={() => {
                        if (hasSubLinks) {
                          // Only clear hover if not expanded (clicked)
                          if (!isExpanded) {
                            setTimeout(() => {
                              setHoveredItem((prev) =>
                                prev === link.label ? null : prev
                              );
                            }, 200);
                          }
                        }
                      }}
                    >
                      {/* Main Link */}
                      <div className='flex items-center relative'>
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center gap-3 px-2 py-1 rounded-md transition-all duration-200 group flex-1 relative ",
                            isActive
                              ? "bg-[#EAF3FF] dark:bg-primary text-foreground font-semibold shadow-md"
                              : "text-black/80 hover:text-black hover:font-medium hover:bg-primary/15 dark:hover:bg-primary/40"
                          )}
                        >
                          <span className='flex-shrink-0 mt-1.5'>
                            {renderIcon(link.iconSrc, isActive, isDark)}
                          </span>
                          <motion.span
                            animate={{
                              display: open ? "inline-block" : "none",
                              opacity: open ? 1 : 0,
                            }}
                            className='text-sm whitespace-pre inline-block !p-0 !m-0 flex-1'
                          >
                            {link.label}
                          </motion.span>

                          {/* Expand/Collapse Button for items with sublinks - Now inside the main link */}
                          {hasSubLinks && open && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleExpanded(link.label);
                              }}
                              className={cn(
                                "p-1 rounded transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/10",
                                isActive
                                  ? "text-foreground"
                                  : "text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white"
                              )}
                            >
                              {isExpanded ? (
                                <ChevronUp className='h-4 w-4' />
                              ) : (
                                <ChevronDown className='h-4 w-4' />
                              )}
                            </button>
                          )}
                        </Link>
                      </div>

                      {/* Sub Links Container */}
                      {shouldShowSublinks && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className='ml-8 mt-1 space-y-1 overflow-hidden'
                          onMouseEnter={() => {
                            setHoveredItem(link.label);
                          }}
                          onMouseLeave={() => {
                            // Only clear hover if not expanded (clicked)
                            if (!isExpanded) {
                              setTimeout(() => {
                                setHoveredItem((prev) =>
                                  prev === link.label ? null : prev
                                );
                              }, 200);
                            }
                          }}
                        >
                          {filteredSubLinks.map((subLink, subIdx) => (
                            <Link
                              key={subIdx}
                              href={subLink.href}
                              className={cn(
                                "flex items-center gap-3 px-2 py-1 rounded-md transition-all duration-200 text-sm",
                                pathname === subLink.href
                                  ? "bg-primary/20 dark:bg-primary/30 text-foreground font-medium"
                                  : "text-black/70 hover:text-black hover:bg-primary/10 dark:text-white/70 dark:hover:text-white dark:hover:bg-primary/20"
                              )}
                            >
                              <div className='w-2 h-2 rounded-full bg-gray-400 flex-shrink-0' />
                              <span className='text-sm whitespace-pre'>
                                {subLink.label}
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className='border-t border-gray-300'>
              <div className='my-1'>
                <Link
                  href='/profile'
                  className={cn(
                    "flex items-center gap-3 px-2 py-1 rounded-lg transition-all duration-200",
                    pathname === "/profile"
                      ? "bg-primary/30 dark:bg-primary text-foreground font-semibold shadow-md"
                      : "text-black/80 hover:text-black hover:font-medium hover:bg-primary/15 dark:hover:bg-primary/40"
                  )}
                >
                  <Lordicon
                    src='https://cdn.lordicon.com/hrjifpbq.json'
                    trigger='hover'
                    colors={getIconColors(
                      pathname === "/profile",
                      theme === "dark"
                    )}
                    size={24}
                    stroke={3}
                  />
                  <motion.span
                    animate={{
                      display: open ? "inline-block" : "none",
                      opacity: open ? 1 : 0,
                    }}
                    className='text-sm whitespace-pre inline-block !p-0 !m-0'
                  >
                    Profile
                  </motion.span>
                </Link>
              </div>
              <button
                onClick={() => {
                  console.log("Logout clicked");
                }}
                className='w-full'
              >
                <div className='flex items-center gap-3 p-2 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-all duration-200'>
                  <LogOut className='h-6 w-6 flex-shrink-0 stroke-2 text-red-400 hover:text-red-500' />
                  <motion.span
                    animate={{
                      display: open ? "inline-block" : "none",
                      opacity: open ? 1 : 0,
                    }}
                    className='text-sm whitespace-pre inline-block !p-0 !m-0'
                  >
                    Log Out
                  </motion.span>
                </div>
              </button>
            </div>
          </SidebarBody>
        </Sidebar>

        {/* Resizable Border */}
        <div
          className='hidden md:block w-1 bg-transparent cursor-col-resize hover:bg-blue-500/20 transition-colors duration-200 relative group'
          onMouseDown={handleMouseDown}
        >
          <div className='absolute inset-0 w-2 -ml-0.5 bg-transparent' />
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
        </div>

        {/* Toggle Button */}
        <button
          onClick={handleToggleClick}
          className={cn(
            "absolute hidden md:flex top-4 z-[60] cursor-pointer p-2 rounded-full bg-white dark:bg-primary-dark border border-gray-300 dark:border-gray-300 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200",
            open ? "-right-3" : "-right-3"
          )}
        >
          {open ? (
            <PanelRightOpen className='h-4 w-4 text-gray-600 dark:text-gray-400' />
          ) : (
            <PanelLeftOpen className='h-4 w-4 text-gray-600 dark:text-gray-400' />
          )}
        </button>
      </div>
      <Dashboard>{children}</Dashboard>
    </div>
  );
}

const Logo = ({ open }: { open: boolean }) => {
  return (
    <div className='font-normal flex items-center text-sm relative z-20 w-full justify-center'>
      <motion.div
        animate={{
          width: open ? "90px" : "40px",
          height: open ? "90px" : "40px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className='flex items-center justify-center overflow-hidden'
      >
        <Image
          className='w-full h-full object-contain'
          alt='Book Logo'
          src='/logo.png'
          width={open ? 90 : 40}
          height={open ? 90 : 40}
        />
      </motion.div>
    </div>
  );
};

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-1 bg-card min-h-0'>
      <div className='p-0 rounded-tl-2xl bg-white dark:bg-background flex flex-col gap-2 flex-1 w-full overflow-y-auto overflow-x-hidden scrollbar-custom scrollbar-thin'>
        {children}
      </div>
    </div>
  );
};
