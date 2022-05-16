import React, {FC, useState} from 'react'
import {
  AppShell,
  Footer,
  useMantineTheme
} from '@mantine/core';
import {NavigationBar} from "./NavigationBar";
import {MainHeader} from "./MainHeader";
import {Outlet} from "react-router";

interface BaseLayoutProp {

}

export const BaseLayout: FC<BaseLayoutProp> = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        }
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<NavigationBar opened={!opened}/>}
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={<MainHeader opened={opened} setOpened={setOpened}/>}
    >
      <Outlet/>
    </AppShell>
  );
};
