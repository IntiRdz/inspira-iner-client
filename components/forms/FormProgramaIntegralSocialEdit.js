import React from 'react';
import { Formik } from 'formik';
import Select from 'react-select';
import CreateTableSelect from 'react-select/creatable';
import { socialOptionsLengua, socialOptionsReligion, socialOptionsExpuesto } from './selecProgramaIntegral';

export default function FormProgramaIntegralSocialEdit ({ initialValues, validationSchema, onSubmit })  {
    return (

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
{(props) => (

<form 
    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" 
    onSubmit={props.handleSubmit}
>
  <h2 className='font-bold my-3'>Editar Programa Integral Social</h2>
  
<label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
    Grupo Etario
</label>
<div id="programa_social_grupo_etario">
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_grupo_etario"
        value="Pediatrico"
        checked={props.values.programa_social_grupo_etario === 'Pediatrico'}
        onChange={() => props.setFieldValue("programa_social_grupo_etario", "Pediatrico")}
    />
    <span className="ml-2">Pediatrico ( menor a 18 años ) </span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_grupo_etario"
        value="Adulto"
        checked={props.values.programa_social_grupo_etario === 'Adulto'}
        onChange={() => props.setFieldValue("programa_social_grupo_etario", "Adulto")}
    />
    <span className="ml-2">Adulto (18 - 65 años)</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_grupo_etario"
        value="Adulto con barreras"
        checked={props.values.programa_social_grupo_etario === 'Adulto con barreras'}
        onChange={() => props.setFieldValue("programa_social_grupo_etario", "Adulto con barreras")}
    />
    <span className="ml-2">Adulto con barreras para toma de decisiones</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_grupo_etario"
        value="Adulto mayor"
        checked={props.values.programa_social_grupo_etario === 'Adulto mayor'}
        onChange={() => props.setFieldValue("programa_social_grupo_etario", "Adulto mayor")}
    />
    <span className="ml-2">Adulto Mayor (más de 65 años)</span>
</label>
</div>

{ props.touched.programa_social_grupo_etario && props.errors.programa_social_grupo_etario ? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{props.errors.programa_social_grupo_etario}</p>
    </div>
) : null  }

<label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
Genero
</label>
<div id="programa_social_genero">
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_genero"
        value="Cisgenero"
        checked={props.values.programa_social_genero === 'Cisgenero'}
        onChange={() => props.setFieldValue("programa_social_genero", "Cisgenero")}
    />
    <span className="ml-2">Cisgénero</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_genero"
        value="Transgenero"
        checked={props.values.programa_social_genero === 'Transgenero'}
        onChange={() => props.setFieldValue("programa_social_genero", "Transgenero")}
    />
    <span className="ml-2">Transgénero</span>
</label>
</div>

{ props.touched.programa_social_genero && props.errors.programa_social_genero ? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{props.errors.programa_social_genero}</p>
    </div>
) : null  }


<label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
    Orientación Sexual
</label>
<div id="programa_social_orientacion_sexual">
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_orientacion_sexual"
        value="Heterosexual"
        checked={props.values.programa_social_orientacion_sexual === 'Heterosexual'}
        onChange={() => props.setFieldValue("programa_social_orientacion_sexual", "Heterosexual")}
    />
    <span className="ml-2">Heterosexual</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_orientacion_sexual"
        value="Homosexual"
        checked={props.values.programa_social_orientacion_sexual === 'Homosexual'}
        onChange={() => props.setFieldValue("programa_social_orientacion_sexual", "Homosexual")}
    />
    <span className="ml-2">Homosexual</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_orientacion_sexual"
        value="Bisexual"
        checked={props.values.programa_social_orientacion_sexual === 'Bisexual'}
        onChange={() => props.setFieldValue("programa_social_orientacion_sexual", "Bisexual")}
    />
    <span className="ml-2">Bisexual</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_orientacion_sexual"
        value="Asexual"
        checked={props.values.programa_social_orientacion_sexual === 'Asexual'}
        onChange={() => props.setFieldValue("programa_social_orientacion_sexual", "Asexual")}
    />
    <span className="ml-2">Asexual</span>
</label>
</div>

{ props.touched.programa_social_orientacion_sexual && props.errors.programa_social_orientacion_sexual ? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{props.errors.programa_social_orientacion_sexual}</p>
    </div>
) : null  }

<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programa_social_municipio">
    Lugar de Procedencia (Municipio)
    </label>

    <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="programa_social_municipio"
        type="text"
        placeholder="programa_social_municipio"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.programa_social_municipio}
    />
</div>

{ props.touched.programa_social_municipio && props.errors.programa_social_municipio ? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{props.errors.programa_social_municipio}</p>
    </div>
) : null  }

<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programa_social_estado">
    Lugar de Procedencia (Estado)
    </label>

    <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="programa_social_estado"
        type="text"
        placeholder="programa_social_estado"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.programa_social_estado}
    />
</div>

{ props.touched.programa_social_estado && props.errors.programa_social_estado ? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{props.errors.programa_social_estado}</p>
    </div>
) : null  }

<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programa_social_pais">
    Lugar de Procedencia (País)
    </label>

    <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="programa_social_pais"
        type="text"
        placeholder="programa_social_pais"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.programa_social_pais}
    />
