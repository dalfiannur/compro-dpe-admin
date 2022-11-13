import React, { FC } from "react";
import {
  Burger,
  Button,
  Header,
  MediaQuery,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-blue.svg";

interface MainHeaderProp {
  opened: boolean;
  setOpened: (value: boolean) => void;
}

export const MainHeader: FC<MainHeaderProp> = ({ opened, setOpened }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  return (
    <Header height={70} p="md">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <MediaQuery
          largerThan="sm"
          styles={{
            display: "none",
          }}
        >
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <div>
          <img src={logo} height="48" style={{ margin: 25 }} />
        </div>
        <Text>Website Admin Panel</Text>
        <Button
          style={{ marginRight: 20, backgroundColor: "#ff4444" }}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Logout
        </Button>
      </div>
    </Header>
  );
};
