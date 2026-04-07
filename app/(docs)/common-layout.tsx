import { DocsLayout, DocsLayoutProps } from "fumadocs-ui/layouts/notebook";
import type { ReactNode } from "react";

import { LogoIcon } from "@/components/global/Logo";
import { FaXTwitter } from "react-icons/fa6";

export default function CommonLayout({
  children,
  pageTree,
  options,
}: {
  children: ReactNode;
  pageTree: any;
  options?: Partial<DocsLayoutProps>;
}) {
  return (
    <DocsLayout
      tree={pageTree}
      tabMode="navbar"
      themeSwitch={{ mode: "light-dark" }}
      nav={{
        title: (
          <>
            <LogoIcon />
            <span className="inline">Dev Axioms</span>
          </>
        ),
        mode: "top",
      }}
      searchToggle={{ enabled: true }}
      githubUrl="https://github.com/uk2610/Dev-Axioms"
      links={[
        {
          text: "Home",
          url: "/",
        },
        {
          text: "Practice",
          url: "/practice",
        },
        {
          text: "Roadmaps",
          url: "/web3",
        },
        {
          text: "Playgrounds",
          url: "/coming-soon",
        },
        {
          type: "icon",
          text: "Dev Axioms",
          icon: <FaXTwitter />,
          url: "https://x.com/uk2610",
        },
      ]}
      {...options}
    >
      {children}
    </DocsLayout>
  );
}

