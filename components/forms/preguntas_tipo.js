import React from 'react'

export const preguntas_tipo = () => {
  return (
    <div>


{/* CON BOOLEAN  */}
<div>
    <label className="block text-gray-700 text-sm font-bold mb-2">
        El   
    </label>
    <label className="inline-flex items-center mr-3">
        <input
            type="radio"
            className="form-radio"
            name="aaavariableaaa"
            value="true"
            checked={props.values.aaavariableaaa === true}
            onChange={() => props.setFieldValue("aaavariableaaa", true)}
        />
        <span className="ml-2">Sí</span>
    </label>
    <label className="inline-flex items-center">
        <input
            type="radio"
            className="form-radio"
            name="aaavariableaaa"
            value="false"
            checked={props.values.aaavariableaaa === false}
            onChange={() => props.setFieldValue("aaavariableaaa", false)}
        />
        <span className="ml-2">No</span>
    </label>
</div>


{/* CON GRUPOS   */}
<label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
    Grupo
</label>
<div id="aaavariableaaa">
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="aaavariableaaa"
        value="valor11"
        checked={props.values.aaavariableaaa === 'valor11'}
        onChange={() => props.setFieldValue("aaavariableaaa", "valor11")}
    />
    <span className="ml-2">valor11</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="aaavariableaaa"
        value="valor22"
        checked={props.values.aaavariableaaa === 'valor22'}
        onChange={() => props.setFieldValue("aaavariableaaa", "valor22")}
    />
    <span className="ml-2">valor22</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="aaavariableaaa"
        value="valor33"
        checked={props.values.aaavariableaaa === 'valor33'}
        onChange={() => props.setFieldValue("aaavariableaaa", "valor33")}
    />
    <span className="ml-2">valor33</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="aaavariableaaa"
        value="valor44"
        checked={props.values.aaavariableaaa === 'valor44'}
        onChange={() => props.setFieldValue("aaavariableaaa", "valor44")}
    />
    <span className="ml-2">valor44</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="aaavariableaaa"
        value="valor55"
        checked={props.values.aaavariableaaa === 'valor55'}
        onChange={() => props.setFieldValue("aaavariableaaa", "valor55")}
    />
    <span className="ml-2">valor55</span>
</label>
</div>


{/* CON INT  */}
<div className="mb-4">
<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aaavariableaaa">
    Nutr
</label>

<input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="aaavariableaaa"
    type="number"
    placeholder="aaavariableaaa"
    onChange={props.handleChange}
    onBlur={props.handleBlur}
    value={props.values.aaavariableaaa}
/>
</div>

{ props.touched.aaavariableaaa && props.errors.aaavariableaaa ? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
    <p className="font-bold">Error</p>
    <p>{props.errors.aaavariableaaa}</p>
</div>
) : null  }



{/* CON STRING  */}
<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aaavariableaaa">
        barthel
    </label>

    <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="aaavariableaaa"
        type="text"
        placeholder="aaavariableaaa"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.aaavariableaaa}
    />
</div>

{ props.touched.aaavariableaaa && props.errors.aaavariableaaa ? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{props.errors.aaavariableaaa}</p>
    </div>
) : null  }



{/* CON SELECT  */}
<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aaavariableaaa">
        Diagnóstico
    </label>
    <Select
        id="aaavariableaaa"
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        options={diagnosticoOptions}
        onChange={(selectedOption) => 
            props.setFieldValue('aaavariableaaa', selectedOption.value)}
        onBlur={props.handleBlur}
        value={diagnosticoOptions.find(option => option.value === props.values.aaavariableaaa)}
    />
    {props.errors.aaavariableaaa && (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p className="font-bold">Error</p>
            <p>{props.errors.aaavariableaaa}</p>
        </div>
    )}
</div>


{/* CON CHECKBOX  */}
<div className="mb-4">
    <div className="block text-gray-700 text-sm font-bold mb-2">
        Grupo
    </div>
    {[
        'TrasladoDeHospital',
        'InfeccionReciente',
    ].map((option) => (
        <div key={option} className="block">
            <input
                type="checkbox"
                id={option}
                name="aaavariableaaa"
                value={option}
                onChange={(e) => {
                    const isChecked = e.target.checked;
                    const value = e.target.value;

                    props.setFieldValue(
                        'aaavariableaaa',
                        isChecked
                        ? [...props.values.aaavariableaaa, value]
                        : props.values.aaavariableaaa.filter((val) => val !== value)
                    );
                }}
                onBlur={props.handleBlur}
                checked={props.values.aaavariableaaa.includes(option)}
                className="mr-2"
            />
            <label htmlFor={option}>{option}</label>
        </div>
    ))}
</div>










</div>
  )
}
