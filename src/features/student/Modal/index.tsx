import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {CreateStudent} from 'models';
import {Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { studentActions } from '../studentSlice';

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    age: yup
      .number()
      .typeError('Age must be a number')
      .required('Age is required')
      .min(0, 'Too little')
      .max(5000, 'Very costly'),
    mark: yup.number().typeError('Mark must be a number').required('Mark is required'),
    gender: yup.string().required('Gender is required'),
    city: yup.string().required('City is required'),
  })
  .required();

interface ModalCreateProps {
  onClose?: () => void;
}

export default function ModalCreateStudent(props: ModalCreateProps) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<CreateStudent>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: CreateStudent) => {
    dispatch(studentActions.createStudent(data));
    props.onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        sx={{marginBottom: '10px'}}
        autoComplete='off'
        {...register('name')}
        error={errors.name?.message ? true : false}
        id='standard-error-helper-text'
        label='Name:'
        helperText={errors.name?.message || 'Enter to study name'}
        variant='standard'
      />
      <TextField
        sx={{marginBottom: '10px'}}
        autoComplete='off'
        {...register('age')}
        error={errors.age?.message ? true : false}
        id='standard-error-helper-text'
        label='Age:'
        helperText={errors.age?.message || 'Enter to study age'}
        variant='standard'
      />
      <TextField
        sx={{marginBottom: '10px'}}
        autoComplete='off'
        {...register('mark')}
        error={errors.mark?.message ? true : false}
        id='standard-error-helper-text'
        label='Mark:'
        helperText={errors.mark?.message || 'Enter to study mark'}
        variant='standard'
      />
      <FormControl
        variant='standard'
        error={errors?.gender?.message ? true : false}
        sx={{minWidth: 167, marginBottom: '10px'}}
      >
        <InputLabel
          id={
            errors?.gender?.message
              ? 'demo-simple-select-error-label'
              : 'demo-simple-select-standard-label'
          }
        >
          Gender:
        </InputLabel>
        <Select
          labelId={
            errors?.gender?.message
              ? 'demo-simple-select-error-label'
              : 'demo-simple-select-standard-label'
          }
          id={errors?.gender?.message ? 'demo-simple-select-error' : 'demo-simple-select-standard'}
          {...register('gender')}
          label='Gender'
        >
          <MenuItem value={10}>Male</MenuItem>
          <MenuItem value={20}>Female</MenuItem>
        </Select>
        <FormHelperText>{errors?.gender?.message}</FormHelperText>
      </FormControl>
      <TextField
        sx={{marginBottom: '10px'}}
        autoComplete='off'
        {...register('city')}
        error={errors.city?.message ? true : false}
        id='standard-error-helper-text'
        label='City:'
        helperText={errors.city?.message || 'Enter to study city'}
        variant='standard'
      />
      <Button sx={{marginTop: '15px', marginBottom: '15px'}} type='submit' variant='contained'>
        Create
      </Button>
    </form>
  );
}