</div>

{ props.touched.programa_social_pais && props.errors.programa_social_pais ? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{props.errors.programa_social_pais}</p>
    </div>
) : null  }

<label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
    Ver mapa para identificar grado en el siguiente link:
    https://indicemx.github.io/IMx_Mapa/IMM_2010-2020.html

</label>
<div id="programa_social_zona_marginada">
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_zona_marginada"
        value="Muy bajo"
        checked={props.values.programa_social_zona_marginada === 'Muy bajo'}
        onChange={() => props.setFieldValue("programa_social_zona_marginada", "Muy bajo")}
    />
    <span className="ml-2">Muy bajo</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_zona_marginada"
        value="Bajo"
        checked={props.values.programa_social_zona_marginada === 'Bajo'}
        onChange={() => props.setFieldValue("programa_social_zona_marginada", "Bajo")}
    />
    <span className="ml-2">Bajo</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_zona_marginada"
        value="Medio"
        checked={props.values.programa_social_zona_marginada === 'Medio'}
        onChange={() => props.setFieldValue("programa_social_zona_marginada", "Medio")}
    />
    <span className="ml-2">Medio</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_zona_marginada"
        value="Alto"
        checked={props.values.programa_social_zona_marginada === 'Alto'}
        onChange={() => props.setFieldValue("programa_social_zona_marginada", "Alto")}
    />
    <span className="ml-2">Alto</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_zona_marginada"
        value="Muy Alto"
        checked={props.values.programa_social_zona_marginada === 'Muy Alto'}
        onChange={() => props.setFieldValue("programa_social_zona_marginada", "Muy Alto")}
    />
    <span className="ml-2">Muy Alto</span>
</label>
</div>

<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programa_social_condicion_social">
        Condicion Social
    </label>

    <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="programa_social_condicion_social"
        type="text"
        placeholder="programa_social_condicion_social"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.programa_social_condicion_social}
    />
</div>

{ props.touched.programa_social_condicion_social && props.errors.programa_social_condicion_social ? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{props.errors.programa_social_condicion_social}</p>
    </div>
) : null  }

<div>
    <label className="block text-gray-700 text-sm font-bold mb-2">
    Menos de 12 puntos en estudio socioeconómico   
    </label>
    <label className="inline-flex items-center mr-3">
        <input
            type="radio"
            className="form-radio"
            name="programa_social_deficit_economico"
            value="true"
            checked={props.values.programa_social_deficit_economico === true}
            onChange={() => props.setFieldValue("programa_social_deficit_economico", true)}
        />
        <span className="ml-2">Sí</span>
    </label>
    <label className="inline-flex items-center">
        <input
            type="radio"
            className="form-radio"
            name="programa_social_deficit_economico"
            value="false"
            checked={props.values.programa_social_deficit_economico === false}
            onChange={() => props.setFieldValue("programa_social_deficit_economico", false)}
        />
        <span className="ml-2">No</span>
    </label>
</div>

{ props.touched.programa_social_deficit_economico && props.errors.programa_social_deficit_economico ? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{props.errors.programa_social_deficit_economico}</p>
    </div>
) : null  }


<label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
    Extranjero
</label>
<div id="programa_social_migrante">
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_migrante"
        value="Transito migratorio"
        checked={props.values.programa_social_migrante === 'Transito migratorio'}
        onChange={() => props.setFieldValue("programa_social_migrante", "Transito migratorio")}
    />
    <span className="ml-2">Transito migratorio</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_migrante"
        value="Residente legal"
        checked={props.values.programa_social_migrante === 'Residente legal'}
        onChange={() => props.setFieldValue("programa_social_migrante", "Residente legal")}
    />
    <span className="ml-2">Residente legal</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_migrante"
        value="Residente ilegal"
        checked={props.values.programa_social_migrante === 'Residente ilegal'}
        onChange={() => props.setFieldValue("programa_social_migrante", "Residente ilegal")}
    />
    <span className="ml-2">Residente ilegal</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_migrante"
        value="No"
        checked={props.values.programa_social_migrante === 'No'}
        onChange={() => props.setFieldValue("programa_social_migrante", "No")}
    />
    <span className="ml-2">No</span>
</label>
</div>

<div>
    <label className="block text-gray-700 text-sm font-bold mb-2">
        Abandono Social   
    </label>
    <label className="inline-flex items-center mr-3">
        <input
            type="radio"
            className="form-radio"
            name="programa_social_abandono_social"
            value="true"
            checked={props.values.programa_social_abandono_social === true}
            onChange={() => props.setFieldValue("programa_social_abandono_social", true)}
        />
        <span className="ml-2">Sí</span>
    </label>
    <label className="inline-flex items-center">
        <input
            type="radio"
            className="form-radio"
            name="programa_social_abandono_social"
            value="false"
            checked={props.values.programa_social_abandono_social === false}
            onChange={() => props.setFieldValue("programa_social_abandono_social", false)}
        />
        <span className="ml-2">No</span>
    </label>
</div>

