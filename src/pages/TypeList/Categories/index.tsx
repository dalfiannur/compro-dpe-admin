import React, { useRef, useState, useMemo } from "react";
import { FormEdit } from "./components/FormEdit";
import { FormCreate } from "./components/FormCreate";
import { useModal } from "../../../hooks/useModal";
import { DeleteConfirmation } from "./components/DeleteConfirmation";
import {ActionIcon, Button, Card, Container, Table, Pagination, Image, Box} from "@mantine/core";
import { useGetTypeCategoryPaginationQuery } from "../../../services/type-categories";
import { Eye, Pencil, Trash } from "tabler-icons-react";
import { Detail } from "./components/Detail";

const TypeCategories = () => {
  const tableRef = useRef<any>();

  const [modal, setModal] = useModal();
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(25);

  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const { data: typeCategoriesList, refetch } = useGetTypeCategoryPaginationQuery({
    page: page,
    perPage,
  });


  const totalPage = useMemo(() => {
    if (typeCategoriesList){
      return Math.ceil(typeCategoriesList.meta.total/perPage)
    }
    return 0
  }, [typeCategoriesList])

  const handleOnEditRequest = (item: any) => {
    setSelectedProduct(item);
    setModal("edit", true);
  };

  const handleOnDeleteRequest = (item: any) => {
    setSelectedProduct(item);
    setModal("delete", true);
  };

  const handleOnCreated = () => {
    setModal("create", false);
    refetch();
  };

  const handleOnUpdated = () => {
    setModal("edit", false);
    refetch();
  };

  const handleOnDeleted = () => {
    setModal("delete", false);
    refetch();
  };

  const handleOnFormEditClose = () => {
    setModal("edit", false);
    setSelectedProduct(null);
  };

  const handleOnViewRequest = (item: any) => {
    setSelectedProduct(item);
    setModal("detail", true);
  };

  return (
    <>
      <Container size="md">
        <Button onClick={() => setModal("create", true)}>
          Add New Category
        </Button>
      </Container>

      <Container size="md">
        <Card
          sx={(theme) => ({
            marginTop: theme.spacing.md,
          })}
        >
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name (<b>#id</b>)</th>
                <th>Slug - Color</th>
                <th>#Action</th>
              </tr>
            </thead>

            <tbody>
              {typeCategoriesList?.data.map((item: any) => (
                <tr key={item.id}>
                  <td>{typeCategoriesList.data.indexOf(item) + 1}</td>
                  <td>{item.name} <b>({item.id})</b></td>
                  <td>
                    <Box style={{display: "flex", gap: 10}}>
                      {item.slug} -
                      <Box
                        style={{
                          width: 40,
                          height: 20,
                          backgroundColor: item.bg_color_hex,
                        }}
                      />
                    </Box>
                  </td>
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 5,
                      height: 50,
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
          <Pagination
              total={totalPage}
              page={page}
              onChange={setPage}
            />
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

export default TypeCategories;
