import React, {useState} from "react";
import {ActionIcon, Box, Button, Card, Container, Table} from "@mantine/core";
import {useModal} from "../../hooks/useModal";
import {Clinics} from "../../entities";
import {useGetClinicsQuery} from "../../services";
import {Pencil, Trash} from "tabler-icons-react";
import {FormCreate} from "./components/FormCreate"
import {FormEdit} from "./components/FormEdit"
import {DeleteConfirmation} from "./components/DeleteConfirmation";

const ClinicsPage = () => {
    const [modal, setModal] = useModal();
    const [selectedItem, setSelectedItem] = useState<Clinics>();

    const {data: clinics, refetch} = useGetClinicsQuery({
        page: 1,
        perPage: 100,
    })

    const onEdit = (item: Clinics) => {
        setSelectedItem(item);
        setModal("edit", true);
    };

    const onDelete = (item: Clinics) => {
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
        refetch();
    };

    return(
        <Container size="xl">
            <Button onClick={() => setModal("create", true)}>
                Add New Clinics
            </Button>
            
            <Box sx={(theme) => ({
                marginTop: theme.spacing.md,
            })}
            >
                <Card>
                    <Table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Title</th>
                                <th>#Action</th>
                            </tr>
                        </thead>

                        <tbody>
                        {clinics?.data.map((item) => (
                            <tr key={item.id}>
                                <td>{clinics.data.indexOf(item) + 1}</td>
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
                        ))}
                        </tbody>
                    </Table>
                </Card>
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
    )
}

export default ClinicsPage