import React, { useRef, useState } from "react";
import { Product } from "../../entities";
import { FormEdit } from "./components/FormEdit";
import { FormCreate } from "./components/FormCreate";
import { useModal } from "../../hooks/useModal";
import { DeleteConfirmation } from "./components/DeleteConfirmation";
import { ActionIcon, Button, Card, Container, Table } from "@mantine/core";
import { useGetProductPaginationQuery } from "../../services/product";
import { Eye, Pencil, Trash } from "tabler-icons-react";
import { Detail } from "./components/Detail";

const ProductPage = () => {
  const tableRef = useRef<any>();

  const [modal, setModal] = useModal();
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(5);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: productList, refetch } = useGetProductPaginationQuery({
    page: page + 1,
    perPage,
  });

  const handleOnEditRequest = (item: Product) => {
    console.log(item);
    setSelectedProduct(item);
    setModal("edit", true);
  };

  const handleOnDeleteRequest = (item: Product) => {
    setSelectedProduct(item);
    setModal("delete", true);
  };

  const handleOnCreated = () => {
    setModal("create", false);
    refetch();
  };

  const handleOnUpdated = () => {
    setModal("edit", false);
    if (tableRef.current) {
      tableRef.current.refetch();
    }
  };

  const handleOnDeleted = () => {
    setModal("delete", false);
    if (tableRef.current) {
      tableRef.current.refetch();
    }
  };

  const handleOnFormEditClose = () => {
    setModal("edit", false);
    setSelectedProduct(null);
  };

  const handleOnViewRequest = (item: Product) => {
    setSelectedProduct(item);
    setModal("detail", true);
  };

  return (
    <>
      <Container size="xl">
        <Button onClick={() => setModal("create", true)}>
          Add New Product
        </Button>
      </Container>

      <Container size="xl">
        <Card
          sx={(theme) => ({
            marginTop: theme.spacing.md,
          })}
        >
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>#ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Create Date</th>
                <th>#Action</th>
              </tr>
            </thead>

            <tbody>
              {productList?.data.map((item) => (
                <tr>
                  <td>{productList.data.indexOf(item) + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category.name}</td>
                  <td>{item.createdAt}</td>
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 5,
                    }}
                  >
                    <ActionIcon
                      color="blue"
                      onClick={() => handleOnViewRequest(item)}
                    >
                      <Eye />
                    </ActionIcon>

                    <ActionIcon
                      color="blue"
                      onClick={() => handleOnEditRequest(item)}
                    >
                      <Pencil />
                    </ActionIcon>

                    <ActionIcon
                      color="red"
                      onClick={() => handleOnDeleteRequest(item)}
                    >
                      <Trash />
                    </ActionIcon>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>

      <FormCreate
        open={modal.create}
        onCreated={handleOnCreated}
        onClose={() => setModal("create", false)}
      />

      {selectedProduct && (
        <>
          <FormEdit
            data={selectedProduct}
            open={modal.edit}
            onClose={() => setModal("edit", false)}
            onUpdated={handleOnUpdated}
          />

          <DeleteConfirmation
            data={selectedProduct}
            open={modal.delete}
            onClose={() => setModal("delete", false)}
            onDeleted={handleOnDeleted}
          />

          <Detail
            data={selectedProduct}
            open={modal.detail}
            onClose={() => setModal("detail", false)}
          />
        </>
      )}
    </>
  );
};

export default ProductPage;
