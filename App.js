import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PlotScreen from './screens/PlotScreen';
import ChakraScreen from './screens/ChakraScreen';
import ReportScreen from './screens/ReportScreen';

export default function App() {
  const [currentStep, setCurrentStep] = useState('plot');
  const [plotData, setPlotData] = useState({
    customerName: '',
    corners: [],
    frontDegree: 0,
    dimensions: '',
    center: { x: 0, y: 0 }
  });

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => setCurrentStep('plot')}><Text style={[styles.navText, currentStep === 'plot' && styles.activeNav]}>1. Plot & Details</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentStep('chakra')}><Text style={[styles.navText, currentStep === 'chakra' && styles.activeNav]}>2. Chakra</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentStep('report')}><Text style={[styles.navText, currentStep === 'report' && styles.activeNav]}>3. A4 Report</Text></TouchableOpacity>
      </View>

      {currentStep === 'plot' && <PlotScreen plotData={plotData} setPlotData={setPlotData} onNext={() => setCurrentStep('chakra')} />}
      {currentStep === 'chakra' && <ChakraScreen plotData={plotData} setPlotData={setPlotData} onNext={() => setCurrentStep('report')} />}
      {currentStep === 'report' && <ReportScreen plotData={plotData} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingTop: 40 },
  navBar: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, backgroundColor: '#1E1E1E' },
  navText: { color: '#888', fontSize: 14, fontWeight: 'bold' },
  activeNav: { color: '#4CAF50', borderBottomWidth: 2, borderBottomColor: '#4CAF50' }
});
