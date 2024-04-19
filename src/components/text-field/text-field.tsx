'use client'

import React from 'react';
import { ErrorMessage, FieldHookConfig, useField } from 'formik';
import { TextFieldProps } from './text-field.props';

const TextField = ({ ...props }: TextFieldProps & FieldHookConfig<string>) => {
	const [field, meta, helpers] = useField(props);

	return (
		<div className='w-full inline-block'>
			<label
				htmlFor=''
				className={`inline-block w-full ${meta.touched && meta.error && 'border-red-500 border-2'}`}
			>
				<input className='input' {...props} {...field} />
			</label>
			<p className='text-red-500'>
				<ErrorMessage name={field.name} />
			</p>
		</div>
	);
};

export default TextField;
