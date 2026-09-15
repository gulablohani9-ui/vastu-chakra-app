import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default function ReportScreen({ plotData }) {
  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Helvetica; padding: 20px; text-align: center; }
            h1 { color: #333; }
            .box { border: 2px solid #4CAF50; padding: 20px; margin-top: 20px; border-radius: 8px; }
          </style>
        </head>
        <body>
          <h1>Vastu Chakra & Plot Analysis Report</h1>
          <div class="box">
            <h3>Plot Dimensions:</h3>
            <p>${plotData.dimensions || 'Custom Irregular Plot'}</p>
            <h3>Front Alignment Degree:</h3>
            <p>${plotData.frontDegree}°</p>
            <h3>Center Coordinates:</h3>
            <p>X: ${plotData.center.x.toFixed(2)}, Y: ${plotData.center.y.toFixed(2)}</p>
          </div>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>A4 Print Layout & Data Export</Text>
      <View style={styles.previewCard}>
        <Text style={styles.previewText}>Plot Size: {plotData.dimensions || 'Not specified'}</Text>
        <Text style={styles.previewText}>Front Degree: {plotData.frontDegree}°</Text>
        <Text style={styles.previewText}>Corners Mapped: {plotData.corners.length}</Text>
      </View>

      <TouchableOpacity style={styles.pdfBtn} onPress={generatePDF}>
        <Text style={styles.btnText}>Print / Save A4 PDF</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#121212' },
  title: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  previewCard: { width: '100%', backgroundColor: '#1E1E1E', padding: 20, borderRadius: 10, marginBottom: 30 },
  previewText: { color: '#DDD', fontSize: 16, marginBottom: 10 },
  pdfBtn: { backgroundColor: '#2196F3', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});