<div>
    <label className="block text-gray-700 text-sm font-bold mb-2">
        Situación de calle   
    </label>
    <label className="inline-flex items-center mr-3">
        <input
            type="radio"
            className="form-radio"
            name="programa_social_situacion_calle"
            value="true"
            checked={props.values.programa_social_situacion_calle === true}
            onChange={() => props.setFieldValue("programa_social_situacion_calle", true)}
        />
        <span className="ml-2">Sí</span>
    </label>
    <label className="inline-flex items-center">
        <input
            type="radio"
            className="form-radio"
            name="programa_social_situacion_calle"
            value="false"
            checked={props.values.programa_social_situacion_calle === false}
            onChange={() => props.setFieldValue("programa_social_situacion_calle", false)}
        />
        <span className="ml-2">No</span>
    </label>
</div>

<div className="mb-4">
    <div className="block text-gray-700 text-sm font-bold mb-2">
        Red de apoyo disponible
    </div>
    {[
        'Familia',
        'Amistades',
        'Instituciones civiles o gubernamentales',
        'Sin red de apoyo'

    ].map((option) => (
        <div key={option} className="block">
            <input
                type="checkbox"
                id={option}
                name="programa_social_red_apoyo"
                value={option}
                onChange={(e) => {
                    const isChecked = e.target.checked;
                    const value = e.target.value;

                    props.setFieldValue(
                        'programa_social_red_apoyo',
                        isChecked
                        ? [...props.values.programa_social_red_apoyo, value]
                        : props.values.programa_social_red_apoyo.filter((val) => val !== value)
                    );
                }}
                onBlur={props.handleBlur}
                checked={props.values.programa_social_red_apoyo.includes(option)}
                className="mr-2"
            />
            <label htmlFor={option}>{option}</label>
        </div>
    ))}
</div>

<div className="mb-4">
    <div className="block text-gray-700 text-sm font-bold mb-2">
        Tipo de Familia
    </div>
    {[
        'Nueva conformación',
        'Nuclear',
        'Extensa',
        'Monoparental',
        'Reconstituida',
        'Homoparental',
        'Diada conyugal',
        'Sin familia',
    ].map((option) => (
        <div key={option} className="block">
            <input
                type="checkbox"
                id={option}
                name="programa_social_tipo_familia"
                value={option}
                onChange={(e) => {
                    const isChecked = e.target.checked;
                    const value = e.target.value;

                    props.setFieldValue(
                        'programa_social_tipo_familia',
                        isChecked
                        ? [...props.values.programa_social_tipo_familia, value]
                        : props.values.programa_social_tipo_familia.filter((val) => val !== value)
                    );
                }}
                onBlur={props.handleBlur}
                checked={props.values.programa_social_tipo_familia.includes(option)}
                className="mr-2"
            />
            <label htmlFor={option}>{option}</label>
        </div>
    ))}
</div>


<div className="mb-4">
    <div className="block text-gray-700 text-sm font-bold mb-2">
        Idiomas
    </div>
    {[
        'Español',
        'Inglés',
        'Ruso',
        'Mandarín',
        'Francés',
        'Alemán',
        'Italiano',
        'Portugués',
        'Japonés',
        'Coreano',
        'Árabe',
        'Hindi',
        'Otro'

    ].map((option) => (
        <div key={option} className="block">
            <input
                type="checkbox"
                id={option}
                name="programa_social_idioma"
                value={option}
                onChange={(e) => {
                    const isChecked = e.target.checked;
                    const value = e.target.value;

                    props.setFieldValue(
                        'programa_social_idioma',
                        isChecked
                        ? [...props.values.programa_social_idioma, value]
                        : props.values.programa_social_idioma.filter((val) => val !== value)
                    );
                }}
                onBlur={props.handleBlur}
                checked={props.values.programa_social_idioma.includes(option)}
                className="mr-2"
            />
            <label htmlFor={option}>{option}</label>
        </div>
    ))}
</div>

<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programa_social_lengua_indigena">
        Habla lengua indígena
    </label>
    <Select
        id="programa_social_lengua_indigena"
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        options={socialOptionsLengua}
        onChange={(selectedOption) => 
            props.setFieldValue('programa_social_lengua_indigena', selectedOption.value)}
        onBlur={props.handleBlur}
        value={socialOptionsLengua.find(option => option.value === props.values.programa_social_lengua_indigena)}
    />
    {props.errors.programa_social_lengua_indigena && (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p className="font-bold">Error</p>
            <p>{props.errors.programa_social_lengua_indigena}</p>
        </div>
    )}
</div>

<div className="mb-4">
    <div className="block text-gray-700 text-sm font-bold mb-2">
        Discapacidad
    </div>
    {[
        'Ninguna',
        'Física',
        'Mental',
        'Sensorial',
        'Intelectual',
    ].map((option) => (
        <div key={option} className="block">
            <input
                type="checkbox"
                id={option}
                name="programa_social_discapacidad_cdpd"
                value={option}
                onChange={(e) => {
                    const isChecked = e.target.checked;
                    const value = e.target.value;

                    props.setFieldValue(
                        'programa_social_discapacidad_cdpd',
                        isChecked
                        ? [...props.values.programa_social_discapacidad_cdpd, value]
                        : props.values.programa_social_discapacidad_cdpd.filter((val) => val !== value)
                    );
                }}
                onBlur={props.handleBlur}
                checked={props.values.programa_social_discapacidad_cdpd.includes(option)}
                className="mr-2"
            />
            <label htmlFor={option}>{option}</label>
        </div>
    ))}
