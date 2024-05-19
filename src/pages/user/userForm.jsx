import { useTheme } from "@emotion/react";
import { Box, Grid  } from "@mui/material";
import React, { useState, useEffect } from "react";
import {Useform, FormCustom} from '../../components/Useform'
import CustomInput from '../../components/controls/CustomInput'
import CustomButton from '../../components/controls/CustomButton' 
import CustomRadioInput from "../../components/controls/CustomRadioInput";

const initialValue = {
    name: "",
    gender: "",
    school: "",
};

const genderItem = [
    {id: "male", title: "Nam"},
    {id: "female", title: "Nữ"},
    {id: "other", title: "Khác"}
]

export default function UserForm(props) {
    const { addOrEdit, dataForEdit } = props;
    const styles = {
        inputtext50: {
            width: "85%",
            margin: "8px"
        },
        pageContent: {
            margin: "5px",
            padding: "3px",
            backgroundColor: "#f9f9f9",
        },
        customButton: {
            margin: "8px"
        }
    };
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ("name" in fieldValues)
            temp.name = fieldValues.name ? "" : "Trường này không được để trống";
        if ("school" in fieldValues)
            temp.school = fieldValues.school ? "" : "Trường này không được để trống";
        setErrors({
            ...temp
        });
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "");
    }
    const {
        values,
        setValues,
        resetForm,
        errors,
        setErrors,
        handleInputChange
    } = Useform(initialValue, true, validate);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            addOrEdit(values, resetForm);
        } 
    }
    useEffect(() => {
        if (dataForEdit != null) {
            setValues({
                ...dataForEdit
            });
        }
    }, [dataForEdit]);

    return (
        <FormCustom onSubmit={handleSubmit} sx={styles.pageContent}>
            <Grid container>
                <Grid item xs={6}>
                    <CustomInput
                        label="Họ và tên"
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                        sx={styles.inputtext50}
                        error={errors.name}
                    />
                    <CustomInput
                        label="Trường"
                        name="school"
                        value={values.school}
                        onChange={handleInputChange}
                        sx={styles.inputtext50}
                        error={errors.school}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomRadioInput
                        label="Giới tính"
                        name="gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItem}
                    />
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <CustomButton
                            variant="contained"
                            color="primary"
                            size="large"
                            text="Gửi"
                            type="submit"
                            sx={styles.customButton}
                        />
                        <CustomButton
                            variant="contained"
                            color="secondary"
                            size="large"
                            text="Hủy"
                            onClick={resetForm}
                            sx={styles.customButton}
                        />
            </Box>
        </FormCustom>
)
}   