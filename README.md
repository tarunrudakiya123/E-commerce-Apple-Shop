
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Demo = () => {
  const customers = [
    {
      _id: "12232y3y3343",
      name: "Tarun",
      amount: 200000,
      type: "Supplier",
    },
    {
      _id: "34232y3y3343",
      name: "Ram",
      amount: 580000,
      type: "Emplyee",
    },
    {
      _id: "883y3343",
      name: "Syam",
      amount: 9783,
      type: "customer",
    },
    {
      _id: "022232y3y3343",
      name: "Bhim",
      amount: 1003,
      type: "customer",
    },
  ];

  const handleSelectChange = (event) => {
    formik.handleChange(event);
    const selectedAmount = event.target.value;
    const selectedId = event.target.getAttribute("data-customerid");
    const selectedType = customers.find((customer) => customer._id === selectedId)?.type;

    formik.setValues({
      ...formik.values,
      selectedAmount,
      [`${selectedType?.toLocaleLowerCase()}Id`]: selectedId,
    });
    
  };

  const formik = useFormik({
    initialValues: {
      customerId: "",
      supplierId: "",
      emplyeeId: "",
      selectedAmount: "",
    },
    validationSchema: Yup.object({
      customerId: Yup.string().required("Please select a customer"),
      supplierId: Yup.string().required("Please select a supplier"),
      emplyeeId: Yup.string().required("Please select an employee"),
      selectedAmount: Yup.number().required("Amount is required").positive("Amount must be positive"),
    }),
    onSubmit: (values) => {
      console.log(formik.values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="customerSelect">Select Customer:</label>
        <select
          id="customerSelect"
          name="customerId"
          value={formik.values.customerId}
          onChange={handleSelectChange}
        >
          <option value="" disabled>Select a customer</option>
          {customers.map((customer) => (
            <option key={customer._id} value={customer.amount} data-customerid={customer._id}>
              {customer.name}
            </option>
          ))}
        </select>
        {formik.touched.customerId && formik.errors.customerId && (
          <div style={{ color: 'red' }}>{formik.errors.customerId}</div>
        )}
      </div>

      <div>
        <label htmlFor="amountField">Amount:</label>
        <input
          type="text"
          id="amountField"
          name="selectedAmount"
          value={formik.values.selectedAmount}
          readOnly
        />
        {formik.touched.selectedAmount && formik.errors.selectedAmount && (
          <div style={{ color: 'red' }}>{formik.errors.selectedAmount}</div>
        )}
      </div>

      <button className="btn btn-primary" type="submit">Submit</button>
    </form>
  );
};

export default Demo;