</div>
  
<label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
    Escolaridad
</label>
<div id="programa_social_escolaridad">
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_escolaridad"
        value="No sabe leer y/o escribir"
        checked={props.values.programa_social_escolaridad === 'No sabe leer y/o escribir'}
        onChange={() => props.setFieldValue("programa_social_escolaridad", "No sabe leer y/o escribir")}
    />
    <span className="ml-2">No sabe leer y/o escribir</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_escolaridad"
        value="Sabe leer y/o escribir"
        checked={props.values.programa_social_escolaridad === 'Sabe leer y/o escribir'}
        onChange={() => props.setFieldValue("programa_social_escolaridad", "Sabe leer y/o escribir")}
    />
    <span className="ml-2">Sabe leer y/o escribir</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_escolaridad"
        value="Preescolar"
        checked={props.values.programa_social_escolaridad === 'Preescolar'}
        onChange={() => props.setFieldValue("programa_social_escolaridad", "Preescolar")}
    />
    <span className="ml-2">Preescolar</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_escolaridad"
        value="Primaria incompleta"
        checked={props.values.programa_social_escolaridad === 'Primaria incompleta'}
        onChange={() => props.setFieldValue("programa_social_escolaridad", "Primaria incompleta")}
    />
    <span className="ml-2">Primaria incompleta</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_escolaridad"
        value="Primaria completa"
        checked={props.values.programa_social_escolaridad === 'Primaria completa'}
        onChange={() => props.setFieldValue("programa_social_escolaridad", "Primaria completa")}
    />
    <span className="ml-2">Primaria completa</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_escolaridad"
        value="Secundaria incompleta"
        checked={props.values.programa_social_escolaridad === 'Secundaria incompleta'}
        onChange={() => props.setFieldValue("programa_social_escolaridad", "Secundaria incompleta")}
    />
    <span className="ml-2">Secundaria incompleta</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_escolaridad"
        value="Secundaria completa"
        checked={props.values.programa_social_escolaridad === 'Secundaria completa'}
        onChange={() => props.setFieldValue("programa_social_escolaridad", "Secundaria completa")}
    />
    <span className="ml-2">Secundaria completa</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_escolaridad"
        value="Bachillerato incompleto"
        checked={props.values.programa_social_escolaridad === 'Bachillerato incompleto'}
        onChange={() => props.setFieldValue("programa_social_escolaridad", "Bachillerato incompleto")}
    />
    <span className="ml-2">Bachillerato incompleto</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_escolaridad"
        value="Bachillerato completo"
        checked={props.values.programa_social_escolaridad === 'Bachillerato completo'}
        onChange={() => props.setFieldValue("programa_social_escolaridad", "Bachillerato completo")}
    />
    <span className="ml-2">Bachillerato completo</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_escolaridad"
        value="Técnico"
        checked={props.values.programa_social_escolaridad === 'Técnico'}
        onChange={() => props.setFieldValue("programa_social_escolaridad", "Técnico")}
    />
    <span className="ml-2">Técnico</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_escolaridad"
        value="Profesional_licenciatura"
        checked={props.values.programa_social_escolaridad === 'Profesional_licenciatura'}
        onChange={() => props.setFieldValue("programa_social_escolaridad", "Profesional_licenciatura")}
    />
    <span className="ml-2">Profesional / licenciatura</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_escolaridad"
        value="Posgrado"
        checked={props.values.programa_social_escolaridad === 'Posgrado'}
        onChange={() => props.setFieldValue("programa_social_escolaridad", "Posgrado")}
    />
    <span className="ml-2">Posgrado</span>
</label>
</div>

<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programa_social_ocupacion">
        Ocupación
    </label>

    <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="programa_social_ocupacion"
        type="text"
        placeholder="programa_social_ocupacion"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.programa_social_ocupacion}
    />
</div>

{ props.touched.programa_social_ocupacion && props.errors.programa_social_ocupacion ? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{props.errors.programa_social_ocupacion}</p>
    </div>
) : null  }

<div className="mb-4">
    <div className="block text-gray-700 text-sm font-bold mb-2">
        Intitución de Derechohabiencia
    </div>
    {[
        'Ninguna',
        'IMSS',
        'ISSSTE',
        'SEDENA',
        'SEMAR',
        'PEMEX',
    ].map((option) => (
        <div key={option} className="block">
            <input
                type="checkbox"
                id={option}
                name="programa_social_derechohabiencia"
                value={option}
                onChange={(e) => {
                    const isChecked = e.target.checked;
                    const value = e.target.value;

                    props.setFieldValue(
                        'programa_social_derechohabiencia',
                        isChecked
                        ? [...props.values.programa_social_derechohabiencia, value]
                        : props.values.programa_social_derechohabiencia.filter((val) => val !== value)
                    );
                }}
                onBlur={props.handleBlur}
                checked={props.values.programa_social_derechohabiencia.includes(option)}
                className="mr-2"
            />
            <label htmlFor={option}>{option}</label>
        </div>
    ))}
</div>

