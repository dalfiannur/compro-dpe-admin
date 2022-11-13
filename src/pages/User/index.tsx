import { useGetUsersQuery } from "../../services";
import React, { useState } from "react";
import { User } from "../../entities/User";
import {
  ActionIcon,
  Box,
  Button,
  Container,
  LoadingOverlay,
  Table,
  Pagination
} from "@mantine/core";
import { useModal } from "../../hooks/useModal";
import { Pencil, Trash } from "tabler-icons-react";
import { DeleteConfirmation } from "./components/DeleteConfirmation";
import { FormEdit } from "./components/FormEdit";
import { FormCreate } from "./components/FormCreate";

const UserPage = () => {
  const [modal, setModal] = useModal();
  const [selectedItem, setSelectedItem] = useState<User | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const { data: user, refetch, isLoading } = useGetUsersQuery({
    page: page,
    perPage: perPage,
  });



  const onEdit = (item: User) => {
    setSelectedItem(item);
    setModal("edit", true);
  };

  const onDelete = (item: User) => {
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
    <Container size="xl">
      <LoadingOverlay visible={isLoading} />
      <Button onClick={() => setModal("create", true)}>
        Add New User
      </Button>

      <Box
        sx={(theme) => ({
          marginTop: theme.spacing.md,
        })}
      >
        <Table sx={{ width: "100%" }}>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>#Action</th>
            </tr>
          </thead>

          <tbody>
            {user?.data?.data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{user.data?.data.indexOf(item) + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      {item.id !== 1 && (
                        <>
                          <ActionIcon color="blue" onClick={() => onEdit(item)}>
                            <Pencil />
                          </ActionIcon>

                          <ActionIcon color="red" onClick={() => onDelete(item)}>
                            <Trash />
                          </ActionIcon>
                        </>
                      )}
                      
                    </Box>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <Pagination
              total={Math.ceil(
                (user?.data?.meta.total || 0) / (user?.data?.meta.per_page || perPage)
              )}
              page={page}
              onChange={setPage}
            />
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

export default UserPage;
