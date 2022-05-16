import React, {FC} from "react";
import {Group, ThemeIcon, UnstyledButton, Text} from "@mantine/core";
import {useNavigate} from "react-router";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  path: string;
}

export const MainLink: FC<MainLinkProps> = ({icon, color, label, path}) => {
  const navigate = useNavigate();
  return (
    <UnstyledButton
      onClick={() => navigate(path)}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon
          color={color}
          variant="light"
        >
          {icon}
        </ThemeIcon>

        <Text
          size="sm"
        >
          {label}
        </Text>
      </Group>
    </UnstyledButton>
  )
};
