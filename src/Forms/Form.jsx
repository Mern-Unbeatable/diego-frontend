import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const Form = ({
  children,
  onSubmit,
  resolver,
  defaultValues,
  className = '',
  id,
}) => {
  const formConfig = {};

  if (resolver) {
    formConfig.resolver = resolver;
  }

  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const submit = async (data) => {
    await onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form id={id} onSubmit={handleSubmit(submit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
