import { ArrowBack } from '@mui/icons-material';
import { Container, Box, Grid, MenuItem } from '@mui/material';
import { CustomButton } from 'eventapp/components/form/CustomButton';
import { CustomInput } from 'eventapp/components/form/CustomInput';
import { CustomLink } from 'eventapp/components/form/CustomLink';
import { CustomSelect } from 'eventapp/components/form/CustomSelect';
import { CustomTitle } from 'eventapp/components/layout/CustomTitle';
import { Layout } from 'eventapp/components/layout/Layout';
import { getCategories } from 'eventapp/services/categories/categories.service';
import { addProduct } from 'eventapp/services/providers/providers.add.product';
import { IService } from 'interfaces';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';


type AddFormType = {
  name: string,
  description: string,
  images: string[],
  price: Number,
  category: {
    id: Number
  },
  user: {
    id: Number
  }
}

const initialData = {
  name: '',
  information: '',
  price: 0.0,
  images: [],
  category: {
    id: 1
  },
  user: {
    id: 1
  }
}


const ProviderAddForm: NextPage = () => {
  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm<AddFormType>();

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
    

  const handleChange = (e : any) => {
    const { name, value, type, files } = e.target;
  }

  const onSubmit: SubmitHandler<AddFormType> = async (formData) => {
    addProduct(formData)
  }

  return (
    <>
      <Head>
        <title>Eventify | Mis servicios</title>
        <meta property='og:title' content='Eventify' key='title'></meta>
        <meta
          name='description'
          content='Planifica tu evento de forma sencilla y eficaz'
        />
        <meta charSet='utf-8' />
        <meta name='evento, app de eventos, organización de eventos, organización' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        ></meta>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <Container>
          {/* <Toast open={credentialsError} onClose={handleCloseToast} severity="error" message={credentialsErrorMessage}/> */}
          <Box>
            <CustomLink href="/" underline="none" customVariant="link" customColor="gray"><ArrowBack /></CustomLink>
            <CustomTitle color="gray" htmlTag="h2" text="Registrarme" />
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
                    name="description"
                    label="description"
                    control={control}
                    defaultValue={initialData.information}
                    placeholder="Ej: Catering La suegra"
                    required={false}
                  />
                </Grid>
                <Grid item xs={12}>
                <CustomSelect xs={12}
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
                <Grid item xs={12}>
                  <CustomInput
                    type="number"
                    name="lastname"
                    label="Precio"
                    control={control}
                    defaultValue={initialData.price}
                    placeholder="1000"
                    required={true}
                  />
                </Grid>                                
                <Grid item xs={12}>
                  <CustomButton type="submit" variant="contained" customColor="primary">Guardar</CustomButton>
                </Grid>
              </Grid>
            </Box>            
          </Box>
        </Container>
      </Layout>
    </>
  )
}


export default ProviderAddForm;