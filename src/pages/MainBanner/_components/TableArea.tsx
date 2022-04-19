import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetBannersQuery } from "../../../services";
import { forwardRef, useImperativeHandle } from "react";
import { Banner } from "../../../entities";

type TableAreaProp = {
  onDelete: (banner: Banner) => void
}

const TableArea = forwardRef<any, TableAreaProp>((props, ref) => {
  const { onDelete } = props
  const { data, refetch } = useGetBannersQuery({});

  useImperativeHandle(ref, () => ({
    refetch
  }))

  return (
    <>
      <TableContainer sx={{ marginTop: 5 }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Sub Title</TableCell>
              <TableCell>#Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  <img src={item.imageSourceUrl} style={{ width: 100 }} />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.subTitle}</TableCell>
                <TableCell>
                  {/* <Button>
                    <EditIcon />
                  </Button> */}
                  <Button color="error" onClick={() => onDelete(item)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
});

export default TableArea;
