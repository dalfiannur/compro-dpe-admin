import React, {FC} from "react";
import {Navbar, ScrollArea} from "@mantine/core";
import {MainLink} from "../components/MainLink/index";
import {Message} from "tabler-icons-react";
import {navigationLinks} from "../configs/navigation";

interface NavigationBarProp {
  opened: boolean;
}

export const NavigationBar: FC<NavigationBarProp> = ({opened}) => {
  const mainLinks = [
    {
      icon: <Message/>,
      label: 'Home'
    }
  ];

  return (
    <Navbar
      py="md"
      hiddenBreakpoint="sm"
      hidden={opened}
      width={{
        sm: 200,
        lg: 300
      }}
    >
      <Navbar.Section grow component={ScrollArea}>
        {
          navigationLinks.map((item) => (
            <MainLink key={item.label} icon={<item.icon/>} color='blue' label={item.label as string} path={item.path as string}/>
          ))
        }
      </Navbar.Section>
    </Navbar>
  )
};
