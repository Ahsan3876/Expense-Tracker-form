import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";

export default function ExpenseForm({ setExpenses }) {
  const [expense, setExpense] = useState({
    title: " ",
    category: " ",
    amount: " ",
  });

  const [errors, setErrors] = useState({});

  const validateConfig = {
    title: [
      { required: "true", message: "Please enter a title" },
      {
        minlength: 5,
        message: "Title should be at least 5 character of length",
      },
    ],
    category: [{ required: "true", message: "Please select a category" }],
    amount: [{ required: "true", message: "Please enter an amount" }],
  };

  const validate = (formData) => {
    const errorsData = {};
    Object.entries(formData).forEach(([key, value]) => {
      validateConfig[key].some((rule) => {
        if (rule.required && value === " ") {
          errorsData[key] = rule.message;
          return true;
        }
        if (rule.minlength && value.length < 4) {
          errorsData[key] = rule.message;
          return true;
        }
      });
    });

    // if (!formData.title.trim()) {
    //   errorsData.title = "Title is required";
    // }
    // if (!formData.category.trim()) {
    //   errorsData.category = "Please Select a Category";
    // }
    // if (!formData.amount.trim()) {
    //   errorsData.amount = "Amount is required";
    // }
    setErrors(errorsData);
    return errorsData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateResult = validate(expense);
    if (Object.keys(validateResult).length) return;
    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);
    setExpense({
      title: " ",
      category: " ",
      amount: " ",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({ ...prevState, [name]: e.target.value }));
    setErrors({});
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <Input
        label="Title"
        id="title"
        name="title"
        value={expense.title}
        onChange={handleChange}
        error={errors.title}
      />
      <Select
        label="Category"
        id="category"
        name="category"
        value={expense.category}
        onChange={handleChange}
        error={errors.category}
        options={["Grocery", "Bills", "Education", "Clothes", "Medicine"]}
        defaultOption="Select a Category"
      />
      <Input
        label="Amount"
        id="amount"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        error={errors.amount}
      />
      <button className="add-btn">Add</button>
    </form>
  );
}
