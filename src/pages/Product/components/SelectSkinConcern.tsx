import React, {useEffect, useState} from "react";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme, useTheme
} from "@mui/material";
import {useGetSkinConcernsQuery} from "../../../services";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type SelectSkinConcernProp = {
  value: number[]
  onChange?: (values: number[]) => void
}

export const SelectSkinConcern = (props: SelectSkinConcernProp) => {
  const { value, onChange } = props;

  const theme = useTheme();

  const {data} = useGetSkinConcernsQuery({});
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: {value},
    } = event;

    setSelectedValues(
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    const selected  = [];
    for (const item in selectedValues) {
      if (data) {
        selected.push(data.data[item].id)
      }
    }
    onChange && onChange(selected);
  }, [selectedValues]);

  useEffect(() => {
    if (data) {
      const selected: string[] = [];
      for (const i in value) {
        const index = data.data.findIndex((item) => value.includes(item.id));
        selected.push(index.toString())
      }
      setSelectedValues(selected)
    }
  }, []);

  return (
    <FormControl sx={{width: "100%"}}>
      <InputLabel>Skin Concern</InputLabel>
      <Select
        multiple
        // @ts-ignore
        value={selectedValues}
        onChange={handleChange}
        input={<OutlinedInput label="Skin Concern"/>}
        renderValue={(selected: any) => (
          <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
            {selected.map((value: number) => (
              <Chip key={value} label={data?.data[value].name}/>
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {data?.data.map((item, index) => (
          <MenuItem
            key={item.name}
            value={index}
            style={getStyles(item.name, selectedValues, theme)}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
};
