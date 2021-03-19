import { useField } from 'formik';
import { makeStyles } from "@material-ui/core/styles";
import React from 'react';
import { FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';

const useClasses = makeStyles({
    error: {
		color: theme => theme.error
    },
});


 export default function TextInput({theme, label, classNames = null , helperText = null, ...props}) {
    const [field, meta] = useField(props);
    const classes = useClasses(theme);

    return (
        <FormControl className={classNames} size="small">
            <InputLabel htmlFor={props.name}>{label}</InputLabel>
            <Input {...field} {...props}/>
            { meta.touched && meta.error ? 
            <FormHelperText className={classes.error}>{meta.error}</FormHelperText>
            : <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};