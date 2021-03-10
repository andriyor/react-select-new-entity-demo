import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { clearNestedForm, setForm, setNestedForm } from '../redux/formSlice';
import { Ingredient } from '../types/Ingredient';
import { saveIngredient } from '../rest/ingredient';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { useDebounce } from 'use-debounce';
import { RootState } from '../redux/rootReducer';

const NestedForm = () => {
  const { control, handleSubmit, watch, getValues, reset } = useForm<Ingredient>();
  const nestedForm = useSelector((state: RootState) => state.form.nestedForm);
  const [formValue, setFormValue] = useState<Ingredient>();
  const dispatch = useDispatch();
  const history = useHistory();
  const [value] = useDebounce(formValue, 300);

  useEffect(() => {
    reset(nestedForm);
  }, []);

  useEffect(() => {
    dispatch(setNestedForm(value));
  }, [value]);

  const onSubmit = (data: Ingredient) => {
    saveIngredient(data).then((data) => {
      dispatch(setForm(data));
      dispatch(clearNestedForm());
      history.push('..');
    });
  };

  useDeepCompareEffect(() => {
    setFormValue(getValues());
  }, [watch()]);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Button variant="contained" color="primary" component={Link} to=".." startIcon={<ArrowBackIcon />}>
          Go Back
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '20px' }}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <TextField onChange={onChange} value={value} id="outlined-basic" label="Name" variant="outlined" />
            )}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Controller
            name="proteins"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <TextField onChange={onChange} value={value} id="outlined-basic" label="Proteins" variant="outlined" />
            )}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Controller
            name="fats"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <TextField onChange={onChange} value={value} id="outlined-basic" label="Fats" variant="outlined" />
            )}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Controller
            name="carbohydrates"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <TextField
                onChange={onChange}
                value={value}
                id="outlined-basic"
                label="Carbohydrates"
                variant="outlined"
              />
            )}
          />
        </div>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NestedForm;
