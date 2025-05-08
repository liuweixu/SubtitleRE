import * as React from "react";
import {
  BookOpen,
  Bot,
  GalleryVerticalEnd,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { ProfileForm } from "@/content-ui/srt-ass-process-ui/srt-ass-convert-ui";

const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "SRT-ASS处理",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "SRT对齐ASS",
          url: "#",
          content: <ProfileForm />,
        },
        {
          title: "SRT转为ASS",
          url: "#",
          content: <div>test</div>,
        },
      ],
    },
    {
      title: "字幕提取",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "MKV字幕提取",
          url: "#",
        },
        {
          title: "ASS字幕提取",
          url: "#",
        },
      ],
    },
    {
      title: "ASS字幕处理",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "ScaledBorderAndShadow",
          url: "#",
        },
        {
          title: "ASS字体名称修改",
          url: "#",
        },
        {
          title: "ASS样式信息修改",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({
  onItemClick,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  onItemClick?: (content: React.ReactNode) => void;
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} onItemClick={onItemClick} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
