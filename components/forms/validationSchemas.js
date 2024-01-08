import * as Yup from 'yup';

export const validationSchema = Yup.object({
    expediente: Yup.string()
    .required('El expediente del paciente es obligatorio')
    .matches(/^[a-zA-Z0-9]{6,9}$/, 'El expediente debe tener entre 6 y 9 caracteres alfanuméricos'),            
    pac_apellido_paterno: Yup.string().required('El apellido paterno del paciente es obligatorio'),
    pac_apellido_materno: Yup.string().required('El apellido materno del paciente es obligatorio'),
    pac_nombre: Yup.string().required('El nombre del paciente es obligatorio'),
    pac_genero: Yup.string().oneOf(['Hombre', 'Mujer']).required('El género del paciente es obligatorio'),
    pac_FN: Yup.date().required('La fecha de nacimiento del paciente es obligatoria'),
    pac_dispositivo_o2: Yup.string().oneOf([
        'AA', 
        'PN',
        'Tienda_Traqueal',
        'PNAF',
        'VMNI_Intermiente',  
        'VMNI',
        'VM'
    ]).required('El dispositivo O2 del paciente es obligatorio'),
    pac_hemodialisis: Yup.boolean(),
    diagnostico1: Yup.array()
    .min(0, 'Debe seleccionar al menos un diagnóstico')
    .of(
        Yup.string().oneOf([
        'CodigoHemoptisis',
        'CodigoViaAerea',
        'CodigoInfarto',
        'SIRA',
        'NeumoniaViral',
        'COVID',
        'Influenza',
        'Parainfluenza',
        'VirusSincialRespiratorio',
        'Metaneumovirus',
        'NeumoniaBacteriana',
        'TuberculosisSensible',
        'TuberculosisResistente',
        'B24',
        'EPOC',
        'Asma',
        'TromboembiaPulmonar',
        'DerramePleural',
        'Neumotorax',
        'NeumoniaIntersticialDifusa',
        'InsuficienciaCardiaca',
        'CaPulmonarOSospecha',
        ])
    ),
    diagnostico: Yup.string(),
    caracteristicas_especiales:  Yup.array()
    .min(0, 'Seleccione una catecteristica especial del paciente')
    .of(
        Yup.string().oneOf([
        'TrasladoDeHospital',
        'InfeccionReciente',
        'Obstetrico',
        'Inmunosupresion',
        'ComunidadLG'
        ])
    ),
    fecha_ingreso: Yup.date().required('La fecha de ingreso es obligatoria'),
    fecha_prealta: Yup.date(),
    fecha_egreso: Yup.date(),
    hospitalizado: Yup.boolean()
});


// Esquema de validación para otro formulario
export const otroFormularioValidationSchema = Yup.object({
    // Definiciones del esquema...
});

