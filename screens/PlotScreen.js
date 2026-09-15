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
            body { font-family: 'Helvetica', sans-serif; padding: 30px; color: #333; }
            .header { text-align: center; border-bottom: 2px solid #4CAF50; padding-bottom: 15px; margin-bottom: 20px; }
            .section { background: #f9f9f9; border: 1px solid #ddd; padding: 15px; border-radius: 8px; margin-bottom: 15px; }
            .footer { text-align: center; margin-top: 40px; font-weight: bold; font-size: 16px; color: #222; border-top: 1px dashed #ccc; padding-top: 15px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Vastu Chakra & Plot Analysis Report</h2>
            <p><strong>Customer Name:</strong> ${plotData.customerName || 'N/A'}</p>
          </div>
          
          <div class="section">
            <h3>Plot Specifications</h3>
            <p><strong>Plot Size / Dimensions:</strong> ${plotData.dimensions || 'Manual Custom Input'}</p>
            <p><strong>Front Orientation Degree:</strong> ${plotData.frontDegree}°</p>
            <p><strong>Mapped Corners Count:</strong> ${plotData.corners.length}</p>
            <p><strong>Calculated Center Point:</strong> X: ${plotData.center.x.toFixed(2)}, Y: ${plotData.center.y.toFixed(2)}</p>
          </div>

          <div class="footer">
            <p>Designed & Verified By: <span style="color: #4CAF50;">Ghanshyam Lohani</span></p>
          </div>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate or share PDF');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>A4 Report Preview</Text>
      <View style={styles.previewCard}>
        <Text style={styles.previewText}>Customer: {plotData.customerName || 'Not specified'}</Text>
        <Text style={styles.previewText}>Plot Size: {plotData.dimensions || 'Not specified'}</Text>
        <Text style={styles.previewText}>Front Degree: {plotData.frontDegree}°</Text>
        <View style={styles.signatureBox}>
          <Text style={styles.signatureText}>Report By: Ghanshyam Lohani</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.pdfBtn} onPress={generatePDF}>
        <Text style={styles.btnText}>Print, Save & Share A4 PDF</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#121212' },
  title: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  previewCard: { width: '100%', backgroundColor: '#1E1E1E', padding: 20, borderRadius: 10, marginBottom: 30 },
  previewText: { color: '#DDD', fontSize: 16, marginBottom: 10 },
  signatureBox: { marginTop: 15, borderTopWidth: 1, borderTopColor: '#333', paddingTop: 10 },
  signatureText: { color: '#4CAF50', fontWeight: 'bold', fontSize: 16 },
  pdfBtn: { backgroundColor: '#2196F3', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});
