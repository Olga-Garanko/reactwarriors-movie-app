import React from "react";

const Select = props => {
	const {
		id,
		label,
		name,
		value,
		options,
		onChange
	} = props;
	const getOptionsItems = () => {
		return options.map((item, i) => (
			<option key={i} value={item.value}>
				{item.label}
			</option>
		));
	};
	return (
		<div className="form-group">
			<label htmlFor={id}>{ label }</label>
			<select
				className="form-control"
				id={id}
				name={name}
				value={value}
				onChange={onChange}
			>
			{getOptionsItems()}
			</select>
		</div>
	);
};

export default Select;
