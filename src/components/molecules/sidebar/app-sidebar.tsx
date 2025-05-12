'use client'

import * as React from 'react'
import { Frame, Map, PieChart } from 'lucide-react'

import { NavMain } from '@/components/molecules/sidebar/nav-main'
import { NavUser } from '@/components/molecules/sidebar/nav-user'
// import { NavProjects } from '@/components/molecules/sidebar/nav-projects'
// import { TeamSwitcher } from '@/components/molecules/sidebar/team-switcher'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  // teams: [
  //   {
  //     name: 'Acme Inc',
  //     logo: GalleryVerticalEnd,
  //     plan: 'Enterprise',
  //   },
  //   {
  //     name: 'Acme Corp.',
  //     logo: AudioWaveform,
  //     plan: 'Startup',
  //   },
  //   {
  //     name: 'Evil Corp.',
  //     logo: Command,
  //     plan: 'Free',
  //   },
  // ],
  // navMain: [
  //   {
  //     title: 'Playground',
  //     url: '#',
  //     icon: Terminal,
  //     isActive: true,
  //     items: [
  //       {
  //         title: 'History',
  //         url: '#',
  //       },
  //       {
  //         title: 'Starred',
  //         url: '#',
  //       },
  //       {
  //         title: 'Settings',
  //         url: '#',
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Models',
  //     url: '#',
  //     icon: Bot,
  //     items: [
  //       {
  //         title: 'Genesis',
  //         url: '#',
  //       },
  //       {
  //         title: 'Explorer',
  //         url: '#',
  //       },
  //       {
  //         title: 'Quantum',
  //         url: '#',
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Documentation',
  //     url: '#',
  //     icon: BookOpen,
  //     items: [
  //       {
  //         title: 'Introduction',
  //         url: '#',
  //       },
  //       {
  //         title: 'Get Started',
  //         url: '#',
  //       },
  //       {
  //         title: 'Tutorials',
  //         url: '#',
  //       },
  //       {
  //         title: 'Changelog',
  //         url: '#',
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Settings',
  //     url: '#',
  //     icon: Settings2,
  //     items: [
  //       {
  //         title: 'General',
  //         url: '#',
  //       },
  //       {
  //         title: 'Team',
  //         url: '#',
  //       },
  //       {
  //         title: 'Billing',
  //         url: '#',
  //       },
  //       {
  //         title: 'Limits',
  //         url: '#',
  //       },
  //     ],
  //   },
  // ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Frame,
      hasCollapse: false,
    },
    {
      title: 'Coach AI',
      url: '/coach',
      icon: PieChart,
      hasCollapse: false,
    },
    {
      title: 'Diet',
      url: '/diet',
      icon: PieChart,
      hasCollapse: false,
    },
    {
      title: 'Workouts',
      url: '/workouts',
      icon: PieChart,
      hasCollapse: false,
    },
    {
      title: 'Exercises',
      url: '/exercises',
      icon: Map,
      hasCollapse: false,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{/* <TeamSwitcher teams={data.teams} /> */}</SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
