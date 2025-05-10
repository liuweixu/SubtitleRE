import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import React from "react";
import { Srt_Ass_Align_UI } from "@/content-ui/srt-ass-process-ui/srt-ass-align-ui";

export default function Page() {
  const [content, setContent] = React.useState<React.ReactNode>(
    <Srt_Ass_Align_UI />
  );
  return (
    <SidebarProvider>
      <AppSidebar onItemClick={setContent} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <ModeToggle />
        </header>

        <div
          className="flex flex-1 flex-col gap-4 p-4 pt-0  bg-cover bg-center bg-no-repeat  bg-fixed"
          style={
            {
              // backgroundImage: "url('29290__26661_66095083_p0.png')",
            }
          }
        >
          <div className="flex flex-1 flex-col gap-4 p-4 pl- bg-opacity-90">
            {content && (
              <div className="min-h-[75vh] flex-1 rounded-xl bg-muted/50 p-4">
                {content}
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
