import React, { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import useDeepCompareEffect from 'use-deep-compare-effect';

import Select from 'react-select';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Button, IconButton, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import { RootState } from '../redux/rootReducer';
import { Ingredient } from '../types/Ingredient';
import { fetchIngredients } from '../rest/ingredient';
import { createRecipe } from '../rest/recipes';
import { clearForm, setMainForm } from '../redux/formSlice';
import { MainForm } from '../types/MainForm';

const Form = () => {
  const form = useSelector((state: RootState) => state.form.form);
  const mainForm = useSelector((state: RootState) => state.form.mainForm);
  const { control, handleSubmit, formState, watch, getValues, reset, setValue } = useForm<MainForm>();
  const [options, setOptions] = useState<Ingredient[]>([]);
  const [formValue, setFormValue] = useState<MainForm>();
  const dispatch = useDispatch();
  const [value] = useDebounce(formValue, 300);

  const onSubmit = (data: MainForm) => {
    createRecipe(data).then((data) => {
      dispatch(clearForm());
    });
  };

  useEffect(() => {
    reset({ ...mainForm, ingredients: [...mainForm.ingredients, ...form] });
    fetchIngredients().then((ingredients) => setOptions(ingredients.map(toOption)));
  }, []);

  useEffect(() => {
    if (value) {
      dispatch(setMainForm(value));
    }
  }, [value]);

  useDeepCompareEffect(() => {
    setFormValue(getValues());
  }, [watch()]);

  const toOption = (ingredient: Ingredient) => {
    return { id: ingredient.id, value: ingredient.id, label: getOptionLabel(ingredient) };
  };

  const getOptionLabel = (data: any) =>
    `${data.name} Proteins: ${data.proteins}  Fats: ${data.fats} Carbohydrates: ${data.carbohydrates}`;

  const onSelectChange = (data: any) => {
    setValue(
      'ingredients',
      data.map((data: any) => data.value)
    );
  };

  const getSelectVal = () => {
    const ingredients = getValues('ingredients');
    if (ingredients?.length) {
      return options.filter((option: any) => ingredients.some((val: any) => val === option.id));
    } else {
      return [];
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '20px' }}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <TextField
                size="small"
                onChange={onChange}
                value={value}
                id="outlined-basic"
                label="Name"
                variant="outlined"
              />
            )}
          />
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ width: '100%' }}>
            <Controller
              inputId="your-custom-id"
              name="ingredients"
              control={control}
              defaultValue={false}
              rules={{ required: true }}
              render={({ onChange, onBlur, value }) => (
                <Select isMulti value={getSelectVal()} options={options} isClearable onChange={onSelectChange} />
              )}
            />
          </div>
          <div>
            <IconButton component={Link} to="/new" aria-label="delete">
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
        </div>

        <Button variant="contained" color="primary" size="small" type="submit" startIcon={<SaveIcon />}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default Form;
