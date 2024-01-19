import React from 'react';
import { Formik } from 'formik';
import Select from 'react-select';
import { socialOptions } from './selecProgramaIntegral';

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


<label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
    Grupo
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
    