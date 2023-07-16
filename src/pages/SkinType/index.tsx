import { useGetSkinTypesQuery } from "../../services";
import React, { useState } from "react";
import { SkinConcern } from "../../entities/SkinConcern";
import {
  ActionIcon,
  Box,
  Button,
  Container,
  LoadingOverlay,
  Table,
} from "@mantine/core";
import { useModal } from "../../hooks/useModal";
import { Pencil, Trash } from "tabler-icons-react";
import { DeleteConfirmation } from "./components/DeleteConfirmation";
import { FormEdit } from "./components/FormEdit";
import { FormCreate } from "./components/FormCreate";

const SkinConcernPage = () => {
  const [modal, setModal] = useModal();
  const [selectedItem, setSelectedItem] = useState<SkinConcern | null>(null);

  const { data, refetch, isLoading } = useGetSkinTypesQuery({
    page: 1,
    perPage: 10,
  });

  const onEdit = (item: SkinConcern) => {
    setSelectedItem(item);
    setModal("edit", true);
  };

  const onDelete = (item: SkinConcern) => {
    setSelectedItem(item);
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
    setSelectedItem(null);
    refetch();
  };

  return (
    <Container size="md">
      <LoadingOverlay visible={isLoading} />
      <Button onClick={() => setModal("create", true)}>
        Add New Skin Type
      </Button>

      <Box
        sx={(theme) => ({
          marginTop: theme.spacing.md,
        })}
      >
        <Table>
          <Table sx={{ width: "100%" }}>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>#Action</th>
              </tr>
            </thead>

            <tbody>
              {data?.data.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{data.data.indexOf(item) + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <ActionIcon color="blue" onClick={() => onEdit(item)}>
                          <Pencil />
                        </ActionIcon>

                        <ActionIcon color="red" onClick={() => onDelete(item)}>
                          <Trash />
                        </ActionIcon>
                      </Box>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Table>
      </Box>

      <FormCreate
        open={modal.create}
        onClose={() => setModal("create", false)}
        onCreated={handleOnCreated}
      />

      {selectedItem && (
        <>
          <FormEdit
            open={modal.edit}
            data={selectedItem}
            onClose={() => setModal("edit", false)}
            onUpdated={handleOnUpdated}
          />

          <DeleteConfirmation
            open={modal.delete}
            data={selectedItem}
            onClose={() => setModal("delete", false)}
            onDeleted={handleOnDeleted}
          />
        </>
      )}
    </Container>
  );
};

export default SkinConcernPage;
