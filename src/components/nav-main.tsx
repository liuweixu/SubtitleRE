"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import classNames from "classnames";
import { useState } from "react";

export function NavMain({
  items,
  onItemClick,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      uid: string; // for react key
      title: string;
      url: string;
      content?: React.ReactNode;
      isSubActive: boolean;
    }[];
  }[];
  onItemClick?: (content: React.ReactNode) => void;
}) {
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);
  return (
    <SidebarGroup>
      <SidebarGroupLabel>字幕处理工具</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a
                          href={subItem.url}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveSubItem(subItem.uid);
                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            subItem.content && onItemClick?.(subItem.content);
                          }}
                          className={classNames({
                            "bg-accent text-accent-foreground":
                              activeSubItem === subItem.uid,
                            "hover:bg-accent/00": activeSubItem !== subItem.uid,
                          })}
                        >
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