<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programa_social_religion">
        Religión
    </label>
    <Select
        id="programa_social_religion"
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        options={socialOptionsReligion}
        onChange={(selectedOption) => 
            props.setFieldValue('programa_social_religion', selectedOption.value)}
        onBlur={props.handleBlur}
        value={socialOptionsReligion.find(option => option.value === props.values.programa_social_religion)}
    />
    {props.errors.programa_social_religion && (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p className="font-bold">Error</p>
            <p>{props.errors.programa_social_religion}</p>
        </div>
    )}
</div>

<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programa_social_limitada">
    Por valores, costumbres y/o creencias existe alguna condición que interfiera en el proceso de atención médicamente necesaria (Ej. transfusiones, intervención quirúrgica, tipo de alimento). En caso que la respuesta sea "si" colocar que procedimiento o atención no desea que se realice:
    </label>

    <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="programa_social_limitada"
        type="text"
        placeholder="programa_social_limitada"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.programa_social_limitada}
    />
</div>

{ props.touched.programa_social_limitada && props.errors.programa_social_limitada ? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{props.errors.programa_social_limitada}</p>
    </div>
) : null  }

<div>
    <label className="block text-gray-700 text-sm font-bold mb-2">
    Es considerado víctima de maltrato y/o violencia?
    (En caso afirmativo debe ser considerado como caso médico-legal) 
    </label>
    <label className="inline-flex items-center mr-3">
        <input
            type="radio"
            className="form-radio"
            name="programa_social_violencia"
            value="true"
            checked={props.values.programa_social_violencia === true}
            onChange={() => props.setFieldValue("programa_social_violencia", true)}
        />
        <span className="ml-2">Sí</span>
    </label>
    <label className="inline-flex items-center">
        <input
            type="radio"
            className="form-radio"
            name="programa_social_violencia"
            value="false"
            checked={props.values.programa_social_violencia === false}
            onChange={() => props.setFieldValue("programa_social_violencia", false)}
        />
        <span className="ml-2">No</span>
    </label>
</div>

<div>
    <label className="block text-gray-700 text-sm font-bold mb-2">
        Caso Médico-Legal   
    </label>
    <label className="inline-flex items-center mr-3">
        <input
            type="radio"
            className="form-radio"
            name="programa_social_caso_medicolegal"
            value="true"
            checked={props.values.programa_social_caso_medicolegal === true}
            onChange={() => props.setFieldValue("programa_social_caso_medicolegal", true)}
        />
        <span className="ml-2">Sí</span>
    </label>
    <label className="inline-flex items-center">
        <input
            type="radio"
            className="form-radio"
            name="programa_social_caso_medicolegal"
            value="false"
            checked={props.values.programa_social_caso_medicolegal === false}
            onChange={() => props.setFieldValue("programa_social_caso_medicolegal", false)}
        />
        <span className="ml-2">No</span>
    </label>
</div>

<div>
    <label className="block text-gray-700 text-sm font-bold mb-2">
        Código Mater   
    </label>
    <label className="inline-flex items-center mr-3">
        <input
            type="radio"
            className="form-radio"
            name="programa_social_mater"
            value="true"
            checked={props.values.programa_social_mater === true}
            onChange={() => props.setFieldValue("programa_social_mater", true)}
        />
        <span className="ml-2">Sí</span>
    </label>
    <label className="inline-flex items-center">
        <input
            type="radio"
            className="form-radio"
            name="programa_social_mater"
            value="false"
            checked={props.values.programa_social_mater === false}
            onChange={() => props.setFieldValue("programa_social_mater", false)}
        />
        <span className="ml-2">No</span>
    </label>
</div>


<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programa_social_riesgos_vivienda">
        Riesgos asociados a la vivienda
    </label>

    <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="programa_social_riesgos_vivienda"
        type="text"
        placeholder="programa_social_riesgos_vivienda"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.programa_social_riesgos_vivienda}
    />
</div>

{ props.touched.programa_social_riesgos_vivienda && props.errors.programa_social_riesgos_vivienda ? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{props.errors.programa_social_riesgos_vivienda}</p>
    </div>
) : null  }


<label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
    Tipo de Vivienda
</label>
<div id="programa_social_vivienda_tipo">
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_vivienda_tipo"
        value="Propia"
        checked={props.values.programa_social_vivienda_tipo === 'Propia'}
        onChange={() => props.setFieldValue("programa_social_vivienda_tipo", "Propia")}
    />
    <span className="ml-2">Propia</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_vivienda_tipo"
        value="Rentada"
        checked={props.values.programa_social_vivienda_tipo === 'Rentada'}
        onChange={() => props.setFieldValue("programa_social_vivienda_tipo", "Rentada")}
    />
    <span className="ml-2">Rentada</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_vivienda_tipo"
        value="Prestada"
        checked={props.values.programa_social_vivienda_tipo === 'Prestada'}
        onChange={() => props.setFieldValue("programa_social_vivienda_tipo", "Prestada")}
    />
    <span className="ml-2">Prestada</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_vivienda_tipo"
        value="Institución de protección social"
        checked={props.values.programa_social_vivienda_tipo === 'Institución de protección social'}
        onChange={() => props.setFieldValue("programa_social_vivienda_tipo", "Institución de protección social")}
    />
    <span className="ml-2">Institución de protección social</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_vivienda_tipo"
        value="Sin vivienda"
        checked={props.values.programa_social_vivienda_tipo === 'Sin vivienda'}
        onChange={() => props.setFieldValue("programa_social_vivienda_tipo", "Sin vivienda")}
    />
    <span className="ml-2">Sin vivienda</span>
