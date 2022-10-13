import React, {useState} from 'react';
import Select from "react-select";
import makeAnimated from "react-select/animated";

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
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_ITEM, UPDATE_ITEM } from './queries/item';
import GET_CATEGORIES_AND_ITEMS from "./queries/categories-and-items.query";
import { GET_CATEGORIES } from './queries/category';

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

const validationSchema = Yup.object({
    title: Yup.string().required("This field is required."),
    desc: Yup.string().required("This field is required."),            
    servings: Yup.number().required().moreThan(0),
    pricePerUnit: Yup.number().required().moreThan(0),
});

const intiializedValues = { 
    title: "", desc: "", servings: null, pricePerUnit: null, categories: [],
};

export default function ItemForm(props) {
    const animatedComponents = makeAnimated();    
    const initialValues = props.values || intiializedValues;
    const initialCategs = initialValues.categories.map((c)=>{
        return { value: c, label: c.desc }
    })
    const [state, setState] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState<any>(initialCategs || []);

    const handleClose = () => {
        setState(false);
        props.setChildrenModal(<></>)
    };

    const { data } = useQuery(GET_CATEGORIES);

    const allCategs = data.categories.map((c)=>{
        return { value: c, label: c.desc }
    })

    const [updateItem] = useMutation(UPDATE_ITEM, {
		refetchQueries: [{ query: GET_CATEGORIES_AND_ITEMS }],
	});

    const [createItem] = useMutation(CREATE_ITEM, {
		refetchQueries: [{ query: GET_CATEGORIES_AND_ITEMS }],
	});

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => { 
            const categIds = selectedOptions.map((e) => e.value.id)
            const row = {                
                title: values.title,
                desc: values.desc,
                servings: parseInt(values.servings),
                pricePerUnit: parseInt(values.pricePerUnit),
                categoriesId: categIds.filter((id, index) => categIds.indexOf(id) === index)
            }
            props.isEdit ? 
                updateItem({ variables: { id: values.id, itemInput: row } }) : 
                createItem({ variables: { item: row } })
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
                    <Select  
                        className="item-input"               
                        defaultValue={selectedOptions}
                        components={animatedComponents}
                        isMulti options={allCategs}
                        isClearable={true} isSearchable={true}
                        isDisabled={false} isLoading={false}
                        isRtl={false} closeMenuOnSelect={false}
                        onChange={(item) => setSelectedOptions(item)}
                    /> 

                    {form_inputs.map(({name, label}, i) => 
                        <OutlinedInput
                            key={i}
                            className="item-input"
                            placeholder={label}
                            name={name}
                            value={formik.values[name] || ""}
                            onChange={formik.handleChange}
                            error={!!formik.errors[name]}
                        />
                    )}              
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