'use client';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { Toast } from '../form/Toast';
import { CustomLink } from '../form/CustomLink';
import { CustomInput } from '../form/CustomInput';
import { CustomButton } from '../form/CustomButton';
import { CustomTitle } from '../layout/CustomTitle';
import { CustomSelect } from '../form/CustomSelect';
import { ICategory, IService, IServiceProvider } from 'interfaces';
import { getCategories } from 'eventapp/services/categories/categories.service';
import { createService } from 'eventapp/services/services/servicios.service';
import s from '../../styles/services/NewServiceForm.module.css';

const initialData: (IService & IServiceProvider) = {
  name: '',
  price: 0,
  shortDescription: '',
  description: '',
  location: '',
  categoryId: 0,
  providerId: 0,
  features_string: '',
  imageUrls_string: ''
}

export const NewServiceForm: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const providerId = Number(id);

  const { control, handleSubmit, getValues, formState: {errors}, clearErrors } = useForm<IService & IServiceProvider>();

  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {        
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error al obtener servicios: ', error);
      }
    };
    fetchData();
  }, []);

  const [toast, setToast] = useState<'success' | 'error' | ''>('');
  const [toastMessage, setToastMessage] = useState<string | undefined>(undefined);

  const handleCloseToast = () => {
    setToast('');
  };

  const onSubmit: SubmitHandler<IService & IServiceProvider> = async (data) => {
    const initialFeatures = getValues('features_string');
    const initialImageUrls = getValues('imageUrls_string');

    const features = !initialFeatures ? undefined : (initialFeatures.includes(',') ? initialFeatures.split(',').map(feature => feature.trim()).filter(Boolean) : [initialFeatures.trim()]);
    const imageUrls = !initialImageUrls ? undefined : (initialImageUrls.includes(',') ? initialImageUrls.split(',').map(feature => feature.trim()).filter(Boolean) : [initialImageUrls.trim()]);

    const serviceData: (IService & IServiceProvider) = {
      ...data,
      features: features,
      imageUrls: imageUrls,
      providerId: providerId,
    };

    clearErrors();

    const response = await createService(serviceData);

    try{
      if(response.ok){
        setToast('success');
        setToastMessage('El servicio fue cargado con éxito.');
        router.push(`/providers/${providerId}/services`);
      } else{
        setToast('error');
        setToastMessage('Ha ocurrido un error al cargar el servicio');
      }
    } catch(error: any){
      setToast('error');
      setToastMessage(`Error al cargar el servicio: ${error}`);
    }
  };

  return(
    <Container className={s.container}>
      {toast === 'success' || toast === 'error' && (
        <Toast open={true} onClose={handleCloseToast} severity={toast} message={toastMessage}/>
      )}
     <Box>
        <CustomTitle color="gray" htmlTag="h2" text="Agregar servicio" className={s.title}/>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CustomInput
                type="text"
                name="name"
                label="Nombre del servicio"
                control={control}
                defaultValue={initialData.name}
                placeholder="Ej: Mundo Photo"
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomInput
                type="number"
                name="price"
                label="Precio del servicio"
                control={control}
                defaultValue={initialData.price}
                placeholder="Ej: 500"
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomSelect
                name="categoryId"
                label="Categoría del servicio"
                control={control}
                required={true}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {categories.map((c) => (
                  <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomSelect
                name="location"
                label="Provincia"
                control={control}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Buenos Aires">Buenos Aires</MenuItem>
                <MenuItem value="CABA">CABA</MenuItem>
                <MenuItem value="Catamarca">Catamarca</MenuItem>
                <MenuItem value="Chaco">Chaco</MenuItem>
                <MenuItem value="Chubut">Chubut</MenuItem>
                <MenuItem value="Córdoba">Córdoba</MenuItem>
                <MenuItem value="Corrientes">Corrientes</MenuItem>
                <MenuItem value="Entre Ríos">Entre Ríos</MenuItem>
                <MenuItem value="Formosa">Formosa</MenuItem>
                <MenuItem value="Jujuy">Jujuy</MenuItem>
                <MenuItem value="La Pampa">La Pampa</MenuItem>
                <MenuItem value="La Rioja">La Rioja</MenuItem>
                <MenuItem value="Mendoza">Mendoza</MenuItem>
                <MenuItem value="Misiones">Misiones</MenuItem>
                <MenuItem value="Neuquén">Neuquén</MenuItem>
                <MenuItem value="Río Negro">Río Negro</MenuItem>
                <MenuItem value="Salta">Salta</MenuItem>
                <MenuItem value="San Juan">San Juan</MenuItem>
                <MenuItem value="San Luis">San Luis</MenuItem>
                <MenuItem value="Santa Cruz">Santa Cruz</MenuItem>
                <MenuItem value="Santa Fe">Santa Fe</MenuItem>
                <MenuItem value="Santiago del Estero">Santiago del Estero</MenuItem>
                <MenuItem value="Tierra del Fuego">Tierra del Fuego</MenuItem>
                <MenuItem value="Tucumán">Tucumán</MenuItem>
              </CustomSelect>
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                type="text"
                name="shortDescription"
                label="Descripción corta"
                control={control}
                defaultValue={initialData.shortDescription}
                placeholder="Ej: Las mejores fotografías del mundo"
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                type="text"
                name="description"
                label="Descripción completa"
                control={control}
                defaultValue={initialData.description}
                placeholder="Ej: Nuestra empresa se dedica hace más de 50 años a..."
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                type="text"
                name="features_string"
                label="Características"
                control={control}
                defaultValue={initialData.features_string}
                placeholder="Ingresa las características separadas por coma"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                type="text"
                name="imageUrls_string"
                label="Imágenes"
                control={control}
                defaultValue={initialData.imageUrls_string}
                placeholder="Ingresa la url de las imágenes separadas por coma"
              />
            </Grid>
            <Grid item xs={12}>
              <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2} className={s['buttons-box']}>
                <CustomButton type="submit" variant="contained" customColor="primary">Agregar servicio</CustomButton>
                <CustomLink href={`/providers/${providerId}/services`} underline="none" customVariant="link" customColor="primary">Cancelar</CustomLink>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}