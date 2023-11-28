import { Box, Grid, MenuItem } from "@mui/material"
import { CustomInput } from "../form/CustomInput"
import { useForm } from "react-hook-form";
import { CustomSelect } from "../form/CustomSelect";
import { useEffect, useState } from "react";
import { IService } from "interfaces";
import { getCategories } from "eventapp/services/categories/categories.service";
import { CustomButton } from "../form/CustomButton";

const initialData = {
    search : '',
    category : 1
}

export type ISearch = {
    search: string,
    category : Number
  }

export const Search = () => {

    const { control, handleSubmit, formState: {errors} } = useForm<ISearch>();
    
    const [categories, setCategories] = useState<IService[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {        
          const categoriesData = await getCategories();
          setCategories(categoriesData);
        } catch (error) {
          console.error('Error al obtener servicios:', error);
        }
      };
      fetchData();
    }, []);

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <CustomInput
                        type="search"
                        name="search"
                        label="Search"                        
                        defaultValue={initialData.search}
                        placeholder="Ej: catering"
                        control={control}                        
                    />
                </Grid>
                <Grid item xs={4}>
                    <CustomSelect
                    name="category"
                    label="Categoria"
                    control={control}                    
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                    </CustomSelect>
                </Grid>
                <Grid item xs={4}>
                    <CustomButton type="submit" variant="contained" customColor="primary">Buscar</CustomButton>
                </Grid>
            </Grid>
        </Box>
    )
}