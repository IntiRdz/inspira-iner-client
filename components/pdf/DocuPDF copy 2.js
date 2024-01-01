import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export const DocuPDF = ({ data }) => {
    const styles = StyleSheet.create({



        
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4',
            paddingBottom: 65,
        },
        table: {
            display: 'table',
            width: 'auto',
            borderStyle: 'solid',
            borderColor: '#e5e7eb', // Este es un color gris claro, similar a los bordes en Tailwind
            borderWidth: 1,
            borderRightWidth: 0,
            borderBottomWidth: 0,
        },
        tableRow: {
            flexDirection: 'row',
        },
        tableCell: {
            margin: 'auto',
            marginTop: 5,
            fontSize: 10,
            padding: 2, // px-1 y py-1 en Tailwind se traducen aproximadamente a 2 puntos de padding
            borderStyle: 'solid',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            borderTopWidth: 0,
            borderLeftWidth: 0,
        },
        tableCellHeader: {
            backgroundColor: '#60a5fa', // Este es un azul claro, similar a bg-blue-500 en Tailwind
            color: '#ffffff', // Texto blanco
            padding: 2,
            borderStyle: 'solid',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            borderTopWidth: 0,
            borderLeftWidth: 0,
        },
        tableColHeader: { 
            width: '12%', 
            borderStyle: 'solid', 
            borderWidth: 1, 
            borderLeftWidth: 0, 
            borderTopWidth: 0, 
            backgroundColor: '#f3f3f3' 
        },
        tableCol: { 
            width: '12%', 
            borderStyle: 'solid', 
            borderWidth: 1, 
            borderLeftWidth: 0, 
            borderTopWidth: 0 
        },
    });


  return (
        <Document>
            <Page size="Letter" style={styles.page} orientation="landscape">
                <View style={styles.table}>
                    {/* Encabezados de la tabla */}
                    <View style={styles.tableRow}>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Cama</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Expediente</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Apellido Paterno</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Apellido Materno</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Nombre</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Edad</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Genero</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Dispositivo O2</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Hemodialisis</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Caracteristicas Especiales</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Código UVEH</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Microorganismo</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Diagnósticos Generales</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Diagnósticos Específico</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>DEH</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Prealta</Text>
                        </View>
                        {/* ... otros encabezados ... */}
                    </View>
                    {/* Filas de datos */}
                    {data.map((paciente, index) => (
                        <View style={styles.tableRow} key={index}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{paciente.cama}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{paciente.expediente}</Text>
                            </View>


                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{paciente.pac_apellido_paterno}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{paciente.pac_apellido_materno}</Text>
                            </View>


                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{paciente.pac_nombre}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{paciente.pac_FN}</Text>
                            </View>


                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{paciente.pac_dispositivo_o2}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{paciente.pac_hemodialisis}</Text>
                            </View>


                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{paciente.caracteristicas_especiales}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{paciente.pac_codigo_uveh}</Text>
                            </View>


                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{paciente.microorganismo_relacionado}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{paciente.diagnostico1}</Text>
                            </View>

                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{paciente.diagnostico}</Text>
                            </View>
                            {/* ... otras celdas con datos del paciente ... */}
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
  )
}