</label>
</div>

<div className="mb-4">
    <div className="block text-gray-700 text-sm font-bold mb-2">
        Materiales de la vivienda
    </div>
    {[
        'Cemento',
        'Ladrillo',
        'Adobe',
        'Paja',
        'Madera',
        'Lámina de Cartón',
        'Lámina de Asbesto',
        'Lámina de Metal',
        'Teja',
        'Loza',
        'Ninguno',

    ].map((option) => (
        <div key={option} className="block">
            <input
                type="checkbox"
                id={option}
                name="programa_social_vivienda_material"
                value={option}
                onChange={(e) => {
                    const isChecked = e.target.checked;
                    const value = e.target.value;

                    props.setFieldValue(
                        'programa_social_vivienda_material',
                        isChecked
                        ? [...props.values.programa_social_vivienda_material, value]
                        : props.values.programa_social_vivienda_material.filter((val) => val !== value)
                    );
                }}
                onBlur={props.handleBlur}
                checked={props.values.programa_social_vivienda_material.includes(option)}
                className="mr-2"
            />
            <label htmlFor={option}>{option}</label>
        </div>
    ))}
</div>

<div className="mb-4">
    <div className="block text-gray-700 text-sm font-bold mb-2">
        Servicios de la vivienda
    </div>
    {[
        'Drenaje',
        'Agua potable',
        'Electricidad',
        'Gas',
        'Internet',
        'Teléfono',
        'Recolección de basura',
        'Ninguno',
    ].map((option) => (
        <div key={option} className="block">
            <input
                type="checkbox"
                id={option}
                name="programa_social_vivienda_servicios"
                value={option}
                onChange={(e) => {
                    const isChecked = e.target.checked;
                    const value = e.target.value;

                    props.setFieldValue(
                        'programa_social_vivienda_servicios',
                        isChecked
                        ? [...props.values.programa_social_vivienda_servicios, value]
                        : props.values.programa_social_vivienda_servicios.filter((val) => val !== value)
                    );
                }}
                onBlur={props.handleBlur}
                checked={props.values.programa_social_vivienda_servicios.includes(option)}
                className="mr-2"
            />
            <label htmlFor={option}>{option}</label>
        </div>
    ))}
</div>

<div className="mb-4">
<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programa_social_vivienda_cuartos">
¿Cuántos cuartos dormitorio tiene en casa? 
*Cuarto dormitorio: cuartos disponibles (o potencialmente utilizables) para dormir en una vivienda.
</label>

<input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="programa_social_vivienda_cuartos"
    type="number"
    placeholder="programa_social_vivienda_cuartos"
    onChange={props.handleChange}
    onBlur={props.handleBlur}
    value={props.values.programa_social_vivienda_cuartos}
/>
</div>

{ props.touched.programa_social_vivienda_cuartos && props.errors.programa_social_vivienda_cuartos ? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
    <p className="font-bold">Error</p>
    <p>{props.errors.programa_social_vivienda_cuartos}</p>
</div>
) : null  }

<div className="mb-4">
<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programa_social_vivienda_personas">
¿Cuántas personas viven en la misma casa? 
</label>

<input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="programa_social_vivienda_personas"
    type="number"
    placeholder="programa_social_vivienda_personas"
    onChange={props.handleChange}
    onBlur={props.handleBlur}
    value={props.values.programa_social_vivienda_personas}
/>
</div>

{ props.touched.programa_social_vivienda_personas && props.errors.programa_social_vivienda_personas ? (
<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
    <p className="font-bold">Error</p>
    <p>{props.errors.programa_social_vivienda_personas}</p>
</div>
) : null  }


<div>
    <label className="block text-gray-700 text-sm font-bold mb-2">
    Vivienda no vulnerable: menor o igual a 2.5 personas por cuarto dormitorio
    Vivienda vulnerable: mayor a 2.5 personas por cuarto dormitorio   
    </label>
    <label className="inline-flex items-center mr-3">
        <input
            type="radio"
            className="form-radio"
            name="programa_social_vivienda_hacinamiento"
            value="true"
            checked={props.values.programa_social_vivienda_hacinamiento === true}
            onChange={() => props.setFieldValue("programa_social_vivienda_hacinamiento", true)}
        />
        <span className="ml-2">Sí</span>
    </label>
    <label className="inline-flex items-center">
        <input
            type="radio"
            className="form-radio"
            name="programa_social_vivienda_hacinamiento"
            value="false"
            checked={props.values.programa_social_vivienda_hacinamiento === false}
            onChange={() => props.setFieldValue("programa_social_vivienda_hacinamiento", false)}
        />
        <span className="ml-2">No</span>
    </label>
</div>

<div className="mb-4">
    <div className="block text-gray-700 text-sm font-bold mb-2">
    En su comunidad tiene acceso a atención medica ante presencia de un dato de alarma.
