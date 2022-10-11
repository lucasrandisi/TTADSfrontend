import React, {useState} from 'react';

//materia-ui
import { OutlinedInput } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// styles
import "./item.scss";
import "../styles/index.scss";

//form
import {useFormik} from "formik";
import * as Yup from "yup";

//graph
import { useMutation } from "@apollo/client";
import { CREATE_ITEM, UPDATE_ITEM } from './queries/item';
import GET_CATEGORIES_AND_ITEMS from "./queries/categories-and-items.query";

const form_inputs = [
    {
        name: "title",
        label:"Dish name"
    },
    {
        name: "desc",
        label:"Description"
    },
    {
        name: "servings",
        label:"Servings"
    },
    {
        name: "pricePerUnit",
        label:"Price per unit"
    },
];

export default function ItemForm(props) {
    const [state, setState] = useState(true);

    const handleClose = () => {
        setState(false);
        props.setChildrenModal(<></>)
    };

    const [updateItem] = useMutation(UPDATE_ITEM, {
		refetchQueries: [{ query: GET_CATEGORIES_AND_ITEMS }],
	});

    const [createItem] = useMutation(CREATE_ITEM, {
		refetchQueries: [{ query: GET_CATEGORIES_AND_ITEMS }],
	});

    const updateItemEdit = values => {
        updateItem({ variables: {
            id: values.id,
            itemInput: 
                {                    
                    title: values.title,
                    desc: values.desc,
                    servings: parseInt(values.servings),
                    pricePerUnit: values.pricePerUnit,
                } 
            }
        })
	};

    const createItemEdit = values => {
        createItem({ variables: {
            title: values.title,
            desc: values.desc,
            servings: parseInt(values.servings),
            pricePerUnit: parseInt(values.pricePerUnit),
            }  })
    }

    const formik = useFormik({
        initialValues: props.values,
        validationSchema: Yup.object({
            title: Yup.string().required("This field is required."),
            desc: Yup.string().required("This field is required."),            
            servings: Yup.number().required().moreThan(0),
            pricePerUnit: Yup.number().required().moreThan(0),
        }),
        onSubmit: (values) => { 
            props.isEdit ? updateItemEdit(values) : createItemEdit(values)
            handleClose();
        }
    });

    return (
        <Dialog
            open={state}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className='item-dialog'
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>                
                <form className='item-form' onSubmit={formik.handleSubmit}>
                    {
                        form_inputs.map(
                            ({name, label}, i) => 
                            <OutlinedInput
                                key={i}
                                className="item-input"
                                placeholder={label}
                                name={name}
                                value={formik.values[name] || ""}
                                onChange={formik.handleChange}
                                error={!!formik.errors[name]}
                            />
                        )
                    }
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Back
                        </Button>
                        <Button 
                            type="submit"
                            color="primary" autoFocus>
                            {props.actionButtonText ? props.actionButtonText : "Save"}
                        </Button>            
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )
}