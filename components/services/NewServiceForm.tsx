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
  features_string: ''
}

export const NewServiceForm: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const providerId = Number(id);

  const { control, handleSubmit, getValues, formState: {errors} } = useForm<IService & IServiceProvider>();

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

    const features = !initialFeatures ? undefined : (initialFeatures.includes(',') ? initialFeatures.split(',').map(feature => feature.trim()).filter(Boolean) : [initialFeatures.trim()]);

    const serviceData: (IService & IServiceProvider) = {
      ...data,
      features: features,
      providerId: providerId,
    };

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
                placeholder="Ingresa las características separadas por coma. Ej: Grandioso, Fabuloso, Increíblemente bueno"
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