*En los niveles de atención se considera solo a instituciones públicas. 
    </div>
    {[
        '1° nivel',
        '2° nivel',
        '3° nivel',
        'Privado',
        'Ninguno',

    ].map((option) => (
        <div key={option} className="block">
            <input
                type="checkbox"
                id={option}
                name="programa_social_vivienda_atencion_alarma"
                value={option}
                onChange={(e) => {
                    const isChecked = e.target.checked;
                    const value = e.target.value;

                    props.setFieldValue(
                        'programa_social_vivienda_atencion_alarma',
                        isChecked
                        ? [...props.values.programa_social_vivienda_atencion_alarma, value]
                        : props.values.programa_social_vivienda_atencion_alarma.filter((val) => val !== value)
                    );
                }}
                onBlur={props.handleBlur}
                checked={props.values.programa_social_vivienda_atencion_alarma.includes(option)}
                className="mr-2"
            />
            <label htmlFor={option}>{option}</label>
        </div>
    ))}
</div>

<div className="mb-4">
    <div className="block text-gray-700 text-sm font-bold mb-2">
    Cuenta con disposíto suministrador de oxigeno en domicilio
    </div>
    {[
        'Concentrador de oxigeno',
        'Tanque de oxigeno (no portátil)',
        'Tanque de oxigeno portátil',
        'CPAP',
        'BiPAP',
        'Nebulizador',
        'Ninguno'
    ].map((option) => (
        <div key={option} className="block">
            <input
                type="checkbox"
                id={option}
                name="programa_social_dispositivo_medicos"
                value={option}
                onChange={(e) => {
                    const isChecked = e.target.checked;
                    const value = e.target.value;

                    props.setFieldValue(
                        'programa_social_dispositivo_medicos',
                        isChecked
                        ? [...props.values.programa_social_dispositivo_medicos, value]
                        : props.values.programa_social_dispositivo_medicos.filter((val) => val !== value)
                    );
                }}
                onBlur={props.handleBlur}
                checked={props.values.programa_social_dispositivo_medicos.includes(option)}
                className="mr-2"
            />
            <label htmlFor={option}>{option}</label>
        </div>
    ))}
</div>

<div>
    <label className="block text-gray-700 text-sm font-bold mb-2">
    Cuenta con animales en su domicilio   
    </label>
    <label className="inline-flex items-center mr-3">
        <input
            type="radio"
            className="form-radio"
            name="programa_social_animales"
            value="true"
            checked={props.values.programa_social_animales === true}
            onChange={() => props.setFieldValue("programa_social_animales", true)}
        />
        <span className="ml-2">Sí</span>
    </label>
    <label className="inline-flex items-center">
        <input
            type="radio"
            className="form-radio"
            name="programa_social_animales"
            value="false"
            checked={props.values.programa_social_animales === false}
            onChange={() => props.setFieldValue("programa_social_animales", false)}
        />
        <span className="ml-2">No</span>
    </label>
</div>

<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programa_social_animales_tipo">
    ¿Qué animales tiene? . Escriba el tipo de animal que tiene.
    </label>

    <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="programa_social_animales_tipo"
        type="text"
        placeholder="programa_social_animales_tipo"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.programa_social_animales_tipo}
    />
</div>

{ props.touched.programa_social_animales_tipo && props.errors.programa_social_animales_tipo ? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{props.errors.programa_social_animales_tipo}</p>
    </div>
) : null  }


<div>
    <label className="block text-gray-700 text-sm font-bold mb-2">
    ¿Cocina con leña?    
    </label>
    <label className="inline-flex items-center mr-3">
        <input
            type="radio"
            className="form-radio"
            name="programa_social_lenia"
            value="true"
            checked={props.values.programa_social_lenia === true}
            onChange={() => props.setFieldValue("programa_social_lenia", true)}
        />
        <span className="ml-2">Sí</span>
    </label>
    <label className="inline-flex items-center">
        <input
            type="radio"
            className="form-radio"
            name="programa_social_lenia"
            value="false"
            checked={props.values.programa_social_lenia === false}
            onChange={() => props.setFieldValue("programa_social_lenia", false)}
        />
        <span className="ml-2">No</span>
    </label>
</div>


<div className="mb-4">
    <div className="block text-gray-700 text-sm font-bold mb-2">
    Riesgos asociados al trabajo:

Seleccione si por su ocupación o por algún pasatiempo desarrolla alguna de las siguientes actividades: 
    </div>
    {[
        'Ninguno',
        'Mecánico automotriz',
        'Carpintero',
        'Pintor',
        'Soldador',
        'Estibador',
        'Plomería',
        'Trabajador de viñedos',
        'Trabajador de silos (destinado a almacenar granos y forrajes)',
        'Trabajador de Minas',
        'Trabajo en granja',
        'Trabajador en construcción',
        'Trabajador de laboratorio',
        'Trabajador en industria textil',
        'Trabajador en industria de plásticos',
        'Trabajador en industria de gases',
        'Trabajador en Ingenios (proceso de la caña y molino)',
        'Trabajador en la industria de transportes',
        'Trabajador con aves',

    ].map((option) => (
        <div key={option} className="block">
            <input
                type="checkbox"
                id={option}
                name="programa_social_trabajo_riesgos"
                value={option}
                onChange={(e) => {
                    const isChecked = e.target.checked;
                    const value = e.target.value;

                    props.setFieldValue(
                        'programa_social_trabajo_riesgos',
                        isChecked
                        ? [...props.values.programa_social_trabajo_riesgos, value]
                        : props.values.programa_social_trabajo_riesgos.filter((val) => val !== value)
                    );
                }}
                onBlur={props.handleBlur}
                checked={props.values.programa_social_trabajo_riesgos.includes(option)}
                className="mr-2"
            />
            <label htmlFor={option}>{option}</label>
        </div>
    ))}
