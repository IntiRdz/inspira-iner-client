import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export const DocuPDF = () => {
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        },
        tableRow: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#000',
            borderBottomStyle: 'solid',
        },
        tableCell: {
            borderRightWidth: 1,
            borderRightColor: '#000',
            borderRightStyle: 'solid',
            padding: 4,
            flexGrow: 1,
        },
        tableHeader: {
            backgroundColor: '#f3f3f3',
        },
        tableHeaderText: {
            fontWeight: 'bold',
            fontSize: 11,
        },
        tableContent: {
          fontSize: 10, 
        },
        firstColumn: {
          flexGrow: 1,
          padding: 4,
          borderRightWidth: 1,
          borderRightColor: '#000',
          borderRightStyle: 'solid',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          height: 5 * 20, // Asumiendo que la altura de cada fila es 20
      }
    });

    return (
        <Document>
            <Page size="Letter" style={styles.page}>
                <View style={styles.section}>
                    <Text>EVALUACIÓN SOCIAL </Text>

                    {/* Tabla */}
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={[styles.tableCell, styles.tableHeaderText]}>Evaluación realizada</Text>
                        <Text style={[styles.tableCell, styles.tableHeaderText]}>Riesgo o vulnerabilidad detectada</Text>
                        <Text style={[styles.tableCell, styles.tableHeaderText]}>Intervención recomendada</Text>
                        <Text style={[styles.tableCell, styles.tableHeaderText]}>Criterio</Text>
                    </View>

                    {/* Primer columna combinada */}
                    <View style={styles.tableRow}>
                        <Text style={styles.firstColumn}>Columna Combinada</Text>
                        
                        {/* Las otras celdas */}
                        <Text style={styles.tableCell}>Fila 1, Columna 2</Text>
                        <Text style={styles.tableCell}>Fila 1, Columna 3</Text>
                        <Text style={styles.tableCell}>Fila 1, Columna 4</Text>
                    </View>

                    {/* Las siguientes filas sin la primera columna */}
                    {[2, 3, 4, 5].map(index => (
                        <View style={styles.tableRow} key={index}>
                            <Text style={styles.tableCell}>Fila {index}, Columna 2</Text>
                            <Text style={styles.tableCell}>Fila {index}, Columna 3</Text>
                            <Text style={styles.tableCell}>Fila {index}, Columna 4</Text>
                        </View>
                    ))}

                </View>
            </Page>
        </Document>
    );
};
