import React, {FC} from "react";
import {
    ActionIcon,
    Burger,
    Button,
    Header,
    MediaQuery,
    Text, useMantineColorScheme,
    useMantineTheme,
} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import logo from "../assets/logo-blue.svg";
import {Moon, MoonStars, Sun} from "tabler-icons-react";
import {navigationLinks} from "../configs/navigation";

interface MainHeaderProp {
    opened: boolean;
    setOpened: (value: boolean) => void;
}

// @ts-ignore
export const MainHeader: FC<MainHeaderProp> = ({opened, setOpened}) => {
    const theme = useMantineTheme();
    const navigate = useNavigate();

    const location = navigationLinks.find((link) => link.path == window.location.pathname)

    const {colorScheme, toggleColorScheme} = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    if (location) {
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
                        <img src={logo} height="48" style={{margin: 25}}/>
                    </div>

                    <Text>{`Panel ${location.label}`}</Text>


                    <div style={{display: "flex", gap: 10}}>
                        <ActionIcon
                            variant={"filled"}
                            color={dark ? 'yellow' : 'blue'}
                            onClick={() => toggleColorScheme()}
                            title="Toggle color scheme"
                            style={{padding: 2, height: 30}}
                        >
                            {dark ? <Sun size="2rem"/> : <MoonStars size="2rem"/>}
                        </ActionIcon>

                        <Button
                            style={{marginRight: 20, height: 30, backgroundColor: "#ff4444"}}
                            onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/");
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </Header>
        );
    }
};