</div>

<div className="mb-4">
    <div className="block text-gray-700 text-sm font-bold mb-2">
        Barreras para el aprendizaje a considerar
    </div>
    {[
        'Ninguna',
        'Barreras emocionales y/o motivacionales',
        'Limitaciones fisicas o cognitivas',
        'Disposicion del paciente para aprender',
        'Habilidad para realizar procedimiento',
        'Creencias y valores del paciente y de su familia',
        'Nivel de alfabetización, nivel educativo e idioma',
    ].map((option) => (
        <div key={option} className="block">
            <input
                type="checkbox"
                id={option}
                name="programa_social_barreras_aprendizaje"
                value={option}
                onChange={(e) => {
                    const isChecked = e.target.checked;
                    const value = e.target.value;

                    props.setFieldValue(
                        'programa_social_barreras_aprendizaje',
                        isChecked
                        ? [...props.values.programa_social_barreras_aprendizaje, value]
                        : props.values.programa_social_barreras_aprendizaje.filter((val) => val !== value)
                    );
                }}
                onBlur={props.handleBlur}
                checked={props.values.programa_social_barreras_aprendizaje.includes(option)}
                className="mr-2"
            />
            <label htmlFor={option}>{option}</label>
        </div>
    ))}
</div>

<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programa_social_exposicion_sustancias">
    Seleccione si de manera directa o indirecta está expuesto a algo de lo siguiente: 
    Puede escoger varias opciones
    </label>
    <Select
        id="programa_social_exposicion_sustancias"
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        options={socialOptionsExpuesto}
        onChange={(selectedOption) => 
            props.setFieldValue('programa_social_exposicion_sustancias', selectedOption.value)}
        onBlur={props.handleBlur}
        isMulti
        value={socialOptionsExpuesto.find(option => option.value === props.values.programa_social_exposicion_sustancias)}
    />
    {props.errors.programa_social_exposicion_sustancias && (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p className="font-bold">Error</p>
            <p>{props.errors.programa_social_exposicion_sustancias}</p>
        </div>
    )}
</div>

<label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
Si su respuesta fue positiva en una o varias de las opciones, conteste lo siguiente: 
¿Cuánto tiempo tiene dicha exposición? 
</label>
<div id="programa_social_exposicion_sustancias_anios">
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_exposicion_sustancias_anios"
        value="< 1 año"
        checked={props.values.programa_social_exposicion_sustancias_anios === '< 1 año'}
        onChange={() => props.setFieldValue("programa_social_exposicion_sustancias_anios", "< 1 año")}
    />
    <span className="ml-2">{"< 1 año"}</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_exposicion_sustancias_anios"
        value="1-3 años"
        checked={props.values.programa_social_exposicion_sustancias_anios === '1-3 años'}
        onChange={() => props.setFieldValue("programa_social_exposicion_sustancias_anios", "1-3 años")}
    />
    <span className="ml-2">1-3 años</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_exposicion_sustancias_anios"
        value="3-5 años"
        checked={props.values.programa_social_exposicion_sustancias_anios === '3-5 años'}
        onChange={() => props.setFieldValue("programa_social_exposicion_sustancias_anios", "3-5 años")}
    />
    <span className="ml-2">3-5 años</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_exposicion_sustancias_anios"
        value="> 5 años"
        checked={props.values.programa_social_exposicion_sustancias_anios === '> 5 años'}
        onChange={() => props.setFieldValue("programa_social_exposicion_sustancias_anios", "> 5 años")}
    />
    <span className="ml-2">{"> 5 años"}</span>
</label>
</div>

<label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
¿Cuántas horas diarias considera que está expuesto? 
</label>
<div id="programa_social_exposicion_sustancias_horas">
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_exposicion_sustancias_horas"
        value="<1 hora"
        checked={props.values.programa_social_exposicion_sustancias_horas === '<1 hora'}
        onChange={() => props.setFieldValue("programa_social_exposicion_sustancias_horas", "<1 hora")}
    />
    <span className="ml-2">{"<1 hora"}</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_exposicion_sustancias_horas"
        value="1-5 horas"
        checked={props.values.programa_social_exposicion_sustancias_horas === '1-5 horas'}
        onChange={() => props.setFieldValue("programa_social_exposicion_sustancias_horas", "1-5 horas")}
    />
    <span className="ml-2">1-5 horas</span>
</label>
<label className="inline-flex items-center mr-3">
    <input
        type="radio"
        className="form-radio"
        name="programa_social_exposicion_sustancias_horas"
        value="> 5 horas"
        checked={props.values.programa_social_exposicion_sustancias_horas === '> 5 horas'}
        onChange={() => props.setFieldValue("programa_social_exposicion_sustancias_horas", "> 5 horas")}
    />
    <span className="ml-2">{"> 5 horas"}</span>
</label>
</div>

    <input
      type="submit"
      className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
      value="Modificar Programa Integral"
    />

    </form>
    )}
    </Formik>
        );
    };
    