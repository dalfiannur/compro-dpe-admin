import { Box, Button, Image, MantineTheme, Modal, Text } from "@mantine/core";
import { Article } from "entities";
import { useDateTimeFormat } from "../../../hooks/useDateTimeFormat";
import React, { FC } from "react";

interface DetailProps {
  open: boolean;
  onClose: () => void;
  data: Article;
}

const Label = (props: any) => (
  <Text color="#5f5f5f" size="xs" weight="bold" mb={6}>
    {props.children}
  </Text>
);

export const Detail: FC<DetailProps> = (props) => {
  const { open, onClose, data } = props;

  const formatDate = useDateTimeFormat();

  return (
    <Modal opened={open} onClose={onClose} title="Detail Article">
      <Box>
        <Box sx={itemSection}>
          <Label>Thumbnail</Label>
          <Image src={data.thumbnailUrl} />
        </Box>

        <Box
          sx={(theme) => ({
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: theme.spacing.md,
          })}
        >
          <Box sx={itemSection}>
            <Label>Author</Label>
            <Text>{data.user.name}</Text>
          </Box>

          <Box sx={itemSection}>
            <Label>Created At</Label>
            <Text>{formatDate(data.createdAt)}</Text>
          </Box>
        </Box>

        <Box sx={itemSection}>
          <Label>Title</Label>
          <Text>{data.title}</Text>
        </Box>

        <Box sx={itemSection}>
          <Label>Content</Label>
          <Text dangerouslySetInnerHTML={{ __html: data.content }} />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button onClick={onClose}>Close</Button>
        </Box>
      </Box>
    </Modal>
  );
};

const itemSection = (theme: MantineTheme) => ({
  borderWidth: 1,
  borderColor: "#dedede",
  borderStyle: "solid",
  borderRadius: theme.spacing.xs,
  padding: theme.spacing.xs,
  marginBottom: theme.spacing.md,
});
