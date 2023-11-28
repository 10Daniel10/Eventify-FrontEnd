import { Box, Container, Grid } from "@mui/material";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomInput } from "../form/CustomInput";
import { CustomButton } from "../form/CustomButton";
import { CustomLink } from "../form/CustomLink";
import { CustomTitle } from "../layout/CustomTitle";
import { ArrowBack } from "@mui/icons-material";

type AddFormType = {
    name : string,
    information : string,
    images: string[],
    price : Number,
    category : {
        id : Number
    },
    user : {
        id : Number
    }
}

const initialData = {
    name : '',
    information : '',
    price : 0.0,
    images: [],
    category : {
        id : 1
    },
    user : {
        id : 1
    }
}

const onSubmit: SubmitHandler<AddFormType> = async (formData) => {

    console.log({formData});

}

const handleChange = (e) => {
    const { name, value, type, files } = e.target;    
}

export const AddForm : FC  = () => {

    const { control, handleSubmit, formState: {errors} } = useForm<AddFormType>();

    return(
        <Container>
            <Box>
                <CustomLink href="/" underline="none" customVariant="link" customColor="gray"><ArrowBack/></CustomLink>
                <CustomTitle color="gray" htmlTag="h2" text="Add Provider"/>            
            <Box component="form" onSubmit={handleSubmit(onSubmit)} mb={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CustomInput
                            type="text"
                            name="name"
                            label="Name"
                            control={control}
                            defaultValue={initialData.name}
                            placeholder="Ej: Catering La suegra"
                            required={true}
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomInput
                            type="text"
                            name="information"
                            label="Information"
                            control={control}
                            defaultValue={initialData.information}
                            placeholder="Ej: Catering La suegra"
                            required={false}                                                        
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <input type="file" name="imagenes" multiple onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomButton type="submit" variant="contained" customColor="primary">Guardar</CustomButton>
                    </Grid>
                </Grid>
            </Box>
            </Box>
            </Container>
    );

}