import React, { FC, useEffect, useState } from "react";
import { AppShell, Footer, useMantineTheme } from "@mantine/core";
import { NavigationBar } from "./NavigationBar";
import { MainHeader } from "./MainHeader";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";

interface BaseLayoutProp {}

export const BaseLayout: FC<BaseLayoutProp> = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  }, []);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<NavigationBar opened={!opened} />}
      footer={
        <Footer height={60} p="md">
          DPE Lab
        </Footer>
      }
      header={<MainHeader opened={opened} setOpened={setOpened} />}
    >
      <Outlet />
    </AppShell>
  );
};
