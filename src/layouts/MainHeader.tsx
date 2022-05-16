import React, {FC} from "react";
import {Burger, Header, MediaQuery, Text, useMantineTheme} from "@mantine/core";

interface MainHeaderProp {
  opened: boolean;
  setOpened: (value: boolean) => void;
}

export const MainHeader: FC<MainHeaderProp> = ({opened, setOpened}) => {
  const theme = useMantineTheme();

  return (
    <Header
      height={70}
      p="md"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <MediaQuery
          largerThan="sm"
          styles={{
            display: 'none'
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
        <Text>Application header</Text>
      </div>
    </Header>
  )
};
