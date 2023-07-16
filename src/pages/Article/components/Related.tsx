import {
  ActionIcon,
  Box,
  Button,
  Image,
  InputWrapper,
  MantineTheme,
  Modal,
  MultiSelect,
  Table,
  Text,
  Select,
  Grid,
} from "@mantine/core";
import { Article } from "entities";
import { useDateTimeFormat } from "../../../hooks/useDateTimeFormat";
import { FC, useEffect, useState } from "react";
import { Eye, Link, Pencil, Trash } from "tabler-icons-react";
import {
  useLazyGetArticleQuery,
  useGetProductPaginationQuery,
  usePostRelatedProductOnArticleMutation,
  useDeleteRelatedProductOnArticleMutation, useGetProductCategoriesPaginationQuery,
} from "../../../services";

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

export const Related: FC<DetailProps> = (props) => {
  const { open, onClose, data } = props;

  const [fetcher, { data: article }] = useLazyGetArticleQuery();
  const [product, setProduct] = useState<any>();
  const { data: products, refetch } = useGetProductCategoriesPaginationQuery({
    page: 1,
    perPage: 1000,
  });
  const [submit, { isSuccess }] = usePostRelatedProductOnArticleMutation();
  const [del, { isSuccess: delIsSuccess }] =
    useDeleteRelatedProductOnArticleMutation();

  const formatDate = useDateTimeFormat();

  const handleSubmitButton = () => {
    submit({ id: data.id, productIds: [product] });
    setProduct(null);
  };

  useEffect(() => {
    if (data) {
      fetcher(data.slug);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess || delIsSuccess) {
      fetcher(data.slug);
    }
  }, [isSuccess, delIsSuccess]);

  console.log(products?.data)

  return (
    <Modal opened={open} size="lg" onClose={onClose} title="Related Products">
      <Box>
        <Grid>
          <Grid.Col span={8}>
            <InputWrapper label="Products">
              <Select
                value={product}
                data={
                  products?.data.map((item: any) => ({
                    label: item.name,
                    value: item.id.toString(),
                  })) || []
                }
                //@ts-ignore
                onChange={(value) => setProduct(value)}
              />
            </InputWrapper>
          </Grid.Col>
          <Grid.Col span={4} sx={{ display: "flex", alignItems: "flex-end" }}>
            <Button onClick={handleSubmitButton}>Tambah</Button>
          </Grid.Col>
        </Grid>

        <Table sx={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>#ID</th>
              <th>Name</th>
              <th>Create Date</th>
              <th>#Action</th>
            </tr>
          </thead>

          <tbody>
            {article?.data.products.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.createdAt}</td>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                  }}
                >
                  <ActionIcon
                    color="red"
                    onClick={() => del({ id: data.id, productId: item.id })}
                  >
                    <Trash />
                  </ActionIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
