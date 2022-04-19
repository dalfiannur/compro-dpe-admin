import React from "react";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

type SelectCategoryProp = {
  value: string
  onChange: (event: SelectChangeEvent) => void
}
export const SelectCategory = (props: SelectCategoryProp) => {
  const { value, onChange } = props;

  return (
    <FormControl variant="outlined" sx={{width: "100%"}}>
      <InputLabel id="demo-simple-select-standard-label">
        Category
      </InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label="Category"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="glow">Glow</MenuItem>
        <MenuItem value="prevent">Prevent</MenuItem>
        <MenuItem value="repair">Repair</MenuItem>
        <MenuItem value="hydrate">Hydrate</MenuItem>
      </Select>
    </FormControl>
  )
};
