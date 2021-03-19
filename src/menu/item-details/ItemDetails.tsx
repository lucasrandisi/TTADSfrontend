import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";

import useDefaultClasses from 'styles/classes';
import TextInput from 'common/input/TextInput';
import GET_ITEM_DETAILS from '../queries/get-item-details.query';
import CREATE_ITEM from "../queries/create-item";
import UPDATE_ITEM from "../queries/update-item";
import { ItemInterface } from "common/models/item.model";


const useClasses = makeStyles({
    formRow: {
        width: "40%",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "1.5vh",


        "&:last-of-type": {
            justifyContent: "center",
            marginTop: "5vh"
        }
    },

    "expanded-input": {
        width: "100%"
    },

    saveButton: {
        width: "8vw"
    }
});


const validationSchema = yup.object().shape({
    title: yup.string()
        .required('Required'),
    desc: yup.string(),
    cookTime: yup.number()
        .integer("Cook time must be an integer number")
        .positive("Cook time must be a positive number")
        .nullable()
        .transform(value => isNaN(value) ? null : value),
    servings: yup.number()
        .integer()
        .positive()
        .nullable()
        .transform(value => (isNaN(value) ? null : value)),
    pricePerUnit: yup.number()
        .positive()
        .required("Required")
})


export default function ItemDetails() {
    const theme = useContext(ThemeContext);
    const classes = useClasses(theme);
    const defaultClasses = useDefaultClasses(theme);

    const { itemId } = useParams() ;
    const { loading, error, data } = useQuery(
        GET_ITEM_DETAILS, 
        { 
            variables: { 
                id: itemId
            },
            skip: !itemId
        },
    );
    const [updateItem] = useMutation(UPDATE_ITEM);
    const [createItem] = useMutation(CREATE_ITEM)

    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>ERROR: {error.message}</p>;
    

    let item: ItemInterface | null = data ? data.item : null;

    const initialValues = {
        title: item?.title || "",
        desc: item?.desc || "",
        cookTime: item?.cookTime || "",
        servings: item?.servings || "",
        pricePerUnit: item?.pricePerUnit || "",
    }

    
    function onSubmit(values) {
        const castedValues = validationSchema.cast(values)

        if (item) {
            updateItem({
                variables: {
                    id: item.id,
                    itemInput: {
                        ...castedValues
                    },
                },
            });
        }
        else {
            createItem({
                variables: {
                    itemInput: {
                        ...castedValues
                    },
                },
            });
        }
    }


    function updateCache(cache, result, targetItem) {
		if (result) {
			cache.modify({
				id: cache.identify(targetItem),
				fields: {
                    title: () => result.title,
                    descs: () => result.desc,
                    cookTime: () => result.cookTime,
                    servings: () => result.servings,
                    pricePerUnit: () => result.pricePerUnit,
					categories: () => result.categories,
				},
			});
		}
    }

    return (
        <div className={defaultClasses.main}>
            <h1 className={defaultClasses.mainTitle}>Item Details</h1>

            <div className={defaultClasses.content}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => onSubmit(values)}>
                    <Form>
                        <div className={classes.formRow}>
                            <TextInput 
                                label="Title"
                                name="title"
                                theme={theme}
                                type="text">
                            </TextInput>

                            <TextInput 
                                label="Price"
                                name="pricePerUnit"
                                theme={theme}
                                type="number">
                            </TextInput>
                        </div>

                        <div className={classes.formRow}>
                            <TextInput 
                                label="Cook Time"
                                name="cookTime"
                                theme={theme}
                                type="number"
                                helperText={"Expressed in minutes"}>
                            </TextInput>

                            <TextInput 
                                label="Servings"
                                name="servings"
                                theme={theme}
                                type="number">
                            </TextInput>
                        </div>

                        <div className={classes.formRow}>
                            <TextInput 
                                classNames={classes["expanded-input"]}
                                label="Description"
                                name="desc"
                                theme={theme}
                                type="text"
                                multiline
                                rowsMax={2}>
                            </TextInput>
                        </div>

                        <div className={classes.formRow}>
                            <Button 
                                className={classes.saveButton}
                                variant="contained" color="primary" 
                                type="submit">Save
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}