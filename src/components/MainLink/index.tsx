import React, {FC, useState} from "react";
import {Group, ThemeIcon, UnstyledButton, Text, createStyles} from "@mantine/core";
import {useNavigate} from "react-router";

interface MainLinkProps {
    icon: React.ReactNode;
    color: string;
    label: string;
    path: string;
}

const useStyle = createStyles((theme) => ({
    button: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
        },
    },
    active: {
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.dark[1],
        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.dark[1],
        }
    }
}))

export const MainLink: FC<MainLinkProps> = ({icon, color, label, path}) => {
    const navigate = useNavigate();

    const activePath = window.location.pathname

    const [active, setActive] = useState(0)
    const {classes, cx} = useStyle()

    return (
        <UnstyledButton
            onClick={() => navigate(path)}
            className={cx(classes.button, {[classes.active]: path == activePath})}
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
