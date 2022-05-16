import { Modal, Box, Text, Image, List, Button } from "@mantine/core";
import { Product } from "entities";
import { FC } from "react";

interface DetailProps {
  open: boolean;
  onClose: () => void;
  data: Product;
}

const Label = (props: any) => (
  <Text size="xs" color="#5f5f5f" weight="bold">
    {props.children}
  </Text>
);

export const Detail: FC<DetailProps> = (props) => {
  const { open, onClose, data } = props;
  return (
    <Modal opened={open} onClose={onClose} title="Detail Product" size="xl">
      <Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 6,
          }}
        >
          <Box sx={boxBorderStyle}>
            <Label>Product Name</Label>
            <Text>{data.name}</Text>
          </Box>

          <Box sx={boxBorderStyle}>
            <Label>SKU</Label>
            <Text>{data.sku}</Text>
          </Box>

          <Box sx={boxBorderStyle}>
            <Label>Category</Label>
            <Text>{data.category.name}</Text>
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
            <Label>Skin Concerns</Label>
            <List>
              {data.skinConcerns.map((item) => (
                <List.Item>{item.name}</List.Item>
              ))}
            </List>
          </Box>

          <Box sx={boxBorderStyle}>
            <Label>Skin Types</Label>
            <List>
              {data.skinTypes.map((item) => (
                <List.Item>{item.name}</List.Item>
              ))}
            </List>
          </Box>
        </Box>

        <Box sx={boxBorderStyle}>
          <Label>Used As</Label>
          <Text>{data.usedAs}</Text>
        </Box>

        <Box sx={boxBorderStyle}>
          <Label>Ingredient</Label>
          <Text>{data.keyingredient}</Text>
        </Box>

        <Box sx={boxBorderStyle}>
          <Label>Description</Label>
          <Text dangerouslySetInnerHTML={{ __html: data.description }} />
        </Box>

        <Box sx={boxBorderStyle}>
          <Label>How To Use</Label>
          <Text dangerouslySetInnerHTML={{ __html: data.howToUse }} />
        </Box>

        <Box sx={boxBorderStyle}>
          <Label>Product Image</Label>
          <Box
            sx={{
              display: "flex",
            }}
          >
            {data.images.map((image) => (
              <Image src={image.imageSourceUrl} />
            ))}
          </Box>
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
