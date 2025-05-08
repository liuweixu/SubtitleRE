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

import { Srt_Ass_Convert_UI } from "@/content-ui/srt-ass-process-ui/srt-ass-convert-ui";
import { Srt_Ass_Align_UI } from "@/content-ui/srt-ass-process-ui/srt-ass-align-ui";
import { MKV_Extration_UI } from "@/content-ui/mkv-ass-extraction-ui/mkv-extraction-ui";
import { ASS_Extration_UI } from "@/content-ui/mkv-ass-extraction-ui/ass-extraction-ui";
import { ASS_Fontname_UI } from "@/content-ui/ass-process-ui/ass-fontname-process-ui";
import { ASS_Style_UI } from "@/content-ui/ass-process-ui/ass-style-process-ui";
import { ASS_Scaled_UI } from "@/content-ui/ass-process-ui/ass-scaled-process-ui";

const data = {
  teams: [
    {
      name: "",
      logo: GalleryVerticalEnd,
      plan: "",
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
          content: <Srt_Ass_Align_UI />,
        },
        {
          title: "SRT转为ASS",
          url: "#",
          content: <Srt_Ass_Convert_UI />,
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
          content: <MKV_Extration_UI />,
        },
        {
          title: "ASS字幕提取",
          url: "#",
          content: <ASS_Extration_UI />,
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
          content: <ASS_Scaled_UI />,
        },
        {
          title: "ASS字体名称修改",
          url: "#",
          content: <ASS_Fontname_UI />,
        },
        {
          title: "ASS样式信息修改",
          url: "#",
          content: <ASS_Style_UI />,
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
