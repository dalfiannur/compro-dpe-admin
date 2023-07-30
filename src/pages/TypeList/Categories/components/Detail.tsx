import { Modal, Box, Text, Image, List, Button } from "@mantine/core";
import { TypeCategories } from "entities";
import React, { FC } from "react";
import '../../../../assets/style.css'
import {formatDate} from "../../../../../helpers/helper";

interface DetailProps {
  open: boolean;
  onClose: () => void;
  data: TypeCategories;
}

const Label = (props: any) => (
  <Text size="xs" color="#5f5f5f" weight="bold">
    {props.children}
  </Text>
);

export const Detail: FC<DetailProps> = (props) => {
  const { open, onClose, data } = props;
  return (
    <Modal opened={open} onClose={onClose} title="Detail ProdSeries" size="xl">
      <Box className="modal-body">
        <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 6,
            }}
        >
          <Box sx={boxBorderStyle}>
            <Label>ProdSeries Name</Label>
            <Text>{formatDate(data.createdAt)}</Text>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 6,
          }}
        >
          <Box sx={boxBorderStyle}>
            <Label>ProdSeries Name</Label>
            <Text>{data.name}</Text>
          </Box>
        </Box>

        <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 6,
            }}
        >
          <Box sx={boxBorderStyle}>
            <Label>ProdSeries Slug</Label>
            <Text>{data.slug}</Text>
          </Box>
        </Box>

        <Box sx={boxBorderStyle}>
          <Label>Description</Label>
          <Text dangerouslySetInnerHTML={{ __html: data.description }} />
        </Box>

        <Box sx={boxBorderStyle}>
          <Label>Icon</Label>
          <Image src={data.iconUrl} />
        </Box>

        <Box sx={boxBorderStyle}>
          <Label>Banner</Label>
          <Image src={data.bannerUrl} />
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

const boxBorderStyle = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "#dedede",
  borderRadius: 6,
  padding: 6,
  marginBottom: 12,
};
