import { ArchiveBoxIcon, BanknotesIcon, CalendarDateRangeIcon, ChartBarIcon, Cog6ToothIcon, DocumentIcon, DocumentTextIcon, GlobeAltIcon, PencilSquareIcon, UsersIcon } from "@heroicons/react/16/solid";
import { BellIcon, ChevronDownIcon, ChevronLeftIcon, PlusIcon, UserIcon } from "@heroicons/react/16/solid";
import CarIcon from "../../../public/CarIcon";
import { Link } from "react-router-dom";
import Chat from "../Chat";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, useSidebar } from "../ui/sidebar";

// Subcomponent to handle content that depends on useSidebar
function SidebarContent({ children, menu }) {
  const { open } = useSidebar(); // Safe to use here because it's inside SidebarProvider
  // const { openMobile } = useSidebar(); // Safe to use here because it's inside SidebarProvider

  return (
    <>
      <Sidebar  className="z-20" collapsible="icon">
        <SidebarHeader>
          <div className="my-3">
            {open ? (
              <span className="text-lg  font-bold text-foreground">
                <span className="text-blue-500">Lv</span>Manager
              </span>
            ): (<span className="text-lg  flex items-center justify-center gap-2 -my-2 p-1.5 font-bold ">
              LVM</span>)}
          </div>
        </SidebarHeader>

        <SidebarMenu className="p-2">
          {menu?.map((item, index) =>
            item.subItems ? (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                  <div className={`${item.isCurrent ? "bg-accent  text-accent-foreground" : ""} hover:bg-blue-600 hover:text-black`}>
                    <item.icon className="size-5 " />
                    <span>{item.name} </span>
                  </div>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {item.subItems.map((subItem, subIndex) => (
                    <SidebarMenuSubItem key={subIndex}>
                      <SidebarMenuSubButton asChild>
                        <Link to={subItem.link} className="flex  hover:bg-blue-600 hover:fill-white hover:text-white items-center gap-2">
                          <subItem.icon className="size-4 fill-inherit  text-current " />
                          <span>{subItem.name} </span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            ) : (
              <SidebarMenuItem key={index} >
                <SidebarMenuButton asChild>
                  <Link to={item.link} className={`  ${item.isCurrent ? "bg-blue-600 hover:bg-blue-600  text-white":"hover:bg-blue-950/40"}  hover:text-white  `}>
                    <item.icon className="size-5" />
                    <span>{item.name} </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </Sidebar>

      <SidebarInset>
        <div style={{ zIndex: 50 }} className="fixed bottom-16 right-4">
          <Chat />
        </div>

        <header className="flex items-center shadow-sm sticky top-0 z-10 justify-between border-b bg-background p-4">
          <div className="flex items-center gap-2 ">
            <SidebarTrigger />
            <span className="text-lg font-semibold">LvManager</span>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center p-3  gap-2">
                  <PlusIcon className="w-4 h-4" />
                  <span className="max-sm:hidden mr-2">Ajouté</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="flex items-center gap-2">
                  <DocumentTextIcon className="size-4" />
                  Contracts
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <CarIcon className="size-4 fill-current" />
                  Véhicule
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <UserIcon className="size-4" />
                  Client
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <BellIcon className="size-5 cursor-pointer text-muted-foreground" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer items-center gap-2">
                  <UserIcon className="size-8 rounded-full bg-muted p-1 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Salama</div>
                    <div className="text-xs text-muted-foreground">Admin</div>
                  </div>
                  <ChevronDownIcon className="size-4 text-muted-foreground" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="login" className="flex items-center gap-2">
                    <UserIcon className="size-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <ChevronLeftIcon className="size-4" />
                  Se déconneter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main
          className={`flex-grow p-6 bg-gray-50 overflow-y-auto  w-full transition-all duration-300`}
        >
          {children}
        </main>
      </SidebarInset>
    </>
  );
}

// Main Sidebar component
// eslint-disable-next-line react/prop-types
export default function SidebarC({ children }) {
  const [current, setCurrent] = useState(location.href.split("/")[location.href.split("/").length - 1]);

  let url = location.href;

  document.body.addEventListener('click', () => {
    requestAnimationFrame(() => {
      if (url !== location.href) {
        url = location.href;
        setCurrent(location.href.split("/")[location.href.split("/").length - 1]);
      }
    });
  }, true);

  useEffect(() => {
    console.log("current: ", current);
  }, [current]);

  const menu = [
    { name: "Dashboard", icon: ChartBarIcon, link: "/admin/dashboard", isCurrent: current === "dashboard" },
    { name: "Contrats", icon: DocumentTextIcon, link: "/admin/contrats", isCurrent: current === "contrats" },
    { name: "Reservations", icon: CalendarDateRangeIcon, link: "/admin/reservations", isCurrent: current === "reservations" },
    { name: "Véhicules", icon: DocumentTextIcon, link: "/admin/vehicules", isCurrent: current === "vehicules" },
    { name: "Clients", icon: UsersIcon, link: "/admin/clients", isCurrent: current === "clients" },
    { name: "paiements", icon: DocumentTextIcon, link: "/admin/paiements", isCurrent: current === "paiements" },
    { name: "Charges", icon: BanknotesIcon, link: "/admin/charges", isCurrent: current === "charges" },
    { name: "Caisse", icon: ArchiveBoxIcon, link: "/admin/caisse", isCurrent: current === "caisse" },
    { name: "Contacts", icon: DocumentTextIcon, link: "/admin/contacts", isCurrent: current === "contacts" },
    { name: "Utilisateurs", icon: UsersIcon, link: "/admin/utilisateurs", isCurrent: current === "utilisateurs" },
    { name: "Paramètres", icon: Cog6ToothIcon, link: "/admin/parametre", isCurrent: current === "parametre" },
    {
      name: "Site web",
      icon: GlobeAltIcon,
      link: "/admin/siteWeb",
      isCurrent: current === "siteWeb",
      subItems: [
        { name: "Editeur de style", icon: PencilSquareIcon, link: "/admin/siteWeb" },
        { name: "Statistiques", icon: ChartBarIcon, link: "/admin/siteWeb" },
        { name: "Pages", icon: DocumentIcon, link: "/admin/siteWeb" },
      ],
    },
  ];

  return (
    <SidebarProvider>
      <SidebarContent menu={menu}>
        {/* <div className="w-fit"> */}

        {children}
        {/* </div> */}
      </SidebarContent>
    </SidebarProvider>
  );
}